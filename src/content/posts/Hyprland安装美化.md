---
title: 'Hyprland安装美化'
published: 2026-04-30
description: 'Archlinux安装'
draft: false
category: ['笔记']
tags: []
---
> [Archlinux安装](/Archlinux安装/)
## Hyprland安装
```bash
git clone --depth=1 https://github.com/JaKooLit/Arch-Hyprland.git
cd Arch-Hyprland
chmod +x install.sh
./install.sh
```

安装过程需要全程联网并且建议挑网络好的时候安装如果安装过程中经常有软件下载失败可以先把最后的标记失败的软件安装上，再配置好 npm 和 github ssh 下载方式，再进行下载

安装一些娱乐软件

```bash
paru -S google-chrome # 安装 chrome 浏览器
paru -S baidunetdisk-bin # 安装百度网盘
paru -S nerd-fonts # 安装 nerd-fonts 字体
paru -S linuxqq wechat # qq 和微信
paru bilibili # 选择 1
```

安装中文字体

```bash
sudo pacman -Sy adobe-source-han-sans-cn-fonts \
adobe-source-han-serif-cn-fonts noto-fonts-cjk \
wqy-microhei wqy-microhei wqy-microhei-lite \
wqy-bitmapfont ttf-arphic-ukai ttf-arphic-uming
```

## oh-my-zsh

如果安装完毕，终端没有 ohmyzsh 美化，可以自己尝试安装

```bash
git clone --depth=1 https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh

cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc

# 主题 powerlevel10k
git clone --depth=1 https://gitee.com/romkatv/powerlevel10k.git \
${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
# 高亮
git clone --depth=1 https://github.com/zsh-users/zsh-syntax-highlighting.git \
${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# 自动补全
git clone --depth=1 https://github.com/zsh-users/zsh-autosuggestions \
${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# 进入. zshrc 文件
# 找到 ZSH_THEME，把值改为 "powerlevel10k/powerlevel10k"
# 找到 plugins=(git)，在 git 后面添加 zsh-autosuggestions zsh-syntax-highlighting
```

## LazyVim

保证装有 neovim 和 git

```bash
sudo pacman -Sy neovim
git clone --depth=1 https://github.com/LazyVim/starter ~/.config/nvim
rm -rf ~/.config/nvim/.git
nvim # 启动 nvim，安装插件
# 在~/.zshrc 文件中添加
alias vim='nvim' # 需要先将 vim 删掉，如果出现有 vim 但是 pacman 找不到，可以先安装，再删除
```

## 电池管理

```bash
sudo pacman -S tlp
paru -S tlpui-git # 如果出现 git 仓库克隆失败可以先执行下行注释 git 命令克隆下来, 再安装
# git clone https://github.com/linrunner/TLP.git
paru -S tlp-rdw
paru -S tp_smapi-lts tp_smapi
sudo systemctl enable tlp.service
sudo systemctl start tlp.service
sudo systemctl enable NetworkManager-dispatcher.service
sudo systemctl start NetworkManager-dispatcher.service
sudo systemctl mask systemd-rfkill.socket systemd-rfkill.service
```

## 风扇控制

```bash
paru -S nbfc-linux-git
```
## ufw 防火墙

```bash
sudo pacman -S ufw
systemctl enable ufw
systemctl start ufw

# 操作

sudo ufw allow 3389/tcp
sudo ufw allow 3389/udp
sudo ufw reset
sudo ufw status
sudo ufw default deny
```

## 安装 VSCode

在 [VSCode 下载链接](https://code.visualstudio.com/Download) 下载. tar.gz 包

把安装包 `tar -zxvf 安装包. tar.gz` 解压，放在 / opt / 目录下

使用 ln 命令创建软件链接 `ln -s /opt/code-stable-x64-1731511985 /opt/vscode`

创建 `vscode.desktop` 文件 (快捷方式)[链接](about:blank)

```bash
[Desktop Entry]
Type=Application
Name=Visual Studio Code
Exec=/opt/vscode/code
Icon=/opt/vscode/resources/app/resources/linux/code.png
Comment=Visual Studio Code
Terminal=false
```

把文件放在 `/usr/share/applications/` 目录下
