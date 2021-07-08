/**call 实现 */
Function.prototype.call2 = function (context = window) {
  context.fn = this;
  const args = Array.prototype.slice.call(arguments, 1),
    result = context.fn(...args);
  delete context.fn;
  return result;
};

/**apply 实现 */
Function.prototype.apply2 = function (context = window) {
  context.fn = this;
  let result;
  if (arguments[1]) result = context.fn(...arguments[1]);
  else result = context.fn();
  delete context.fn;
  return result;
};

/**bind 实现 */
Function.prototype.bind2 = function (context = window) {
  if (typeof this !== "function") throw new Error(this + "is no function");
  const args = Array.prototype.slice.call(arguments, 1),
    fn = this;
  function resFn() {
    return fn.apply(
      this instanceof resFn ? resFn : context,
      args.concat(...arguments)
    );
  }
  function Temp() {}
  Temp.prototype = this.prototype;
  resFn.prototype = new Temp();
  return resFn;
};
