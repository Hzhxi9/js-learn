### js

#### 数据类型

1. 有哪些数据类型，他们的区别

八种数据类型，分别是`undefined、 null、 boolean、 number、 object、 string、 symbol、 bigInt`

其中 Symbol、 BigInt 是 ES6 中新增的数据类型

- Symbol 代表创建后独一无二且不可变的数据类型， 它主要是为解决可能出现的全局变量冲突的问题
- BigInt 是一种数字类型的数据， 他可以表示任意精度格式的整数， 使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围

这些数据可以分为原始数据类型和引用数据类型

- 栈: 原始数据类型(undefined, null, number, string, boolean)
- 堆: 引用数据类型(object, array, function)

两种类型的区别在于存储位置的不同

- 原始数据类型直接存储在栈(stack)中的简单数据段，占据空间小， 大小固定， 大小固定， 属于被频繁使用数据， 所以放入栈中存储
- 引用类型数据存储在堆中(heap)中的对象，占据空间大， 大小不固定。
  如果存储在栈中，将会影响程序运行的性能；
  引用数据类型在栈中存储了指针，该指针指向了堆中该实体的起始地址。当解释器寻找引用值寻找引用值时，会检索其在栈中的地址，取得地址后从堆中获得实体

堆和栈的概念存在于数据结构和操作系统内存中

- 在数据结构中

  - 栈中数据的存取方式为先进后出
  - 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定

- 在操作系统中，内存被分为栈区和堆区

  - 栈区有编译器自动分配释放、存放函数的参数值，局部变量的值等。 其操作方式类似于数据结构中的栈
  - 堆区内存一般有开发者分配释放， 若开发者不释放，程序结束后可能由垃圾回收机制回收

2. 数据类型检测的方式有哪些

- `typeof`

  - 其中数组、对象、null 都会被判断为 object，其他判断都正确。

- `instacneof`

  - `instanceof`可以正确判断对象的类型，其内部运行机制是判断其原型链中能否找到该类型的原型
  - `instacneof`只能正确判断引用数据类型， 而不能判断基本数据类型
  - `instacneof`运算法可以用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性

- `constructor`

  - 判断数据的类型
  - 对象通过`constructor`对象访问它的构造函数
  - 注意: 如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型

- `Object.prototype.toString.call()`

  - 使用 Object 对象的原型方法 toString 来判断数据类型

- 同样是检测对象 obj 调用 toString 方法，obj.toString()的结果和 Object.prototype.toString().call(obj)的结果不一样，这是为什么

  - 这是因为 toString 是 Object 的原型，而 Array、function 等类型作为 Object 的实例，都重写了 toString 方法。
  - 不同的对象类型调用 toString 方法时，根据原型链的知识，调用的是对应的重写之后的 toString 方法(function 类型返回内容为函数体的字符串， Array 类型返回元素组成的字符串)，而不会调用 Object 上原型 toString 方法(返回对象的具体类型)，所以采用 obj.toString()不能得到其对象类型，只能将 obj 转换为字符串类型；因此在想要得到对象的具体类型时，应该调用 Object 原型上的 toString 方法

1. 判断数组的方式有哪些

   - `Object.prototype.toString.call()`

   ```js
   Object.prototype.toString.call(arr).slice(8, -1) === "Array";
   ```

   - 通过原型链做判断

   ```js
   arr.__proto__ === Array.prototype;
   ```

   - 通过 ES6 的`Array.isArray()`做判断

   ```js
   Array.isArray(arr);
   ```

   - 通过`instanceof`做判断

   ```js
   arr instanceof Array;
   ```

   - 通过`Array.prototype.isPrototypeOf`

   ```js
   Array.prototype.isPrototypeOf(arr);
   ```

2. null 和 undefined 区别

   - `undefined` 代表的含义是未定义，一般变量声明了但还没定义的时候会返回`undefined`
   - `null`代表的含义是空对象， 主要用于赋值给一些可能返回对象的变量，作为初始化
   - `undefined`在 JavaScript 中不是一个保留字，这意味可以使用`undefined`来作为一个变量名，但是这样的做法是非常危险的，它会影响对`undefined`值的判断。 我们可以通过一些方法获得安全的`undefined`值，比如说`void 0`
   - 当对这两种类型使用`typeof`进行判断时，Null 类型化会返回"object"， 这是一个历史遗留问题。 当使用双等号对这种两种类型的值进行比较时会返回 true，使用三等号是会返回 false

