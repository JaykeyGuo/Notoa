# HTTP协议-进阶

## HTTP的实体数据

> “多用途互联网邮件扩展”（Multipurpose Internet Mail Extensions），简称为 MIME。

> Encoding type 就少了很多，常用的只有下面三种：
>
> 1. gzip：GNU zip 压缩格式，也是互联网上最流行的压缩格式；
> 2. deflate：zlib（deflate）压缩格式，流行程度仅次于 gzip；
> 3. br：一种专门为 HTTP 优化的新压缩算法（Brotli）。

![](https://static001.geekbang.org/resource/image/b2/58/b2118315a977969ddfcc7ab9d26cb358.png)

> 1. 数据类型表示实体数据的内容是什么，使用的是 MIME type，相关的头字段是 Accept 和 Content-Type；
> 2. 数据编码表示实体数据的压缩方式，相关的头字段是 Accept-Encoding 和 Content-Encoding；
> 3. 语言类型表示实体数据的自然语言，相关的头字段是 Accept-Language 和 Content-Language；
> 4. 字符集表示实体数据的编码方式，相关的头字段是 Accept-Charset 和 Content-Type；
> 5. 客户端需要在请求头里使用 Accept 等头字段与服务器进行“内容协商”，要求服务器返回最合适的数据；
> 6. Accept 等头字段可以用“,”顺序列出多个可能的选项，还可以用“;q=”参数来精确指定权重。

---



## HTTP传输大文件的方法

> “Transfer-Encoding: chunked”和“Content-Length”这两个字段是互斥的，也就是说响应报文里这两个字段不能同时出现，一个响应报文的传输要么是长度已知，要么是长度未知（chunked），这一点你一定要记住。

> 1. 压缩 HTML 等文本文件是传输大文件最基本的方法；
> 2. 分块传输可以流式收发数据，节约内存和带宽，使用响应头字段“Transfer-Encoding: chunked”来表示，分块的格式是 16 进制长度头 + 数据块；
> 3. 范围请求可以只获取部分数据，即“分块请求”，实现视频拖拽或者断点续传，使用请求头字段“Range”和响应头字段“Content-Range”，响应状态码必须是 206；
> 4. 也可以一次请求多个范围，这时候响应报文的数据类型是“multipart/byteranges”，body 里的多个部分会用 boundary 字符串分隔。

---



## HTTP的连接管理

> **短连接**
>
> 因为客户端与服务器的整个连接过程很短暂，不会与服务器保持长时间的连接状态，所以就被称为“短连接”（short-lived connections）。早期的 HTTP 协议也被称为是“无连接”的协议。
>
> **长连接**
>
> 针对短连接暴露出的缺点，HTTP 协议就提出了“长连接”的通信方式，也叫“持久连接”（persistent connections）、“连接保活”（keep alive）、“连接复用”（connection reuse）。

![短连接和长连接](https://static001.geekbang.org/resource/image/57/b4/57b3d80234a1f1b8c538a376aa01d3b4.png)

#### 队头阻塞（Head-of-line blocking）

队头阻塞是由HTTP基本的“请求-应答”模式所导致的。

因为HTTP规定报文必须是“一发一收”的形式，这就会形成一个先进先出的“串行”队列。队列里的请求没有轻重缓急的优先级，只有入队的先后顺序，排在最前面的请求被最优先处理。

![队头阻塞](https://static001.geekbang.org/resource/image/6a/72/6a6d30a89fb085d5f1773a887aaf5572.png)

解决方案：

1. **“并发连接”（concurrent connections）**，也就是同时对一个域名发起多个长连接，用数量来解决质量的问题。
2. **“域名分片”（domain sharding）**技术，还是用数量来解决质量的思路。

> 1. 早期的HTTP协议使用短连接，收到响应后就立即关闭连接，效率很低；
> 2. HTTP/1.1默认启用长连接，在一个连接上收发多个请求响应，提高了传输效率；
> 3. 服务器会发送“Connection: keep-alive"字段表示启用了长连接；
> 4. 报文头里如果有“Connection: close”就意味着长连接即将关闭；
> 5. 过多的长连接会占用服务器资源，所以俯卧起会用一些厕率有选择的关闭长连接；
> 6. “队头阻塞”问题会导致性能下降，可以用“并发连接”和“域名分片”技术缓解。

---



## HTTP的重定向和跳转

> 1. 重定向是服务器发起的跳转，要求客户端改用新的URI重新发送请求，通常会自动进行，**用户是无感知的**；
> 2. 302/302是最常用的重定向状态码，分别是“永久重定向”和“临时重定向”；
> 3. 响应头字段Location只是了要跳转的URI，可以用绝对或相对的形式；
> 4. 重定向可以把一个URL指向另一个URI，也可以把多个URI指向同一个URI，用途很多；
> 5. 使用重定向时需要当心性能损耗，还要避免出循环跳转。

---



## HTTP的Cookie机制

> Expires 和 Max-Age 可以同时出现，两者的失效时间可以一致，也可以不一致，但浏览器会优先采用 Max-Age 计算失效期。
>
> ---
>
> 写过前端的同学一定知道，在 JS 脚本里可以用 document.cookie 来读写 Cookie 数据，这就带来了安全隐患，有可能会导致“跨站脚本”（XSS）攻击窃取数据。
>
> 属性“HttpOnly”会告诉浏览器，此 Cookie 只能通过浏览器 HTTP 协议传输，禁止其他方式访问，浏览器的 JS 引擎就会禁用 document.cookie 等一切相关的 API，脚本攻击也就无从谈起了。
>
> ---
>
> 1. Cookie是服务器委托浏览器储存的一些数据，让服务器有了“记忆能力”；
> 2. 响应报文使用 Set-Cookie字段发送“key=value”形式的Cookie值；
> 3. 请求报文里用Cookie字段发送多个Cookie值；
> 4. 为了保护Cookie，还要给它设置有效期、作用域等属性，常用的有Max-Age、Expires、Domain、HttpOnly等；
> 5. Cookie最基本的用途是身份识别，实现有状态会话事务。
>
> *Cookie 并不属于 HTTP 标准（RFC6265，而不是 RFC2616/7230）*

