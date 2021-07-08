### JavaScript 基础学习

1. `call`、`apply`、`bind`实现

   - call 调用一个函数, 其具有一个指定的 this 值和分别地提供的参数(参数的列表)。

     - 将函数设为对象的属性
     - 执行&删除这个函数
     - 指定`this`到函数并传入给定参数执行函数
     - 如果不传入参数，默认指向 window

   - apply 调用一个函数，以及作为一个数组（或类似数组对象）提供的参数。

   - bind 会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

     - bind 实现需要考虑实例化后对原型链的影响。

2. `new` 关键字实现

   - 在内存中创建一个新对象
   - 新对象的 prototype 赋值构造函数的原型
   - 将 this 指向新对象， 添加新属性
   - 判断是否为非空对象

3. 对象的继承
