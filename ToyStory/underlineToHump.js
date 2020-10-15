function toHump(obj) {
  for (let key in obj) {
      let newKey = key.split('_').map((item, index) => {
          let arr = item.split('');
          console.log(arr[0], index);
          if (index !== 0) arr[0] = arr[0].toUpperCase();
          return arr.join('');
      }).join('');
      obj[newKey] = obj[key];
      delete obj[key];
  }
  return obj;
}

function toHump2(str) {
  return str.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  })
}

function toLine(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}