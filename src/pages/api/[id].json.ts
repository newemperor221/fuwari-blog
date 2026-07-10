import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import MarkdownIt from "markdown-it";

export const prerender = true;

export async function getStaticPaths() {
	try {
		const articles = await getCollection("posts");
		return articles.flatMap((article) => {
			const cleanId = article.id.replace(/\.md$/, "");
			return [{ params: { id: cleanId } }, { params: { id: `${cleanId}/` } }];
		});
	} catch (error) {
		console.error("getStaticPaths执行错误:", error);
		return [];
	}
}

export const GET: APIRoute = async ({ params }) => {
	try {
		const { id } = params;

		if (!id || typeof id !== "string" || id.trim() === "") {
			return new Response(
				JSON.stringify({ code: "400", message: "请提供有效的文章ID" }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}

		const cleanId = id.trim().replace(/\/$/, "");
		const articles = await getCollection("posts");
		const articleId = `${cleanId}.md`;
		const article = articles.find((item) => item.id === articleId);

		if (!article) {
			return new Response(
				JSON.stringify({
					code: "404",
					message: `文章ID不存在: ${cleanId}`,
				}),
				{ status: 404, headers: { "Content-Type": "application/json" } },
			);
		}

		// 处理图片路径
		const frontmatter = article.data;

		// 开发环境：直接规范化原始路径返回；生产发布使用 dist/api/*.json
		const normalizeImagePath = (p: unknown) => {
			if (!p || typeof p !== "string") return "/favicon/favicon-32x32.png";
			const s0 = String(p).trim();
			if (s0.startsWith("http://") || s0.startsWith("https://")) return s0;
			let s = s0;
			if (s.startsWith("./")) s = s.slice(2);
			if (!s.startsWith("/")) s = "/" + s;
			return s;
		};
		const imageUrlNormalized = normalizeImagePath(frontmatter?.image);
		const a = article!; // 非空断言，已在上方判空

		// 使用markdown-it渲染HTML
		const md = new MarkdownIt();
		const renderedHTML = md.render(a.body);

		return new Response(
			JSON.stringify({
				...frontmatter,
				image: imageUrlNormalized,
				body: renderedHTML,
				slug: a.slug,
				id: a.id,
				// 调试信息（仅开发环境）
				...(process.env.NODE_ENV === "development" && {
					debug: {
						originalPath: frontmatter?.image,
						processedPath: imageUrlNormalized,
						environment: process.env.NODE_ENV || "development",
					},
				}),
			}),
			{
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "public, max-age=60",
				},
			},
		);
	} catch (error) {
		console.error("请求处理错误:", error);
		return new Response(
			JSON.stringify({
				code: "500",
				message:
					process.env.NODE_ENV === "development"
						? error instanceof Error
							? error.message
							: "服务器错误"
						: "服务器内部错误",
			}),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
};
