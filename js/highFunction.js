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

cost(100);
cost(200);
cost(300);

console.log(cost());

/**
 * uncurrying: 一个对象未必只能使用它自身的方法, 将泛化的 this 的过程提取出来
 */
Function.prototype.uncurrying = function () {
  /**
   * 此时的 this 是调用的 uncurrying 的函数
   * 例如: Array.prototype.push
   *
   * @example
   *  var push = Array.prototype.push.uncurrying()
   *  var obj = { length: 1, 0: 1 }
   *  push(obj, 2)
   *  console.log(obj); // { length: 2, 0: 1, 1: 2 }
   */
  var _this = this;
  return function () {
    var obj = Array.prototype.shift.call(arguments);
    /**
     * obj => { 0: 1, length: 1 }
     * arguments 对象的第一个元素被截去 => [2]
     **/
    return _this.apply(obj, arguments); // 相当于 Array.prototype.push.apply(obj, 2)
  };
};

/**
 * uncurrying 的另外一种实现
 */
Function.prototype.uncurrying = function () {
  var _this = this;
  return function () {
    return Function.prototype.call.apply(_this, arguments);
  };
};

/**🌰 : 将 Array.prototype.push 转换为一个通用的 push 函数*/
var push = Array.prototype.push.uncurrying();
(function () {
  push(arguments, 4);
  console.log(arguments); // [1, 2, 3, 4]
})(1, 2, 3);

/**🌰 : 一次性复制 Array.prototype 的方法 */
for (var i = 0, fn, arr = ['push', 'shift', 'forEach']; (fn = arr[i++]); ) {
  Array[fn] = Array.prototype[fn].uncurrying();
}
var obj = { 0: 1, 1: 2, 2: 3, length: 3 };

Array.push(obj, 4);
console.log(obj.length); // 4

var first = Array.shift(obj);
console.log(first); // 1
console.log(obj); // { 0: 2, 1: 3, 2: 4, length: 3 }

Array.forEach(obj, function (i, n) {
  console.log(n);
});

/**🌰 : Function.prototype.call & Function.prototype.apply 被 uncurrying */
var call = Function.prototype.call.uncurrying();
var fn = function (name) {
  console.log(name);
};
console.log(fn, window, 'hello'); // hello

var apply = Function.prototype.apply.uncurrying();
var fn = function (name) {
  console.log(this.name, arguments); // hello [1, 2, 3]
};
apply(fn, { name: 'hello' }, [1, 2, 3]);

/**
 * 函数节流
 *  - 原理: 将即将被执行的函数用 setTimeout 延迟一段时间执行, 如果该次延迟执行还没有完成, 则忽略接下来调用该函数的请求
 *  - 函数被触发的频率太高时可以使用
 *  - 应用场景:
 *    - window.onresize 事件
 *    - mousemove 事件
 *    - 上传进度
 *  @param {Function} 需要被延迟执行的函数
 *  @param {Number} 延迟执行的时间
 **/
var throttle = function (fn, delay = 500) {
  var _this = fn, //保存需要被延迟执行的函数引用
    timer, // 定时器
    first_time; // 是否第一次调用

  return function () {
    var args = arguments,
      _me = this;

    if (first_time) {
      /**如果不是第一次调用, 不需要延迟执行 */
      _this.apply(_me, args);
      return (first_time = false);
    }

    if (timer) {
      /**如果定时器还在, 说明前一次延迟执行还没有完成 */
      return false;
    }

    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      _this.apply(_me, args);
    }, delay);
  };
};

window.onresize = throttle(function () {
  console.log(1);
});

/**
 * 分时函数
 *   - 应用场景: 某些函数是用户主动调用的, 因为一些客观原因, 这些函数会影响页面性能
 */

/**🌰 : 创建 WebQQ 好友列表 */
var arr = [];
/**假设 arr 装载了 1000 个好友数据 */
for (var i = 0; i <= 1000; i++) arr.push(i);
var renderFriendList = function (data) {
  for (var i = 0, len = data.length; i < len; i++) {
    var div = document.createElement('div');
    div.innerHTML = i;
    document.body.appendChild(div);
  }
};
/** 短时间内往页面大量添加 DOM 节点会让浏览器吃不消 */
renderFriendList(arr);

/**
 * 解决方案: 使用 分时函数(timeChunk)函数, 让创建节点的工资分批进行
 * 比如 1 秒钟创建 1000 个节点, 改为 200 毫秒创建 8 个节点
 * @param {any} 创建节点时需要用到的数据
 * @param {Function} 封装了创建节点逻辑的函数
 * @param {Number} 每一批创建的节点数量
 */
var timeChunk = function (arr, fn, count = 1) {
  var obj,
    t,
    len = arr.length;
  var start = function () {
    for (var i = 0; i < Math.min(count, arr.length); i++) {
      var obj = arr.shift();
      fn(obj);
    }
  };
  return function () {
    t = setInterval(function () {
      /*如果全部节点都被创建好 */
      if (arr.length === 0) return clearInterval(t);
      start();
      /**分批执行的时间间隔, 也可以用参数传入 */
    }, 200);
  };
};

/**🌰 : 创建 WebQQ 好友列表 */
var arr = [];
/**假设 arr 装载了 1000 个好友数据 */
for (var i = 0; i <= 1000; i++) arr.push(i);

var renderFriendList = timeChunk(
  arr,
  function (data) {
    for (var i = 0, len = data.length; i < len; i++) {
      var div = document.createElement('div');
      div.innerHTML = i;
      document.body.appendChild(div);
    }
  },
  8
);

renderFriendList();

/**
 * 惰性加载函数
 *  因为浏览器之间的实现差异, 一些嗅探工作总是不可避免
 *  比如需要一个在各个浏览器中能够通用的事件绑定函数 addEvent
 **/

/**
 * 常见写法
 *  存在缺点: 每次调用的时候都会执行里面的 if 条件分支, 虽然执行这些 if 分支的开销不算大, 但可以让程序避免这些重复的执行过程
 **/
var addEvent = function (elem, type, handler) {
  if (window.addEventListener) return elem.addEventListener(type, handler, false);
  if (window.attachEvent) return elem.attachEvent('on' + type, handler);
};

/**
 * 第二个方案
 *  把嗅探浏览器的操作提前到代码加载的时候, 在代码加载的时候就立刻进行一次判断, 以便让 addEvent 返回一个包裹了正确逻辑的函数
 *  缺点: 也许从头到尾都没有使用 addEvent 函数, 这样子看第一次浏览器嗅探就是完全多余的操作, 也会稍稍延长页面 ready 的时间
 */
var addEvent = (function () {
  if (window.addEventListener) {
    return function (elem, type, handler) {
      elem.addEventListener(type, handler, false);
    };
  }
  if (window.attachEvent) {
    return function (elem, type, handler) {
      elem.addEvent('on' + type, handler);
    };
  }
})();

/**
 * 第三种方案: 惰性加载函数
 * 此时 addEvent 依然被声明为一个普通函数, 在函数里面依然有一些分支判断
 * 但是在第一次进入条件分支之后, 在函数内部会重写这个函数,
 * 重写之后就是我们期望的 addEvent 函数
 * 在下一次进入 addEvent 函数的时候, 函数内部就不存在 条件分支判断
 */
var addEvent = function (elem, type, handler) {
  if (window.addEventListener) {
    addEvent = function (elem, type, handler) {
      elem.addEventListener(type, handler, false);
    };
  } else if (window.addEvent) {
    addEvent = function (elem, type, handler){
      elem.addEvent('on' + type, handler)
    }
  }
  addEvent(elem, type, handler)
};
