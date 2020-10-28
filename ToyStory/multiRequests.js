// > 要求如下：
// >
// > 1. 要求最大并发数 maxNum
// > 2. 每当有一个请求返回，就留下一个空位，可以增加新的请求
// > 3. 所有请求完成后，结果按照 urls 里面的顺序依次打出
// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/378

function multiRequest(urls = [], maxNum) {
  let result = new Array(urls.length).fill(false)
  let sum = urls.length; //总数
  let count = 0; //已完成数
  return new Promise((resolve, reject) => {
    //先请求 maxNum 个
    while (count < maxNum) {
      next()
    }
    function next() {
      let current = count++
      // 边界
      if (current >= sum) {
        !result.includes(false) && resolve(result)
        return
      }
      let url = urls[current];
      console.log("开始：" + current, new Date().toLocaleString());
      fetch(url).then((res) => {
        console.log("结束：" + current, new Date().toLocaleString());
        result[current] = res
        //还有未完成，递归；
        if (current < sum) {
          next()
        }
      }).catch((err) => {
        console.log("结束：" + current, new Date().toLocaleString());
        result[current] = err
        if (current < sum) {
          next()
        }
      })
    }
  })
}
let url2 = `https://api.github.com/search/users?q=d`;
let arr = new Array(100).fill(url2)
multiRequest(arr, 10).then((res) => {
  console.log(res)
})