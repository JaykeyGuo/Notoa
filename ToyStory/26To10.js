function parse26(str) {
  let arr = str.split('');
  let res = 0;
  let pos = 1;
  for (let i = arr.length - 1; i >= 0; i--) {
    pos = i === arr.length - 1 ? 1 : pos * 26;
    res += (arr[i].charCodeAt() - 'A'.charCodeAt() + 1) * pos;
  }
  return res;
}

console.log(parse26('A')); // 1
console.log(parse26('AA')) // 27
console.log(parse26('AAB')) // 27