Function.prototype.call2 = function(context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args + ')');

  delete context.fn;
  return result;
}


Function.prototype.call3 = function(context) {
  var context = context || window;
  context.fn = this;

  var args = [...arguments].slice(1);
  var result = context.fn(...args);

  delete context.fn;
  return result;
}

// Test Case
var value = 2;
var obj = {
  value: 1
};

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age,
  }
}

bar.call2(null);
console.log(bar.call2(obj, 'jaykey', 18));