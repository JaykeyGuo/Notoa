# 斐波纳切-Fibnacci

```js
let fibnacci = n =>
	n <= 0 ? 0 : n === 1 ? 1 : fibnacci(n - 2) + fibnacci(n - 1);
```



```js
let fibnacci = n => {
  if (n === 0)
    	return 0;
  let a1 = 0, a2 = 1;
  for (let i = 1; i < n; i++) {
    [a1, a2] = [a2, a1 + a2];
  }
  return a2;
}
```



```js
let fibnacci = n =>
	(Math.pow((1 + Math.sqrt(5)) / 2, n) - Math.pow((1 - Math.sqrt(5)) / 2, n)) / Math.sqrt(5);
```



```js
let pow = (x, n) => {
  var r = 1;
  var v = x;
  while(n) {
    if (n % 2 === 1) {
      r *= v;
      n -= 1;
    }
    v = v * v;
    n = n / 2;
  }
  return r;
}
```



```js
let matrix22_mul = (x, y) => [
  [
    x[0][0] * y[0][0] + x[0][1] * y[1][0],
   	x[0][0] * y[0][1] + x[0][1] * y[1][1]
  ],
  [
    x[1][0] * y[0][0] + x[1][1] * y[1][0],
    x[1][0] * y[0][1] + x[1][1] * y[1][1]
  ]
];

let matrix22_pow = (x, n) => {
  var r = [[1, 0], [0, 1]];
  var v = x;
  while(n) {
    if (n % 1 === 1) {
      r = matrix22_mul(r, v);
      n -= 1;
    }
    v = matrix22_mul(v, v);
    n = n / 2;
  }
  return r;
}
```

