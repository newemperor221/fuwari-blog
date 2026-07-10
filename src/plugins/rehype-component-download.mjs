import { h } from "hastscript";

export { DownloadComponent };

function DownloadComponent(props, children) {
	// 验证指令格式
	if (!props || !props.title) {
		return h("div", { class: "error" }, "下载组件需要 title 属性");
	}

	// 简化：每个组件只处理一个下载链接
	const download = {
		source: props.source || "下载",
		url: props.url,
	};

	// 验证必需的 URL
	if (!download.url) {
		return h("div", { class: "error" }, "下载组件需要 url 属性");
	}

	// 创建简洁的单个下载组件
	return h(
		"a",
		{
			href: download.url,
			class: "download-widget-single",
			target: "_blank",
			rel: "noopener noreferrer",
			style:
				"display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; margin: 16px 0; background: var(--card-bg); border: 2px solid var(--line-divider); border-radius: 12px; text-decoration: none; color: var(--primary); transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);",
		},
		[
			// 左侧内容
			h(
				"div",
				{
					class: "download-content",
					style:
						"display: flex; align-items: center; flex: 1;margin-right: auto;",
				},
				[
					// 图标
					h(
						"div",
						{
							class: "download-icon",
							style:
								"width: 40px; height: 40px; background: var(--primary); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;margin-left: auto;",
						},
						[
							h(
								"svg",
								{
									width: "22",
									height: "22",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "white",
									"stroke-width": "2",
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
								},
								[
									h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
									h("polyline", { points: "7,10 12,15 17,10" }),
									h("line", { x1: "12", y1: "15", x2: "12", y2: "3" }),
								],
							),
						],
					),
					// 文字信息
					h(
						"div",
						{
							class: "download-info",
							style: "flex: 1; min-width: 0;",
						},
						[
							h(
								"h3",
								{
									class: "download-title",
									style:
										"margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: var(--primary); line-height: 1.3;",
								},
								props.title,
							),
							h(
								"p",
								{
									class: "download-source",
									style:
										"margin: 0; font-size: 14px; color: var(--text-muted);",
								},
								`来源：${download.source}`,
							),
						],
					),
				],
			),
			// 右侧按钮
			h(
				"div",
				{
					class: "download-button",
					style:
						"background: var(--primary); color: white; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 6px; flex-shrink: 0; margin-left: auto;",
				},
				[
					"下载",
					h(
						"svg",
						{
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2",
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
						},
						[
							h("line", { x1: "7", y1: "17", x2: "17", y2: "7" }),
							h("polyline", { points: "7,7 17,7 17,17" }),
						],
					),
				],
			),
		],
	);
}
