const Promises = require('./promise');

const p = new Promises((resolve, reject) => {
    resolve('success');
});

function p2() {
  return new Promises((resolve, reject) => {
    resolve('p2');
  });
}

p.then(value => {
  console.log(1);
  console.log(value);
  return p2();
}).then(value => {
  console.log(2);
  console.log(value);
});
