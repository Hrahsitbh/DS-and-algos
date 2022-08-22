// // pair of elements (A[i], A[j]) such that their sum is equal to X.
// let arr = [3, 5, 9, 2, 8, 10, 11].numbers.sort((a, b) => a - b);
// let len = arr.length;
// let val = 18;
// function isPairSum(arr, len, val) {
//     let i = 0;
//     let j = len - 1;
//     while (i < j) {
//         if (arr[i] + arr[j] === val) return 'value present';
//         else if (arr[i] + arr[j] < val) {
//             i++;
//         } else {
//             j--;
//         }
//     }
//     return 'not present';
// }

// console.log(isPairSum(arr, len, val));

// Given two sorted arrays and a number x, find the pair whose sum is closest to x and the pair has an element from each array.

// function findClosestPair(arr1, arr2, x){
//   let diff = Math.min();
//   let len1 = arr1.length;
//   let len2 = arr2.length;
//   let l = 0;
//   let r = len2 -1;
//   let res1;
//   let res2;
//   while(l < len1 && r >= 0) {
//       const pairSum = arr1[l] + arr2[r];
//       if(Math.abs(pairSum - x) < diff) {
//         res1 = arr1[l];
//         res2 = arr2[r];
//         diff = Math.abs(pairSum - x);
//       }
//       if(pairSum < x) l++;
//       else r--;
//   }
//   return ([res1, res2]);
// }

// findClosestPair([1, 4, 5, 7],[10, 20, 30, 40], 38);

// Find all triplets with zero sum

// function findTriplets(arr, len) {
//     arr.sort();
//     let found = false;
//     for (let i = 0; i < len - 1; i++) {
//         let l = i + 1;
//         let r = len - 1;
//         while (l < r) {
//             if (arr[i] + arr[l] + arr[r] === 0) {
//                 console.log(arr[i], arr[l], arr[r]);
//                 found = true; l++; r--;
//             } else if (arr[i] + arr[l] + arr[r] < 0) l++;
//             else r--;
//         }
//     }
//     if (!found) return 'not found';
// }

// let arr = [0, -1, 2, -3, 1];
// let len = arr.length;
// findTriplets(arr, len);

// Find a triplet such that sum of two equals to third element

// function findSumOfTwoTriplet(arr, len) {
//     arr.sort();
//     for (let i = len - 1; i >= 0; i--) {
//         let l = 0;
//         let r = i - 1;
//         while (l < r) {
//             if (arr[i] === arr[l] + arr[r]) {
//                 console.log(arr[i], arr[l], arr[r]);
//                 return;
//             } else if (arr[l] + arr[r] < arr[i]) l++;
//             else r--;
//         }
//     }
//     return 'not found';
// }

// let arr = [5, 32, 1, 7, 10, 50, 19, 21, 2];
// let len = arr.length;
// findSumOfTwoTriplet(arr, len);
// let arr1 = [5, 32, 1, 7, 10, 50, 19, 21, 0];
// console.log(findSumOfTwoTriplet(arr1, arr1.length));

// O(N^3) by two pointers

function findQuadraple(arr, sum) {
  const len = arr.length;
  arr.sort((a, b) => a - b);
  for (let i = 0; i < len - 3; i++) {
    for (let j = i + 1; j < len - 2; j++) {
      let l = j + 1;
      let r = len - 1;
      while (l < r) {
        if (arr[i] + arr[j] + arr[l] + arr[r] === sum)
          return [arr[i], arr[j], arr[l], arr[r]];
        else if (arr[i] + arr[j] + arr[l] + arr[r] < sum) l++;
        else r--;
      }
    }
  }
  return [];
}

findQuadraple([1, 4, 45, 6, 10, 12], 21);

// O(N^2}
function findQuadraple(arr, x) {
  const len = arr.length;
  const map = new Map();

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      map.set(arr[i] + arr[j], [i, j]);
    }
  }

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      let sum = arr[i] + arr[j];
      if (map.has(x - sum)) {
        const pair = map.get(x - sum);
        if (pair[0] !== i && pair[0] !== j && pair[1] !== i && pair[1] !== j)
          return [arr[i], arr[j], arr[pair[0]], arr[pair[1]]];
      }
    }
  }
  return [];
}
findQuadraple([10, 20, 30, 40, 1, 2], 91);

// Median of two sorted arrays of same size (with O(n))

// function getMedian(arr1, arr2, len) {
//     let i = 0;
//     let j = 0;
//     let m1 = -1;
//     let m2 = -1;
//     for (let count = 0; count <= len; count++) {
//         if (i === len) {
//              m1 = m2;
//             m2 = arr2[0];
//             break;
//         }

//       else if (j === len) {
//              m1 = m2;
//             m2 = arr1[0];
//             break;
//         }

//         if (arr1[i] <= arr2[j]) {

