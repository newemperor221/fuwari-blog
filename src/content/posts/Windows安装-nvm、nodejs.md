---
title: '安装nvm'
published: 2026-04-29
description: '先安装Scoop'
draft: false
category: ['笔记']
tags: []
---
## 安装nvm
> 先[安装Scoop](/安装Scoop/)
> nvm是nodejs管理器，可安装多个nodejs版本随意切换
```bash
scoop install nvm
```
## 安装nodejs

```bash
# 安装nodejs 22.2.2版本
nvm install 22.2.2
# 使用22.2.2版本
nvm use 22.2.2
# 查看安装的nodejs版本
nvm list
```
## 使用nrm管理npm镜像源
```bash
# 安装nrm
npm install -g nrm
# 镜像源测速
nrm test
# 使用淘宝镜像源
nrm use taobao
```
## npm 使用
```bash
# 全局安装应用
npm install -g [应用]
# 项目中安装应用
npm install [应用]
#卸载应用
npm uninstall [应用]
```
