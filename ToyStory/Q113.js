// 第 113 题：根据以下要求，写一个数组去重函数
// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/215

function filter(arr) {
  let map = {};
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    console.log(JSON.stringify(arr[i]))
    if (!map[JSON.stringify(arr[i])]) {
      map[JSON.stringify(arr[i])] = true;
      result.push(arr[i]);
    }
  }
  return result;
}
let arr = [123, "meili", "123", "mogu", 123];
filter(arr)
let brr = [123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]
filter(brr);
let crr = [123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"];
filter(crr)