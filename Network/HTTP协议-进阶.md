# HTTP协议-进阶

## HTTP的实体数据-内容协商

> “多用途互联网邮件扩展”（Multipurpose Internet Mail Extensions），简称为 MIME。



###### `Content-Encoding` 就少了很多，常用的只有下面三种：

1. gzip：GNU zip 压缩格式，也是互联网上最流行的压缩格式；
2. deflate：zlib（deflate）压缩格式，流行程度仅次于 gzip；
3. br：一种专门为 HTTP 优化的新压缩算法（Brotli）。

###### `Accept` <=> `Content-Type`

Accept 是客户端可接受的MIME type，对应的是响应报文里 `Content-Type`。

`Content-type`：

1. text：文本格式的可读数据，text/html、text/plain、text/css
2. image：图像文件，image/gif、image/jpeg、image/png
3. audio/video：音频和视频数据，audio/mpeg、video/mp4
4. application：数据格式不固定，必须由上层应用程序来解释。application/json、application/javascript、application/pdf；application/octet-stream即不透明的二进制数据。



###### `Accept-Encoding` <=>`Content-Encoding`

`Accept-Encoding`: 该字段标记的是客户端支持的压缩格式

`Content-Encoding`:

1. gzip：GNU zip 压缩格式，也是互联网上最流行的压缩格式；
2. deflate：zlib（deflate）压缩格式，流行程度仅次于 gzip；
3. br：一种专门为 HTTP 优化的新压缩算法（Brotli）。



###### `Accept-Language` <=> `Content-Language`

对应客户端支持的语言和响应的语言类型：

`type-subtype`：en-US 美式英语、en-GB 英式英语、zh-CN 汉语



