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
