// quicksort
function quickSort(arr, start, end) {
  if (start < end) return;
  const pIndex = partition(arr, start, end);
  console.log(pIndex);
  quickSort(arr, start, pIndex - 1);
  quickSort(arr, pIndex + 1, end);
}

function partition(arr, start, end) {
  let pivot = arr[end];
  let pIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivot) {
      [arr[i], arr[pIndex]] = [arr[pIndex], arr[i]]; // swap
      pIndex++;
    }
  }
  [arr[pIndex], arr[end]] = [arr[end], arr[pIndex]]; // swap with pivot i.e end
  return pIndex;
}

let arr = [10, 7, 8, 9, 1, 5];
quickSort(arr, 0, arr.length - 1);
console.log(arr);

// selection sort => O(N^2)
function selectionSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}

// bubble sort
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let IsSorted = false;
    for (let j = 0; j < len - i; j++) {
      if (arr[j + 1] > arr[j]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        IsSorted = true;
      }
    }
    if (!IsSorted) break;
  }
  return arr;
}

// insertion sort
function insertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i];
    let hole = i;
    while (hole > 0 && arr[hole - 1] > value) {
      arr[hole] = arr[hole - 1];
      hole--;
    }
    arr[hole] = value;
  }
  return arr;
}
