# forEach的异步并行处理

forEach在处理异步任务的时候是并行处理的：

```js
const count = (item) => {
  return new Promise((resolve) => {
	  if (typeof item === 'number') {
      setTimeout(() => {
        console.log(item);
        resolve();
      }, 500);
    } else {
      setTimeout(() => {
        console.log(item);
        resolve();
      }, 1000);
    }
  })
}

// forEach
let arr = [1, 'a', 'b', 'c', 2];
arr.forEach(async item => {
  const ret = await count(item);
});

// 1
// 2
// a
// b
// c

// for
(async function test() {
  for (let i = 0; i < arr.length; i++) {
    await count(arr[i]);
  }
})()

// for ... of
(async function test() {
  for (let x of arr) {
    const res = await count(x)
  }
})()
```



