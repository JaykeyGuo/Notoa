# {Performance}页面性能

### JS的处理

JS的执行会阻塞页面的渲染和交互的过程，这是我们都知道的一点。但是在面对有大量的JS代码需要处理的时候，或者是一个JS任务执行需要很长时间的情况下，如何做好这部分的优化呢？如何让JS的执行不会影响到页面的渲染和交互呢？

在浏览器渲染的过程中，有一个技术是“时间切片 Time Slicing”，就是将一个JS的长任务分割为多个小任务来执行，下面是对应的代码：

```js
function ts(gen) {
  if (typeof gen === 'function') gen = gen();
  if (!gen || typeof gen.next !== 'function') return;
  return function next() {
    const start = performance.now();
    let res = null;
    do {
      res = gen.next();
    } while(!res.done && performance.now() - start < 25);
    
    if (res.done) return;
    setTimeout(next); // 通过宏任务的方式来切分
  }
}
```

需要传入的函数是一个构造器，实际上是使用JS的协程来处理事件的分割。



### CSS的处理

#### CSS选择器的使用

```css
// 不推荐
.box:nth-child(3) // (1)

// 强烈推荐
.box--three
```

为什么不使用`(1)`规则，主要是浏览器在计算CSS的时候，会去匹配对应的DOM，而DOM本身是边解析边加载的，如果需要匹配`(1)`规则需要等到DOM加载完成之后，再做计算才能实现，这里就会出现对DOM的回溯的过程。

`(2)`规则可以直接匹配，不会带来这样的问题。

#### 创建图层

```css
.div {
  will-change: left; /* keyword value: auto/scroll-position/contents/transform/opacity/left/top */
  transform: translateZ(0);
}
```

通过上面两个方式可以创建一个图层来单独处理动画和可能发生页面变化的页面元素，减少页面的回流和重排问题。

#### CSS属性对页面的影响

改变CSS属性的值，可能会触发回流、重排和合成，可以根据[CSS Triggers](https://csstriggers.com/)的表来查询哪些值会触发哪些流程。

在WebKit中大多的CSS属性的更改都会触发回流，