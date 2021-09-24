const arr = ["HC2201", "HA2201", "RU2109", "BU2112", "RU2201", "HC2110"];

function sortFun(arr) {
  return arr.sort(function (a, b) {
    const wordOfA = /^[A-Za-z]+/.exec(a)[0];
    const wordOfB = /^[A-Za-z]+/.exec(b)[0];
    const numberOfOfA = /\d+/.exec(a);
    const numberOfOfB = /\d+/.exec(b);
    // console.log(number)
    if (wordOfA === wordOfB) {
      return numberOfOfB - numberOfOfA;
    } else {
      return wordOfA.localeCompare(wordOfB);
    }
  });
}

console.log(sortFun(arr));
