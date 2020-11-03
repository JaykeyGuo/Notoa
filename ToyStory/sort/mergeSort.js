function mergeSort(nums) {
  if (nums.length < 2) return nums;
  const len = nums.length;
  const mid = Math.floor(len / 2);
  const leftArray = mergeSort(nums.slice(0, mid));
  const rightArray = mergeSort(nums.slice(mid, len));
  nums = mergeArr(leftArray, rightArray);
  return nums;
}

function mergeArr(nums1, nums2) {
  const len1 = nums1.length, len2 = nums2.length;
  let i = len1 - 1, j = len2 - 1, len = len1 + len2 - 1;
  while (i >= 0 && j >= 0) {
    nums1[len--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
  }
  while (j >= 0) {
    nums1[len--] = nums2[j--];
  }
  return nums1;
}