3. typeof null 的结果是什么，为什么？

   - typeof Null 的结果是 Object
   - 在 JavaScript 第一个版本中， 所有值都存储在 32 位的单员中，每个单元包含一个小的类型标签(1 - 3 bits)以及当前要存储值的真实数据。共有五种数据类型

   ```js
     000: object  // 当前存储的数据指向一个对象
       1: int     // 当前存储的数据是一个 31 位的有符号整数
     010: double  // 当前存储的数据指向一个双精度的浮点数
     100: string  // 当前存储的数据指向一个字符串
     110: boolean // 当前存储的数据是布尔值
   ```

   - 如果最低位是 1， 则类型标签标志位的长度只有一位；如果最低位是 0， 则类型标签标志位的长度占三位， 为存储其他四种数据类型提供了额外两个 bit 的长度

   - 有两种特殊数据类型

     - undefined 的值是(-2)30(一个超出整数范围的数字)
     - null 的值是机器码 NULL 指针(null 指针的值全是 0)

   - 那就是说 null 的类型标签也是 000，和 Object 的类型标签一样，所以会被判断为 Object

4. intanceof 操作符的实现原理及实现

   `instanceof`运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置

   ```js
   function instanceof(left, right){
     /**获取对象的原型*/
     let proto = Object.getPrototypeOf(left);

     /**获取构造函数的prototype对象*/
     let prototype = right.prototype;

     /**判断构造函数的prototype 对象是否在对象的原型链上*/
     while(true){
       if(!proto) return false;

       if(proto === prototype) return true;

       /**如果没有找到， 就继续从其原型上找， Object.getPrototypeOf 方法用来获取指定*/
       proto = Object.getPrototypeOf(proto)
     }

   }
   ```

5. 为什么 0.1+0.2 ! == 0.3，如何让其相等

   - 计算机是通过二进制的方式存储数据的， 所以计算机计算 0.1 + 0.2 的时候， 实际上计算的两个数的二进制的和
   - 0.1 的二进制是 `0.0001100110011001100...`(1100 循环)， 0.2 的二进制是`0.00110011001100...`(1100 循环)，这两个数的二进制都是无限循环的数。那 Javascript 是如何处理无限循环的二进制小数？
   -

6. 如何获取安全的 undefined 值？

   - 因为 undefined 是一个标识符， 所以可以被当作变量来使用和赋值，但是这样会影响 undefined 的正常判断
   - 表示 void \_\_\_ 没有返回值，因此返回结果是 undefined。
   - void 并不改变表达式的结果，只是让表达式不返回值。 因此可以用 void 0 来获取 undefined

7. typeof NaN 的结果是什么？

   - NaN 指"不是一个数字"，NaN 是一个警戒值， 用来指出数字类型中的错误情况，即"执行数学运算没有成功， 这是失败后返回的结果"
   - NaN 是一个特殊值，它和自身不相等，是唯一一个非自反(自反，即 x === x 不成立)。而 NaN !== NaN 为 true

8. isNaN 和 Number.isNaN 函数的区别？

   - 函数 isNaN 接收参数后， 会尝试将这个参数转换为数值，任何不能被转换为数值的值都会返回 true，因此非数字值传入也会返回 true，会影响 NaN 的判断
   - 函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字在继续判断是否为 NaN， 不会进行数据类型的转换， 这种方法对于 NaN 的判断更为准确

9. == 操作符的强制类型转换规则？
10. 其他值到字符串的转换规则？
11. 其他值到数字值的转换规则？
12. 其他值到布尔类型的值的转换规则？
13. || 和 && 操作符的返回值？
14. Object.is() 与比较操作符 “===”、“==” 的区别？
15. 什么是 JavaScript 中的包装类型？
16. JavaScript 中如何进行隐式类型转换？ +操作符什么时候用于字符串的拼接？
17. 为什么会有 BigInt 的提案？

JavaScript 中 Number.MAX_SAFE_INTEGER 表示最大安全数字，计算结果是 9007199254740991，即在这个数字范围内不会出现精度丢失(小数除外)。但是一旦超过这个范围， js 就会出现计算不准确的情况，这在大数计算的时候不得不依靠一些第三方库进行解决，因此官方提出 BigInt 来解决此问题

18. object.assign 和扩展运算法是深拷贝还是浅拷贝，两者区别

    - Object.assign() 方法接收的第一个参数作为目标对象，后面的所有参数作为源对象。 然后把所有的源对象合并到目标对象中。他会修改了一个对象，因此会触发 ES6 setter
    - 扩展操作符(...)使用它时， 数组或对象中的每一个值都会拷贝到一个新的数组或对象中。它不复制继承的属性或类的属性， 但是它会复制 ES6 的 symbol 属性

#### ES6

1.  ES6 新特性

    - 块级作用域、块级变量 let、 块级常量 const
    - 箭头函数
    - 模板字面量
    - 默认参数、剩余参数、展开运算符(...)
    - 对象属性定义支持缩写， 属性名支持表达式
    - 对象、数组解构
    - 模块导入(import)、 导出(export)、 默认导出(export default)
    - 类(class)、 使用 extends 实现继承、 super 关键字
    - 迭代器、for of
    - 生成器
    - Promise 异步编程
    - 元编程 Proxy(代理)、Reflex(反射)
    - 新增数据类型 Symbol、 BigInt， 数据结构 Set、Map、WeakSet、WeakMap、TypedArray
    - 原有内置对象 API 增强