![](https://static001.geekbang.org/resource/image/b2/58/b2118315a977969ddfcc7ab9d26cb358.png)

> 1. 数据类型表示实体数据的内容是什么，使用的是 MIME type，相关的头字段是 Accept 和 Content-Type；
> 2. 数据编码表示实体数据的压缩方式，相关的头字段是 Accept-Encoding 和 Content-Encoding；
> 3. 语言类型表示实体数据的自然语言，相关的头字段是 Accept-Language 和 Content-Language；
> 4. 字符集表示实体数据的编码方式，相关的头字段是 Accept-Charset 和 Content-Type；
> 5. 客户端需要在请求头里使用 Accept 等头字段与服务器进行“内容协商”，要求服务器返回最合适的数据；
> 6. Accept 等头字段可以用“,”顺序列出多个可能的选项，还可以用“;q=”参数来精确指定权重。

---



## HTTP传输大文件的方法

#### 范围请求

“Transfer-Encoding: chunked”和“Content-Length”这两个字段是互斥的，也就是说响应报文里这两个字段不能同时出现，一个响应报文的传输要么是长度已知，要么是长度未知（chunked），这一点一定要记住。

###### `Transfer-Encoding: chunked` 分块传输的编码规则:

1. 每个分块包含两个部分，长度头和数据块；
2. 长度头是以 CRLF （回车换行，即\r\n）结尾的一行明文，用16进制数字表示长度；
3. 数据块紧跟在长度头后，最后也用CRLF结尾，但数据不包含CRLF；
4. 最后用一个长度为0的块表示结束，即“0\r\n\r\n”

![img](https://static001.geekbang.org/resource/image/25/10/25e7b09cf8cb4eaebba42b4598192410.png)

---

###### `Range ` <=>`Acceot-Range: bytes` & `Content-Range: bytes 0-31/96`

###### `Range`:

- "0-”表示从文档起点到文档终点，相当于“0-99”，即整个文件；
- “10-”是从第 10 个字节开始到文档末尾，相当于“10-99”；
- “-1”是文档的最后一个字节，相当于“99-99”；
- “-10”是从文档末尾倒数10个字节，相当于“90-99”。

**服务器对`Range`的处理**

1. 检查是否合法，是否在文件的范围内，如果越界返回状态码 416，表示“你的范围请求有误，我无法处理，请再检查一下”；
2. 如果范围正确，服务器返回对应范围内的数据，状态码是 `206 Partial Content` 表示只是原数据的一部分。
3. 服务器添加响应头字段 `Content-Range`，告诉片段的实际偏移量和资源的总大小；

请求：

```http
GET /16-2 HTTP/1.1
Host: www.chrono.com
Range: bytes=0-31
```

响应：

```http
HTTP/1.1 206 Partial Content
Content-Length: 32
Accept-Ranges: bytes
Content-Range: bytes 0-31/96

// this is a plain text json doc
```

---

#### 多段数据

###### `multipart/byteranges` 表示报文的body是由多段自己序列组成的，还需要配合 `boundary=xxx`给出段之间的分隔标记

![img](https://static001.geekbang.org/resource/image/ff/37/fffa3a65e367c496428f3c0c4dac8a37.png)

请求：

```http
GET /16-2 HTTP/1.1
Host: www.chrono.com
Range: bytes=0-9, 20-29
```

响应：

```http
HTTP/1.1 206 Partial Content
Content-Type: multipart/byteranges; boundary=00000000001
Content-Length: 189
Connection: keep-alive
Accept-Ranges: bytes


--00000000001
Content-Type: text/plain
Content-Range: bytes 0-9/96

// this is
--00000000001
Content-Type: text/plain
Content-Range: bytes 20-29/96

ext json d
--00000000001--
```



> 1. 压缩 HTML 等文本文件是传输大文件最基本的方法；
> 2. 分块传输可以流式收发数据，节约内存和带宽，使用响应头字段“Transfer-Encoding: chunked”来表示，分块的格式是 16 进制长度头 + 数据块；
> 3. 范围请求可以只获取部分数据，即“分块请求”，实现视频拖拽或者断点续传，使用请求头字段“Range”和响应头字段“Content-Range”，响应状态码必须是 206；
> 4. 也可以一次请求多个范围，这时候响应报文的数据类型是“multipart/byteranges”，body 里的多个部分会用 boundary 字符串分隔。

---



## HTTP的连接管理

##### **短连接**

因为客户端与服务器的整个连接过程很短暂，不会与服务器保持长时间的连接状态，所以就被称为“短连接”（short-lived connections）。早期的 HTTP 协议也被称为是“无连接”的协议。

**短连接的缺点**

TCP 建立连接要有“三次握手”，发送3个数据包，需要 1个RTT；关闭连接是“四次挥手，需要2个RTT。每次发送HTTP请求的时候都重新建立和关闭连接，这就带来了传输效率低的问题。

##### **长连接** `Connection: keep-alive`

针对短连接暴露出的缺点，HTTP 协议就提出了“长连接”的通信方式，也叫“持久连接”（persistent connections）、“连接保活”（keep alive）、“连接复用”（connection reuse）。

复用同一个连接来完成多次HTTP的请求。

**长连接的缺点**

服务器不会主动关闭对应的连接，需要客户端发送`Connection: close`字段，服务器在响应的时候也会加上对应的字段，然后就关闭TCP连接。

解决服务器不主动关闭的策略（Nginx）：

1. 使用`keepalive_timeout`指令，设置长连接的超市时间，如果在一段时间内连接上没有任何数据收发就主动断开连接，避免空闲连接占用系统资源。
2. 使用`keepalive_requests`指令，设置长连接上可发送的最大请求次数。比如设置成1000，那么当Nginx在这个连接上处理了1000个请求后，也会主动断开连接。

![短连接和长连接](https://static001.geekbang.org/resource/image/57/b4/57b3d80234a1f1b8c538a376aa01d3b4.png)

#### 队头阻塞（Head-of-line blocking）

队头阻塞是由HTTP基本的“请求-应答”模式所导致的。

因为HTTP规定报文必须是“一发一收”的形式，这就会形成一个先进先出的“串行”队列。队列里的请求没有轻重缓急的优先级，只有入队的先后顺序，排在最前面的请求被最优先处理。

![队头阻塞](https://static001.geekbang.org/resource/image/6a/72/6a6d30a89fb085d5f1773a887aaf5572.png)

解决方案：

1. **“并发连接”（concurrent connections）**，也就是同时对一个域名发起多个长连接，用数量来解决质量的问题。
2. **“域名分片”（domain sharding）**技术，还是用数量来解决质量的思路。

#### 小结

> 1. 早期的HTTP协议使用短连接，收到响应后就立即关闭连接，效率很低；
> 2. HTTP/1.1默认启用长连接，在一个连接上收发多个请求响应，提高了传输效率；
> 3. 服务器会发送“Connection: keep-alive"字段表示启用了长连接；
> 4. 报文头里如果有“Connection: close”就意味着长连接即将关闭；
> 5. 过多的长连接会占用服务器资源，所以俯卧起会用一些厕率有选择的关闭长连接；
> 6. “队头阻塞”问题会导致性能下降，可以用“并发连接”和“域名分片”技术缓解。

---



## HTTP的重定向和跳转

#### 重定向

需要在状态码为301（永久重定向）、302（临时重定向）的情况下，配合`location`字段才会起效，对于用户来说是无感知的，重定向的地址：有一个相对地址和一个绝对地址（URI），在`location`字段不完整的时候会自动计算对应的相对位置。

- 301：永久重定向
- 302：临时重定向
- 303：See other 要去重定向后的请求方法改为Get✔️方法，访问一个结果页面，避免 POST/PUT 重复操作；
- 304：Not Modified，未修改，使用已有的缓存；
- 307：与302类似，但重定向后请求里的方法和实体不允许变动，含义比302明确；
- 308：类似 307，不允许重定向后的请求变动，但是与301一样是永久重定向

第一个问题**性能损耗**：重定向会出现两个请求，除了304，对于服务器来说还是会增加一定的压力的，产生**性能损耗**的问题；

第二个问题循环跳转：浏览器能检查对应的循环跳转的现象；

> 1. 重定向是服务器发起的跳转，要求客户端改用新的URI重新发送请求，通常会自动进行，**用户是无感知的**；
> 2. 302/302是最常用的重定向状态码，分别是“永久重定向”和“临时重定向”；
> 3. 响应头字段Location只是了要跳转的URI，可以用绝对或相对的形式；
> 4. 重定向可以把一个URL指向另一个URI，也可以把多个URI指向同一个URI，用途很多；
> 5. 使用重定向时需要当心性能损耗，还要避免出循环跳转。

---



## HTTP的Cookie机制

#### `Cookie` <=> `Set-Cookie`

![img](https://static001.geekbang.org/resource/image/9f/a4/9f6cca61802d65d063e24aa9ca7c38a4.png)

###### Cookie属性

```http
HTTP/1.1 200
Set-Cookie: key=value, Max-Age=10; Expires=Fri, 08-Jun-22 08:19:00 GMT; Domain=www.example.com; Path=/; HttpOnly; SameSite=Strict;
```

`Expires`和`Max-Age`都能控制Cookie的有效期，但是浏览器会优先采用 Max-Age计算有效期；

###### `HttpOnly` => 防范XSS（跨站脚本）攻击

> 写过前端的同学一定知道，在 JS 脚本里可以用 document.cookie 来读写 Cookie 数据，这就带来了安全隐患，有可能会导致“跨站脚本”（XSS）攻击窃取数据。
>
> 属性“**HttpOnly**”会告诉浏览器，此 Cookie 只能通过浏览器 HTTP 协议传输，禁止其他方式访问，浏览器的 JS 引擎就会禁用 document.cookie 等一切相关的 API，脚本攻击也就无从谈起了。

###### `SameSite` => 防范XSRF（跨站请求伪造）攻击

1. `SameSite=Strict`：严格限制Cookie不能随着跳转链接跨站发送
2. `SameSite=Lax`：允许 GET/HEAD 等安全方法，但是禁止POST跨站发送

###### `Secure` 仅能使用HTTPS协议加密传输



> 1. `Cookie` 是服务器委托浏览器储存的一些数据，让服务器有了“记忆能力”；
> 2. 响应报文使用  `Set-Cookie` 字段发送“`key=value`”形式的`Cookie`值；
> 3. 请求报文里用 `Cookie` 字段发送多个 `Cookie` 值；
> 4. 为了保护 `Cookie`，还要给它设置有效期、作用域等属性，常用的有`Max-Age`、`Expires`、`Domain`、`HttpOnly`等；
> 5. Cookie最基本的用途是身份识别，实现有状态会话事务。
>
> *Cookie 并不属于 HTTP 标准（RFC6265，而不是 RFC2616/7230）*

---

## HTTP的缓存控制

#### HTTP缓存的分类：

###### 私有浏览器缓存（Private browser caches）

这是在客户端浏览器才能缓存的资源；对应的是头字段中的private

###### 共享代理缓存（Shared proxy caches）

保存的资源是为了重复使用的缓存；主要是在代理服务器上，对应是头字段中的public

#### 如何触发HTTP的缓存

- 状态为200 的GET响应，例如HTML文件；
- 永久重定向的响应：301；
- 错误响应：404；
- 不完全的响应：206（Partial Content）；
- 其他定义需要缓存的资源；

### 服务器的缓存控制

```http
HTTP/1.1 200
Cache-Control: max-age=30, no-store, no-cache, must-revalidate, proxy-revalidate, public
```

`max-age`：用于控制HTTP缓存，相对于服务器的响应时间；

`public/private`：public在代理服务器和中间节点都能缓存，但是private只有在目标客户端可以缓存；

`no-store`：<u>**不允许缓存**</u>，用于变化非常频繁的数据，例如秒杀页面；

`no-cache`：<u>**可以缓存**</u>，但在使用之前要去服务器验证是否过期，是否有最新的版本；

`must-revalidate`：如果缓存不过期就可以继续使用，但过期了还想使用需要找服务器验证；

`proxy-revalidate`：与must-revalidate类似，但是只有公共资源可以在代理服务器缓存，仅限public的配置的资源；

![img](https://static001.geekbang.org/resource/image/1b/99/1b4f48bc0d8fb9a08b45d1f0deac8a99.png)



### 客户端的缓存控制

第二次访问同一个页面的时候，就会触发浏览器的缓存；

> Ctrl+F5 的“强制刷新”，其实是浏览器想服务器发送了一个`Cache-Control: no-cache`的请求，更新本地的资源，其含义与`max-age=0`是基本一样的。

浏览器访问一个页面的时候，先是通过对应的DNS查找对应的服务器地址，然后查找缓存中是否存在对应的资源，如果有就访问缓存，这个时候对缓存资源进行验证，如果过期就会去服务器拿最新的资源，否则就是返回缓存中的资源。

### 条件请求

```http
If-Modified-Since: Mon, 27 Jul 2020 10:53:40 GMT
If-None-Match: W/"5f1eb234-b7e"
```

条件请求的两个字段需要配合`ETag`和`Last-modified`才能起效，在第一次请求的时候，服务器返回上面两个字段；再次请求资源的时候，浏览器会带上这两个资源，使用`If-modified-since`和`If-none-Match`来验证资源十分过期。如果服务器返回 304 则读取浏览器的缓存文件。

**强、弱 ETag**

强 ETage 要求资源在字节级别必须完全相符，弱 ETag 在值前面有一个 `W/` 标记，只要求资源在语义上没有变化，但内部可能会有部分发生了改变。

> 1. 缓存是优化系统性能的重要手段，HTTP 传输的每一个环节中都可以有缓存；
> 2. 服务器使用“Cache-Control”设置缓存策略，常用的是“max-age”，表示资源的有效期；浏览器收到数据就会存入缓存，如果没过期就可以直接使用，过期就要去服务器验证是否仍然可用；
> 3. 验证资源是否失效需要使用“条件请求”，常用的是“if-Modified-Since”和“If-None-Match”，收到 304 就可以复用缓存里的资源；
> 4. 验证资源是否被修改的条件有两个：“Last-modified”和“ETag”，需要服务器预先在响应报文里设置，搭配条件请求使用；
> 5. 浏览器也可以发送“Cache-Control”字段，使用“max-age=0”或“no_cache”刷新数据。

---

## HTTP的代理服务

代理的功能：

负载均衡是最近基本的功能

- 健康检查：使用“心跳”等机制监控后端服务器，发现有故障就及时“踢出”集群，保证服务高可用；
- 安全防护：保护被代理的后端服务器，限制 IP 地址或流量，抵御网络攻击和过载；
- 加密卸载：对外网使用 SSL/TLS 加密通信认证，而在安全的内网不加密，消除加解密成本；
- 数据过滤：拦截上下行的数据，任意指定策略修改请求或者响应；
- 内容缓存：暂存、复用服务器响应，这个与第 20 讲密切相关，我们稍后再说。

###### 代理服务器的头字段`Via`

经过代理服务器的资源会在Via字段中添加代理服务器的身份信息，是一个链表。

> 1. HTTP 代理就是客户端和服务器通信链路中的一个中间环节，为两端提供“代理服务”；
> 2. 代理处于中间层，为 HTTP 处理增加了更多的灵活性，可以实现负载均衡、安全防护、数据过滤等功能；
> 3. 代理服务器需要使用字段“Via”标记自己的身份，多个代理会形成一个列表；
> 4. 如果想要知道客户端的真实 IP 地址，可以使用字段“X-Forwarded-For”和“X-Real-IP”；
> 5. 专门的“代理协议”可以在不改动原始报文的情况下传递客户端的真实 IP。

---

## HTTP的缓存代理

### 源服务器的缓存控制

“private”表示缓存只能在客户端保存，是用户“私有”的，不能放在代理上与别人共享。而“public”的意思就是缓存完全开放，谁都可以存，谁都可以用。

“proxy-revalidate”只要求代理的缓存过期后必须验证，客户端不必回源，只验证到代理这个环节就行了。

“s-maxage”（s 是 share 的意思，注意 maxage 中间没有“-”），只限定在代理上能够存多久，而客户端仍然使用“max-age”。

“no-transform”。代理有时候会对缓存下来的数据做一些优化，比如把图片生成 png、webp 等几种格式，方便今后的请求处理，而“no-transform”就会禁止这样做，不许“偷偷摸摸搞小动作”。

![img](https://static001.geekbang.org/resource/image/09/35/09266657fa61d0d1a720ae3360fe9535.png)



### 客户端的缓存控制

![img](https://static001.geekbang.org/resource/image/47/92/47c1a69c800439e478c7a4ed40b8b992.png)

---

参考资料：

#### 极客时间《透视 HTTP 协议》

[MDN-HTTP-Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)

