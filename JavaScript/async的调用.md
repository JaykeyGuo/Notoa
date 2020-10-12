# Async的调用

## 在非 async 函数中调用 async 函数

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 10;
}

function f() {
  wait.then(result => console.log(result));
}

f();
```

---

PS: https://zh.javascript.info/task/async-from-regular



## Async Iterator

```js
let range = {
  from: 1,
  to: 5,
  [Symbol.asyncIterator]() {
    return {
      current: this.from,
      last: this.to,
      
      async next() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {
  for await(let value of range) {
    alert(value);
  }
})();
```

PS:https://zh.javascript.info/async-iterators-generators

|                          | Iterator          | Async iterator         |
| :----------------------- | :---------------- | :--------------------- |
| 提供 iterator 的对象方法 | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` 返回的值是      | 任意值            | `Promise`              |
| 要进行循环，使用         | `for..of`         | `for await..of`        |

