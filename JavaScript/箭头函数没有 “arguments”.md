# [箭头函数没有 “arguments”](https://zh.javascript.info/arrow-functions#jian-tou-han-shu-mei-you-arguments)

```js
// 箭头函数

function defer(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDefferred('John');
```

---

```js
// function 函数
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  }
}
```

> 箭头函数：
>
> - 没有 `this`
> - 没有 `arguments`
> - 不能使用 `new` 进行调用
> - 它们也没有 `super`，但目前我们还没有学到它。我们将在 [类继承](https://zh.javascript.info/class-inheritance) 一章中学习它。