2.  let、 const、 var 的区别

    - 块级作用域: 块级作用域`{}`包括， let 和 const 具有块级作用域，var 不存在块级作用域。 块级作用域解决了 ES5 中的两个问题

      - 内层变量可能覆盖外层变量
      - 用来计数的循环变量泄露为全局变量

    - 变量提升: var 存在变量提升， let 和 const 不存在变量提升，即在变量只能在声明之后使用，否则会报错

    - 给全局添加属性: 浏览器的全局对象是 window， Node 的全局对象是 global。 var 声明的变量为全局变量，并且会将该变量添加为全局对象的属性，但是 let 和 const 不会

    - 重复声明: var 可以重复声明变量，后声明的同名变量会覆盖之前声明的变量。 const 和 let 不允许重复声明变量

    - 暂时性死区: 在使用 let、 const 命令声明变量之前，该变量都是不可用的。 这在语法上称为暂时性死区。 使用 var 声明的变量不存在暂时性死区

    - 初始化设置: 在变量声明时， var 和 let 可以不用设置初始值。 而 const 声明变量必须设置初始化

    - 指针指向: let 和 const 都是 ES6 新增的用于创建变量的语法。 let 创建的变量是可以更改指针指向(可以重新赋值)， 但 const 声明的变量是不允许改变指针的指向

3.  const 对象的属性可以修改吗

    - const 保证的并不是变量的值不能改动， 而是变量指向的那个内存地址不能改动。 对于基本类型的数据(数值、字符串、 布尔值)， 其值就是保存在变量指向的那个内存地址， 因此等同于常量

    - 但对于引用类型的数据(主要是对象和数组)来说， 变量指向数据的内存地址， 保存的只是一个指针， const 只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的， 就完全不能控制了

4.  如果 new 一个箭头函数的会怎么样

    - 箭头函数的特点

      - 没有 prototype
      - 没有自己的 this 指向
      - 不可以使用 argument 参数

      总结所以不能 new 一个箭头函数

    - new 操作符的实现步骤

      - 创建一个对象
      - 将构造函数的作用域赋给新对象(也就是将对象的**proto**属性指向构造的 prototype 属性)
      - 指向构造函数中代码，构造函数中的 this 指向该对象(也就是为这个对象添加属性和方法)
      - 返回新的对象

    所以上面的第二、三步，箭头函数都是没办法执行的

5.  箭头函数和普通函数的区别

    - 箭头函数比普通函数更加简洁

      - 没有参数，就直接写一个空括号即可
      - 只有一个参数，可以省去参数的括号
      - 有多个参数，用逗号分隔
      - 函数体的返回值只有一句，可以省略大括号
      - 函数体不需要返回值且只有一句话，可以给这个语句前面加一个 void 关键字 `let fn = () => void f()`

    - 箭头函数没有自己的 this

      - 箭头函数不会创建自己的 this，所以没有自己的 this， 它只会在自己作用域的上一层继承 this。 所以箭头函数中 this 的指向在它在定义时已经确定了，之后不会改变

    - 箭头函数继承来的 this 指向永远不会改变

      ```js
      var id = "Global";

      var obj = {
        id: "obj",
        a: function () {
          console.log(this.id);
        },
        b: () => {
          console.log(this.id);
        },
      };

      obj.a(); // 'obj'
      obj.b(); // 'Global'
      new obj.a(); // undefined
      new obj.b(); // Uncaught TypeError: obj.b is not a constructor
      ```

      对象 obj 的方法 b 是使用箭头函数定义， 这个函数中的 this 就永远指向它定义是所处的全局执行环境中的 this， 即使这个函数是作为对象 obj 的方法调用， this 依旧只想 window 对象。需要注意， 定义对象的大括号`{}`是无法形成一个单独的执行环境的，它依旧是处于全局执行环境的

    - call、 apply、 bind 等方法不能改变箭头函数中 this 的指向

      ```js
      var id = "global";
      let func = () => {
        console.log(this.id);
      };

      func(); // global
      func.call({ id: "obj" }); // global
      func.apply({ id: "obj" }); // global
      func.bind({ id: "obj" })(); // global
      ```

    - 箭头函数不能作为构造函数使用

      - 构造函数在 new 的步骤在上面已经说过了， 实际上第二步就是将函数中的 this 指向该对象。

      但是由于箭头函数时没有自己的 this 且指向外层的执行环境，且不能改变指向，所以不能当做构造函数使用

    - 箭头函数没有自己的 arguments

      - 箭头函数没有自己的 arguments 对象，在箭头函数中访问 arguments 实际上获得的是它外层函数的 arguments 值

    - 箭头函数没有 prototype

    - 箭头函数不能用作 Generator 函数， 不能使用 yield 关键字
