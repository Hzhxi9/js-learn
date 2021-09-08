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

6.  箭头函数的 this 指向哪里

    箭头函数不同于传统 Javascript 中的函数，箭头函数并没有属于自己 this，它所谓的 this 是捕获其所在上下文的 this 值，作为自己的 this 值，并且由于没有属于自己的 this，所以是不会被 new 调用的，这个所谓的 this 也不会被改变

    用 Babel 理解一下箭头函数

    ```js
    const obj = () => {
      getArrow(){
        return () => {
          console.log(this === obj)
        }
      }
    }
    ```

    转换后

    ```js
    // ES5， 由 Babel 转译
    var obj = {
      getArrow: function getArrow() {
        var _this = this;
        return function () {
          console.log(_this === obj);
        };
      },
    };
    ```

7.  扩展运算符的作用及使用场景

    - 对象扩展运算符

      对象的扩展符号(...)用于取出参数对象中的所有可遍历属性， 拷贝到当前对象之中

      ```js
      let bar = { a: 1, b: 2 };
      let baz = { ...bar }; // { a: 1, b: 2 }
      // 等价于 let baz = Object.assign({}, bar);
      ```

      - `Object.assign`方法用于对象的合并，将源对象(source)的所有可枚举属性， 复制到目标(target)
      - `Object.assign`方法的第一个参数是目标函数，后面的参数都是源对象(如果目标函数与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性)

      - 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖

        ```js
        let bar = { a: 1, b: 2 };
        let baz = { ...bar, ...{ a: 2, b: 4 } }; // { a: 2, b: 4 }
        ```

      - 扩展运算符对对象实例的拷贝属于浅拷贝

    - 数组扩展运算符

      数组的扩展运算符可以将一个数组转换为逗号分隔的参数序列且每次只能展开一层数组

      ```js
      console.log(...[1, 2, 3]); // 1, 2, 3
      console.log(...[1, [2, 3, 4], 5]); // 1, [2, 3, ,4], 5
      ```

      应用场景

      - 将数组转换为参数序列

        ```js
        function add(x, y) {
          return x + y;
        }
        const nums = [1, 2];
        add(...nums); // 3
        ```

      - 复制数组

        ```js
        const arr1 = [1, 2];
        const arr2 = [...arr1];
        ```

        **扩展运算符(...)用于取出参数对象中的所有可遍历属性， 拷贝到当前对象中， 这里参数对象是个数组，数组里面的所有对象都是基础数据类型，将所有基础数据类型重新拷贝到新的数组中**

      - 合并数组

        ```js
        const arr1 = [1, 2];
        const arr2 = [1, ...arr1, 4];
        ```

      - 扩展运算符与解构赋值结合起来， 用来生成数组

        ```js
        const [first, ...rest] = [1, 2, 3, 4, 5];
        console.log(first); // 1
        console.log(rest); // [2, 3, 4, 5]
        ```

      - 将字符串转为真正的数组

        ```js
        [..."hello"]; // ['h', 'e', 'l', 'l', 'o']
        ```

      - 任何`Iterator`接口的对象， 都可以用扩展运算符转换为真正的数组

        ```js
        // arguments 对象
        function foo() {
          const args = [...arguments];
        }
        ```

        **用于替换 ES5 中的 `Array.prototype.slice.call(arguments)`写法**

      - 使用`Math`函数获取数组中特定的值

        ```js
        const nums = [9, 4, 7, 1];
        Math.max(...nums); // 9
        Math.min(...nums); // 1
        ```

8.  Proxy 可以实现什么功能

    - Proxy 是 ES6 中新增的功能， 它可以用来自定义对象中的操作

      ```js
      /**
       * @params target 需要代理的对象
       * @params handler 自定义对象中的操作，比如可以用来自定义set/get函数
       * */
      const p = new Proxy(target, handler);
      ```

    - Proxy 实现数据响应式

      ```js
      const onWatch = (obj, setBind, getLogger) => {
        const handler = {
          get(target, key, receiver) {
            getLogger(target, key);
            return Reflect.get(target, key, receiver);
          },
          set(target, key, value, receiver) {
            setBind(value, key);
            return Reflect.set(target, key, value, receiver);
          },
        };
        return new Proxy(target, handler);
      };

      const obj = { a: 1 };
      const p = onWatch(
        obj,
        (v, props) => {
          console.log(`监听到属性${props}改变为${V}`);
        },
        (target, props) => {
          console.log(`'${props}' = ${target[props]}`);
        }
      );

      p.a = 2; // 监听到属性a改变
      p.a; // 'a' = 2
      ```

      在上述代码中，通过自定义 set 和 get 函数的方式，在原本的逻辑中插入我们的函数逻辑，实现了在对象任何属性进行了读写时发出通知

9.  对对象与数组解构的理解

    解构是 ES6 提供的一种新的提取数据的模式， 这种模式能够从对象或数组里有针对性地拿到想要的数值

    - 数组解构

      在解构数组时， 以元素的位置为匹配条件来提供想要的数据

      ```js
      const [a, b, c] = [1, 2, 3];
      console.log(a, b, c); // 1, 2, 3
      ```

      还可以通过给左侧变量数组设置空占位的方式， 实现对数组中某几个元素的精准提取

      ```js
      const [a, , c] = [1, 2, 3];
      console.log(a, c); // 1, 3
      ```

    - 对象解构

      解构对象时， 是以属性的名称为匹配条件，来提取想要的数组的

      ```js
      const stu = {
        name: "Bob",
        age: 24,
      };

      const { name, age } = stu;
      console.log(name, age); // Bob, 24
      ```

      **注意对象解构严格以属性名作为定位依据，所以就算调换了 name 和 age 的位置，结果也是一样的**

      对于嵌套程度深的对象的解构

      可以在解构出来的变量名右侧，通过冒号 + {目标属性名} 这种形式， 进一步解构它， 一直解构到拿到目标数据为止

      ```js
      const school = {
        classes: {
          stu: {
            name: "Bob",
            age: 24,
          },
        },
      };

      const {
        classes: {
          stu: { name },
        },
      } = school;
      ```

10. 对 rest 参数的理解

    扩展运算符被用到函数形参上时，它还可以把一个分离的参数序列整合成一个数组

    经常用于获取函数的多余参数， 或者处理函数参数个数不确定的情况

    ```js
    function mul(...args) {
      let result = 1;
      for (const val of args) {
        result *= val;
      }
      return result;
    }
    mul(1, 2, 3, 4); // 24
    ```

    这里传入 mul 函数的是四个分离的参数， 但是如果在 mul 函数里尝试输入 args 的值，会得到一个数组

    ```js
    function mul(...args) {
      console.log(args);
    }
    mul(1, 2, 3, 4); // [1, 2, 3, 4]
    ```

