# 数据结构-JS

#### 算法与数据结构

##### 数组

```js
const arr = new Array()
// 创建数组

// 遍历数组的方式
// 1. for循环 性能最快
const len = arr.length
for(let i = 0; i < len; i++) {
  console.log(arr[i], i);
}
// 2. forEach
arr.forEach((item, index) => {
  console.log(item, index);
})
// 3.map方法
const newArr = arr.map((item, index) => {
  console.log(item, index);
  return item + 1;
})
```

##### 二维数组

```js
// 二维数组就是对应矩阵
const arr = [
  [1,2,3,4,5],
  [1,2,3,4,5],
  [1,2,3,4,5],
  [1,2,3,4,5],
  [1,2,3,4,5]
]

// 初始化二维数组
const len = arr.length
for (let i = 0; i < len; i++) {
  arr[i] = [];
}

// 二维数组的访问
const outerLen = arr.length;
for (let i = 0; i < outerLen; i++) {
  const innerLen = arr[i].length;
  for (let j = 0; j < innerLen; j++) {
    console.log(arr[i][j], i, j);
  }
}
```

##### 栈和队列

**数组的方法**

```js
const arr = [1,2];

// 添加
arr.unshift(0); // [0, 1, 2]

arr.push(3); // [1,2,3]

arr.splice(1,0,3); // [1,3,2]

// 删除
arr.splice(1,1); // [1]

arr.shift(); // [2,3]

arr.pop(); // [1,2]
```

###### 栈

```js
const stack = [];
stack.push('东北大板')
stack.push('可爱多')
stack.push('巧乐兹')
stack.push('冰工厂')
stack.push('光明奶砖')

while(stack.length) {
  const top = stack[stack.length - 1];
	console.log('现在取出的冰淇淋是', top);
  stack.pop();
}

stack; // []
```

###### 队列

```js
const queue = []  
queue.push('小册一姐')
queue.push('小册二姐')
queue.push('小册三姐') 

while(queue.length) {
  const top = queue[0];
  console.log(top, '取餐');
  queue.shift();
}

queue // []
```

###### 链表

```js
// 创建
function ListNode(val) {
  this.val = val;
  this.next = null;
}

// 🌰
const node = new ListNode(1);
node.next = new ListNode(2);

// 添加 其实是在原来的链表中插入一个关系，插入的X的上游是原来的上游，下游是对应的next
const node3 = new ListNode(3);
node3.next = node.next;
node.next = node3;

// 删除 删除的关键是“定位目标节点的前驱结点”
const target = node1.next;
node1.next = target.val; // 需要同时将对应的值也删掉
node1.next = target.next;

// 访问
const index = 10;
let node = head;
for (let i = 0; i < index && node; i++) {
  node = node.next;
}
```

##### 二叉树

```js
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const node = new TreeNode(1);

// 遍历
const root = {
  val: 'A',
  left: {
    val: 'b',
    left: {
      val: 'd'
    },
    right: {
      val: 'e'
    },
  },
  right: {
    val: 'c',
    right: {
      val: 'f'
    }
  }
}
// 先序遍历： 根结点 -> 左子树 -> 右子树
function preOrder(root) {
  if (!root) {
    return
  }
  console.log('当前遍历的结点是：', root.val);
  preOrder(root.left);
  preOrder(root.right);
}
// a b d e c f

// 中序遍历： 左子树 -> 根结点 -> 右子树
function inOrder(root) {
  if (!root) {
    return
  }
  inOrder(root.left);
	console.log('当前遍历的结点是：', root.val);
  inOrder(root.right);
}
// d b e a c f

// 后序遍历： 左子树 -> 右子树 -> 根结点
function postOrder(root) {
  if (!root) {
    return
  }
  postOrder(root.left);
  postOrder(root.right);
  console.log('当前遍历的结点是：', root.val);
}
// d e b f c a
```

