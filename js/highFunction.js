/**高阶函数 */

/**1. 函数作为参数被传递 */

/**1.1 回调函数 */

/**异步处理 */
var getUserInfo = function (url, userId, callback) {
  $.ajax(url, userId, function (data) {
    if (typeof callback === 'function') callback(data);
  });
};

getUserInfo('www.xxx.com', 13, function (data) {
  console.log(data);
});

/**
 * 当一个函数不适合执行一些请求时,
 * 可以把这些请求封装成一个函数
 * 并把它作为参数传递给另外一个函数
 * 为委托给另外一个函数执行
 *
 * 需求: 想要在页面中创建 100 个 div 节点, 然后把这些 div 节点都设置为隐藏
 */
var appendDiv = function () {
  for (var i = 0; i < 100; i++) {
    var div = document.createElement('div');
    div.innerHTML = i;
    document.body.appendChild(div);
    div.style.display = 'none';
  }
};
appendDiv();

/**将 `div.style.display = 'none'` 抽出, 用回调函数的形式传入 */
var appendDiv = function (callback) {
  for (var i = 0; i < 100; i++) {
    var div = document.createElement('div');
    div.innerHTML = i;
    document.body.appendChild(div);
    if (typeof callback === 'function') callback(div);
  }
};
appendDiv(function (node) {
  node.style.display = 'none';
});

/**
 * 2. 函数作为返回值输出: 让函数继续返回一个可执行的函数, 意味着运算过程是可延续的
 **/

/**2.1 判断数据类型: 用 Object.prototype.toString.call 判断 */
var isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[Object ${type}]`;
  };
};

/**用循环, 批量注册 */
var Type = {};
for (var i = 0, type; (type = ['String', 'Array', 'Number'][i++]); ) {
  (function (type) {
    Type[`is${type}`] = function (obj) {
      return Object.prototype.toString.call(obj) === `[Object ${type}]`;
    };
  })(type);
}

/**2.2 getSingle: 单例模式 */
var getSingle = function (fn) {
  var ret;
  return function () {
    return ret || (ret = fn.apply(this, arguments));
  };
};

/**即把函数当成参数、又返回另外的函数 */
var getScript = getSingle(function () {
  return document.createElement('script');
});
var script1 = getScript();
var script2 = getScript();
console.log(script1 === script2); // true

/**
 * 3. AOP(面向切面编程) => 装饰者模式
 *    作用: 把一些跟核心业务逻辑模块无关的功能抽离出来, 包括日志统计、安全控制、异常处理等
 *         把这些功能抽离出来之后, 在通过动态织入的方式掺入到业务逻辑模块中
 *
 *    好处:
 *        - 可以保持业务逻辑模块的纯净和高内聚性
 *        - 可以方便地复用日志统计等功能模块
 **/

/**扩展 Function.prototype */

/**执行前函数 */
Function.prototype.before = function (beforeFunc) {
  /**保存原函数的引用 */
  var _this = this;
  /**返回包含了原函数和新函数的代理函数 */
  return function () {
    /**执行新函数, 修改 this */
    beforeFunc.apply(this, arguments);
    /**执行原函数 */
    return _this.apply(this, arguments);
  };
};

/**执行后函数 */
Function.prototype.after = function (afterFunc) {
  var _this = this;
  return function () {
    /**执行原函数 */
    var ret = _this.apply(this, arguments);
    /**执行新函数, 修改 this */
    afterFunc.apply(this, arguments);
    return ret;
  };
};

var func = function () {
  console.log(2);
};
func = func
  .before(function () {
    console.log(1);
  })
  .after(function () {
    console.log(3);
  });

func(); // 1 => 2 => 3

/**
 * curring: 柯里化函数
 *    部分求值, 首先会接受一些参数, 接受了这些参数之后, 该函数不会立即求值, 而是继续返回另外一个函数, 刚才传入的参数在函数形成的闭包中被保存起来
 *    待到函数被真正需求求值的时候, 之前传入的所有参数都会被一次性用于求值
 */

/**需求: 计算每月开销。每天结束前记录当天花掉了多少钱 */
var result = 0;
var cost = function (money) {
  result += money;
};
cost(100);
cost(200);
cost(300);

console.log(result);

/**currying 第一版 */
const cost = (function () {
  var args = [];
  return function () {
    if (arguments.length === 0) {
      var money = 0;
      for (var i = 0, len = args.length; i < len; i++) {
        money += args[i];
      }
      return money;
    } else {
      Array.prototype.push.apply(args, arguments);
    }
  };
})();
cost(100);
cost(200);
console.log(cost());

/**currying 第二版 */
var currying = function (fn) {
  var args = [];
  return function () {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      Array.prototype.push.apply(args, arguments);
      /**arguments.callee指向当前arguments指向的函数。 */
      return arguments.callee;
    }
  };
};
var cost = (function () {
  var money = 0;
  return function () {
    for (var i = 0, len = arguments.length; i < len; i++) {
      money += arguments[i];
    }
    return money;
  };
})();

cost = currying(cost);

cost(100)
cost(200)
cost(300)

console.log(cost());