#### Javascript 基础

1. new 操作符的实现原理

   new 操作符的执行过程

   - 首先创建一个新的空对象
   - 设置原型，对对象的原型设置为函数的 prototype 对象
   - 让函数的 this 指向这个对象， 执行构造函数的代码(为这个新对象添加属性)
   - 判断函数的返回值类型，如果是值类型，返回创建的对象。 如果是引用类型，就返回这个引用类型的对象

   ```js
   function new_1(fn) {
     if (typeof fn !== "function") throw new Error(fn + "is no function");

     /**新建一个空对象*/
     const o = new Object();

     /**设置原型， 新对象中prototype赋值构造函数的原型*/
     Object.setPrototypeOf(o, fn.prototype);

     const args = Array.prototype.slice.call(arguments);

     /**this指向新对象， 添加新属性*/
     const _o = fn.call(o, ...args);

     /**判断是否非空对象*/
     return _o instanceof Object ? _o : o;
   }
   ```

2. Map 和 Object 的区别

- Map

  - 意外的键: Map 默认情况不包含任何键，只包含显式插入的键
  - 键的类型: Map 的键可以是任何值， 包括函数、 对象或者基本类型
  - 键的顺序: Map 的 key 是有序的，因此当迭代的时候，Map 对象已插入的顺序返回键值
  - size: Map 的键值对个数可以轻易地通过 size 属性获取
  - 迭代: Map 是 iterable 的， 所以可以直接被迭代
  - 性能: 在频繁增删键对的场景下表现更好

- Object

  - 意外的键: Object 有一个原型，原型链上的键名有可能和自己在对象上的设置的键名产生冲突
  - 键的类型: Object 的键必须是 String 或是 Symbol
  - 键的顺序: Object 是无序的
  - size: 只能手动计算
  - 迭代：迭代 Object 需要以某种方式获取它的键然后才能迭代
  - 性能: 在频繁添加和删除键值对的场景下未做出优化

3. Map 和 WeakMap 的区别

- Map

  - 本质上就是键值对的集合，但是普通的 Object 中的键值对中的键只能是字符串，而 ES6 提供的 Map 数据结构类似于对象，但是它的键不限制范围， 可以是任意类型，是一种更加完善的 Hash 结构。 如果 Map 的键是一个原始数据类型，只要两个键严格相同，就视为视为同一个键

  - 实际上 Map 是一个数组， 它的每一个数据也都是一个数组， 其形式如下:

  ```js
  const map = [
    ["name", "zhang"],
    ["age", 18],
  ];
  ```

  - Map 数据结构有以下操作方法:

    - size: 返回 Map 结构的成员总数
    - set(key, value): 设置键名 key 对应的键值 value，然后返回整个 Map 结构，如果 key 已经有值，则键值会被更新，否则就新生成该键(因为返回的是当前 Map 对象，所以可以链式调用)
    - get(key): 该方法读取 key 对应的键值，如果找不到 key， 返回 undefined
    - has(key): 该方法返回一个布尔值， 表示某个值是否在当前 Map 对象中
    - delete(key): 该方法删除某个键，返回 true， 如果删除失败， 返回 false
    - clear(): map.clear()清除所有成员，没人返回值

  - Map 结构原生提供了三个遍历器生成函数和一个遍历方法

    - keys(): 返回键名的遍历器
    - values(): 返回键值的遍历器
    - entries(): 返回所有成员的遍历器
    - forEach(): 遍历 Map 的所有成员

- WeakMap

  - 也是一组键值对的集合， 其中的键是弱引用的， 其键必须是对象， 原始数据类型不能作为 key 值， 而值可以是任意的

  - 该对象也有存在以下方法

    - set(key, value): 设置键名 key 对应的键值 value， 然后返回整个 Map 结构，如果 key 已经有值，则键值会被更新， 否则就新生成该键(因为返回的是当前 Map 对象， 所以可以链式调用)
    - get(key): 该方法读取 key 对应的键值，如果找不到 key， 返回 undefined
    - has(key): 该方法返回一个布尔值， 表示某个键是否在当前 Map 对象中
    - delete(key): 该方法删除某个键，返回 true， 如果删除失败， 返回 false
    - 其 clear() 方法已经被弃用，所以可以通过创建一个空的 WeakMap 并替换原对象来实现清楚

  - WeakMap 的设计目的在于，有时想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这两个对象，就必须手动删除这个引用，否则垃圾回收机制就不会释放对象占有的内存。而 WeakMap 的键名所引用的对象都是弱饮用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会被释放该对象所占用的内存。也就是说，一旦不在需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用

  - 总结

    - Map 它类似于 Object， 也是键值对的集合，但是键的范围不限于字符串，各种类型的值(包括对象)都可以当作键
    - WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名(null 除外)，不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制

4.  JavaScript 类数组对象的定义

    - 定义

      - 一个拥有 length 属性和若干索引的对象就可以被称为类数组对象， 类数组对象和数组对象类似，但是不能调用数组方法
      - 常见的类数组对象有 arguments 和 DOM 方法返回的结果
      - 还有一个函数也可以被看作是类数组对象，因为它含有 length 属性，代表可接收的参数个数

    - 类数组转换数组的方法

      - 通过 call 调用数组 slice 方法来转换

        ```js
        Array.prototype.slice.call(arguments);
        ```

      - 通过 call 调用 splice 方法来转换

        ```js
        Array.prototype.splice.call(arguments, 0);
        ```

      - 通过 apply 调用 concat 方法来转换

        ```js
        Array.prototype.concat.apply([], arguments);
        ```

      - 通过 Array.from 来转换

        ```js
        Array.from(arguments);
        ```

