# setTimeout & setInterval

```js
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
                         
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```

### 用timeout 实现 interval

```js
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

interval会因为执行函数的实际时间，对应消减间隔时间，如果执行时间超过了间隔时间，看起来就像是连续执行的，没有达到间隔的效果，通过**嵌套的timeout**可以解决这个问题。这里与防抖是一样的原理。

![](https://zh.javascript.info/article/settimeout-setinterval/settimeout-interval.svg)



### 延时问题 & 历史原因

setTimeout和setInterval连续多个的最小延时是`4ms`，这是一个历史遗留问题，在后台页面标签的情况下timeout的延时会增加到`1000ms`（记得在浏览器工作原理中有提到）