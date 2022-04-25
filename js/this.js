/**this 的指向 */

/**1、作为对象的方法调用 */
// var object_1 = {
//   name: 'object_1',
//   sayName() {
//     console.log(this.name);
//   },
// };

// /**指向直接调用函数的对象 */
// object_1.sayName(); /**object_1 */

// /**2、作为普通函数调用 */

// /**函数赋值给了变量, 此时this指向全局 */
// const sayName_1 = object_1.sayName;
// sayName_1(); /**undefined */

// global.name = 'global';
// const sayName_2 = function () {
//   return this.name;
// };
// /**此时this的指向也是全局 */
// console.log(sayName_2()); /**global */

// global.name = 'outer_func';
// const func_1 = function () {
//   this.name = 'inner_func';
//   var inner_func = function () {
//     console.log(this.name); // inner_func
//     console.log(this); // global
//   };
//   inner_func();
// };
// func_1();

// /**3、构造器函数调用 */

// /**
//  * 当用 new 运算符调用函数时, 该函数会返回一个对象
//  * 通常情况下构造器中 this 会就会指向返回的这个对象
//  */
// function Object_1() {
//   this.name = 'Object_1';
// }
// const o_1 = new Object_1();
// /**3.1 隐式返回这个对象 */
// console.log(o_1.name); // Object_1

// function Object_2() {
//   this.name = 'Object_2';
//   return { name: 'Object_2_1' };
// }
// const o_2 = new Object_2();
// /**3.2 显式指向返回的对象 */
// console.log(o_2.name); // Object_2_1

// function Object_3() {
//   this.name = 'Object_3';
//   return 'Object_3_1';
// }
// const o_3 = new Object_3();
// /**3.3 不显式返回任何数据 or 返回一个非对象类型的数据 */
// console.log(o_3.name); // Object_3

/**
 * 4. Function.prototype.call & Function.prototype.apply
 **/
// var Object_4 = {
//   name: 'Object_4',
//   sayName() {
//     return this.name
//   },
// };
// var Object_4_call = {
//     name: 'Object_4_Call'
// }
// console.log(Object_4.sayName()) // Object_4
// /**改变 this 的指向, 指向 Object_4_call 对象 */
// console.log(Object_4.sayName.call(Object_4_call)) // Object_4_Call

/**
 * 概念:
 *    1. this 的指向决定于执行时, 与所在位置无关
 *    2. 箭头函数无 this 指向, 往上层作用域查找
 * 规则:
 *    1. 默认绑定: 指向全局 => window|global
 *    2. 隐式绑定: 指向执行的对象 => obj.funName()
 *    3. 显式绑定: 指向执行的对象 => call、apply、bind
 *    4. new 绑定: 指向 new 出来的对象 => new Class|new Function
 * 优先级:
 *    4 > 3 > 2 > 1
 * ps:
 *    bind 后的函数无法在改 this 的指向
 */

//  var name = 'window';
//  var person = {
//    name: 'person',
//    sayName: function () {
//      console.log(this.name);
//    },
//  };
//  function sayName() {
//    var sss = person.sayName;
//    sss(); // window
//    person.sayName(); // person
//    (b = person.sayName)(); // window
//  }
//  sayName();

// var name = 'window';
// var person1 = {
//   name: 'person1',
//   foo1: function () {
//     console.log(this.name);
//   },
//   foo2: () => console.log(this.name),
//   foo3: function () {
//     return function () {
//       console.log(this.name);
//     };
//   },
//   foo4: function () {
//     return () => {
//       console.log(this.name);
//     };
//   },
// };

// var person2 = { name: 'person2' };

// person1.foo1(); // person1
// person1.foo1.call(person2); // person2

// person1.foo2(); // window
// person1.foo2.call(person2); // window

// person1.foo3()(); // window
// person1.foo3.call(person2)(); // window
// person1.foo3().call(person2); // person2

// person1.foo4()(); // person1
// person1.foo4.call(person2)(); // person2
// person1.foo4().call(person2); // person1

var name = 'window';
function Person(name) {
  this.name = name;
  (this.foo1 = function () {
    console.log(this.name);
  }),
    (this.foo2 = () => console.log(this.name)),
    (this.foo3 = function () {
      return function () {
        console.log(this.name);
      };
    }),
    (this.foo4 = function () {
      return () => {
        console.log(this.name);
      };
    });
}
var person1 = new Person('person1');
var person2 = new Person('person2');

person1.foo1(); // person1
person1.foo1.call(person2); // person2

person1.foo2(); // person1
person1.foo2.call(person2); // person1

person1.foo3()(); // window
person1.foo3.call(person2)(); // window
person1.foo3().call(person2); // person2

person1.foo4()(); // person1
person1.foo4.call(person2)(); // person2
person1.foo4().call(person2); // person1
// person3 = new Person.call(person1); // 会报错 Uncaught TypeError: Person.bind is not a constructor
var person3 = new (Person.bind(person1))('person3');
person3.foo1();

// let x = 3;
// let obj = { x: 5 };

// obj.fn = (function () {
//   this.x *= ++x; /**this => window | x => 4 | this.x => undefined */
//   return function (y) {
//     this.x *= ++x + y;
//     console.log(x, this.x)
//   };
// })();

// let fn = obj.fn;
// obj.fn(6); /**this => obj | x => 5 | this.x => 5 * (5 + 6) => 55 */
// fn(4); /**this => window | x => 6  */
// console.log(obj.x, x); /**obj.x => 55 | x => 6 */

var x = 3;
var obj = { x: 5 };

obj.fn = (function () {
  this.x *= ++x; /**this => window | x => 4 | this.x => 3 * 4 => 12 */
  return function (y) {
    this.x *= ++x + y; 
    console.log(x, this.x) 
  };
})();

var fn = obj.fn;
obj.fn(6);  /**this.x => 5 * (13 + 6) => 95 | this => obj | x => 13  */
fn(4); /** this => window | x => 234 |  this.x => 13 * (14 + 4) => 234   */
console.log(obj.x, x);  // 95 234
