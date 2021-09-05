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
18. object.assign 和扩展运算法是深拷贝还是浅拷贝，两者区别
