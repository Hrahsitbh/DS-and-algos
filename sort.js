// quicksort
function quickSort(arr, start, end) {
    if (start < end) {
        let pIndex = partition(arr, start, end);
        console.log(pIndex);
        quickSort(arr, start, pIndex - 1);
        quickSort(arr, pIndex + 1, end);
    }
    return;
}

function partition(arr, start, end) {
    let pivot = arr[end];
    let pIndex = start;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivot) {
            [arr[i], arr[pIndex]] = [arr[pIndex], arr[i]] // swap
            pIndex++;
        }
    }
    [arr[pIndex], arr[end]] = [arr[end], arr[pIndex]];  // swap with pivot i.e end
    return pIndex;
}

let arr = [10, 7, 8, 9, 1, 5];
quickSort(arr, 0, arr.length - 1);
console.log(arr);
