console.log(Object.prototype.toString.call("h").slice(8, -1).toLowerCase());

console.log(Object.prototype.toString.call([1, 2, 3]).slice(8, -1));

// console.log([1, 2, 3].__proto__ === Array.prototype);

// console.log([1, 3, 4] instanceof Array);

// console.log(void 0 === undefined);

function instanceOf(left, right) {
  let proto = Object.getPrototypeOf(left);

  const prototype = right.prototype;

  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

console.log(instanceOf([1, 2, 3], Array));

function newFn(fn) {
  if (typeof fn !== "function") throw new TypeError(fn + "is no function");
  const o = new Object();
  Object.setPrototypeOf(o, fn.prototype);
  const args = Array.prototype.slice.call(arguments);
  const _o = fn.call(o, ...args);
  return _o instanceof Object ? _o : o;
}