//             m2 = arr1[i];
//             i++;
//         } else {
//             m2 = arr2[j];
//             j++;
//         }

//     }
//     return (m1 + m2) / 2;
// }

// function getMedian(a, b, start_a, end_a, start_b, end_b) {

//     if ((end_a - start_a === 1) && (end_b - start_b === 1)) {
//         return (Math.max(a[start_a], b[start_b]) + Math.min(a[end_a], b[end_b])) / 2;
//     }

//     let m1_index = (start_a + end_a) / 2;
//     let m2_index = (start_b + end_b) / 2;

//     let m1 = a[m1_index];
//     let m2 = b[m2_index];

//     if (m1 === m2) return m2;
//     if (m1 < m2) {
//         return getMedian(a, b, m1_index, end_a, start_b, m2_index);
//     } else {
//         return getMedian(a, b, start_a, m1_index, m2_index, end_b);
//     }
// }

// let arr1 = [1, 12, 15, 26, 38];
// let arr2 = [2, 13, 17, 30, 45];
// if (arr1.length === arr2.length) console.log(getMedian(arr1, arr2, 0, arr1.length - 1, 0, arr2.length - 1));

// https://riyajain.hashnode.dev/most-frequent-javascript-questions-and-answers

// sliding window
function maxSumOfK(arr, k) {
  let max = 0;
  let currentSum = 0;

  // calculating sum of first k elements
  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }

  max = currentSum;

  for (let i = k, len = arr.length; i < len; i++) {
    currentSum += arr[i] - arr[i - k];
    max = Math.max(max, currentSum);
  }

  return max;
}

const arr = [1, 4, 2, 10, 23, 3, 1, 0, 20];
maxSumOfK(arr, 4);

// Javascript program to
// reverse a String

// Reverse the letters
// of the word
function reverse(str, start, end) {
  // Temporary variable
  // to store character
  let temp;

  while (start <= end) {
    // Swapping the first
    // and last character
    temp = str[start];
    str[start] = str[end];
    str[end] = temp;
    start++;
    end--;
  }
}
// Function to reverse words
function reverseWords(s) {
  // Reversing individual words as
  // explained in the first step
  s = s.split("");
  let start = 0;
  for (let end = 0; end < s.length; end++) {
    // If we see a space, we
    // reverse the previous
    // word (word between
    // the indexes start and end-1
    // i.e., s[start..end-1]
    if (s[end] == " ") {
      reverse(s, start, end);
      start = end + 1;
    }
  }
  // Reverse the last word
  reverse(s, start, s.length - 1);

  // Reverse the entire String
  reverse(s, 0, s.length - 1);
  return s.join("");
}
// Driver Code
var s = "i like this program very much ";

reverseWords(s);

// chop a string in array diff sizes

function chopArray(str, size) {
  const arr = [];
  let i = 0;
  while (i < str.length) {
    arr.push(str.slice(i, i + size));
    i += size;
  }
  return arr;
}

// print all the sub arrays of an array using recursion
function printSubArrays(arr, start, end) {
  if (end === arr.length) return;
  else if (start > end) printSubArrays(arr, 0, end + 1);
  else {
    for (let i = start; i < end; i++) {
      console.log(arr[i]);
    }
    console.log(arr[end]);

    printSubArrays(arr, start + 1, end);
  }
}

printSubArrays([1, 2, 3, 4], 0, 0);

// Minimum Number of Platforms Required for a Railway/Bus Station
function findPlatform(arr, dep) {
  const len = arr.length;
  arr.sort((a, b) => a - b);
  dep.sort((a, b) => a - b);

  let platforms = 0;
  let maxPlatforms = 0;
  let i = 0;
  let j = 0;

  while (i < len && j < len) {
    if (arr[i] <= dep[j]) {
      i++;
      platforms++;
    } else if (arr[i] > dep[j]) {
      j++;
      platforms--;
    }
    maxPlatforms = Math.max(platforms, maxPlatforms);
  }

  return maxPlatforms;
}
let arrival = [900, 940, 950, 1100, 1500, 1800];
let dep = [910, 1200, 1120, 1130, 1900, 2000];
findPlatform(arrival, dep);

// prefixArr ques
const MAX = 100001;
function minHalls(lectures, n)
{
 
  const prefixArr = new Array(24).fill(0);
  for(let i = 0; i<n; i++){
   prefixArr[lectures[i][0]]++;
   prefixArr[lectures[i][1] + 1]--;
  }
  let ans = prefixArr[0];
  for (let i = 1; i < prefixArr.length; i++) {
    prefixArr[i] += prefixArr[i - 1];
    ans = Math.max(ans, prefixArr[i]);
  }
  return ans;
}
 
// Driver code
let lectures = [[7,10],[2,4]];
let n = lectures.length;
minHalls(lectures, n);