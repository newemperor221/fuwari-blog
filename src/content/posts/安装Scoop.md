---
title: '安装scoop'
published: 2026-06-24
description: 'scoop 官方站'
draft: false
category: ['笔记']
tags: []
---
## 安装scoop
> [scoop 官方站](https://github.com/ScoopInstaller/Scoop)
> scoop 部分教程来自 [scoop 国内镜像站](https://scoop.201704.xyz)
```
Set-ExecutionPolicy RemoteSigned -scope CurrentUser -Force

# 默认安装
iwr -useb scoop.201704.xyz | iex
# 自定义安装目录
irm scoop.201704.xyz -outfile 'install.ps1'
.\install.ps1 -ScoopDir 'D:\Scoop\Scoop' -ScoopGlobalDir 'D:\Scoop\GlobalScoopApps'
```
## 安装应用
```bash
# scoop首次安装会提示安装git
scoop install git
# 
scoop install aria2 
scoop config aria2-warning-enabled false可抑制警告
```
> `scoop uninstall `卸载应用
## 代理
> 魔法设置全局代理
```test
# 添加代理
scoop config proxy 127.0.0.1:7890

# 删除代理
scoop config rm proxy
```
## 查看或添加bucket
> bucket是scoop的软件仓库

可使用以下命令查看已安装bucket或安装第三方bucket
```test
# 查看已知bucket
scoop bucket known

# 添加需要的bucket
scoop bucket add extras
```

更多第三方bucket访问[镜像站](https://gitee.com/scoop-installer)
