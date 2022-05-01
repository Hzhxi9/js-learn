/**变量提升 */

/**
 * 变量提升的概念:
 *    变量提升是当栈内存作用域形成时, JS 代码执行前,
 *    浏览器会将带有 var, function 关键字的变量提前进行声明 declare (值默认就是 undefined )
 *    定义 defined (就是赋值操作)
 *    这种预先处理的机制就叫变量提升机制也叫预定义
 */

/**
 * 1. 变量提升阶段:
 *     - 带 var 的只声明还没有被定义
 *     - 带 function 的已经声明和定义
 *
 * 所以在代码执行前有带 var 的就提前声明了, 比如这里的 a 就赋值成 undefined
 * 在代码执行过程中遇到创建函数的代码浏览器会直接跳过
 *
 * 变量提升只发生在当前作用域
 *     比如: 在页面开始加载时, 只有全局作用域发生变量提升, 这时候的函数中存储的都是代码字符串
 */

/**
 * 2. 带 var 和不带 var 的区别
 *    - 全局作用域中
 *          不带 var 声明变量虽然也可以, 但是建议带上 var 声明
 *          不带 var 相当于给 window 对象设置一个属性
 *          使用 var 声明的变量会映射到 window 下成为属性
 *
 *    - 私有作用域(函数作用域)
 *          带 var 的是私有变量
 *          不带 var 会向上级作用域查找
 *          如果上级作用域没有就一直找到 window 为止, 这个查找的过程叫作用域链
 */

/**🌰 */
a = 12; //  === window.a
console.log(a); // 12
console.log(window.a); // 12

/**🌰 */
var a = (b = 12);
/**相当于 */
var a = 12;
b = 12;

/**🌰 */
console.log('1::', a, b); // undefined undefined
var a = 12,
  b = 'string';
function foo() {
  console.log('2::', a, b); // undefined string
  var a = (b = 13);
  console.log('3::', a, b); // 13 13
}
foo();
console.log('4::', a, b); // 12 13

/**🌰 */
console.log('1::', a, b); // undefined undefined
var a = 12,
  b = 'string';
function foo() {
  console.log('2::', a, b); // 12  string
  //   var a = (b = 13);
  console.log('3::', a, b); // 12 string
}
foo();
console.log('4::', a, b); // 12 string

/**🌰 */
a = 2;
function foo() {
  var a = 12;
  b = 'string';
  console.log('b' in window); // true
  console.log(a, b); // 12 string
}
foo();
console.log(a); //2
console.log(b); // string

/**🌰 */
function foo() {
  console.log(a); // 报错
  a = 12;
  b = 'string';
  console.log('b' in window); // 报错
  console.log(a, b); // 报错
}
console.log(a, b); // 报错

/**🌰 */
fn();
console.log(v1); // 报错
console.log(v2);
console.log(v3);
function fn() {
  var v1 = (v2 = v3 = 2019);
  console.log(v1); // 2019
  console.log(v2); // 2019
  console.log(v3); // 2019
}

/**
 * 3. 等号左边下的变量提升
 */

/**
 * 函数左边的变量提升
 *   - 普通函数变量提升
 */
print();
function print() {
  console.log('林一一');
}
print(); // 带 function 的已经进行了变量提升

/**
 *  - 匿名函数下带 = 的变量提升
 */
print();
var print = function () {
  console.log('string');
};
print();
/**
 * 报错: 由于变量提升机制, 带 var 的 print 一开始是 undefined, 所以报类型错误
 */

/**
 * 4. 条件判断下的变量提升
 *    在当前作用域中不管条件是否成立都会进行变量提升
 */

/**if else 条件判断下的变量提升 */
console.log(a); // undefined
if (true) {
  var a = 'string';
}
console.log(a); // string

/**if 中 () 内的表达式不会变量提升 */
var y = 1;
if (function f() {}) {
  console.log(typeof f); // undefined
  y = y + typeof f; // 1undefined
}
console.log(y);

/**
 * 判断的条件没有提升，所以条件内部的 f 是未定义
 * 为了迎合 ES6 语法只有 JS 执行到条件语句，
 * 判断条件是成立的才会对条件内的函数赋值，不成立不被赋值只被定义成undefined
 */
console.log(print()); // window.print()  => undefined
if (true) {
  function print() {
    console.log('string'); // string
  }
}
print(); // undefined

/**🌰 */
console.log(a); // undefined
console.log(p()); // 报错, if 变量不会提升
if (true) {
  var a = 12;
  function p() {
    console.log('string');
  }
}

/**🌰 */
if (!('value' in window)) {
  var value = 2019;
}
console.log(value); // undefined
console.log('value' in window); // true

/**
 * 5. 重名问题下的变量提升
 *
 * 在 var 和 function 同名的变量提升的条件下, 函数会先执行
 * 也就是说: var 和 function 的变量同名 var 会先进行变量提升
 *          但是在变量提升阶段, 函数声明的变量会覆盖 var 的变量提升
 *          所以直接结果总是函数先执行
 **/

/**5.1 带 var 和带 function 重名条件下的变量提升优先级, 函数先执行 */
console.log(a);
var a = 1;
function a() {
  console.log(1);
}
/**输出  ƒ a(){ console.log(1);} */

/**或者 */
console.log(a);
function a() {
  console.log(1);
}
var a = 1;
/**输出  ƒ a(){ console.log(1);} */