5.  JavaScript 为什么要进行变量提升，它导致了什么问题

    - 变量提升的表现是，无论在函数中何处位置声明的变量，好像都被提升到了函数的首部，可以在变量声明前访问到而不会报错

    - 造成遍历变量提升的本质原因是 js 引擎在执行前有一个解析的过程，创建了执行上下文，初始化了一些代码执行时需要用到的对象。当访问一个变量时，会到当前执行上下文中的作用域中去查找，而作用域的首端指向的是当前执行上下文的变量对象，这个变量对象是执行上下文的一个属性，它包含了函数的形参、所有的函数和变量声明，这个对象的是在代码解析的时候创建的。

      - 首先要知道，js 在拿到一个变量或者一个函数的时候，会有两步操作，即解析和执行

      - 解析阶段，js 会检查语法，并对函数进行预编译。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数都拿出来，变量先赋值为 undefined，函数先声明好。在一个函数执行之前，也会创建一个函数执行上下文，跟全局执行上下文类似，不过函数执行上下文会多出 this、 arguments 和函数的参数

        - 全局上下文: 变量定义， 函数声明
        - 函数上下文: 变量定义， 函数声明， this， arguments

      - 执行阶段， 就是按照代码的顺序依次执行的

    - 变量提升的原因

      - 提高性能

        JS 代码执行之前，会进行语法检查和预编译，并且这一操作只进行一次。这么做就是为了提高性能，如果没有这一步，那么每次执行代码前都必须重新解析一遍该变量（函数），而这是没有必要的，因为变量（函数）的代码并不会改变，解析一遍就够了。
        在解析的过程中，还会为函数生成预编译代码。在预编译时，会统计声明了哪些变量、创建了哪些函数，并对函数的代码进行压缩，去除注释、不必要的空白等。这样做的好处就是每次执行函数时都可以直接为该函数分配栈空间（不需要再解析一遍去获取代码中声明了哪些变量，创建了哪些函数），并且因为代码压缩的原因，代码执行也更快了。

      - 容错性更好

        变量提升可以在一定程度上提高 JS 的容错性，看下面的代码：

        ```js
        a = 1;
        var a;
        console.log(a);
        ```

        如果没有变量提升，这两行代码就会报错，但是因为有了变量提升，这段代码就可以正常执行。

        虽然，在可以开发过程中，可以完全避免这样写，但是有时代码很复杂的时候。可能因为疏忽而先使用后定义了，这样也不会影响正常使用。由于变量提升的存在，而会正常运行。

    - 总结

      - 解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
      - 声明提升可以提高 js 代码的容错性，使一些不规范的代码也可以正常执行

#### 原型与原型链

1. 对原型、原型链的理解

   - 在 Javascript 中是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性，他的属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。
   - 当使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。一般来说不应该能够获取到这个值，但是现在浏览器中都实现了 proto 属性来访问这个属性，但是最好不要使用这个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf()方法，可以通过这个方法来获取对象的原型
   - 当访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以这就是新建的对象为什么能够使用 toString()等方法的原因

   - 特点: Javascript 对象是通过引用来传递的，创建的每个新对象实体中并没有一份属于自己的原型副本。 当修改原型时，与之相关的对象也会继承这一改变。

2. 原型修改、重写

   ```js
   function Person(name) {
     this.name = name;
   }

   /**修改原型*/
   Person.prototype.getName = function () {};

   var p = new Person("hello");

   console.log(p.__proto__ === Person.prototype); /**true*/
   console.log(p.__proto__ === p.constructor.prototype); /**true*/

   /**重写原型*/
   Person.prototype = {
     getName: function () {},
   };
   var p = new Person("hello");

   console.log(p.__proto__ === Person.prototype);
   console.log(p.__proto__ === p.constructor.prototype);
   ```

   可以看到修改原型的时候 p 的构造函数不是指向 Person 了， 因为直接给 Person 的原型对象直接用对象赋值时，它的构造函数指向了根构造函数 Object，所以这时候`p.constructor === Object`而不是`p.constructor === Person`。 想要成立，就要用 constructor 指回来

   ```js
   Person.prototype = {
     getName: function () {},
   };
   var p = new Person("hello");

   p.constructor = Person;

   console.log(p.__proto__ === Person.prototype); // true
   console.log(p.__proto__ === p.constructor.prototype); // true
   ```

3. 原型链指向

```js
p.__proto__; /**Person.prototype*/

Person.prototype.__proto__; /**Object.prototype*/

p.__proto__.__proto__; /**Object.prototype*/

p.__proto__.constructor.prototype.__proto__; /**Object.prototype*/

Person.prototype.constructor.prototype.__proto__; /**Object.prototype*/

p1.__proto__.constructor; /**Person*/

Person.prototype.constructor; /**Person*/
```

4.  原型链的终点是什么？ 如何打印出原型链的终点

    - 由于 Object 是构造函数，原型链终点是 Object.prototype.\_\_proto\_\_
    - 而`Object.prototype.\_\_proto\_\_ === null //true` 所以原型链的终点是 null
    - 原型链上的所有原型都是对象， 所以对象最终都是由 Object 构造的，而`Object.prototype`的下一级是 Object.prototype.\_\_proto\_\_

5.  如何获得对象非原型链上的属性

    使用后`hasOwnProperty()`方法来判断属性是否属于原型链的属性

    ```js
    function iterate(obj) {
      var res = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          res.push(key + ":" + obj[key]);
        }
      }
      return res;
    }
    ```

#### 执行上下文/作用域链/闭包

1. 对闭包的理解

   - 定义: 指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量

   - 有两个常用的用途:

     - 使我们在函数外部能够访问到函数内部的变量。通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量
     - 使已经结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收

   - 比如函数 A 内部有一个函数 B， 函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包函数

     ```js
     function A() {
       let a = 1;
       window.B = function () {
         console.log(a);
       };
     }
     A();
     B(); // 1
     ```

     在 js 中，闭包存在的意义就是让我们可以间接访问到函数内部的变量。

   - 循环中使用闭包解决 var 定义函数的问题

     ```js
     for (var i = 1; i <= 5; i++) {
       setTimeout(function () {
         console.log(i);
       }, i * 1000);
     }
     ```

     首先因为`setTimeout`是个异步函数，所以会先把循环全部执行完毕，这实话 i 就是 6 了，所以会输出一堆 6

     - 解决方法

     ```js
     // 第一种: 使用闭包的方式
     // 首先使用了立即执行函数将i传入函数内部，这个时候值就被固定在了参数j上面不会改变，当下次执行timer这个闭包的时候，就可以使用外部函数的变量j从而达到目的
     for (var i = 1; i <= 5; i++) {
       (function (j) {
         setTimeout(function timer() {
           console.log(j);
         }, j * 1000);
       })(i);
     }

     // 第二种: 使用setTimeout的第三个参数，这个参数会被当成timer函数的参数传入
     for (var i = 1; i <= 5; i++) {
       setTimeout(
         function timer(j) {
           console.log(j);
         },
         i * 1000,
         i
       );
     }

     // 第三种: 使用let定义i解决问题
     for (let i = 1; i <= 5; i++) {
       setTimeout(function timer() {
         console.log(i);
       }, i * 1000);
     }
     ```

