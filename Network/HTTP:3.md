# HTTP/3

![img](https://static001.geekbang.org/resource/image/d2/03/d263202e431c84db0fd6c7e6b1980f03.png)

解决TCP层的“队头阻塞”问题。



> 1. HTTP/3 基于 QUIC 协议，完全解决了“队头阻塞”问题，弱网环境下的表现会优于 HTTP/2；
> 2. QUIC 是一个新的传输层协议，建立在 UDP 之上，实现了可靠传输；
> 3. QUIC 内含了 TLS1.3，只能加密通信，支持 0-RTT 快速建连；
> 4. QUIC 的连接使用“不透明”的连接 ID，不绑定在“IP 地址 + 端口”上，支持“连接迁移”；
> 5. QUIC 的流与 HTTP/2 的流很相似，但分为双向流和单向流；
> 6. HTTP/3 没有指定默认端口号，需要用 HTTP/2 的扩展帧“Alt-Svc”来发现。