/**5.2 函数名和 var 声明的变量重名 */
var fn = 12;
function fn() {
  console.log('string');
}
console.log(window.fn); // 12
fn(); // 报类型错误

/**
 * 带 var 声明和带 function 声明的其实都是在 window 下的属性, 也就是重名了
 * 根据 变量提升的机制, fn => undefined => 函数
 * 随后 JS 代码自上而下执行时, 此时的 fn 是 fn = 12， 输出 window.fn = 12
 * 所以 fn() => 12() 又是一个类型报错
 */

/**5.3 变量重名在变量提升阶段会重新定义也就是重新赋值 */
console.log('1::', fn());
function fn() {
  console.log(1);
}

console.log('2::', fn());
function fn() {
  console.log(2);
}

console.log('3::', fn());
var fn = 'string';

console.log('4::', fn());
function fn() {
  console.log(3);
}

/* 输出
 *   3
 *   1 undefined
 *   3
 *   2 undefined
 *   3
 *   3 undefined
 *   Uncaught TypeError: fn is not a function
 *
 * 同样由于变量土生机制, fn 会被多次重新赋值, 最后赋值的地址值为最后一个函数
 * 所以调用 fn 都只是在调用 最后一个函数的输出值 3
 * 代码执行到 var fn = 'string'， fn() 就会导致类型错误
 **/

/**🌰 */
var a = 2;
function a() {
  console.log(3);
}
console.log(typeof a); // number

/**
 * 变量提升 undefined => 函数提升 function => 赋值 2
 */

/**🌰 */
console.log(fn); // fn(){}
var fn = 2022;
console.log(fn); // 2022
function fn() {}
/**
 * 在变量提升阶段 fn => undefined => 函数提升修改定义为 function fn(){} => 被修改为 fn = 12
 */

/**🌰 */
let a = 0,
  b = 0;

function fn(a) {
  fn = function fn2(b) {
    console.log(a, b);
    console.log(++a + b);
  };
  console.log('a::', a++);
}
fn(1); // a => 1
fn(2); // a => 2, b => 2, (++a + b) => 5

/**6. 函数形参的变量提升 */

/**6.1 函数的形参也会进行一次变量提升 */
function a(b) {
  console.log(b);
}
a(45);
/**等价于 */
function a(b) {
  var b = undefined;
  b = 45;
}

/**🌰 */
var a = 1;
function foo(a) {
  console.log(a); // 1
  var a;
  console.log(a); // 1
}
foo(a);

/**
 * 🌰
 * ps: 匿名函数不带变量是不会有变量提升的操作
 **/
var foo = 'string';
(function (f) {
  console.log(foo); // undefined
  var foo = f || 'hello';
  console.log(foo); // string
})(foo);
console.log(foo); // string

/**🌰 */
var foo = 'string';
(function (foo) {
  console.log(foo); // string
  var foo = foo || 'hello';
  console.log(foo); // string
})(foo);
console.log(foo); // string

/**🌰 */
var a = 10;
/**
 *  匿名函数内部声明的变量属于私有作用域
 */
(function () {
  console.log(a); // undefined
  a = 5;
  console.log(window.a); // 10
  var a = 20;
  console.log(a); // 20
})();

/**
 *  = 的优先级是从右到左
 *  所以变量提升阶段 b = undefined 后
 *  将 c 赋值成 undefined
 *  最后才将这个对象的引用地址给 b
 */
var b = { a, c: b };
console.log(b.c); // undefined

/**🌰 */
var a = 1;
function foo(a, b) {
  console.log(a); // 1
  a = 2;
  arguments[0] = 3;
  var a;
  console.log(a, this.a, b); // 3 1 undefined
}
foo(a);

/**
 * 7. 非匿名自执行函数的变量提升
 */

/**7.1 匿名执函数和非匿名自执行函数在全局环境下不具备变量提升机制 */
var a = 10;
(function c() {})();
console.log(c); //报错

/**IIFE 函数具备自己的作用域，所以全局下不会变量提升 */

/**7.2 匿名自执行函数在自己的作用域内存存在正常的变量提升 */
var a = 10;
(function () {
  console.log(a); // 10
  a = 20;
  console.log(a); // 20
})();
console.log(a); // 20

/**
 * 7.3 非匿名自执行函数的函数名在自己的作用域内变量提升,
 *     且修改函数名的值无效,
 *     这是非匿名函数和普通函数的差别
 */
var a = 10;
(function a() {
  console.log(a); // function a(){ }
  a = 20;
  console.log(a); // function a(){ }
})();

/**
 * 在全局环境下, var 声明的变量 a 会先进行变量提升
 * 但是非匿名函数不会在全局环境下变量提升, 因为具备自己的作用域
 * 而且上面的函数名 a 同样变量提升, 值就是函数 a 的应用地址值
 * 而且非匿名自执行函数名是不可以修改的
 * 即使修改了也不会有任何作用, 严格模式下还会报错
 * 所以最后输出 function a(){}
 */

/**🌰 */
var value = 2019;
function fn() {
  console.log(value); // undefined
  var value = { name: 'Time' };
  console.log(value); //  { name: "Time" };
}
fn();
console.log(value); // 2019

/**🌰 */
function fn() {
  for (var i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
  }
  console.log(i); // 5
}
fn()