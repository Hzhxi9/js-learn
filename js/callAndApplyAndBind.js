/**call & apply 的用途 */

/**1、改变 this 指向 => 改变函数内部的 this 的指向  */
var obj1 = { name: 'seven' };
var obj2 = { name: 'anne' };
global.name = 'window';

var getName = function () {
  console.log(this.name);
};
getName(); // window
getName.call(obj1); // seven
getName.call(obj2); // anne

/**
 * this 丢失
 * 事件函数内部存在函数 func, 在内部调用 func 函数时, func 函数体内的 this 指向 window
 */
document.getElementById('div').onclick = function () {
  console.log(this.id); // div
  var func = function () {
    console.log(this.id); // this => window | this.id => undefined
  };
  func();
};

/**使用 this 进行修正 */
document.getElementById('div').onclick = function () {
  console.log(this.id); // div
  var func = function () {
    console.log(this.id); // this => window | this.id => undefined
  };
  func.call(this);
};

/**
 * document.getElementById 方法内部实现需要用到 this
 * 当 getElementById 方法作为 document 对象的属性被调用时, 这个 this 指向 document
 * 当用 getId 来引用 document.getElementById, 在调用 getId, 此时就变成普通函数, 函数内部的 this 指向了 window, 而不是原来的 document
 */
document.getElementById = (function (func) {
  return function () {
    return func.apply(document, arguments);
  };
})(document.getElementById);

var getId = document.getElementById;
var div = getId('div');
console.log(div.id); // 'div'

/**2. Function.prototype.bind */

Function.prototype.bind = function (ctx) {
  var self = this; /**保存原函数 */
  return function () {
    /**返回一个新函数 */
    return self.apply(ctx, arguments); /**执行新函数的时候, 会把之前传入的 ctx 当作新函数体内的 this */
  };
};

/**
 * 通过 Function.prototype.bind 来包装 func 函数
 * 并且传入一个对象 ctx 当作参数
 * 这个 ctx 对象就是我们想修正的 this 对象
 */
var obj = { name: 'sven' };
var func = function () {
  console.log(this.name);
}.bind(obj);
func(); /**sven */

/**
 * Function.prototype.bind 内部实现
 * 1. 先把 func 函数引用保存起来, 然后返回一个新函数
 * 2. 当执行 func 函数时候, 实际先执行的是返回的新函数 => self.apply(context, argument) 才是执行原来的 func 函数, 并且指定 context 对象为 func 函数体内的 this
 */

/**Function.prototype.bind (带参数) */
Function.prototype.bind = function () {
  var self = this /**保存原函数 */,
    ctx = [].shift.call(arguments) /**需要绑定的 this 上下文, 获取 arguments 的第一个参数 */,
    args = [].slice(arguments); /**剩余的参数转换成数组 */
  return function () {
    /**
     * 返回新函数
     * 执行新函数的时候, 会把之前传入的 context 当作新函数体内的 this
     * 并且组合两次分别传入的参数, 作为新函数的参数
     **/
    return self.apply(ctx, [].concat.call(args, [].slice.call(arguments)));
  };
};

var obj = { name: 'sven' };
var func = function (a, b, c, d) {
  console.log(this.name);
  console.log([a, b, c, d]);
}.bind(obj, 5, 6, 7);
func(8);

/**3. 借用其他对象的方法 */

/**3.1 场景: 借用构造函数, 实现类似继承的效果 */
var A = function (name) {
  this.name = name;
};
var B = function () {
  A.apply(this, arguments);
};
B.prototype.getName = function () {
  return this.name;
};
var b = new B();
console.log(b.getName('sven')); /**输出 sven */

/**3.2 场景: 操作 arguments 等类数组对象 */

/**往 arguments 上添加新元素 */
(function () {
  Array.prototype.push.call(arguments, 3);
  console.log(arguments); /**[1, 2, 3] */
})(1, 2);

