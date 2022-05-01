/**上级作用域的概念 */

/**函数的上级作用域在哪里创建创建的，上级作用域就是谁 */
var a = 10;
function foo() {
  console.log(a); // 12
}
function sun() {
  var a = 20;
  foo();
}
sum();
/**函数 foo 是在全局下创建的, 所以 a 的上级作用域是 window */

/**🌰 */
var n = 10;
function fn() {
  var n = 20;
  function f() {
    n++;
    console.log(n);
  }
  f();
  return f;
}
var x = fn(); // 21
x(); // 22
x(); // 23
console.log(n); // 10

/**
 * JS 队栈内存释放
 * - 堆内存:
 *      存储引用类型值, 对象类型就是键值对, 函数就会死代码字符串
 * - 堆内存释放:
 *      将引用类型的空间地址变量赋值成 null, 或没有变量占用堆内存了浏览器就会释放掉这个地址
 * - 栈内存:
 *      提供代码执行的环境和存储基本类型值
 * - 栈内存释放:
 *      一般当函数执行完函数的私有作用域就会释放掉
 * - 栈内存释放特殊情况:
 *      - 函数执行完, 但是函数的私有作用域内有内容被栈外的变量还在使用的, 栈内存就不能释放里面的基本值也就不会被释放
 *      - 全局下的栈内存只有页面被关闭的时候才会被释放
 **/

/**闭包概念 */

/**
 * - JS 忍者秘籍: 闭包允许函数访问并操作函数外部的变量
 * - 红宝书: 闭包是指有权访问另外一个函数作用域中的变量的函数
 * - MDN: 闭包是指那些能够访问自由变量的函数, 这里的自由变量是外部函数作用域中的变量
 * - 总结: 闭包是指有权访问另一个函数作用域中变量的函数
 */

/**
 * 形成闭包的原因: 内部的函数存在外部作用域的引用就会导致闭包
 *
 * 闭包变量存储的位置: 闭包中的变量存储的位置是堆内存
 *
 * 闭包的作用:
 *    - 保护函数的私有变量不受外部的干扰。形成不销毁的栈内存。
 *    - 保存，把一些函数内的值保存下来。闭包可以实现方法和属性的私有化
 */

/**闭包的使用场景 */

/**1. return 一个函数 */
var n = 10;
function fn() {
  var n = 20;
  function f() {
    n++;
    console.log(n);
  }
  return f;
}
var x = fn();
x(); // 21

/**2. 函数作为参数 */
var a = 'string';
function foo() {
  var a = 'foo';
  function fo() {
    console.log(a);
  }
  return fo;
}
function f(p) {
  var a = 'f';
  p();
}
f(foo()); // foo

/**3. IIFE(自执行函数) */
var n = 'string/';
(function p() {
  console.log(n); // string
})();

/**4. 循环赋值 */
for (var i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 1000);
  })(i);
}
/**
 * 因为存在闭包的原因上面能依次输出1~10, 闭包形成了10个互不干扰的私有作用
 * 将外层的自执行函数去掉就不存在外部作用域的引用, 输出的结果就是连续的 10
 *
 * 为什么会连续输出 10？
 *
 * 因为 JS 是单线程的遇到异步的代码不会先执行(会入栈),
 * 等到同步的代码执行完 i++ 到 10 时, 异步代码才开始执行此时的 i = 10
 * 输出的都是 10
 */
window.name = 'strings';
setTimeout(function () {
  console.log(window.name);
}, 100);

/**6. 节流防抖 */

/**节流 */
function throttle(fn, timeout) {
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, timeout);
  };
}

/**防抖 */
function debounce(fn, timeout) {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
}

/**7. 柯里化实现 */
function curry(fn, len = fn.length) {
  return _curry(fn, len);
}

function _curry(fn, len, ...args) {
  return function (...params) {
    let _args = [...args, ...params];
    if (_args.length >= len) return fn.apply(this, _args);
    return _curry.call(this, fn, len, ...args);
  };
}

/**
 * 使用闭包需要注意什么
 *  容易导致内存泄露
 *  闭包会携带包含其他的函数作用域, 因此会比其他函数占有更多的内存
 *  过度使用闭包会导致内存占用过多, 所以要谨慎使用闭包
 **/

/**🌰: for 循环和闭包 */

/**自执行函数和闭包 */
var data = [];
for (var i = 0; i < 3; i++) {
  (function (i) {
    data[i] = function () {
      console.log(i);
    };
  })(i);
}

for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => {
      data[j] = function () {
        console.log(j);
      };
    }, 0);
  })(i);
}

for (let i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0](); // 0
data[1](); // 1
data[2](); // 2

/**🌰 */
var result = [];
var a = 3;
var total = 0;
function foo(a) {
  for (var i = 0; i < 3; i++) {
    result[i] = function () {
      total += i * a;
      console.log(total)
    }
  }
}

foo(1);
result[0]();  // 3
result[1]();  // 6
result[2]();  // 9

/**闭包应用 */

