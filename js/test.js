const Promises = require('./promise');

const p = new Promises((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
    reject('failed');
  }, 2000);
});

p.then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
