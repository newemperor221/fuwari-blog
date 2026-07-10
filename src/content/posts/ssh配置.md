---
title: '新建普通用户'
published: 2026-06-24
description: 'useradd -m -s /usr/bin/bash woioeow'
draft: false
category: ['笔记']
tags: []
---
# SSH配置

## 新建普通用户并赋予sudo权限

### 新建普通用户

```bash
useradd -m -s /usr/bin/bash woioeow
```

### 修改密码

```bash
passwd woioeow
```

### 给普通用户赋予sudo权限

```
sudo apt update && sudo apt install vim sudo -y
```

给`/etc/sudoers`文件加上以下参数

```bash
woioeow	ALL=(ALL:ALL)	ALL
```

`:x!`保存退出

### 设置公钥认证

在本地电脑上的用户目录新建.ssh目录，再执行以下命令

```bash
ssh-keygen -t ed25519 -C "ssh_key"
```

回车三次

把`id_ed25519.pub`上传到服务器的`~/.ssh/`，重命名为`authorized_keys`

设置文件权限

```bash
chmod 600 ~/.ssh/authorized_keys
```

## 修改ssh配置文件

```bash
sudo vim /etc/ssh/sshd_config
```

修改以下参数

```bash
Port 48256
PermitRootLogin no 
PasswordAuthentication no
PubkeyAuthentication yes
AddressFamily inet
KbdInteractiveAuthentication no
```

重启ssh

```bash
sudo systemctl restart ssh
```
