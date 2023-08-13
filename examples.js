const {
  pipe,
  memoize,
  debounce,
  log,
  deepCopy,
  isEmpty,
  properCase,
} = require("./utils");

// pipe() example
function prefix(text) {
  return "__" + text;
}

function suffix(text) {
  return text + "__";
}

log(pipe(prefix, suffix)("proto"));

// memoize() example
function count(number) {
  let counter = 0;
  for (let index = 0; index < number; index++) {
    counter++;
  }
  console.log(`counted to ${number}`);
}

console.time("standard");
count(10000);
count(10000);
count(10000);
console.timeEnd("standard");

console.time("memoize");
const memoizedCount = memoize(count);
memoizedCount(10000);
memoizedCount(10000);
memoizedCount(10000);
console.timeEnd("memoize");

// debounce() example
const debouncedLog = debounce(log, 500);
debouncedLog(1, 2, 3);
debouncedLog(4, 5, 6);
debouncedLog(7, 8, 9);

// log() example
log(1, 2, 3);

// deepCopy() example
const obj = {
  a: 1,
  b: 2,
  c: {
    c1: 3,
    c2: 4,
  },
};
const newObj = deepCopy(obj);
newObj.c.c1 = 3.5;
log(obj);
log(newObj);

// isEmpty() example
log(isEmpty([]));
log(isEmpty({}));
log(isEmpty([1, 2, 3]));
log(isEmpty(obj));

// properCase() example
log(properCase("please use PROPER casing"));
