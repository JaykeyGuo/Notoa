# Web components

## Custom elements

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // Create Element
  }
  
  connectedCallback() {
    // 在元素被添加到文档之后，浏览器会调用这个方法
    //（如果一个元素被反复添加到文档/移除文档，那么这个方法会被多次调用）
  }
  disconnectedCallback() {
    // 在元素从文档中移除的时候，浏览器会调用这个方法
    //（如果一个元素被反复添加到文档/移除文档，那么这个方法会被多次调用）
  }
  
  static get observedAttributes() {
    return [/* 属性数组，这些属性的变化会被监视 */]
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    // 当上面数组中的属性发上变化的时候，这个方法被调用
  }
  
  adoptedCallback() {
    // 元素被移动到新的文档的时候，这个方法会被调用
    //（document.adoptNode 会调用这个方法，非常少见）
  }
  
  // 还可以添加更多的元素方法和属性
}

// 注册元素
customElements.define('my-element', MyElement);

// 一个继承于已有Element的customElement
customElements.define('my-button', MyElement, { extends: 'button' });
```

PS: [一个计数器组件](https://plnkr.co/edit/hhtl31PgIAqhULc8?p=preview&preview)

---



## Shadow DOM

#### 两类DOM子树

一个DOM元素可以有一下两类DOM子树：

1. Light tree ——一个常规DOM树，有HTML子元素组成。
2. Shadow tree ——一个隐藏的DOM子树，不在HTML中反映，无法被察觉。

如果一个元素同时有一伤两种子树，那么浏览器只渲染shadow tree。但是我们可以同时设置两种树的组合。

Shadow tree可以在自定义元素中被使用，其作用是隐藏组件内部结构和添加只在组件内有效的样式。

例如：

```html
<script>
customElements.define('show-hello', class extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<p>
  	Hello, ${this.getAttribute('name')}
  </p>`;
  }
});
</script>

<show-hello name="John"></show-hello>
```

首先，调用 `elem.attachShadow({mode: …})` 可以创建一个 shadow tree。

这里有两个限制：

1. 在每个元素中，我们只能创建一个 shadow root。
2. `elem` 必须是自定义元素，或者是以下元素的其中一个：「article」、「aside」、「blockquote」、「body」、「div」、「footer」、「h1…h6」、「header」、「main」、「nav」、「p」、「section」或者「span」。其他元素，比如 `<img>`，不能容纳 shadow tree。

`mode` 选项可以设定封装层级。他必须是以下两个值之一：

- `「open」` —— shadow root 可以通过 `elem.shadowRoot` 访问。

  任何代码都可以访问 `elem` 的 shadow tree。

- `「closed」` —— `elem.shadowRoot` 永远是 `null`。

  我们只能通过 `attachShadow` 返回的指针来访问 shadow DOM（并且可能隐藏在一个 class 中）。浏览器原生的 shadow tree，比如 `<input type="range">`，是封闭的。没有任何方法可以访问它们。

---



## Shadow DOM slot

### 具名插槽

```html
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
			<div>Name:
				<slot name="username"></slot>
			</div>
			<div>Birthday:
				<slot name="birthday"></slot>
			</div>
		`;
  }
});
</script>

<user-card>
	<span slot="username">John</span>
  <span slot="birthday">2020.01.01</span>
</user-card>
```

### 默认插槽

第一个没有名字的 `<slot>`（随后的未命名插槽将被忽略）- 接受不是插槽的 light 子元素。

### 多个元素，一个插槽

如果同一插槽中有很多元素 – 它们会被一个接一个地添加。



JavaScript 可以使用以下的方法访问插槽：

- `slot.assignedNodes/Elements()` – 返回插槽内的 节点/元素。
- `node.assignedSlot` – 相反的方法，返回一个节点的插槽。

如果我们想知道显示的内容，可以使用以下方法跟踪插槽位的内容：

- `slotchange` 事件 – 在插槽第一次填充时触发，并且在插槽元素的 添加/删除/替换 操作（而不是其子元素）时触发，插槽是 `event.target` 。
- 使用 [MutationObserver](https://zh.javascript.info/mutation-observer) 来深入了解插槽内容，并查看其中的更改。

---



## Shadow DOM 样式

Shadow DOM的样式并不能之后通过CSS在slot或者shadow上面更改，需要通过特性的伪类来匹配。例如`::slotted(selector)`或者是`:host([attr])`。



## Shadow DOM 事件

事件仅仅是在它们的 `composed` 标志设置为 `true` 的时候才能通过 shadow DOM 边界。

内建事件大部分都是 `composed: true` 的，正如相关规范所描述的那样：

- UI 事件 https://www.w3.org/TR/uievents。
- Touch 事件 https://w3c.github.io/touch-events。
- Pointer 事件 https://www.w3.org/TR/pointerevents。
- ……等等。

也有些内建事件它们是 `composed: false` 的：

- `mouseenter`，`mouseleave`（也不冒泡），
- `load`，`unload`，`abort`，`error`，
- `select`，
- `slotchange`。

这些事件仅能在同一 DOM 中的元素上捕获。

如果我们发送一个 `CustomEvent`，那么我们应该显式地设置 `composed: true`。

请注意，如果是嵌套组件，一个 shadow DOM 可能嵌套到另外一个 shadow DOM 中。在这种情况下合成事件冒泡到所有 shadow DOM 边界。因此，如果一个事件仅用于直接封闭组件，我们也可以在 shadow host 上发送它并设置 `composed: false`。这样它就不在组件 shadow DOM 中，也不会冒泡到更高级别的 DOM。