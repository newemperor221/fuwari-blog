---
title: 'Nftables防火墙配置'
published: 2026-06-24
description: 'sudo apt update && sudo apt install -y nftables'
draft: false
category: ['笔记']
tags: []
---
# Nftables防火墙配置

```bash
sudo apt update && sudo apt install -y nftables
```

写配置

```bash
sudo tee /etc/nftables.conf > /dev/null <<'EOF'
#!/usr/sbin/nft -f

flush ruleset

table ip filter {
    chain input {
        type filter hook input priority filter; policy drop;

        iifname "lo" accept

        ct state established,related accept

        ct state invalid drop

        icmp type {
            destination-unreachable,
            time-exceeded,
            parameter-problem
        } accept

        tcp dport 48256 ct state new accept

        counter drop
    }

    chain forward {
        type filter hook forward priority filter; policy drop;
    }

    chain output {
        type filter hook output priority filter; policy accept;
    }
}
EOF
```

检查并加载

```bash
sudo nft -c -f /etc/nftables.conf && sudo nft -f /etc/nftables.conf
sudo systemctl enable --now nftables
```
