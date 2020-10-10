# 节流 & 防抖

节流与防抖实际上都是使用装饰者模式对原有的函数进行包装，在包装的使用对其进行处理，防抖的处理是“在指定时间之后执行，按照最后一次触发的时间计算。”；节流的处理是“每一个指定时间区间内只能执行一次函数”。

### [防抖](https://zh.javascript.info/task/debounce)

```js
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  }
}
```

### [节流](https://zh.javascript.info/task/throttle)

```js
function throttle(func, ms) {
  let isThrottled = fasle,
      savedArgs,
      savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

