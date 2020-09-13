// Bind function V1
function bind_1(asThis, ...args) {
  const fn = this;
  return function (...args2) {
    return fn.apply(asThis, ...args, ...args2);
  }
}

// Bind function V2
function bind_2(asThis) {
  var slice = Array.prototype.slice;
  var args = slice.call(arguments, 1);
  var fn = this;
  if (typeof fn !== 'function') {
    throw new Error('cannot bind non_function');
  }
  return function () {
    var args2 = slice.call(arguments, 0);
    return fn.apply(asThis, args.concat(args2));
  }
}

function bind_3(asThis) {
  var slice = Array.prototype.slice;
  var args1 = slice.call(arguments, 1);
  var fn = this;
  if (typeof fn !== 'function') {
    throw new Error('cannot bind non_function');
  }
  function resultFn() {
    var args2 = slice.call(arguments, 0);
    return fn.apply(
      resultFn.prototype.isPrototypeOf(this) ? this : asThis,
      args1.concat(args2)
    );
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}