---
title: '本地转换图片为avif格式'
published: 2026-04-30
description: '---'
draft: false
category: ['笔记']
tags: []
---
---
title: "本地转换图片为avif格式"
source: "https://blog.357561.xyz/posts/%E6%9C%AC%E5%9C%B0%E8%BD%AC%E6%8D%A2%E5%9B%BE%E7%89%87/"
author:
  - "woioeow @ woioeow's blog"
  - "woioeow A brief introduction"
published: 2026-02-27
created: 2026-04-30
description: ">需要先安装nodejs > >需要转换为其它格式可将`file.replace(/\.(jpg|jpeg|png)$/i, \".avif\")`的.avif改为相应格式 把所有需要转换为avif格式的图片，放在一个空目录中 格式化空目录 ```bash npm init -y ``` 进入目录，"
tags:
  - "clippings"
---
> 需要先安装nodejs
> 
> 需要转换为其它格式可将 `file.replace(/\.(jpg|jpeg|png)$/i, ".avif")` 的.avif改为相应格式

把所有需要转换为avif格式的图片，放在一个空目录中  
格式化空目录

```bash
npm init -y
```

进入目录，安装sharp
```bash
npm install sharp -g
```

把以下内容，粘贴至convert.js脚本中，将此脚本和需要转换的图片放至同一目录中
```bash
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = ".";
const outputDir = "./images";

// 创建输出目录（如果不存在）
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// 扫描当前目录
fs.readdirSync(inputDir).forEach(file => {
  // 忽略目录
  if (fs.statSync(file).isDirectory()) return;

  // 只处理 jpg/jpeg/png
  if (!file.match(/\.(jpg|jpeg|png)$/i)) return;

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(
    outputDir,
    file.replace(/\.(jpg|jpeg|png)$/i, ".avif")
  );

  sharp(inputPath)
    .avif({
      quality: 60,        // 推荐 40~60
      effort: 4           // 0~9，越大压缩越慢但体积更小
    })
    .toFile(outputPath)
    .then(info => {
      const originalSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(outputPath).size;
      const ratio = ((1 - newSize / originalSize) * 100).toFixed(1);

      console.log(`✔ ${file} → ${path.basename(outputPath)} | 压缩 ${ratio}%`);
    })
    .catch(err => {
      console.error(`✖ 处理失败: ${file}`, err.message);
    });
});
```
在这个目录的路径栏清空，输入cmd回车

执行命令，自动转换
```bash
node convert.js
```