2. 对作用域、作用域链的理解

   - 全局作用域

     - 最外层函数和最外层函数定义的变量拥有全局作用域
     - 所有未定义直接赋值的变量自动声明为全局作用域
     - 所有 window 对象的属性拥有全局作用域
     - 全局作用域有很大的弊端，过多的全局作用域变量会污染全局命名空间，容易引起命名冲突

   - 函数作用域

     - 函数作用域声明在函数内部的变量，一般只有固定的代码片段可以访问到
     - 作用域是分层的，内层作用域可以访问外层作用域，反之不行

   - 块级作用域

     - 使用 ES6 中新增的 let 和 const 指令可以声明块级作用域，块级作用域可以在函数中创建也可以在一个代码块中创建(由{}包裹的代码片段)
     - let 和 const 声明的变量不会有变量提升，也不可以重复声明
     - 在循环中比较适合绑定块级作用域，这样就可以把声明的计数器变量限制在循环内部

   - 作用域链

     - 定义: 在当前作用域中查找所需变量，但是该作用域没有这个变量， 那这个变量就是自由变量。 如果在自己作用域找不到该变量就去父级作用域查找，依此向上级作用域查找，直到访问到 window 对象就被终止，这一层层的关系就是作用域链
     - 作用: 保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，可以访问到外层环境的变量和函数
     - 本质上是一个指向变量对象的指针列表。变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前端始终都是当前执行上下文的变量对象。全局执行上下文的变量(也就是全局对象)始终是作用域链的最后一个对象

   - 当查找一个变量时，如果当前执行环境中没有找到，可以沿着作用域向后查找

3. 对执行上下文的理解

   - 执行上下文类型

     - 全局上下文

       任何不在函数内部的都是全局执行上下文，它首先会创建一个全局的 window 对象，并且设置 this 的值等于这个全局对象，一个程序中只有一个全局执行上下文

     - 函数执行上下文

       当一个函数被调用时，就会为该函数创建一个新的执行上下文，函数的上下文可以有任意多个

     - eval 函数执行上下文

       执行在 eval 函数中的代码会属于他自己的执行上下文

   - 执行上下文栈

     - JavaScript 引擎使用执行上下文栈来管理执行上下文
     - 当 JavaScript 执行代码时，首先遇到全局代码，会创建一个全局执行上下文并且压入执行栈中，每当遇到一个函数调用就会为该函数创建一个新的执行上下文并压入栈顶，引擎会执行位于执行上下文栈顶的函数，当函数执行完成后，执行上下文葱栈中弹出，继续执行下一个上下文。当所有的代码都执行完毕后，从栈中弹出全局执行上下文

     ```js
     let a = "hello world";
     function first() {
       console.log("first function");
       second();
       console.log("agin first function");
     }
     function second() {
       console.log("second function");
     }
     first();
     /**执行顺序*/
     // 先执行second(), 在执行first()
     ```

   - 创建执行上下文

     - 创建阶段

       - this 绑定

         - 在全局执行上下文中， this 指向全局对象(window 对象)
         - 在函数执行上下文中，this 指向取决于函数如何调用。如果它被一个引用对象调用，那么 this 会被设置成那个对象，否则 this 的值被设置为全局对象或者 undefined

       - 创建词法环境组件

         - 词法环境是一个有标识符(变量映射的数据结构)， 标识符是指变量/函数名，变量是对实际对象或原始数据的引用
         - 词法环境的内部有两个组件: 环境记录器(用来存储变量个数和函数声明的实际位置)、 外部环境的引用(可以访问父级作用域)

       - 创建变量环境组件

         - 变量环境也是一个词法环境，其环境记录器持有变量声明语句在执行上下文中创建的绑定关系

   - 执行阶段

     - 完成对变量的分配，最好执行代码

   - 总结

     - 在执行 js 代码之前，需要先解析代码， 解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为 undefined，函数声明好。这一步执行完了，才开始正式的执行程序
     - 在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出 this、 arguments 和函数的参数

       - 全局上下文: 变量定义、 函数声明
       - 函数上下文: 变量定义、 函数声明、 this、 arguments

#### this/call/apply/bind

1. 对 this 对象的理解

   - this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。 在实际开发中， this 的指向可以通过四种调用模式来判断

     - 函数调用模式， 当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象
     - 方法调用模式，如果一个函数作为一个对象的方法来调用时， this 指向这个对象
     - 构造器调用模式，如果一个函数用 new 调用时，函数执行前新创建一个对象，this 指向这个新创建的对象
     - apply、call、 bind 调用模式: 这三个方法都可以显示的指定调用函数的 this 指向。

       - apply 方法接收两个参数， 一个是 this 绑定的对象，一个是参数数组
       - call 方法接受不了的参数: 第一个是 this 绑定的对象， 后面的其余参数是传入函数执行的参数。也就是说，在使用 call()方法时，传递给函数的参数必须逐个列举出来
       - bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变

     - 总结: 这四种方式，使用构造器调用模式的优先级最高， 然后是 apply、call、bind 调用模式，然后是方法调用模式、然后是函数调用模式

2. call() 和 apply() 的区别

   - 它们的作用一模一样，区别仅在于传入参数的形式的不同

     - apply 接受两个参数， 第一个参数指定了函数体内 this 对象的指向， 第二个参数为一个带下标的集合， 这个集合可以为数组，也可以为类数组，apply 方法把这个集合中的元素作为参数传递给被调用的函数
     - call 传入的参数数量不固定， 跟 apply 相同的是，第一个参数也是代表函数体内的 this 指向， 从第二个参数开始往后，每个参数被依次传入函数

