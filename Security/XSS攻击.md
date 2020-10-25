# XSS 攻击

###### XSS的注入方式：

- 在HTML中内嵌的文本中，恶意内容以script标签形式注入。
- 在内联的JavaScript中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
- 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
- 在标签的href、src等属性中，包含`javascript:`等可执行代码。
- 在onload、onerror、onclick等事件中，注入不受控制代码。
- 在style属性和标签中，包含类似`background-image:url("javascript:...")`的代码（新版本浏览器已经可以防范）。
- 在style属性和标签中，包含类似`expression(...)`的CSS表达式代码（新版本浏览器已经可以防范）。

如果开发者没有对用户输入的文本进行核实的过滤，就贸然插入到HTML中，这很容易造成注入漏洞。攻击者可以利用漏洞，构造出恶意的代码指令，进而利用恶意代码危害数据安全。



###### 不可信的输入来源

- 来自用户的UGC信息
- 来自第三方的链接
- URL参数
- POST参数
- Referer（可能来自不可信的来源）
- Cookie（可能来自其他子域注入）



### XSS分类

| 类型      | 存储区                  | 插入点         |
| --------- | ----------------------- | -------------- |
| 存储型XSS | 后端数据库              | HTML           |
| 反射型XSS | URL                     | HTML           |
| DOM型XSS  | 后端数据库/前端存储/URL | 前端Javascript |

> 1. **反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。**
> 2. **DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。**

###### 关于UGC的输入过滤

对于用户输入的XSS攻击问题，不能简单的通过过滤久能完成，在传输、入库的时候进行转译可以防范一部分问题，但是并不是比较好的处理方式，这样会到处出库的时候，数据与原UGC不相同，带来不必要的问题。建议使用比较成熟的XSS filter。

输入过滤没有这么可靠，所以需要：

1. 防止HTML中出现注入
2. 防止JavaScript执行时，执行恶意代码



### 预防存储型XSS和反射型XSS攻击

常见做法：

- 改成纯前端渲染，把代码和数据分隔开
- 对HTML做充分转义

#### 纯前端渲染

1. 加载的静态HTML，HTML不包含业务相关数据。
2. 浏览器执行HTML中的JS。
3. 通过Ajax获取业务数据，通过DOM API更新页面

*PS：纯前端渲染还需要注意避免DOM型XSS漏洞*



#### 转义HTML

常用的转义规则是对`& < > " ' /`这几个字符转义，能起到一定的防护作用，但是不完善。

对于HTML标签文字内容、HTML属性值、CSS内联样式、内联JS、内联JSON和跳转链接都需要做一一的转义处理，来应对不同的场景。

转义可以参考这篇文章《[Web安全系列（四）：XSS 的防御](https://juejin.im/post/6844903684900388871#heading-5)》里提到的`HTMLEncode, JavascriptEncode XMLEncode, JSONEncode, URLEncode`



### 预防DOM型XSS攻击

DOM型XSS攻击，实际上就是网站前端JS代码本身不够严谨，把<u>不可信的数据当作代码执行</u>了。

#### DOM API

不建议使用：`.innerHTML`,  `.outerHTML`,  `document.write()`;

建议使用：`.textContent`, `.setAttribute()`

#### Vue API

不建议使用：`v-html`



### 其他XSS防范措施

#### CSP（Content Security Policy）

严格的CSP在XSS的防范中可以起到以下作用：

- 禁止加载外域代码，防止复杂的攻击逻辑；
- 禁止外域提交，网站被攻击后，用户的数据不会泄漏到外域；
- 禁止内联脚本执行；
- 禁止未授权的脚本执行；
- 合理使用上报可以及时发现XSS，利于尽快修复问题。

#### UGC长度控制

限制合理的长度，虽然不能防范攻击，但是能提升攻击的难度。

#### HTTP-only

> 通过HttpOnly的头字段，是的JS不能读取关键cookie。
>
> HttpOnly并不时解决XSS问题，主要还是解决XSS攻击之后，Cookie劫持的问题，XSS攻击后除了Cookie的劫持，还有对用户信息的窃取。
>
> HttpOnly有助于缓解XSS攻击，也只是缓解。



#### 验证码

防止脚本冒充用户提交危险操作，防止暴力破解密码等。





### 小结

一些通用的避免XSS攻击的原则：

- **利用模板引擎**：开启模板引擎自带的 HTML 转义功能。例如： 在 ejs 中，尽量使用 `<%= data %>` 而不是 `<%- data %>`； 在 doT.js 中，尽量使用 `{{! data }` 而不是 `{{= data }`； 在 FreeMarker 中，确保引擎版本高于 2.3.24，并且选择正确的 `freemarker.core.OutputFormat`。
- **避免内联事件**：尽量不要使用`onLoad="onload('{{data}}')"`、`onClick="go('{{action}}')"`这种拼接内联事件的写法。在JS中通过`addEventListener()`事件绑定会更安全。
- **避免拼接HTML**：前端采用拼接HTML的方法比较危险，如果框架允许，使用`createEmelent`、`setAttribute`之类的方法实现。或者采用比较成熟的渲染框架，如Vue/React等。
- **时刻保持警惕**：在插入位置为DOM属性、链接等位置时，要打起精神，严加防范。
- **增加攻击难度，降低攻击后果**：通过CSP、输入长度限制、接口安全措施等方法，增加攻击的难度，降低攻击的后果。
- 主动监测和发现：可是使用XSS攻击字符串和自动扫面工具寻找潜在XSS漏洞。



---

PS：

- [前端安全系列（一）：如何防止XSS攻击？](https://juejin.im/post/6844903685122703367)

- [alert(1) to win](https://alf.nu/alert1)

- [prompt(1) to win](http://prompt.ml/)

- [XSS game](https://xss-game.appspot.com/)

  - [Google XSS Game - Solving Level 3](http://offsec-sureshatt.blogspot.com/2017/04/google-xss-game-solving-level-3.html)

  - [Google XSS Game - Solving Level 4](http://offsec-sureshatt.blogspot.com/2017/04/google-xss-game-solving-level-4.html)

  - [Google XSS Game - Solving Level 5](http://offsec-sureshatt.blogspot.com/2017/04/google-xss-game-solving-level-5.html)

  - [Google XSS Game - Solving Level 6](http://offsec-sureshatt.blogspot.com/2017/04/google-xss-game-solving-level-6-final.html)

    `google.com/jsapi?callback=alert`

- [Google Cross-site scripting](https://www.google.com/about/appsecurity/learning/xss/index.html)

- [Web安全系列（四）：XSS 的防御](https://juejin.im/post/6844903684900388871#heading-5)



