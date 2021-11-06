const Promises = require('./promise');

const p = new Promises((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
    reject('failed');
  }, 2000);
});


p.then(
  value => {
    console.log(1)
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
p.then(
  value => {
      console.log(2)
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
p.then(
  value => {
    console.log(3)
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);