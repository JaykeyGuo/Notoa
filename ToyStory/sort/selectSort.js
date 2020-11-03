function selectSort(nums) {
  const len = nums.length;
  let minIndex;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i; j < len; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
    }
  }
  return nums;
}