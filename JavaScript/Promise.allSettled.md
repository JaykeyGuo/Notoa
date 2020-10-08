# Promise.allSettled

#### Polyfill

```js
if (!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(
    	promises.map(p => {
        return Promise.resolve(p)
        	.then(
          	value => ({
              status: 'fulfilled',
              value,
            }),
          	reason => ({
              status: 'rejected',
              reason
            })
        	)
      })
    )
  }
}
```

