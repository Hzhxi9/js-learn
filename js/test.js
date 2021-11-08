const Promises = require('./promise');

const p = new Promises((resolve, reject) => {
     throw new Error('执行器错误')
});

// 第一个then方法中的错误要在第二个then方法中捕获到
p.then(value => {
  console.log(1)
  console.log('resolve', value)
  throw new Error('then error')
}, reason => {
  console.log(2)
  console.log(reason.message)
}).then(value => {
  console.log(3)
  console.log(value);
}, reason => {
  console.log(4)
  console.log(reason.message)
})


// p1.then(value => {
//   console.log(2);
//   console.log(value);
// }, reason => {
//   console.log(3)
//   console.log(reason.message)
// })