/**
 * 1. 解决循环获取不到正确的索引 i
 *    因为 div 节点的 onclick 事件是被异步触发的, 当事件被触发, 循环早已结束, 此时 i 的值已经为 5
 **/
try {
  var nodes = document.querySelectorAll('.btn');
  for (var i = 0, len = nodes.length; i < len; i++) {
    /**
     * 用闭包将每次循环的 i 封闭起来,
     * 当在事件函数中顺着作用域链中从内到外查找变量 i 时,
     * 会先找到被封闭在闭包环境中的 i */
    (function (index) {
      nodes[index].onclick = function () {
        console.log(index);
      };
    })(i);
  }
} catch (error) {}

/**
 * 2. 封装变量: 可以帮助一些不需要暴露在全局的变量封装成私有变量
 */

var mult = (function () {
  /**
   * - 那些相同的参数存进缓存, 加入缓存机制提高这个函数的性能
   * - 仅仅在 mult 函数中使用, 与其让 cache 变量跟 mult 函数一起平行暴露在全局作用域下, 不如把它封闭在函数内部里
   *   - 减少页面的全局变量
   *   - 避免这个变量在其他地方被不小心修改而引发错误
   */
  var cache = {};
  /**
   * 提炼函数:
   *    将一个大函数内的能够独立出来一些代码块封装在独立出来的小函数里面
   *        - 提高复用性
   *        - 有良好的命名, 能起到注释的作用
   *    如果这小小函数不需要在程序的其他地方使用, 最好将他们用闭包封装起来
   * @returns {number}
   */
  function calc() {
    var a = 1;
    for (var i = 0, lens = arguments.length; i < lens; i++) a += arguments[i];
    return a;
  }
  return function () {
    var args = Array.prototype.join.call(arguments);
    if (cache[args]) return cache[args];
    return (cache[args] = calc.apply(null, arguments));
  };
})();

console.log(mult(1, 2, 3, 4));
console.log(mult(1, 2, 3, 4));

/**
 * 3. 延续局部变量的寿命
 */
var report = (function () {
  var imgs = [];
  return function (src) {
    var img = new Image();
    imgs.push(img);
    img.src = src;
  };
})();

/**
 * 4. 闭包和面向对象设计: 对象以方法的形态包含过程, 而闭包则是在过程中以环境的形式包含了数据
 */

/**4.1 闭包保存变量 */
var extent1 = (function () {
  var value = 0;
  return {
    call() {
      value++;
      console.log(value);
    },
  };
})();
extent1.call(); // 1
extent1.call(); // 2
extent1.call(); // 3

/**4.2 面向对象 */
var extent2 = {
  value: 0,
  call: function () {
    this.value++;
    console.log(this.value);
  },
};
extent2.call(); // 1
extent2.call(); // 2
extent2.call(); // 3

/**4.3 构造函数 */
function Extent() {
  this.value = 0;
  this.call = function () {
    this.value++;
    console.log(this.value);
  };
}
var extent3 = new Extent();
extent3.call(); // 1
extent3.call(); // 2
extent3.call(); // 3

/**
 * 5. 用闭包实现命令模式
 *
 *   命令模式:
 *      - 把请求封装为对象, 从而分离请求的发起者和请求的接收者(执行者)之间的耦合关系
 *      - 在命令被执行之前, 可以预先往命令对象中植入命令的接收者
 *
 *   但在 JavaScript 中, 函数作为一等公民, 本身就可以四处传递, 用函数对象而不是普通对象来封装请求显得更加简单和自然
 *   如果需要往函数对象中预先植入命令的接收者, 那么闭包可以完成这个工作
 *
 *   - 在面向对象版本的命令模式中, 预先植入的命令接收者被当成对象的属性保存起来
 *   - 在闭包版本的命令模式中, 命令模式接收者会被封闭的闭包形成的环境中
 */
var Tv = {
  open: function () {
    console.log('open tv');
  },
  close: function () {
    console.log('close tv');
  },
};

/**5.1 面向对象 */
var OpenTVCommand = function (receiver) {
  this.receiver = receiver;
};
OpenTvCommand.prototype.execute = function () {
  this.receiver.open(); // 执行命令, 打开电视机
};

OpenTvCommand.prototype.undo = function () {
  this.receiver.close(); // 撤销命令, 关闭电视机
};

/**5.2 闭包 */
var createCommand = function (receiver) {
  var execute = function () {
    return receiver.open(); // 执行命令, 打开电视机
  };
  var undo = function () {
    return receiver.close(); // 撤销命令, 关闭电视机
  };
  return { execute, undo };
};

/**执行命令 */
var setCommand = function (command) {
  document.getElementById('execute').onclick = function () {
    command.execute(); // 输出: 打开电视机
  };
  document.getElementById('undo').onclick = function () {
    command.undo(); // 输出: 关闭电视机
  };
};
/**面向对象 */
setCommand(new OpenTvCommand(Tv));

/**闭包 */
setCommand(createCommand(Tv));
