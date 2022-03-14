/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

function merge(left, right) {
  const results = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      // left is smaller, add it to the end of results
      results.push(left.shift());
    } else {
      // right is smaller, add it to the end of results
      results.push(right.shift());
    }
  }
  // one array will still have items so we need to add them to the end and
  // we know whatever is left over is larger than what's already in results
  return results.concat(left, right);
}

const mergeSort = (nums) => {
  // base case
  if (nums.length < 2) return nums;
  // break into two smaller arrays
  const middle = Math.floor(nums.length / 2);
  const left = nums.slice(0, middle);
  const right = nums.slice(middle);
  // recursively call mergeSort on left and right
  const leftSorted = mergeSort(left);
  const rightSorted = mergeSort(right);
  // merge the two sorted arrays
  return merge(leftSorted, rightSorted);
};

// unit tests
// do not modify the below code
test('merge sort', function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
