# CSRF攻击

CSRF(Cross-site request forgery) 跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三份网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某些操作的目的。

###### 典型的CSRF攻击流程：

- 受害者登录 a.com，并保留了登录凭证（cookie）。
- 攻击者引诱受害者访问 b.com。
- b.com 向 a.com 发送一个请求：a.com/act=xxx；浏览器会携带 a.com 的 cookie
- a.com 接收到请求后，对请求进行验证，并确认时受害者的凭证，误以为是受害者自己发送的请求。
- a.com 以受害者的名义执行 act=xxx。
- 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作。



### 常见的攻击类型

#### GET类型

`<img src="http://bank.example/withdraw?amount=10000&for=hacker" />`

通过图片的标签，让浏览器自动发起一次HTTP请求。



#### POST类型

通常是一个自动提交的表单

```html
<form action="http://bank.example/withdraw" method=POST>
	<input type="hidden" name="account" value="xiaoming" />
  <input type="hidden" name="amount" value="10000" />
  <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script> 
```



#### 链接类型

链接类型的CSRF并不常见，比起其他两种用户打开页面就中招的情况，这种需要用户点击链接才会触发。这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招，攻击者通常会以比较夸张的词语诱骗用户点击，例如：

```html
<a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
  重磅消息！！
<a/>
```

由于之前用户登录了信任的网站A，并且保存登录状态，只要用户主动访问上面的这个PHP页面，则表示攻击成功。



### CSRF的特点

- 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生。
- 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据。
- 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。
- 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。

CSRF通常是跨域的，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如可以发图和链接的评论区，攻击可以直接在本域下进行，而且这种攻击更加危险。



### 防护策略

基于CSRF的两个特点：

- CSRF（通常）发生在第三方域名
- CSRF攻击者不能获取到Cookie等信息，只是使用。

防护策略：

1. 阻止不明外域的访问
   - 同源检测
   - Samesite Cookie
2. 提交时要求附加本域才能获取的信息
   - CSRF Token
   - 双重 Cookie 验证



### 阻止不明外域的访问

#### 同源检测

- Origin Header

  通过Origin Header 来确认，但是在两个情况下是没有Origin Header的，1、IE11同源策略不相同；2、302重定向之后的请求是没有Origin Header的。

- Referer Header

  Referer Header 记录了HTTP请求的来源地址。

Referer Policy

| 策略名称                   | 属性值（新）                     | 属性值（旧） |
| -------------------------- | -------------------------------- | ------------ |
| No Referrer                | no-Referrer                      | never        |
| No Referrer When Downgrade | no-Referrer-when-downgrade       | default      |
| Origin Only                | (same or strict) origin          | origin       |
| Origin when Cross Origin   | (strict) origin-when-crossorigin | -            |
| Unsafe URL                 | Unsafe-url                       | always       |

设置Referrer Policy的方法：

1. 在CSP设置
2. 页面头部增加meta标签
3. a标签增加referrerpolicy属性



如果无法通过 Origin Header 或 Referrer Header 来确认请求的来源，建议直接进行阻止。



#### 如何阻止外域请求

在一般的网站，没有用户输入的网站，可以通过上面的方法来做到CSRF的控制，但是对于搜索引擎的请求，也会变成CSRF攻击；如果是有UGC的网站，那用户从内部发起攻击，Origin Header和Referrer也会失效。



### CSRF Token（处理用户信息冒用问题）

原理：

1. 将CSRF Token输出到页面中

   登录之后，将Token给到前端，在表单提交的时候对DOM树加上Token，对动态生成的HTML代码无效。

2. 页面提交的请求携带这个Token

3. 服务器验证Token是否正确

服务器在验证Token的时候，大多数是将在客户端Session中的Token取出，给到服务端，服务端如果是分布式的情况，需要通过Redis来缓存用户的Token，保证Token的有效期。更进一步，可以通过UserId、时间戳等信息来计算出一个Token。



### 双重 Cookie 验证

#### 双重Cookie采用以下流程：

- 在用户访问网站页面时，向请求域名注入一个Cookie，内容为随机字符串（例如`csrfcookie=v8g9e4ksfhw`）。
- 在前端向后端发起请求时，取出Cookie，并添加到URL的参数中（接上例`POST https://www.a.com/comment?csrfcookie=v8g9e4ksfhw`）。
- 后端接口验证Cookie中的字段与URL参数中的字段是否一致，不一致则拒绝。



#### 用双重Cookie防御CSRF的优点：

- 无需使用Session，适用面更广，易于实施。
- Token储存于客户端中，不会给服务器带来压力。
- 相对于Token，实施成本更低，可以在前后端统一拦截校验，而不需要一个个接口和页面添加。

#### 缺点：

- Cookie中增加了额外的字段。
- 如果有其他漏洞（例如XSS），攻击者可以注入Cookie，那么该防御方式失效。
- 难以做到子域名的隔离。
- 为了确保Cookie传输安全，采用这种防御方式的最好确保用整站HTTPS的方式，如果还没切HTTPS的使用这种方式也会有风险。



### Samesite Cookie 属性

Cookie的Samesite属性用来表示cookie是否用于同一个站点，不能被第三方使用，有两个值`Lax` 和`Strict`。

#### `Samesite=Strict`

> 任何情况下，此cookie都不能被第三方使用。

#### `Samesite=Lax`

> 假如这个请求是这种请求（改变了当前页面或者打开了新页面）且同时是Get✔️请求，则这个Cookie可以作为第三方Cookie。

从A到B，如果是打开页面，且是Get✔️请求的情况，Cookie会被带上，但是如果是在B页面做其他一步请求，不会带上Cookie。



#### Samesite的缺点

- 在Lax情况下，如果是进入子域名，用户状态还是保持登录的，对用户体验来说是不错的，但是Strict就不能在子域名保持用户的登录状态了。
- 目前SameSite属性的支持还不是很好，除了Chrome和FireFox，其他浏览器还不支持。
- 关键缺陷：不支持子域，如果在 a.com 设置的cookie，在top.a.com 下是不能使用的，需要重新登录。



### 防止网站被利用

如何防止攻击发生在自己的网站

- 严格管理所有的上传接口，防止任何预期之外的上传内容（例如HTML）
- 添加Header `X-Content-Type-Options: nosniff` 防止黑客上传HTML内容的资源，被解析为网页。
- 对于用户上传的图片，进行转存或者校验。不要直接使用用户填写的图片链接。
- 当前用户打开其他用户填写的链接时，需告知风险。



---

PS：

[前端安全系列之二：如何防止CSRF攻击？](https://juejin.im/post/6844903689702866952#heading-18)

