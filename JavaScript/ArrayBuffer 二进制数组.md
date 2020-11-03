# [二进制数据，文件](https://zh.javascript.info/binary)

## ArrayBuffer 二进制数组

最基本的二进制对象是ArrayBuffer，是对固定长度的连续内存区域的引用。

对ArrayBuffer的操作，都需要一个试图：

- `TypedArray`（指下面具体之一）
  - `Uint8Array`, `Uint16Array`, `Uint32Array `——用户8位、16位、32位无符号整数。
  - `Uint8ClampedArray`——用于8位整数，在赋值时便“固定”其值。
  - `Int8Array`, `Int16Array`, `Int32Array`——用于有符号整数（可以为负数）。
  - Float32Array, Float64Array——用于32位和64位的有符号浮点数。
- DataView——使用方法来制定格式的视图，例如：getUint8(offset)

在大多数情况下，我们直接对类型化数组进行创建和操作，而将 `ArrayBuffer` 作为“通用标识符（common discriminator）”隐藏起来。我们可以通过 `.buffer` 来访问它，并在需要时创建另一个视图。

![](https://zh.javascript.info/article/arraybuffer-binary-arrays/arraybuffer-view-buffersource.svg)

## TextDecoder & TextEncoder

### TextDecoder

将二进制对象转换成字符串

```js
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
new TextDecoder().decode(uint8Array); // Hello
```

### TextEncoder

将字符串转换为字节

```js
let encoder = new TextEncoder();
let uint8Array = encoder.encode('Hello'); // 72, 101, 108, 108, 111
```



## Blob

构造函数的语法为：

```javascript
new Blob(blobParts, options);
```

- **`blobParts`** 是 `Blob`/`BufferSource`/`String` 类型的值的数组。
- `options`可选对象：
  - **`type`** —— `Blob` 类型，通常是 MIME 类型，例如 `image/png`，
  - **`endings`** —— 是否转换换行符，使 `Blob` 对应于当前操作系统的换行符（`\r\n` 或 `\n`）。默认为 `"transparent"`（啥也不做），不过也可以是 `"native"`（转换）。

```js
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href); // 释放Blob在内存中的占用
```

在浏览器中创建的Blob对象，如果用在URL的映射中，Blob本身是存储在内存中，浏览器无法释放它。



## File & FileReader

### File

有两种方式可以获取它。

第一种，与 `Blob` 类似，有一个构造器：

```javascript
new File(fileParts, fileName, [options])
```

- **`fileParts`** —— Blob/BufferSource/String 类型值的数组。
- **`fileName`** —— 文件名字符串。
- `options` 可选对象：
  - **`lastModified`** —— 最后一次修改的时间戳（整数日期）。

第二种，更常见的是，我们从 `<input type="file">` 或拖放或其他浏览器接口来获取文件。在这种情况下，file 将从操作系统（OS）获得 this 信息。

由于 `File` 是继承自 `Blob` 的，所以 `File` 对象具有相同的属性，附加：

- `name` —— 文件名，
- `lastModified` —— 最后一次修改的时间戳。



### FileReader

[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) 是一个对象，其唯一目的是从 `Blob`（因此也从 `File`）对象中读取数据。

它使用事件来传递数据，因为从磁盘读取数据可能比较费时间。

构造函数：

```javascript
let reader = new FileReader(); // 没有参数
```

主要方法:

- **`readAsArrayBuffer(blob)`** —— 将数据读取为二进制格式的 `ArrayBuffer`。
- **`readAsText(blob, [encoding])`** —— 将数据读取为给定编码（默认为 `utf-8` 编码）的文本字符串。
- **`readAsDataURL(blob)`** —— 读取二进制数据，并将其编码为 base64 的 data url。
- **`abort()`** —— 取消操作。

`read*` 方法的选择，取决于我们喜欢哪种格式，以及如何使用数据。

- `readAsArrayBuffer` —— 用于二进制文件，执行低级别的二进制操作。对于诸如切片（slicing）之类的高级别的操作，`File` 是继承自 `Blob` 的，所以我们可以直接调用它们，而无需读取。
- `readAsText` —— 用于文本文件，当我们想要获取字符串时。
- `readAsDataURL` —— 当我们想在 `src` 中使用此数据，并将其用于 `img` 或其他标签时。正如我们在 [Blob](https://zh.javascript.info/blob) 一章中所讲的，还有一种用于此的读取文件的替代方案：`URL.createObjectURL(file)`。