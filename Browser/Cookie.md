# Cookie

存储在浏览器中的Cookie不能超过4kb，每个域总数不超过20+，因浏览器不同上限不同。

`````js
document.cookie = 'text=xxx; path=/; domain=baidu.com expires=Tue, 19 Jan 2018 03:14:07 GMT'
`````



#### path

设置可以访问该cookie的页面路径，必须是绝对路径，默认是当前路径。

#### domain

设置可以访问该cookie的域名地址，解决多个子域名公用一个cookie的情景。

#### expires/ max-age

不设置有效期的情况下，默认是session，关闭页面标签之后就会失效。

expires设置为过去时间，cookie会被删除。

max-age是相对时间。

#### secure

cookie的访问是HTTP或HTTPS不敏感的，不会基于协议区分。

设置secure后，cookie只能在HTTPS协议下才能访问。

#### samesite

目的是防止XSRF攻击，

##### samesite=strict

任何跨站的请求都不会携带cookie。

这样会带来一个问题，当用户从一个合法的链接进入页面的时候，我们无法识别用户身份，因为这个时候拿不到对应的cookie。

解决方案是用两个cookie来处理，设计敏感信息的使用strict，另一个cookie用来做用户的识别。

##### samesite=lax

即可以防止XSRF攻击，也不会破坏用户体验。

外部来的网站，禁止浏览器发送cookie，但是有一个例外：

如果以下两个条件都成立，则发送cookie：

1. HTTP方法是安全的（Get请求，仅读取数据的方案）
2. 该操作执行顶级导航（更改浏览器地址栏的URL）

> - **`samesite` 会被到 2017 年左右的旧版本浏览器忽略（不兼容）。**

#### httpOnly

禁止JS访问cookie



---

PS:

[Cookie函数](https://zh.javascript.info/cookie#fu-lu-cookie-han-shu)