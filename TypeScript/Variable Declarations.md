# Variable Declarations

```js
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```

上面这段代码就是`var`声明的不足的比较好的体现，由于`var`是在整个作用域里有效，所以最后打印出来的都是`10`。

文章主要解释了使用var和使用let的差别，可能会出现的问题，由于`var`的提升，会出现不同的问题。`let`的引入，带来了块级作用域和词法作用域的两个概念。`let`也没有`var`的提升，不会出现变量先计算，再声明的情况，使得JS的变量需要提前定义好。

`const`的引入，主要是和`let`的比较，需要在定义变量之前明确，是否不改变这个变量，不改变的变量就使用`const`来定义为常量。

文章中也提到了使用`ES6`的解构赋值来完成对应的数据处理

#### 解构赋值

```ts
let input = [1, 2];
let [first, second] = input;
// first = 1; second = 2;

let [first, ...rest] = [1,2,3,4];
// first = 1; rest = [2,3,4];

let [first] = [1,2,3,4];
// first = 1;

let [, second, , fourth] = [1,2,3,4];
// second = 2; fourth = 4;

let tuple: [number, string, boolean] = [1, 'hello', true];
let [a, b, c] = tuple;
let [a, ...bc] = tuple;
// bc: [string, boolean];
let [a, b, c, d] = tuple;
// d: [], the empty tuple
```

对象也可以使用解构的方法来实现赋值。

在文章中也提到了对应的数组和对象的展开，数组的展开比较简单：

```ts
let arr = [1,2,3];
let brr = [...arr, 4, 5]
```

对象的展开也是类型，但是对象的展开有一个顺序的问题，如何有键值相同的属性，那后面的值会覆盖前面的键值的`value`。

```ts
let obj = {food: 'chicken', time: 'today'}
let newObj = {...obj, time: 'tomorrow'}
// newObj = {food: 'chicken', time: 'tomorrow'}
```

同时，展开后的新对象会失去原有的对象的可枚举属性。

```ts
class C {
  p = 12;
  m () {}
}

let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```

###### 小结：在`TS`中的变量声明中，与`JS`类似，都推荐使用`let`和`const`语法来完成，对应的解构赋值也在其中有所体现。

------

```ts
superset: 超集
elaborate: 精密的，复杂的
quirks: 怪癖，巧合
intimately: 密切的，紧密的
semantics: 语义学
scenarios: 剧本，设想的情况
drastically: 激烈地，强烈地
immutable: 不可改变的
hence: 因此
```

参考资料：

[Variable Declarations](