/**arguments 转真正的数组 */
var args = Array.prototype.slice.call(arguments);

/**获取 arguments 列表中第一个元素 */
var ctx = Array.prototype.shift.call(arguments);

/**
 * ===================================================================
 * call: 在使用 一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法
 * ===================================================================
 */

/**
 * 🌰
 * 1. call 改变了 this 的指向, 指向了 foo
 * 2. bar 函数执行
 */
var foo = { value: 1 };
function bar() {
  console.log(this.value);
}
bar.call(foo); // 1

/**
 * 模拟实现第一步:
 *  1. 将函数设为对象的属性
 *  2. 执行该函数
 *  3. 删除该函数
 **/

/**将函数设为对象的属性 */
foo.fn = bar;
/**执行该函数 */
foo.fn();
/**删除该函数 */
delete foo.fn;

/**call 函数第一版 */
Function.prototype.call = function (ctx) {
  /**1. 获取调用call的函数, 用this可以获取, 将函数设为对象的属性 */
  ctx.fn = this;
  /**2. 执行该函数 */
  ctx.fn();
  /**3. 删除该函数 */
  delete ctx.fn;
};

/**实现 call 函数给定参数执行函数 */
var foo = { value: 1 };
function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}
bar.call(foo, 'sven', 12); /**sven 12 1 */

/**
 * 模拟实现第二步:
 *  1. 不定长的参数:  从 arguments 列表中取值, 取出第二个到最后一个参数, 然后放到一个数组里
 *  2. 参数数组放到执行的函数参数: 用 eval 方法拼成一个函数
 */
Function.prototype.call = function (ctx) {
  /**1. 获取调用call的函数, 用this可以获取, 将函数设为对象的属性 */
  ctx.fn = this;
  var args = [];
  /**2. 获取参数 */
  for (var i = 0, len = arguments.length; i < len; i++) args.push(`arguments[${i}]`);
  /**3. 参数数组放到执行的函数参数, 执行该函数 */
  eval(`ctx.fn(${args})`);
  /**4. 删除函数 */
  delete ctx.fn;
};

/**
 * 模拟实现第三步:
 *  1. this 参数可以传 null, 当为 null 的时候, 视为指向 window
 *  2. 函数是可以有返回值的
 */

/**1. this 参数可以传 null, 当为 null 的时候, 视为指向 window */
var value = 1;
function bar() {
  console.log(this.value);
}
bar.call(null); // 1

/**2. 函数是可以有返回值的 */
var obj = { value: 1 };
function bar(name, age) {
  return { value: this.value, name, age };
}
console.log(bar.call(obj, 'seven', 18));

Function.prototype.call = function (ctx) {
  /**1. this 参数可以传 null, 当为 null 的时候, 视为指向 window  */
  var context = ctx || window;
  /**2. 获取调用call的函数, 用this可以获取, 将函数设为对象的属性 */
  context.fn = this;
  /**3. 获取不定长参数 */
  var args = [];
  for (let i = 0, len = arguments.length; i < len; i++) args.push(`arguments[${i}]`);
  /**4. 执行函数, 并获取返回值  */
  var result = eval(`context.fn(${args})`);
  /**5. 删除函数属性 */
  delete context.fn;
  /**6. 返回值 */
  return result;
};

/**最终版本 */
Function.prototype.call = function (ctx) {
  /**1. this 参数可以传 null, 当为 null 的时候, 视为指向 window  */
  ctx = ctx || window;
  /**2. 获取调用call的函数, 用this可以获取, 将函数设为对象的属性 */
  ctx.fn = this;
  /**3. 获取不定长参数 */
  const args = Array.prototype.slice.call(arguments, 1);
  /**4. 执行函数, 并获取返回值  */
  const result = ctx.fn(...args);
  /**5. 删除函数属性 */
  delete ctx.fn;
  /**6. 返回值 */
  return result;
};
