// V1
function throttleV1(func, ms) {
  let isThrottled = false;
  let savedArgs, savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

// V2
function throttleV2(fn, delay) {
  let last = 0, timer = null;
  return function() {
    let context = this;
    let args = arguments;
    let now = + new Date();

    if (now - last < delay) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, delay);
    } else {
      last = now;
      fn.apply(context, args);
    }
  }
}

// V3
function throttleV3(fn, delay) {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, delay);
  }
}

function throttleV3(fn, delay) {
  let flag = true;
  return function() {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, delay);
  }
}