---
title: 'Fail2ban防护'
published: 2026-06-24
description: 'sudo apt install -y fail2ban'
draft: false
category: ['笔记']
tags: []
---
# Fail2ban防护

```bash
sudo apt install -y fail2ban
```

写配置

```bash
sudo tee /etc/fail2ban/jail.d/sshd.local > /dev/null <<'EOF'
[DEFAULT]
bantime = 1d
findtime = 10m
maxretry = 5
banaction = nftables

[sshd]
enabled = true
backend = systemd
port = 22
EOF
```

启用并检查

```bash
sudo systemctl enable --now fail2ban
sudo fail2ban-client status
sudo fail2ban-client status sshd
```
