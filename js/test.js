const Promises = require('./promise');

const p = new Promises((resolve, reject) => {
    resolve('success');
});

const p1 = p.then(value => {
    console.log(1);
    console.log('resolve', value)
    return p1
})


p1.then(value => {
  console.log(2);
  console.log(value);
}, reason => {
  console.log(3)
  console.log(reason.message)
})
