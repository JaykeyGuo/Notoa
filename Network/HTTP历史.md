# HTTP历史-进化过程

## 0

1989年 Tim Berners-Lee 蒂姆 · 伯纳斯-李在其提案中确立了：

1. HTML：超文本标记语言
2. HTTP：超文本传输协议
3. WWW：互联网
4. A server to give access to the document, an early version of *httpd*.



## HTTP 0.9

在 Tim Berners-Lee 的提案中出现的仅有一行的协议 ：

> HTTP/0.9 is extremely simple: requests consist of a single line and start with the only possible method [`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) followed by the path to the resource (not the URL as both the protocol, server, and port are unnecessary once connected to the server).

这个版本的 HTTP 只允许 Get✔️ 方法。

---

## HTTP 1.0

1996年11月正式发布，RFC1945

1. 增加 HEAD、POST等新方法；
2. 增加响应状态码，标记可能的错误原因；`Status Line`
3. 引入了协议版本号概念；`Version: HTTP/1.0`
4. 引入了HTTP Header 的概念，让HTTP处理请求和响应更加灵活；
5. 传输的数据不再限于文本；`Content-Type`

此时的HTTP/1.0 还只是一份参考文档，不是正式标准

---

## HTTP 1.1

> HTTP/1.1 was first published as [RFC 2068](https://tools.ietf.org/html/rfc2068) in January 1997.

1999年 HTTP/1.1 发布RFC文档 2616，在HTTP/2.0发布之前被拆分成了RFC7230-RFC7235

1. 增加了PUT、DELETE 等新的方法；
2. 增加了缓存管理和控制；
3. 明确了连接管理，允许持续连接；
4. 允许响应数据分块（chunked），利于传输大文件；
5. 强制要求 Host 头，让互联网主机托管成为可能；

#### HTTP/1.1 优缺点

1. HTTP 最大的优点是**简单、灵活和易于扩展**；
2. HTTP 拥有**成熟的软硬件环境**，应用的非常广泛，是互联网的基础设施；
3. HTTP 是**无状态的**，可以轻松实现集群化，扩展性能，但有时也需要用 **Cookie 技术来实现“有状态”**；
4. HTTP 是**明文传输**，数据完全肉眼可见，能够方便地研究分析，但也**容易被窃听**；
5. HTTP 是**不安全的**，无法验证通信双方的身份，也不能判断报文是否被窜改；
6. HTTP 的**性能不算差**，但不完全适应现在的互联网，还有很大的提升空间。

---

## HTTP 2

2015年 RFC-7540，起初叫做 SPDY 协议

1. 二进制协议，不再是纯文本；
2. 可发起多个请求，废弃了 1.1 里的管道（多路复用）；
3. 使用专用算法压缩头部，减少数据传输量（HPACK）；
4. 允许**服务器**主动想客户端**推送**数据；
5. 增强了安全性，事实上 要求加密通信。

面临的问题：主要市场还是在1.1的时代，普及率比较低。

---

## HTTP 3

目前还没正式发布，是有Google发起的心协议，叫做QUIC 协议，在2018年，互联网标准化组织 IETF 将 HTTP over QUIC 改名为 HTTP 3.

---

> HTTP 是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范

---

参考资料:

1. [Information Management: A Proposal](https://www.w3.org/History/1989/proposal.html)
2. [Evolution of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)