3. 实现 call、 apply、 bind 函数

   - call 函数的实现步骤

     - 判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况
     - 判断传入上下文对象是否存在，如果不存在，则设置为 window
     - 处理传入的参数，截取第一个参数后的所有参数
     - 将函数作为上下文对象的一个属性
     - 使用上下文对象来调用这个方法，并保存返回结果
     - 删除刚才新增的属性
     - 返回结果

     ```js
     Function.prototype.call2 = function (context = window) {
       // 判断调用函数
       if (typeof this !== "function") {
         console.error(this + "is no function");
       }
       // 获取参数
       const args = Array.prototype.slice.call(arguments, 1);
       // 声明结果
       const result = null;

       // 判断context是否传入，如果未传入设置为window
       context = context || window;

       // 将调用函数方法设置为对象的方法
       context.fn = this;

       // 调用方法
       result = context.fn(...args);

       // 删除属性
       delete context.fn;

       // 返回结果
       return result;
     };
     ```

   - apply 函数的实现步骤

     - 判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况
     - 判断传入上下文对象是否存在，如果不存在，则设置为 window
     - 将函数作为上下文对象的一个属性
     - 判断参数值是否传入
     - 使用上下文对象来调用这个方法，并保存返回结果
     - 删除新增的属性
     - 返回结果

     ```js
     Function.prototype.apply2 = function (context) {
       // 判断调用对象是否为函数
       if (typeof this !== "function") {
         console.error(this + "is no function");
       }

       // 声明结果
       let result = null;

       // 判断 context 是否存在， 如果未传入则为window
       context = context || window;

       // 将函数设为对象的方法
       context.fn = this;

       // 调用方法
       if (arguments[1]) {
         result = context.fn(...arguments[1]);
       } else {
         result = context.fn();
       }

       // 删除属性
       delete context.fn;

       // 返回结果
       return result;
     };
     ```

   - bind 函数的实现步骤

     - 判断调用对象师傅为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况
     - 保存当前函数的引用，获取其余传入参数值
     - 创建一个函数返回
     - 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象

     ```js
     Function.prototype.bind2 = function (context) {
       // 判断调用对象是否为函数
       if (typeof this !== "function") {
         throw new TypeError(this + "is no function");
       }

       // 获取参数
       const args = Array.prototype.slice.call(1);

       // 声明函数
       const fn = this;

       function Fn() {
         // 根据调用方式， 传入不同绑定值
         return fn.apply(
           this instanceOf Fn ? this : context,
           args.concat(...arguments)
         )
       }

       function Temp() {}

       Temp.prototype = this.prototype;
       Fn.prototype = new Temp();

       return Fn();
     };
     ```

#### 异步编程

1. 异步编程的实现方式

   JavaScript 中的异步机制可以分为以下几种

   - 回调函数方式

     使用回调函数的方式有一个缺点是， 多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的维护

   - Promise

     使用 Promise 的方式可以将嵌套的回调函数作为链式调用，但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确

   - generator

     它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。
     当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。
     因此在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。
     使用这种方式需要考虑的问题是何时将函数的控制权转移回来，因此需要有一个自动执行的 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行

   - async 函数

     async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行

2. setTimeout、 Promise、 Async/Await 的区别

   - setTimeout

     ```js
     console.log('1. script start'')
     setTimeout(function(){
       console.log('2. timeout')
     })
     console.log('3. script end')

     // 输出顺序: 1. script start => script end => timeout
     ```

   - Promise

     Promise 本身是同步的立即执行函数，当在 executor 中执行 resolve 或者 reject 的时候， 此时是异步操作， 会先执行 then/catch 等，当主栈完成后，才会去调用 resolve/reject 中存放的方法执行，打印 p 的时候，是打印的返回结果， 一个 Promise 实例

     ```js
     console.log("script start");

     let promise1 = new Promise(function (resolve) {
       console.log("promise1");
       resole();
       console.log("promise1 end");
     }).then(function () {
       console.log("promise2");
     });

     setTimeout(function () {
       console.log("setTimeout");
     });

     console.log("script end");

     // 输出顺序: script start => promise1 => promise1 end => script end => promise2 => setTimeout
     ```

     当 JS 主线程执行 Promise 对象时:

     - promise1.then() 的回调就是一个 task
     - promise1 是 resolved 或 rejected： 那这个 task 就会放入当前事件循环回合的 microTask queue
     - promise1 是 pending: 这个 task 就会放入 事件循环的未来某个(可能下一个)回合的 microTask queue 中
     - setTimeout 的回调也是一个 task， 它会被放入 microTask 即使是 0ms 的情况

   - async/await

     ```js
     async function async1() {
       console.log("async1 start");
       await async2();
       console.log("async1 end");
     }

     async function async2() {
       console.log("async2");
     }

     console.log("script start");
     async1();
     console.log("script end");

     // 输入顺序：script start => async1 start => async2 => async1 end => script end
     ```

   async 函数返回一个 Promise 对象，当函数执行时，一旦遇到 await 就会先返回，等到触发异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程， 跳出了 async 函数体

   ```js
   async function func1() {
     return 1;
   }
   console.log(func1());
   ```

   func1 的运行结果其实就是一个 Promise 对象。因此也可以使用 then 来处理后续逻辑

   ```js
   func1().then((res) => {
     console.log(res); // 1
   });
   ```

   await 的含义为等待， 也就是 async 函数需要等待 await 后的函数执行完成并且有了返回结果(Promise 对象)之后，才能继续诗执行下面的代码。

   await 通过返回一个 Promise 对象来实现同步的效果

3. 对 Promise 的理解

   Promise 是异步编程的一种解决方案， 它是一个对象，可以获取异步操作的消息，他的出现大大改善了异步编程的困境， 避免了地狱回调，它比传统的解决方案回调函数和事件更合理和更强大

   所谓 Promise，简单来说就是一个容器， 里面保存着某个未来才会结束的事件(通常是一个异步操作)的结果。

   从语法来说，Promise 是一个对象，它可以获取异步操作的消息。

   Promise 提供了统一的 API， 各种异步操作都可以用同样的方法进行处理

   - Promise 的实例有三个状态

     - Pending(进行中)
     - Resolve(已完成)
     - Rejected(已拒绝)

   当把一件事情交给 Promise 时，它的状态 Pending， 任务完成了状态就变成了 Resolved， 没有完成失败了就变成 Rejected

   - Promise 的实例有两个过程

     - pending -> fulfilled: Resolved(已完成)
     - pending -> rejected: Rejected(已拒绝)

     注意: 一旦从进行状态变为其他状态就永远不能更改状态

   - Promise 的特点

     - 对象的状态不受外界影响。 promise 对象代表一个异步操作，有三种状态， pending(进行中)、 fulfilled(已成功)、rejected(已失败)。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态，这也是 promise 这个名字的由来
     - 一旦状态改变就不会再变了，任何时候都可以得到这个结果。 promise 对象的状态改变，只有两种可能: 从 pending 变为 fulfilled， 从 pending 变为 rejected。 这时候称为 resolved(已完成)。
     - 如果改变已经发生了， 你再对 promise 对象添加回调函数，也会立即得到这个结果。 这雨事件(event)完全不同， 事件特点: 如果你错过了它， 再去监听是得不到结果的

   - Promise 的缺点

     - 无法取消 Promise， 一旦新建它就会立即执行，无法中途取消
     - 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部
     - 当处于 pending 状态时，无法得知目前进展到哪一个阶段(刚刚开始还是即将完成)

   - 总结

     - Promise 对象是异步编程的一种解决方案， 最早由社区提出
     - Promise 是一个构造函数， 接收一个函数作为参数，返回一个 Promise 实例
     - 一个 Promise 实例有三种状态， 分别是 pending、 resolved、 rejected，分别代表进行中、已成功、已失败
     - 实例的状态只能由 pending 转变为 resolved 或者 rejected 状态，并且状态一经改变，就凝固了，无法再被改变
     - 在构造 Promise 的时候， 构造函数内部的代码是立即执行的

