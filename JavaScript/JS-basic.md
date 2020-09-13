# JS

### 自增、自减运算

运算符 `++` 和 `--` 可以置于变量前，也可以置于变量后。

- 当运算符置于变量后，被称为“后置形式”：`counter++`。
- 当运算符置于变量前，被称为“前置形式”：`++counter`。

如果自增/自减的值不会被使用，那么两者形式没有区别：

```js
let counter = 0;
counter++;
++counter;
alert( counter ); // 2，以上两行作用相同
```

如果我们想要对变量进行自增操作，**并且** 需要立刻使用自增后的值，那么我们需要使用前置形式：

```js
let counter = 0;
alert( ++counter ); // 1
```

如果我们想要将一个数加一，但是我们想使用其自增之前的值，那么我们需要使用后置形式：

```js
let counter = 0;
alert( counter++ ); // 0
```

`++/--` 运算符同样可以在表达式内部使用。它们的优先级比绝大部分的算数运算符要高。



### 拷贝对象

#### 浅拷贝

```js
Object.assign({}, { a: 11 }, { a: 12 }); // a: 12
Object.assign({}, { a: 12 }, { a: 11 }); // a: 11
```

在`Object.assign`中源对象的顺序会决定相同的属性的浅拷贝的结果，最后一个对象的值会最终拷贝到新对象上。



#### 深拷贝

```js
const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
      ? Array.from(obj)
      : clone;
};
```



### this

[this的链式调用](https://zh.javascript.info/task/chain-calls)





### [对象-原始值转换](https://zh.javascript.info/object-toprimitive)

这一章比较基础，是关于计算过程中的原始值转换的问题，通过三个方法来处理：

1. 调用`obj[Symbol.toPrimitive](hint)`如果这个方法存在，

2. 否则，如果 hint 是 `"string"`

   尝试 `obj.toString()` 和 `obj.valueOf()` ，无论哪个存在。

3. 否则，如果 hint 是 `"number"`或者 `"default"`

   尝试 `obj.toString()` 和 `obj.valueOf()` ，无论哪个存在。





### 数字类型

> 对于不同的数字系统：
>
> - 可以直接在十六进制（`0x`），八进制（`0o`）和二进制（`0b`）系统中写入数字。
> - **`parseInt(str，base)` 将字符串 `str` 解析为在给定的 `base` 数字系统中的整数，`2 ≤ base ≤ 36`。**
> - **`num.toString(base)` 将数字转换为在给定的 `base` 数字系统中的字符串。**
>
> **要将 `12pt` 和 `100px` 之类的值转换为数字：**
>
> - 使用 `parseInt/parseFloat` 进行“软”转换，它从字符串中读取数字，然后返回在发生 error 前可以读取到的值。
>
> 小数：
>
> - 使用 `Math.floor`，`Math.ceil`，`Math.trunc`，`Math.round` 或 `num.toFixed(precision)` 进行舍入。
> - 请确保记住使用小数时会损失精度。

[数字精度问题](https://zh.javascript.info/task/why-rounded-down)

[从 min 到 max 的随机整数](https://zh.javascript.info/number#cong-min-dao-max-de-sui-ji-zheng-shu)



```js
/*eslint guard-for-in: "error"*/

for (key in foo) {
    if (Object.prototype.hasOwnProperty.call(foo, key)) {
        doSomething(key);
    }
}

for (key in foo) {
    if ({}.hasOwnProperty.call(foo, key)) {
        doSomething(key);
    }
}
```



https://eslint.org/docs/rules/guard-for-in





| 方法                    | 选择方式……                                            | 负值参数            |
| :---------------------- | :---------------------------------------------------- | :------------------ |
| `slice(start, end)`     | 从 `start` 到 `end`（不含 `end`）                     | 允许                |
| `substring(start, end)` | `start` 与 `end` 之间（包括 `start`，但不包括 `end`） | 负值代表 `0`        |
| `substr(start, length)` | 从 `start` 开始获取长为 `length` 的字符串             | 允许 `start` 为负数 |