function* fb() {
  var s1 = 0,
    s2 = 1;

  while (true) {
    yield (() => {
      s2 = s2 + s1;
      s1 = s2 - s1;
      return s2;
    })();
  }
}
const fib = fb();

for (const item of fib) {
  if (item >= 4) break;
  console.log(item);
}

// var o = feb(10),
//   res,
//   result = [];
// while (!(res = o.next()).done) {
//   result.push(res.value);
// }
// console.log(result);

// function recursion(n) {
//   if (n <= 0) return 0;
//   if (n === 1) return 1;
//   return recursion(n - 1) + recursion(n - 2);
// }
// console.time('recursion');
// console.log(recursion(100));
// console.timeEnd('recursion');

let cache = {};
function recursion2cache(n) {
  if (cache.hasOwnProperty(n)) {
    console.log("命中了直接用");
    return cache[n];
  }
  const func = recursionImp2cache(0, 1, n);
 
  cache[n] = func;
  return func;
}

function recursionImp2cache(a, b, n) {
  if (n === 0) return a;
  return recursionImp2cache(b, a + b, n - 1);
}
console.time('tail cache');
console.log(recursion2cache(100));
console.timeEnd('tail cache');


/**
 * 在函数的执行过程中，如果最后一个动作是一个函数的调用，即这个调用的返回值被当前函数直接返回，则称为尾调用 
 * function f(){
 *    return g()
 * }
 * 
 * 在 f 函数中，最后一步操作是调用 g 函数，并且调用 g 函数的返回值被 f 函数直接返回，这就是尾调用。
 **/
function recursion2tail(n) {
  return recursionImpl(0, 1, n);
}

function recursionImpl(a, b, n) {
  return n === 0 ? a : recursionImpl(b, a + b, n - 1);
}
console.time('tail');
console.log(recursion2tail(100));
console.timeEnd('tail');

function fibonacciTail(a = 0, b = 1, n) {
  if (n === 0) return a;
  return fibonacciTail(b, a + b, n - 1);
}

// 不会在调用栈上增加新的堆栈帧，而是直接更新调用栈，调用栈所占空间始终是常量，节省了内存，避免了爆栈的可能性
  // 由于进入下一个函数调用时，前一个函数内部的局部变量（如果有的话）都不需要了，那么调用栈的长度不会增加，可以直接跳入被尾调用的函数。
  // 调用栈的长度增加了一位，原因是 f 函数中的常量 1 必需保持保持在调用栈中，等待 g 函数调用返回后才能被计算回收。如果 g 函数内部还调用了函数 h 的话，就需要等待 h 函数返回，以此类推，调用栈会越来越长。
  // 在一个尾调用中，如果函数最后的尾调用位置上是这个函数本身，则被称为尾递归



/**缓存对象 */
// let cache = {};
// /**
//  * 优化斐波那契数列
//  * ache思想
//  */
// function fib2cache(n) {
//   /**计数 */
//   // console.count("计数");

//   /**判断缓存对象有没有这个这个值，如果有就直接用 */
//   if (cache.hasOwnProperty(n)) {
//     // console.log("命中了直接用");
//     return cache[n];
//   }
//   /**缓存对象没有的值 */
//   const v = n === 0 || n === 1 ? 1 : fib2cache(n - 1) + fib2cache(n - 2);

//   /**写入缓存,每次算一个值，就加入缓存 */
//   cache[n] = v;

//   return v;
// }

// console.time('tail');
// console.log(fib2cache(40));
// console.timeEnd('tail');