4. Promise 的基本用法

   - 创建 Promise 对象

     - Promise 对象代表的一个异步操作， 有三种状态: pending(进行中)、fulfilled(已成功)、 rejected(已失败)
     - Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject

       ```js
       const promise = new Promise(function (resolve, reject) {
         if ("异步成功") resolve();
         else reject();
       });
       ```

     - 一般情况下都会使用 new Promise() 来创建 Promise 对象， 但是也可以使用 Promise.resolve 和 Promise.reject 这两个方法

   - Promise.resolve

     Promise.resolve(value) 的返回值也是一个 Promise 对象，可以对返回值进行.then 调用

     ```js
     Promise.resolve(11).then(function (value) {
       console.log(value); // 11
     });
     ```

     resolve(11) 代码中，会让 promise 对象进入确定状态(resolve 状态)，并将参数 11 传递后面的 then 所指定的 onFulfilled 函数

     创建 Promise 对象可以使用 new Promise 的形式创建对象，也可以使用 Promise.resolve(value)的形式创建 Promise 对象

   - Promise.reject

     Promise.reject 也是 new Promise 的快捷形式， 也创建一个 Promise 对象

     ```js
     Promise.reject(new Error("error"));
     ```

     就是下面的代码 new Promise 的简单形式

     ```js
     new Promise(function (resolve, reject) {
       reject(new Error("error"));
     });
     ```

     下面是使用 resolve 和 reject

     ```js
     function promise(ready) {
       return new Promise(function (resolve, reject) {
         if (ready) resolve("hello world");
         else reject("error");
       });
     }

     /**方法调用*/
     promise(true).then(
       function (msg) {
         console.log(msg);
       },
       function (error) {
         console.log(error);
       }
     );
     ```

   - 给 promise 函数传递一个参数，返回一个 promise 对象
   - 如果 true 的话，那么调用 promise 对象中的 resolve 方法，并且把其中的参数传递给后面的 then 第一个函数内， 一次打印出"hello world"
   - 如果 false 的话，会调用 Promise 对象中的 reject 方法，则会进入 then 第二个函数内，打印'error'

- Promise 方法

  Promise 有五个常用的方法: then、 catch、 all、 race、 finally

  - then

    当 Promise 执行的内容符合成功条件时，调用 resolve 函数，失败就调用 reject 函数

    ```js
    promise.then(
      function (value) {
        // success
      },
      function (error) {
        // fail
      }
    );
    ```

    then 方法可以接受两个回调函数作为参数。 第一个回调函数是 Promise 对象的状态变为 resolve 时调用，第二个回调函数是 Promise 对象的状态变为 rejected 时候调用。其中第二个参数可以省略。

    then 方法返回的是一个新的 Promise 实例(不是原来那个 Promise 实例)，因此可以采用链式写法，即 then 方法后面在调用另一个 then 方法

    ```js
    const promise = new Promise((resolve, reject) => {
      ajax("first").success(function (res) {
        resolve(res);
      });
    });

    promise
      .then((res) => {
        return new Promise((resolve, reject) => {
          resolve(res);
        });
      })
      .then((res) => {
        return new Promise((resolve, reject) => {
          ajax("second").success(function (res) {
            resolve(res);
          });
        });
      })
      .then((res) => {});
    ```

  - catch

    Promise 对象除了有 then 方法，还有 catch 方法， 该方法相当于 then 方法的第二个参数，指向 reject 的回调函数。

    不过 catch 方法还有一个作用，就是在执行 resolve 回调函数时，如果出现错误，抛出异常，不会停止运行，而是进入 catch 方法中

    ```js
    p.then(
      (data) => {
        console.log("resolve" + data);
      },
      (error) => {
        console.log("rejected" + error);
      }
    );

    p.then((data) => {
      console.log("resolve" + data);
    }).catch((error) => {
      console.log("reject" + error);
    });
    ```

  - all

    all 方法可以完成并行任务， 它接收一个数组，数组的每一项都是一个 promise 对象。当数组中所有的 promise 的状态都达到 resolve 的时候， all 方法的状态就会变成 resolved， 如果有一个状态变成了 rejected，那么 all 方法的状态就会变成 rejected

    ```js
    const promise1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), 2000);
    });
    const promise2 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(2), 1000);
    });
    const promise3 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(3), 3000);
    });
    Promise.all([promise1, promise2, promise3]).then((res) => {
      console.log(res); // [1,2,3]
    });
    ```

  - race

    race 方法和 all 一样，接受的参数是一个每项都是 promise 数组， 但是与 all 不同的是， 当最先执行的事件执行完之后， 就直接返回该 promise 对象的值。
    如果第一个 promise 对象状态变为 resolved，那自身的状态变成了 resolved；反之第一个 promise 变成 rejected，那自身状态就会变成 rejected

    ```js
    const promise1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), 2000);
    });
    const promise2 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(2), 1000);
    });
    const promise3 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(3), 3000);
    });
    Promise.race([promise1, promise2, promise3]).then(
      (res) => {
        console.log(res); // 2
      },
      (error) => {
        consol.log(error);
      }
    );
    ```

    - 应用场景: 当要做一件事，超过多长时间就不做了，可以用这个方法来解决

      ```js
      Promise.race([promise1, timeOutPromise(5000)]).then((res) => {});
      ```

  - finally

    finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

    ```js
    promise
      .then((res) => {})
      .catch((error) => {})
      .finally(() => {});
    ```

    不管 promise 最后的状态，在执行完 then 或者 catch 指定的回调函数以后，都会执行 finally 方法指定的回调函数

    下面是一个例子，服务器使用 promise 处理请求，然后使用 finally 方法关掉服务器

    ```js
    server
      .listen(port)
      .then(() => {})
      .finally(server.stop);
    ```

    finally 方法的回调函数不接受任何参数， 这意味着没有办法知道，前面的 Promise 状态到底是 fulfilled 还是 rejected。 这表明 finally 方法里面的操作， 应该是与状态无关的，不依赖于 Promise 的执行结果。

    finally 本质上是 then 方法的特例

    ```js
    promise.finally(() => {});

    /**等同于*/
    promise.then(
      (res) => {
        return res;
      },
      (error) => {
        throw error;
      }
    );
    ```

    上面的代码中， 如果不使用 finally 方法，同样的语句需要为成功和失败两种情况各写一次。 有了 finally 方法，则只需要写一次

