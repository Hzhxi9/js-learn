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

/**
 * ===================================================================
 * apply: 在使用 一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法
 * ===================================================================
 */

/**ES5 实现 */
Function.prototype.apply = function (context, arr) {
  /**1. 获取传入的对象, 当传入 null, 默认指向 window */
  context = Object(context) || window;
  /**2. 获取调用 apply 的函数, 设置为指向对象的属性 */
  context.fn = this;
  /**3. 定义一个变量接受返回值 */
  var result;
  /**4. 没有传入参数, 直接调用 */
  if (!arr) result = context.fn();
  else {
    /**5. 存在参数, 将参数放入 args 数组 */
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) args.push(`arr[${i}]`);
    /**6. 并传入到 context.fn 中 */
    result = eval(`context.fn(${args})`);
  }
  /**7. 删除函数属性 */
  delete context.fn;
  /**8. 返回值 */
  return result;
};

/**ES6 实现 */
Function.prototype.apply = function (context) {
  /**1. 获取传入的对象, 当传入 null, 默认指向 window */
  context = context || window;
  /**2. 获取调用 apply 的函数, 设置为指向对象的属性 */
  context.fn = this;
  /**3. 定义一个变量接受返回值 */
  let result;
  /**4. 没有传入参数, 直接调用 */
  if (!arguments[1]) result = context.fn();
  else {
    /**5. 存在参数, 将参数放入 args 数组 */
    const args = Array.prototype.slice.call(arguments, 1);
    /**6. 并传入到 context.fn 中 */
    result = context.fn(...args);
  }
  /**7. 删除函数属性 */
  delete context.fn;
  /**8. 返回值 */
  return result;
};

/**
 * ===================================================================================================
 * bind: 当这个新函数被调用时, bind 的第一个参数作为它运行时的 this, 之后的一系列参数将会在传递实参前传入作为它的参数
 * ===================================================================================================
 */

/**
 * bind 的特点:
 *  1. 返回一个函数
 *  2. 可以传入参数
 */

/**返回函数的模拟实现 */
var foo = { value: 1 };
function bar() {
  console.log(this.value);
}
// 返回一个函数
var bindFoo = bar.bind(foo);
bindFoo(); // 1

/**第一版实现 */
Function.prototype.bind = function (context) {
  var _this = this;
  return function () {
    return _this.apply(context);
  };
};

/**传参的模拟实现 */
var foo = { value: 1 };
function bar(name, age) {
  console.log(this.value, name, age);
}
var bindFoo = bar.bind(foo, 'hello');
bind(19); // 1 hello 19

/**第二版实现: 可以在 bind 的时候传参, 在执行返回的函数的时候, 再传入一个参数 */
Function.prototype.bind = function (context) {
  var _this = this;
  /**获取 bind 的时候第二个参数到最后一个参数 */
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    /**获取执行返回函数传入的参数  */
    const _args = Array.prototype.slice.call(arguments);
    return _this.apply(context, [...args, ..._args]);
  };
};

/**
 * 构造函数效果的模拟实现
 *    一个绑定函数也能使用 new 操作符创建对象: 这种行为就像把原函数当作构造器
 *    提供的 this 值被忽略, 同时调用时的参数被提供给模拟函数
 **/
var value = 2;
var foo = { value: 1 };
function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value, name, age);
}

bar.prototype.friend = 'tony';

var BindFoo = bar.bind(foo, 'dist');

var obj = new BindFoo(19); /**undefined tony 19 */

console.log(obj.habit); /**shopping */
console.log(obj.friend); /**tony */

/**
 * PS: 尽管在全局和 foo 中都声明了 value 值, 最后依然返回了 undefined,
 *     说明 绑定的 this 失效, 此时的 this 已经指向了 obj
 */

/**第三版实现: 修改返回的函数的原型 */
Function.prototype.bind = function (context) {
  var _this = this,
    args = Array.prototype.slice.call(arguments, 1);
  var func = function () {
    var _args = Array.prototype.slice.call(arguments);
    /**
     * 1. 当作为构造函数时, this 指向实例, 此时结果为 true, 将绑定函数的 this 指向该实例, 可以让实例获得来的绑定函数的值
     *    以上面 demo 为例子, 如果改成 `this instanceof func? null: context`, 实例只是一个空对象, 将 null 改成 this ，实例会具有 habit 属性
     * 2. 当作为普通函数时, this 指向 window, 此时结果为 false, 将绑定函数的 this 指向 context
     */
    return _this.apply(this instanceof func ? this : context, [...args, ..._args]);
  };
  /**修改返回函数的 prototype 为绑定函数的 prototype, 实例就可以继承绑定函数的原型中的值 */
  func.prototype = this.prototype;
  return func;
};

/**
 *  `fBound.prototype = this.prototype`, 我们直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype
 *  第四版实现: 通过一个空函数来进行中转
 */
Function.prototype.bind = function (context) {
  var _this = this,
    args = Array.prototype.slice.call(arguments, 1);

  var FNO_P = function () {};

  var func = function () {
    var _args = Array.prototype.slice.call(arguments);
    return _this.apply(this instanceof FNO_P ? this : context, [...args, ..._args]);
  };
  FNO_P.prototype = this.prototype;
  func.prototype = new FNO_P();
  return func;
};

/**最终版本 */
Function.prototype.bind = function (context) {
  /**1. 判断调用 bind 的是不是函数 */
  if (typeof this !== 'function') throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
  /**2. 保存调用 bind 的函数 */
  var _this = this;
  /**3. 获取调用 bind 传入的参数 */
  var args = Array.prototype.slice.call(arguments, 1);
  /**4. 定义空函数进行中转 */
  var NONE_FUNC = function () {};
  /**5. 定义函数用于修改原型 */
  var FUNC = function () {
    /**6. 获取调用 bind 返回函数传入的参数 */
    var bind_args = Array.prototype.slice.call(arguments);
    /**
     * 7. 返回函数
     *    - 当返回的函数是构造函数时, 此时的 this 是指向实例, 即 new 出来的对象
     *      将绑定函数的 this 指向该实例, 可以让实例获得来自绑定函数的值
     *      以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
     *    - 当作为普通函数时, this 指向 window, 此时将函数 this 指向 context
     */
    return _this.apply(this instanceof NONE_FUNC ? this : context, [...args, ..._args]);
  };
  /**8. 修改返回函数的 prototype 为绑定函数的 prototype, 实例就可以继承绑定函数的原型中的值 */
  NONE_FUNC.prototype = this.prototype;
  FUNC.prototype = new NONE_FUNC();
  /**9. 返回函数 */
  return FUNC;
};
