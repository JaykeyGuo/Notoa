function bubbleSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
  }
  return nums;
}

function betterBubbleSort(nums) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    let flag = true;
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], [nums[j + 1]]] = [nums[j + 1], nums[j]];
        flag = false;
      }
    }
    if (flag) return nums;
  }
  return nums;
}