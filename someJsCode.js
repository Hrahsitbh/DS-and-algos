// clear all timeout
const customTimeOut = {
  timeoutIds: [],
  setTimeout(fn, delay) {
    const id = window.setTimeout(fn, delay);
    this.timeoutIds.push(id);
    return id;
  },
  clearAllTimeout() {
    while (this.timeoutIds.length) {
      clearTimeout(this.timeoutIds.pop());
    }
  },
};

customTimeOut.setTimeout(() => console.log("sd"), 0);
customTimeOut.clearAllTimeout();

// memoized function
const memo = function (fn) {
  const cache = {};
  return function () {
    const key = JSON.stringify(arguments);
    if (cache[key]) return cache[key];

    const evaluateResult = fn(...arguments);
    cache[key] = evaluateResult;
    return evaluateResult;
  };
};

function fact(n) {
  if (n === 0 || n === 1) return 1;
  return n * fact(n - 1);
}

const factMemo = memo(fact);
factMemo(100);

// currying
function curry(fn) {
  return function currying(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return currying.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
curriedSum(1, 2)(3);

// flatten an array with stack

function flatArray(arr) {
  const stack = [...arr];
  const res = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  return res;
}

flatArray([1, 2, [3, 4, [5, 6]]]);

// deep flatten an object with recursion
function falttenObj(obj, prefix) {
  let output = {};
  for (let k in obj) {
    let val = obj[k];

    const newKey = prefix ? `${prefix}.${k}` : k;

    if (typeof val === "object") {
      // if an array
      if (Array.isArray(val)) {
        // convert to object
        const { ...arrToObj } = val;
        const newObj = falttenObj(arrToObj, newKey);
        output = { ...output, ...newObj };
      } else {
        const newObj = falttenObj(val, newKey);
        output = { ...output, ...newObj };
      }
    } // not an object
    else {
      output = { ...output, ...{ [newKey]: val } };
    }
  }
  return output;
}

const nested = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};

console.log(falttenObj(nested));

// debounce
function debouce(func, delay, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const context = this;
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, delay);
    if (callNow) func.apply(context, args);
  };
}

// throttling
function throttle(func, limit) {
  let lastFn;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// promis.all ployfill
Promise.myPromiseAll = function (taskList) {
  const result = [];
  let allCompletedPromises = 0;
  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => {
      if (typeof promise !== "object") {
        result[index] = promise;
        allCompletedPromises++;
        if (allCompletedPromises === taskList.length) resolve(result);
      } else {
        promise
          .then((val) => {
            result[index] = val;
            allCompletedPromises++;
            if (allCompletedPromises === taskList.length) resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
};

function task(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

const taskList = [task(1000), task(5000), task(3000)];

//run promise.all
Promise.myPromiseAll(taskList)
  .then((results) => {
    console.log("got results", results);
  })
  .catch(console.error);

// compose => right to left
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((res, fn) => fn(res), x);

const multiply20 = (price) => price * 20;
const divide100 = (price) => price / 100;
const normalizePrice = (price) => price.toFixed(2);

const price = compose(normalizePrice, divide100, multiply20);
price(200);

// pipe
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((res, fn) => fn(res), x);

// array forEach polyfill
Array.myForEach = function (cb) {
  for (let i = 0; i < cb.length; i++) {
    cb(this[i], i, this);
  }
};

// array map polyfill
Array.myMap = function (cb) {
  const arr = [];
  for (let i = 0; i < cb.length; i++) {
    arr.push(cb(this[i], i, this));
  }
  return arr;
};

// reduce
Array.prototype.myReduce = function (cb, initialVal = undefined) {
  let accumlator = initialVal || this[0];
  let i = initialVal ? 0 : 1;
  for (i; i < this.length; i++) {
    accumlator += cb(accumlator, this[i], i, this);
  }
  return accumlator;
};

function myBind(context, ...args) {
  // this here refers to function bound
  let fn = this;
  return function (...args2) {
    fn.apply(context, [...args, ...args2]);
  };
}

// setInterval

// mySetInterval -> setInterval
// myClearInterval
// let counter = 0;
// function mySetInterval(cb, delay) {
//   let timeOut;
//   let timer = [];
//   if (counter === 10) {
//     return;
//   }
//   function executedFn() {
//     timeOut = setTimeout(() => {
//       cb();
//       counter++;
//       timeOut = executedFn(cb, delay);
//     }, delay);
//     timer.push(timeOut);
//   }
//   executedFn();
//   return timer;
// }

// function myClearInterval(arr) {
//   clearTimeout(arr.pop());
// }

// const id = mySetInterval(() => console.log("add"), 1000);

// setTimeout(() => {
//   myClearInterval(id);
// }, 10000);

let counter = 0;
function mySetTimeInterval(fn, delay) {
  let timer;
  timer = setTimeout(function executedFn() {
    if (counter === 10) return;
    fn();
    counter++;
    timer = setTimeout(executedFn, delay);
  }, delay);
  return timer;
}

let id = mySetTimeInterval(() => console.log("as"), 500);
mySetTimeInterval(() => console.log(id), 6000);

function mySetTimeout(cb, delay){
  const start = Date.now();
  function check(){
    if(Date.now() > start + delay) cb();
    else requestIdleCallback(check);
  }
  requestIdleCallback(check)
}

mySetTimeout(()=>{
  console.log("hi")
},1000)

// groupby loadash
const groupBy = (collection, criteria) => {
  return collection.reduce((obj, item) => {
    const key =
      typeof criteria === "function" ? criteria(item) : item[criteria];
    if (!obj.hasOwnProperty(key)) obj[key] = [];
    obj[key].push(item);
    return obj;
  }, {});
};

let nums = [6.1, 4.2, 6.3];
let words = ['one', 'two', 'three'];

let groupedNums = groupBy(nums, Math.floor);
let groupedWords = groupBy(words, 'length');

console.log(groupedNums);
console.log(groupedWords);