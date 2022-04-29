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
a = 12; //  === window.a
console.log(a); // 12
console.log(window.a); // 12

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
console.log(print()) // window.print()  => undefined
if(true){
    function print(){
        console.log('string'); // string
    }
}
print(); // undefined

/**🌰 */
console.log(a); // undefined
console.log(p()); // 报错
if(true){
    var a = 12
    function p(){
        console.log('string');
    }
}

/**🌰 */
if(!("value" in window)){
    var value = 2019; 
}
console.log(value);  // undefined
console.log('value' in window); // true

