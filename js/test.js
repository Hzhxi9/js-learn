const Promises = require('./promise');

const p = new Promises((resolve, reject) => {
     throw new Error('执行器错误')
});

const p1 = p.then(value => {
    console.log(1);
    console.log('resolve', value)
}, reason => {
  console.log(reason)
})


// p1.then(value => {
//   console.log(2);
//   console.log(value);
// }, reason => {
//   console.log(3)
//   console.log(reason.message)
// })
