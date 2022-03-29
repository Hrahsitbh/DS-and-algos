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

// let ar1 = [1, 4, 5, 7];
// let ar2 = [10, 20, 30, 40];
// let len1 = ar1.length;
// let len2 = ar2.length;
// let val = 38;

// function printClosest(ar1, ar2, len1, len2, val) {
//     let i = ar1[0];
//     let j = ar2[len2 - 1];
//     let diff = Math.min();
//     let res_l = 0;
//     let res_r = 0;
//     while (i < len1 && j >= 0) {
//         if (Math.abs(ar1[i] + ar2[j] - val) < diff) {
//             res_l = i;
//             res_r = j;
//             diff = Math.abs(ar1[i] + ar2[j] - val);
//         } else if (ar1[i] + ar2[j] < val) i++;
//         else j--;
//     }
//     return ({ ist: ar1[res_l], sec: ar2[res_r], diff });
// }
// console.log(printClosest(ar1, ar2, len1, len2, val));

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

// Median of two sorted arrays of same size (with O(n))

// function getMedian(arr1, arr2, len) {
//     let i = 0;
//     let j = 0;
//     let m1 = -1;
//     let m2 = -1;
//     for (let count = 0; count <= len; count++) {
//         m1 = m2;
//         if (i === len) {
//             m2 = arr2[0];
//             break;
//         }

//         if (j === len) {
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

  // calculaating sum of first k elements
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
