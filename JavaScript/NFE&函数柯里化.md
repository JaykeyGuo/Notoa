# NFE & 柯里化

### NFE：Named Function Expression



### [柯里化](https://zh.javascript.info/task/sum-many-brackets)

```js
function sum(a) {
  let currentSum = a;
  
  function f(b) {
    currentSum += b;
    return f;
  }
  
  f.toString = function() {
    return currentSum;
  }
  
  // f.valueOf = function() {
  //   return currentSum;
  // }

  return f;
}
```



### new Function

> 通常，闭包是指使用一个特殊的属性 `[[Environment]]` 来记录函数自身的创建时的环境的函数。它具体指向了函数创建时的词法环境。（我们在 [闭包](https://zh.javascript.info/closure) 一章中对此进行了详细的讲解）。
>
> 但是如果我们使用 `new Function` 创建一个函数，那么该函数的 `[[Environment]]` 并不指向当前的词法环境，而是指向全局环境。

在使用new Function的时候，如果同时开启了JS的压缩，会导致new Function找不到对应的变量值，这是因为在压缩的时候会通过压缩变量的名称来达到压缩的效果，但是实际new Function的函数体仍然是使用的原有的变量名。