5.  Promise 解决了什么问题

    在工作中经常会碰到这样一个需求，比如使用 ajax 发一个 A 请求后，成功后拿到数据，需要把数据传给 B 请求

    ```js
    const fs = require("fs");
    fs.readFile("./a.txt", "utf-8", function (error, data) {
      fs.readFile(data, "utf-8", function (error, data) {
        fs.readFile(data, "utf-8", function (error, data) {
          console.log(data);
        });
      });
    });
    ```

    上面的代码有如下缺点

    - 后一个请求需要依赖于前一个请求成功后，将数据往下传递，会导致多个 ajax 请求嵌套的情况，代码不够直观
    - 如果前后两个请求不需要传递参数的情况下，那么后一个请求也需要前一个请求成功后在执行下一步操作，这种情况下那么也需要如上编写代码，导致代码不够直观

    ```js
    // Promise 出现, 解决了地狱回调的问题
    const fs = require("fs");
    function read(url) {
      return new Promise((resolve, reject) => {
        fs.readFile(url, "utf-8", function (error, data) {
          error && reject(error);
          resolve(data);
        });
      });
    }

    read("./a.txt")
      .then((data) => {
        return read(data);
      })
      .then((data) => {
        return read(data);
      })
      .then((data) => {
        console.log(data);
      });
    ```

6.  Promise.all 和 Promise.race 的区别和使用场景

    - Promise.all

      - 可以将多个 Promise 实例包装成一个新的 Promise 实例。同时成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候返回最先被 reject 失败状态的值
      - Promise.all 中传入的是数组，返回的也是数组，并且会将进行映射，传入的 Promise 对象返回的值是按照顺序在数组中排列的，但是注意的是他们执行的顺序并不是按照顺序的，除非可迭代对象为空
      - 需要注意，Promise.all 获得的成功结果的数组里面的数据顺序和 Promise 接收到的数组顺序是一致的，这样当遇到发送多个请求并根据请求顺序获取和使用数据的场景，就可以使用 Promise.all 来解决

    - Promise.race

      - 顾名思义， Promise.race 就是赛跑的意思，Promise.race([p1, p2, p3])里面哪个结果获的快，就返回哪个结果，不管结果本身是成功状态还是失败状态。当要做一件事，超过多长时间就不做了，可以用这个方法来解决

      ```js
      Promise.race([p1, timeOutPromise(5000)]).then((res) => {});
      ```

7.  对 async/await 的理解

    async/await 其实是 generator 的语法糖，他能实现的效果都能用 then 链来实现，他是为优化 then 链而开发出来的。

    从字面上来看，async 是异步的缩写，await 则为等待，所以很好理解 async 用于申明一个 function 是异步的， 而 await 用于等待一个异步方法执行完成。

    当然语法上强制规定 await 只能出现在 async 函数中先来看看 async 函数返回了什么

    ```js
    async function asy() {
      return "hello world";
    }
    const result = asy();
    console.log(result);
    ```

    所以 async 函数返回的是一个 Promise 对象。 async 函数(包含函数语句、 函数表达式、Lambda 表达式)会返回一个 Promise 对象，如果在函数中 return 一个直接量， async 会把这个直接量通过 Promise.resolve()封装成 Promise 对象

    async 函数返回的是一个 Promise 对象，所以在最外层不能用 await 获取其返回值的情况下，当然应该用原来的方式: then 链来处理这个 Promise 对象

    ```js
    async function asy() {
      return "hello world";
    }
    const result = asy();
    result.then((res) => console.log(res)); // hello world
    ```

    那如果 async 函数没有返回值，他会返回 Promise.resolve(undefined)

    联想一下 Promise 的特点--无等待，所以在没有 await 的情况下执行 async 函数，他会立即执行，返回一个 Promise，并且绝不会阻塞后面的语句。 这和普通的返回 Promise 对象的函数并无二致

    注意: Promise.resolve(x) 可以看作是 new Promise(resolve => resolve(x))的简写，可以用于快速封装字面量对象或其他对象，将其封装成 Promise 实例

8.  await 到底在等啥

    一般来说，都认为是 await 是在等待一个 async 函数完成。 不过按语法说明。 await 等待的是一个表达式， 这个表达式的计算结果是 Promise 对象或者其他值

    因为 async 函数返回一个 Promise 对象，所以 await 可以用于等待一个 async 函数的返回值

    注意到 await 不仅仅用于等 Promise 对象，他可以等任意表达式的结果， 所以 await 后面实际是可以接普通函数调用或者直接量的。

    ```js
    function getSomething() {
      return "something";
    }
    async function testAsync() {
      return Promise.resolve("hello async");
    }
    async function test() {
      const v1 = await getSomething();
      const v2 = await testAsync();
      console.log(v1, v2);
    }
    test();
    ```

    await 表达式的运算结果取决于它等的是什么

    - 如果它等到的不是一个 Promise 对象， 那 await 表达式的运算结果就是它等到的东西
    - 如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果

    ```js
    function testAsync() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(x);
        }, 3000);
      });
    }
    async function testAwt() {
      const result = await testAsync("hello world");
      console.log(result); // 三秒之后输出 hello world
      console.log("async"); // 三秒之后输出 async
    }
    testAwt();
    console.log("cug"); // 立即输出cug
    ```

    这就是 await 必须用在 async 函数中的原因，async 函数调用不会造成造成阻塞， 它内部所有的阻塞都被封装在一个 Promise 对象中异步执行。
    await 暂停当前 async 的执行，所以 cug 最先输出， hello world 和 async 是三秒后同时出现的

