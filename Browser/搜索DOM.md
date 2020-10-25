# 搜索DOM

有 6 种主要的方法，可以在 DOM 中搜素节点：

| Method                   | Searches by... | Can call on an element? | Live? |
| ------------------------ | -------------- | ----------------------- | ----- |
| `querySelector`          | CSS-selector   | ✔                       | -     |
| `querySelectorAll`       | CSS-selector   | ✔                       | -     |
| `getElementById`         | `id`           | -                       | -     |
| `getElementsByName`      | `name`         | -                       | ✔     |
| `getElementsByTagName`   | tag or `'*'`   | ✔                       | ✔     |
| `getElementsByClassName` | class          | ✔                       | ✔     |

### closest

```html
<h1>
  Contents
</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>

<script>
let chapter = document.querySelector('.chapter');
  
alert(chapter.closest('.book')); // UL
alert(chapter.closest('.contents')); // DIV

alert(chapter.closest('h1')); // null
</script>
```

