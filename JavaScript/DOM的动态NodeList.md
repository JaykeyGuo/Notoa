# DOM的动态NodeList

```html
<ol id="elem">
  <li>Hello</li>
  <li>World</li>
</ol>

<script>
  function clear(elem) {
    for (let i = 0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
    }
  }
  clear(elem);
</script>
```

通过这个方法移除Node节点的时候，childNodes是一个动态的list，在移除第一个节点之后，第二个节点会自动变成第一个。在`i`自增之后是获取不到对应的节点的。

正确的方式是：

```js
function clear(elem) {
  while(elem.firstChild) {
    elem.firstChild.remove();
  }
}

// OR
function clear(elem) {
  elem.innerHTML = '';
}
```