9.  async / await 的优势

    单一的 Promise 链并不能发现 async/await 的优势，但是如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了

    假设有一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上个步骤的结果

    ```js
    /**
     * 传入参数n表示这个函数执行的时间(毫秒)
     * 执行的结果是 n + 200， 这个值将用于下一步骤
     */
    function takeLongTime(n) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(n + 200), n);
      });
    }
    function step1(n) {
      console.log("step1 with " + n);
      return takeLongTime(n);
    }
    function step2(n) {
      console.log("step2 with" + n);
      return takeLongTime(n);
    }
    function step3(n) {
      console.log("step3 with" + n);
      return takeLongTime(n);
    }
    ```

    现在用 Promise 方式来实现

    ```js
    function doIt() {
      console.time("doIt");
      const time1 = 300;
      step1(time1)
        .then((time2) => step2(time2))
        .then((time3) => step3(time3))
        .then((result) => {
          console.log("result" + result);
          console.timeEnd("doIt");
        });
    }
    doIt();
    /**
     * step1 with 300
     * step2 with 500
     * step3 with 700
     * result with 900
     */
    ```

    用 async/await 方式实现

    ```js
    async function doIt() {
      console.time("doIt");
      const time1 = 300;
      const time2 = await step1(time1);
      const time3 = await step2(time2);
      const result = await step3(time3);
      console.log("result" + result);
      console.timeEnd("doIt");
    }
    doIt();
    ```

    结果和之前的 Promise 实现是一样的，但是这个代码看起来是不是清晰得多，几乎跟同步代码一致

10. async / await 对比 Promise 的优势

    - 代码读起来更加同步，Promise 虽然摆脱了回调地狱，但是 then 的链式调用也会带来额外的阅读负担
    - Promise 传递中间值非常麻烦， 而 async/await 几乎是同步的写法，非常优雅
    - 错误处理友好， async/await 可以用成熟的 try/catch， promise 的错误捕获非常冗余
    - 调试友好，Promise 的调试很差，由于没有代码块，你不能在一个返回表达式的箭头函数中设置断点，如果你在一个 then 代码块使用调试器的步进(step-over)功能，调试器并不会进入后续的.then 代码块，因为调试器只能跟踪同步代码的每一步

11. async/ await 如何捕获异常

    ```js
    async function fn() {
      try {
        const a = await Promise.reject("error");
      } catch (error) {
        console.log(error);
      }
    }
    ```

12. 并发 / 并行的区别

    - 并发是宏观概念，假设分别有任务 A 和任务 B， 在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发
    - 并行是微观概念，假设 CPU 中存在两个核心，那么就可以同时完成任务 A、B。 同时完成多个任务的情况就可以称之为并行

13. 什么是回调函数？ 回调函数有什么缺点？ 如何解决回调地狱？

    ```js
    ajax(url, () => {
      // 处理逻辑
    });
    ```

    回调函数有一个致命的弱点就是容易写出回调地狱。 假设多个请求存在依赖性，可能有如下代码

    ```js
    function firstAjax() {
      ajax(url1, () => {
        // 处理逻辑
        secondAjax();
      });
    }
    function secondAjax() {
      ajax(url2, () => {
        // 处理逻辑
      });
    }
    ajax(url, () => {
      firstAjax();
    });
    ```

    回调地狱的根本问题就是

    - 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身
    - 嵌套函数一多，就很难处理异常
    - 不能使用 try/catch 捕获错误
    - 不能直接 return

14. setTimeout、 setInterval、 requestAnimationFrame 各有什么特点

    - 常见的定时器函数有 setTimeout、 setInterval、 requestAnimationFrame
    - 最常用的是 setTimeout， 很多人认为 setTimeout 是延时多久， 那就应该是多久后执行

    其实这个观点是错误的，因为 JS 是单线程执行的，如果前面的代码影响了性能，就会导致 setTimeout 不会按期执行。当然可以通过代码修改 setTimeout 从而使定时器相对准确

    ```js
    let period = 60 * 1000 * 60 * 2;
    let startTime = new Date().getTime();
    let count = 0;
    let end = new Date().getTime() + period;
    let interval = 1000;
    let currentInterval = interval;
    function loop() {
      count++;
      // 代码执行所消耗的时间
      let offset = new Date().getTime() - (startTime + count * interval);
      let diff = end - new Date().getTime();
      let h = Math.floor(diff / (60 * 1000 * 60));
      let hdiff = diff % (60 * 1000 * 60);
      let m = Math.floor(hdiff / (60 * 1000));
      let mdiff = hdiff % (60 * 1000);
      let s = mdiff / 1000;
      let sCeil = Math.ceil(s);
      let sFloor = Math.floor(s);
      // 得到下一次循环所消耗的时间
      currentInterval = interval - offset;
      console.log(
        "时：" + h,
        "分：" + m,
        "毫秒：" + s,
        "秒向上取整：" + sCeil,
        "代码执行时间：" + offset,
        "下次循环间隔" + currentInterval
      );
      setTimeout(loop, currentInterval);
    }
    setTimeout(loop, currentInterval);
    ```

    接下来看 setInterval， 其实这个函数作用和 setTimeout 基本一致， 只是该函数是每隔一段时间执行一次回调函数

    通常来说不建议使用 setInterval。 第一它和 setTimeout 一样，不能保证在预期的时间执行任务。 第二它存在执行积累的问题

    ```js
    function fn() {
      setInterval(function () {
        console.log(2);
      }, 1000);
      sleep(2000);
    }
    demo();
    ```

    以上代码在浏览器环境中，如果定时器执行过程中出现耗时操作，多个回调函数会在耗时操作结束以后同时执行，这样可能就会带来性能上的问题

    如果有循环定时器的需求，其实完全可以通过 request AnimationFrame 来实现

    ```js
    function setInterval(callback, interval) {
      let timer;
      const now = Date.now;
      let startTime = now();
      let endTime = startTime;

      const loop = () => {
        timer = window.requestAnimationFrame(loop);
        endTime = now();
        if (endTime - startTime >= interval) {
          startTime = endTime = now();
          callback(timer);
        }
      };
      timer = window.requestAnimationFrame(loop);
      return timer;
    }
    let a = 0;
    setInterval((timer) => {
      console.log(1);
      a++;
      if (a === 3) cancalAnimationFrame(timer);
    }, 1000);
    ```

    首先 requestAnimationFrame 自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次(不掉帧的情况下)，并且该函数的延时效果是精确的， 没有其他定时器时间不准的问题，当然你也可以通过该函数来实现 setTimeout
