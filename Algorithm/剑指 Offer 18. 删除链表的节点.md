# [剑指 Offer 18. 删除链表的节点](https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/)

难度简单52

给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

**注意：**此题对比原题有改动

**示例 1:**

```
输入: head = [4,5,1,9], val = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
```

**示例 2:**

```
输入: head = [4,5,1,9], val = 1
输出: [4,5,9]
解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.
```

---

// 递归解法

```js
var deleteNode = function(head, val) {
  if (head.val === val) {
    return head.next;
  }
  head.next = deleteNode(head.next, val);
  return head;
}
```

// 循环解法

```js
var deleteNode = function(head, val) {
  let pointer = new ListNode();
  pointer.next = head;
  
  let curr = pointer;
  // 注意条件
  while (curr.next) {
    if (curr.next.val === val) {
      curr.next = curr.next.next;
      break;
    }
    curr = curr.next;
  }
  return pointer.next;
}
```



