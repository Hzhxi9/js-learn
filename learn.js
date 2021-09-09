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

console.log(instanceOf([1, 2], Array));

function newFn(fn) {
  if (typeof fn !== "function") throw new TypeError(fn + "is no function");

  const o = new Object();

  Object.setPrototypeOf(o, fn.prototype);

  const args = Array.prototype.slice.call(arguments);

  const _o = fn.call(o, ...args);

  return _o instanceof Object ? _o : o;
}

function watch(o, setBind, logger) {
  const handler = {
    get(target, key, receiver) {
      logger(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      setBind(value, key);
      return Reflect.set(target, key, value, receiver);
    },
  };
  return new Proxy(o, handler);
}

const o = { a: 1 };
const p = watch(
  o,
  (v, props) => {
    console.log(v, props);
  },
  (target, props) => {
    console.log(props, target[props]);
  }
);

p.a;

const map = new Map([
  ["name", "Bon"],
  ["age", 18],
]);

console.log(map.size);

/**
 * 闭包
 */

// function outside() {
//   let a = 1;
//   global.inside = function () {
//     console.log(a);
//   };
// }
// outside();
// inside();

/**解决var */
// for (var i = 1; i <= 5; i++) {
//   setTimeout(function () {
//     console.log(i);
//   }, i * 1000);
// }

/**闭包 */
// for (var i = 1; i <= 5; i++) {
//   (function (j) {
//     setTimeout(function () {
//       console.log(j);
//     }, j * 1000);
//   })(i);
// }

/**setTimeout 第三个参数 */
// for (var i = 1; i <= 5; i++) {
//   setTimeout(
//     function (j) {
//       console.log(j);
//     },
//     i * 1000,
//     i
//   );
// }

/**let */
// for (let i = 1; i <= 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, i * 1000);
// }

/**
 * 执行上下文栈
 */
// let a = "hello world";

// function first() {
//   console.log("first start");
//   second();
//   console.log("first end");
// }

// function second() {
//   console.log("second function");
// }

// first();

/**this 函数调用模式 */
(function () {
  console.log(this);
})();

/**call */
Function.prototype.callFunc = function (context = window) {
  if (typeof this !== "function") throw new TypeError(this + "is no function");
  const args = Array.prototype.slice.call(arguments, 1);

  let result = null;

  context.fn = this;

  result = context.fn(...args);

  delete context.fn;

  return result;
};

/**apply */
Function.prototype.applyFunc = function (context = window) {
  if (typeof this !== "function") throw new TypeError(this + "is no function");

  const args = Array.prototype.slice.call(arguments, 1);

  let result = null;

  context.fn = this;

  if (arguments[1]) result = context.fn(...args);
  else result = context.fn();

  delete context.fn;

  return result;
};

/**bind */
Function.prototype.bindFunc = function (context) {
  if (typeof this !== "function") throw new TypeError(this + "is no function");

  const args = Array.prototype.slice.call(arguments, 1);

  const fn = this;

  function Func() {
    return fn.apply(
      this instanceof Func ? Func : context,
      args.concat(arguments)
    );
  }

  function Tmp() {}

  Tmp.prototype = this.prototype;
  Func.prototype = new Tmp();

  return Func;
};
