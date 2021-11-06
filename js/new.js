/**new 关键字实现 */

/**
 *  实现流程
 *  1. 在内存中新建一个对象
 *  2. 新对象中的prototype赋值构造函数的原型
 *  3. this指向新对象，添加新属性
 *  4. 判断是否非空对象
 */

function new_1(fn) {
  if (typeof fn !== "function") throw new Error(fn + "is no function");
  /**在内存中新建一个对象 */
  const o = new Object();

  /** 新对象中的prototype赋值构造函数的原型 */
  Object.setPrototypeOf(o, fn.prototype);

  const args = Array.prototype.slice.call(arguments, 1);
  /**this指向新对象，添加新属性 */
  const o_ = fn.call(o, ...args);

  /** 判断是否非空对象 */
  return o_ instanceof Object ? o_ : o;
}
