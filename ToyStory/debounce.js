// V1
function debounceV1(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  }
}

// v2
function debounceV2(fn, delay) {
  let timer = null;
  return function() {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay);
  }
}

function debounceV2x(fn, delay) {
  let timer = null;
  return function() {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  }
}

function debounceV2xx(fn, delay) {
  let timer = null;
  return function() {
    let context = this, args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  }
}