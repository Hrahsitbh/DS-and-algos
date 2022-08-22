// prefix array
function prefixSumArr(arr) {
  const prefixArr = [];
  prefixArr[0] = arr[0];
  for (let i = 1; i < arr.length; i++) {
    prefixArr[i] = prefixArr[i - 1] + arr[i];
  }
  return prefixArr;
}
prefixSumArr([10, 4, 16, 20]);

// equillbirum index of array using prefix

function findEquillibrium(arr) {
  const len = arr.length;
  if (len === 1) return 0;
  const forwardPrefix = [];
  const reversePrefix = [];

  for (let i = 0; i < len; i++) {
    if (i) forwardPrefix[i] = forwardPrefix[i - 1] + arr[i];
    else forwardPrefix[i] = arr[i];
  }

  for (let i = len - 1; i > 0; i--) {
    if (i < len - 2) reversePrefix[i] = reversePrefix[i + 1] + arr[i];
    else reversePrefix[i] = arr[i];
  }

  for (let i = 0; i < len; i++) {
    if (forwardPrefix[i] === reversePrefix[i]) return i;
  }

  return -1;
}

findEquillibrium([-7, 1, 5, 2, -4, 3, 0]);

// find all prime upto n by Sieve of Eratosthenes
function findPrimeNumbers(n) {
  // create an array of n+1 size with filled values of 1.
  const primeNums = new Array(n + 1).fill(1);
  primeNums[0] = 0;
  primeNums[1] = 0;
  for (let i = 2; i < Math.sqrt(n); i++) {
    if (primeNums[i] === 1) {
      for (let j = 2; i * j <= n; j++) {
        primeNums[i * j] = 0;
      }
    }
  }
  return primeNums.map((item, i) => {
    if (item) return i;
  });
}

const n = 15;
findPrimeNumbers(n);

// anagram O(N)
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  const map = new Map();
  let flag = true;
  for (let i = 0; i < str1.length; i++) {
    if (map.has(str1[i])) map.set(str1[i], map.get(str1[i]) + 1);
    else map.set(str1[i], 1);
  }

  for (let i = 0; i < str2.length; i++) {
    map.set(str1[i], map.get(str1[i]) - 1);
  }

  for (const [key, value] of map) {
    if (value) flag = false;
  }
  return flag;
}

// roateRight
function rotateRight(arr, k) {
  const len = arr.length;
  k = k % len;
  reverse(arr, len - 1, 0);
  reverse(arr, 0, k - 1);
  reverse(arr, k, len - 1);
}

function reverse(arr, start, end){
  while(start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]]; start++; end--;
  }
}

rotateRight(arr, 3);


// roate left
function rotateLeft(arr, k) {
  const len = arr.length;
  k = k % len;
  reverse(arr,0, len - 1);
  reverse(arr, 0, arr.length - k - 1);
  // reverse(arr, len - 1, k );
}

rotateLeft(arr, 3);