# promisify

```js
function promisify(f) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
      
      args.push(callback);
      
      f.call(this, ...args);
    });
  };
};

// How to Use?
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

适应更多参数的情况

```js
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        if (err) {
          reject(err);
        } else {
          resolve(manyArgs ? results : results[0]);
        }
      }
      
      args.push(callback);
      
      f.call(this, ...args);
    })
  }
}

// How to use ?
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```

---

PS:

[Promisification](https://zh.javascript.info/promisify)

[ES6-promisify](https://github.com/digitaldesignlabs/es6-promisify/blob/e90a87676a97de523d19de8c303525e2275fad54/lib/promisify.js#L14)