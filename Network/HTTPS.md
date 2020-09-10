# HTTPS

HTTP是以明文传输的，在传输过程中，如果在链路中被拦截和修改，都会暴露信息，不安全。

## 什么是安全？

> 机密性、完整性、身份认证、不可否认
> - **机密性（Secrecy/Confidentiality）**是指对数据的“保密”，只能由可信的人访问，对其他人是不可见的“秘密”，简单来说就是不能让不相关的人看到不该看的东西。
> - **完整性（Integrity，也叫一致性）**是指数据在传输过程中没有被篡改，不多也不少，“完完整整”地保持着原状。
> - **身份认证（Authentication）**是指确认对方的真实身份，也就是“证明你真的是你”，保证消息只能发送给可信的人。
> - **不可否认（Non-repudiation/Undeniable）**，也叫不可抵赖，意思是不能否认已经发生过的行为，不能“说话不算数”“耍赖皮”。
>

##HTTP over SSL/TLS

![img](https://static001.geekbang.org/resource/image/50/a3/50d57e18813e18270747806d5d73f0a3.png)

HTTPS就是基于SSL/TLS协议之上的HTTP协议。关键是在下层的SSL/TLS协议。

### SSL/TLS

> SSL 即安全套接层（Secure Sockets Layer），在 OSI 模型中处于第 5 层（会话层），由网景公司于 1994 年发明，有 v2 和 v3 两个版本，而 v1 因为有严重的缺陷从未公开过。
>
> 互联网工程组 IETF 在 1999 年把它改名为 TLS（传输层安全，Transport Layer Security）

### OpenSSL

> OpenSSL是一个著名的开源密码学程序库和工具包，几乎支持所有公开的加密算法和协议，已经成为了事实上的标准，许多应用软件都会使用它作为底层库来实现 TLS 功能。

---

> HTTP 默认端口是80
>
> HTTPS 默认端口是 443

---

## 加密

### 对称加密

使用同一个密钥对数据进行加解密；AES（Advanced Encryption Standard）是常用的对称加密。

### 非对称加密

公钥加密，私钥解密；两个密钥是不同的。公钥加密只能用私钥解密，反过来，私钥加密也只能使用公钥解密。

TLS里有DH、DSA、RSA、ECC等算法。

> RSA：基于“基数分解”的数学难题。
>
> ECC：基于“椭圆曲线离散对数”的数学难题。

### 混合加密

非对称加密由于基于的数学难题，带来了运算速度慢的问题。

TLS中的混合加密方式：

1. 在通信刚开始的时候使用非对称算法，比如 RSA、ECDHE，首先解决密钥交换的问题。
2. 然后用随机数产生对称算法使用的“会话密钥”（session key），再用公钥加密。因为会话密钥很短，通常只有 16 字节或 32 字节，所以慢一点也无所谓。
3. 对方拿到密文后用私钥解密，取出会话密钥。这样，双方就实现了对称密钥的安全交换，后续就不再使用非对称加密，全都使用对称加密。

---



## 摘要算法

> 摘要算法（Digest Algorithm）是常说的散列函数、哈希函数（Hash Function）。

![img](https://static001.geekbang.org/resource/image/c2/96/c2e10e9afa1393281b5633b1648f2696.png)

摘要算法主要是处理服务器验证用户的过程，通过对发送的信息做同样的摘要对比，来确实收到的信息的完整性和可信度。

通过其他的加密方式对摘要进行加密，这样就不会在黑客截取之后伪造用户的情况发生。



### 数字签名

数字签名的原理就是把公私钥反过来用，私钥加密、公钥解密。

数字签名只是加密原文摘要的部分，这样可以提升效率。

签名和公钥是完全公开的，只有拿到私钥的应用才能解开，拿到摘要，再和原文验证原文的完整性。

> ![img](https://static001.geekbang.org/resource/image/84/d2/84a79826588ca35bf6ddcade027597d2.png)
>
> 1. 签名：先对原文做摘要算法得到摘要，再通过私钥加密得到数字签名。
> 2. 验签：对得到的数字签名用公钥解密，再用解密之和的摘要和原文生成的摘要做对比。
>
> 这样就能实现身份认证和不可否认。



### 数字签名和CA

CA解决的是**公钥的信任**问题，CA是证书认证机构（Certificate Authority）

> CA 对公钥的签名认证也是有格式的，不是简单地把公钥绑定在持有者身份上就完事了，还要包含序列号、用途、颁发者、有效时间等等，把这些打成一个包再签名，完整地证明公钥关联的各种信息，形成“数字证书”（Certificate）。

小的CA证书可以找更大的CA给自己背书，但是Root CA只能自己证明自己，如果不信任Root

CA 则整个信任链条都不存在。

###### 弱点：

1. 如果 CA 失误或者被欺骗，签发了错误的证书，虽然证书是真的，可它代表的网站却是假的。
2. 如果有人伪造CA证书，或者是CA证书有恶意，那该CA下的整个信任链都失效了。

弱点的解决方法：

1. 通过CRL（证书吊销列表，Certificate revocation list）和 OCSP（在线证书状态协议，Online Certificate Status Protocol），及时废止有问题的证书。
2. 讲对应的CA证书拉入黑名单，不再信任。



> 1. 摘要算法用来实现完整性，能够为数据生成独一无二的“指纹”，常用的算法是 SHA-2；
> 2. 数字签名是私钥对摘要的加密，可以由公钥解密后验证，实现身份认证和不可否认；
> 3. 公钥的分发需要使用数字证书，必须由 CA 的信任链来验证，否则就是不可信的；
> 4. 作为信任链的源头 CA 有时也会不可信，解决办法有 CRL、OCSP，还有终止信任。

---

## HTTPS

### TLS 1.2

#### TLS 1.2协议

1. 记录协议-Record Protocol
2. 警报协议-Alert Protocol
3. 握手协议-Handshake Protocol
4. 变更密码规范协议-Change Cipher Spec Protocol

![img](https://static001.geekbang.org/resource/image/69/6c/69493b53f1b1d540acf886ebf021a26c.png)

#### ECDHE 握手过程

![img](https://static001.geekbang.org/resource/image/9c/1e/9caba6d4b527052bbe7168ed4013011e.png)

![image-20200819120234301](https://tva1.sinaimg.cn/large/007S8ZIlly1ghvzlrju1fj30us0fzwmf.jpg)

在 Client Hello的阶段，客户端会返回支持的密码套件。



> 1. HTTPS 协议会先与服务器执行 TCP 握手，然后执行 TLS 握手，才能建立安全连接；
> 2. 握手的目标是安全地交换对称密钥，需要三个随机数，第三个随机数“Pre-Master”必须加密传输，绝对不能让黑客破解；
> 3. “Hello”消息交换随机数，“Key Exchange”消息交换“Pre-Master”；
> 4. “Change Cipher Spec”之前传输的都是明文，之后都是对称密钥加密的密文。

### TLS 1.3

TLS 1.2 发布于2008年，TLS1.3发布于2018年。

添加协议：扩展协议-Extension Protocol，实现向后兼容。

新的协议都是以Extension的字段体现的，这样可以兼容老协议。

###### TLS 1.3支持的密码套件

| 密码套件名                   | 代码        |
| ---------------------------- | ----------- |
| TLS_AES_128_GCM_SHA256       | {0x13,0x01} |
| TLS_AES_256_GCM_SHA384       | {0x13,0x02} |
| TLS_CHACHA20_POLY1305_SHA256 | {0x13,0x02} |
| TLS_AES_128_CCM_SHA256       | {0x13,0x04} |
| TLS_AES_128_CCM_8_SHA256     | {0x13,0x05} |

废除RSA和DH密钥交换算法的原因是这两个算法不具有“前向安全”，如果某一天密钥被破解，那以前所有的密文都能被破解。



#### 提升性能

![img](https://static001.geekbang.org/resource/image/4d/b0/4d1df4d07dbb1c2500fc4ea69ecf7ab0.png)

<与TLS1.2对比>发现服务端更换密钥交换算法的部分被放在了ServerHello中，这样就减少了一次通信的过程，可以直接开始数据传输。



#### 握手过程

![img](https://static001.geekbang.org/resource/image/7a/db/7a2bc39fdbb421cf72a01e887e9156db.png)

> 1. 为了兼容 1.1、1.2 等“老”协议，TLS1.3 会“伪装”成 TLS1.2，新特性在“扩展”里实现；
> 2. 1.1、1.2 在实践中发现了很多安全隐患，所以 TLS1.3 大幅度删减了加密算法，只保留了 ECDHE、AES、ChaCha20、SHA-2 等极少数算法，强化了安全；
> 3. TLS1.3 也简化了握手过程，完全握手只需要一个消息往返，提升了性能。



---



## HTTPS 的优化

![img](https://static001.geekbang.org/resource/image/c4/ed/c41da1f1b1bdf4dc92c46330542c5ded.png)

1. 硬件优化

   1. 提升CPU
   2. SSL加速卡 & SSL 加速服务器

2. 软件优化

   升级软件Linux(2.x => 4.x) / Nginx(1.6 => 1.16) / OpenSSL (1.01 => 1.1.0/1.1.1)

3. 协议优化

   TLS1.2 => TLS 1.3，使用高性能的加密曲线算法

4. 证书优化

5. 会话复用

   1. 第一种叫“Session ID”，就是客户端和服务器首次连接后各自保存一个会话的 ID 号，内存里存储主密钥和其他相关的信息。当客户端再次连接时发一个 ID 过来，服务器就在内存里找，找到就直接用主密钥恢复会话状态，跳过证书验证和密钥交换，只用一个消息往返就可以建立安全通信。
   2. 第二种“Session Ticket”方案，它有点类似 HTTP 的 Cookie，存储的责任由服务器转移到了客户端，服务器加密会话信息，用“New Session Ticket”消息发给客户端，让客户端保存。
      重连的时候，客户端使用扩展“session_ticket”发送“Ticket”而不是“Session ID”，服务器解密后验证有效期，就可以恢复会话，开始加密通信。

6. 预共享密钥



---

参考资料：

- 极客时间《透视HTTP协议》