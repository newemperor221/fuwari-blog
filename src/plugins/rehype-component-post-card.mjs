/// <reference types="mdast" />
import { h } from "hastscript";

export function PostCardComponent(props, children) {
	// 验证指令格式
	if (Array.isArray(children) && children.length !== 0) {
		return h("div", { class: "bg-red-100 p-4 text-red-700 rounded-md" }, [
			h("p", "错误：无效的指令格式"),
			h("p", '正确格式应为：::post{id="文章ID"}'),
		]);
	}

	// 验证ID是否存在
	const id = props.id;
	if (!id) {
		return h("div", { class: "bg-red-100 p-4 text-red-700 rounded-md" }, [
			h("p", "错误：未传入文章ID"),
		]);
	}

	// 创建唯一的容器ID，避免重复
	const containerId = `post-card-${id}`;

	// 创建加载状态元素 - 紧凑设计
	const loadingState = h(
		"div",
		{
			id: containerId,
			class:
				"post-card group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 h-64",
		},
		[
			// 加载状态的骨架屏 - 紧凑版本
			h("div", { class: "animate-pulse h-full" }, [
				// 图片占位符 - 占满整个卡片
				h("div", {
					class:
						"absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600",
				}),
				// 内容占位符 - 悬浮在底部
				h(
					"div",
					{
						class:
							"absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent",
					},
					[
						h("div", {
							class: "h-5 bg-white/20 rounded w-3/4 mb-2",
						}),
						h("div", {
							class: "h-3 bg-white/15 rounded w-full mb-1",
						}),
						h("div", {
							class: "h-3 bg-white/15 rounded w-4/5",
						}),
					],
				),
			]),
			// 加载指示器
			h(
				"div",
				{
					class:
						"absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm",
				},
				[
					h("div", { class: "flex flex-col items-center gap-2" }, [
						h("div", {
							class:
								"w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin",
						}),
						h("p", { class: "text-xs text-white font-medium" }, "加载中..."),
					]),
				],
			),
		],
	);

	// 创建脚本元素，处理数据获取和渲染
	const script = h(
		"script",
		{ type: "text/javascript", defer: true },
		`
        (async () => {
            const container = document.getElementById('${containerId}');
            if (!container) return;

            try {
                // 发起API请求
                const response = await fetch('/api/${id}.json');
                
                if (!response.ok) {
                    throw new Error(\`请求失败: \${response.status} \${response.statusText}\`);
                }

                // 解析响应数据
                const data = await response.json();
                
                // 验证必要字段
                if (!data.title) {
                    throw new Error('文章数据不完整，缺少标题信息');
                }

                // 构建文章卡片HTML - 基于用户模板的简化设计
                container.innerHTML = \`
                    <article class="post-card">
                        <!-- 图片区域 -->
                        <div class="img">
                            <img src="\${data.image}" class="not-prose"
                                 alt="\${data.title}" 
                                 loading="lazy"
                            />
                        </div>
                        
                        <!-- 分类标签 -->
                        <div class="category">
                            \${data.category?.[0] || '未分类'}
                        </div>
                        
                        <!-- 底部信息区域 -->
                        <div class="button">
                            <!-- 标题 -->
                            <div class="title">
                                \${data.title}
                            </div>
                            
                            <!-- 文章信息 -->
                            <div class="article-info">
                                <!-- 发布日期 -->
                                <div class="date">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    <span>\${new Date(data.published).toLocaleDateString('zh-CN')}</span>
                                </div>
                                
                                <!-- 阅读时间 -->
                                <div class="reading-time">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>\${data.minutes || '5'} 分钟</span>
                                </div>
                            </div>
                        </div>
                    </article>
                \`;

                // 添加点击事件，点击卡片跳转到文章详情
                container.style.cursor = 'pointer';
                container.addEventListener('click', () => {
                    window.location.href = '/${id}';
                });

            } catch (error) {
                // 处理错误状态 - 紧凑错误显示
                container.innerHTML = \`
                    <div class="relative h-64 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                        <!-- 错误内容 -->
                        <div class="text-center p-6">
                            <!-- 错误图标 -->
                            <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                            </div>
                            
                            <!-- 错误信息 -->
                            <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-2">加载失败</h3>
                            <p class="text-xs text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
                                \${error.message}
                            </p>
                            
                            <!-- 重试按钮 -->
                            <button id="retry-btn-${id}" class="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md transition-colors duration-200">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                                重试
                            </button>
                        </div>
                    </div>
                \`;

                // 添加重试按钮事件
                document.getElementById('retry-btn-${id}').addEventListener('click', (e) => {
                    e.stopPropagation();
                    // 显示重新加载状态 - 紧凑版本
                    container.innerHTML = \`
                        <div class="relative h-64 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                <div class="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                                <div class="h-3 bg-white/15 rounded w-full mb-1"></div>
                                <div class="h-3 bg-white/15 rounded w-4/5"></div>
                            </div>
                            <div class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                                <div class="flex flex-col items-center gap-2">
                                    <div class="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <p class="text-xs text-white font-medium">重新加载中...</p>
                                </div>
                            </div>
                        </div>
                    \`;
                    // 重新执行请求
                    location.reload();
                });
            }
        })();
        `,
	);

	// 返回加载状态和脚本
	return [loadingState, script];
}
