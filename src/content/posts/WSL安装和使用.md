---
title: 'WSL安装和使用'
published: 2026-06-24
description: '---'
draft: false
category: ['笔记']
tags: []
---
---
title: "WSL安装和使用"
source: "https://blog.357561.xyz/posts/wsl%E5%AE%89%E8%A3%85%E5%92%8C%E4%BD%BF%E7%94%A8/"
author:
  - "woioeow @ woioeow's blog"
  - "woioeow A brief introduction"
published: 2026-03-14
created: 2026-04-30
description: "> 安装的是Debian系统 ## 安装WSL PowerShell右击以管理员身份运行 使用以下命令安装wsl ```bash wsl --install ``` ## 安装linux系统版本 打开Microsoft Store搜Debian，下载 ## 迁移系统 > 在D盘新建一"
tags:
  - "clippings"
---
> 安装的是Debian系统

## 安装WSL

PowerShell右击以管理员身份运行

使用以下命令安装wsl

```bash
wsl --install
```

## 安装linux系统版本

打开Microsoft Store搜Debian，下载

## xxxxxxxxxx # 全局安装应用npm install -g [应用]# 项目中安装应用npm install [应用]#卸载应用npm uninstall [应用]bash

> 在D盘新建一个名叫WSL的空目录

```bash
# 关闭所有系统版本
wsl --shutdown

# 查看系统版本
wsl -l -v

# 打包系统
wsl --export Debian D:\WSL\wsl-export.tar

# 注销原系统
wsl --unregister Debian

# 把打包的系统文件恢复到D盘WSL目录里
wsl --import Debian D:\WSL\Debian D:\WSL\wsl-export.tar --version 2

# 启动系统
wsl -d Debian
```

> 然后可以把wsl-export.tar文件删掉了

## 修改默认用户

> 打开WSL系统会提示新建用户和输入密码
> 
> 这里会把普通用户作为默认用户
> 
> 无需在sudoers文件里添加内容

```bash
Debian.exe config --default-user woioeow
```
## 修改软件源

> 找到系统的 `/etc/apt/sources.list` 文件

把 [中科大软件源](https://mirrors.ustc.edu.cn/help) 的Debian和Debian Security粘贴进去

执行 `sudo apt-get update && sudo apt-get upgrade -y` 更新
