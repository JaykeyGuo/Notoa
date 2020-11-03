function insertSort(nums) {
  const len = nums.length;
  let temp;
  for (let i = 0; i < len; i++) {
    let j = i;
    temp = nums[j];
    while (j > 0 && nums[j - 1] > temp) {
      nums[j] = nums[j - 1];
      j--;
    }
    nums[j] = temp;
  }
  return nums
}