function instance_of(L, R) {
  var O = R.prototype;
  L = L.__proto__;
  while (true) {
    if (!L) return false;
    if (O === L) return true;
    L = L.__proto__;
  }
}

function instance_of(L, R) {
  var O = R.prototype;
  L = L.__proto__;
  while(true) {
    if (!L) return false;
    if (O === L) return true;
    L = L.__proto__;
  }
}