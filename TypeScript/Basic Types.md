# Basic Types

#### Boolean

```typescript
let isDone: boolean = false;
```

#### Number

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

#### String

```ts
let color: string = 'blue';
color = "red";
```

TS can alse use template strings.

```ts
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;
```

#### Array

```ts
let list: number[] = [1,2,3];
let list: Array<number> = [1,2,3];
```

#### Tuple

```ts
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10];	// OK
// Initialize it incorrectly
x = [10, 'hello'];

console.log(x[0].substring(1));	// OK
console.log(x[1].substring(1)); // Error, 'number' don't have 'substring'

x[3] = "world"; // Error, Property '3' does not exist on type '[string, number]'.

console.log(x[5].toString()); // Error, Property '5' does not exist on type '[string, number]'.
```

元组，像是一个定义好的模版数组，能在其中定义对应的数据类型。便于取值和修改。使用的也是数组的方式来 get 或 set 对应的变量。对于没有在模版中定义的变量，不能添加。

#### Enum

```ts
enum Color {Red, Green, Blue}
// Color: { 0: 'Red', 1: 'Green', 2: 'Blue', Red: 0, Green: 1, Blue: 2 }
let c: Color = Color.Green	// 1

enum Color { Red = 1, Green, Blue }
let c: Color = Color.Green	// 2

enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName); // Displays 'Green' as its value is 2 above
```

Enum，有点像是JS中的 Set 数据类型，可以通过一个对象来定义一个有名称和index组成的数据，可以直接通过链式调用对应的index，也可以通过index来查找对应的数据名称。

#### Ary

```ts
let notSure: any = 4;
notSure = 'test string';
notSure = false;
// You can change the type of value when you use Ary type data.

let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the cimpiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed();	// Error: Property 'toFixed' doesn't exist to type 'Object'.

let list: any[] = [1, true, 'free'];
list[1] = 100;
```

Ary 数据类型就是在当你不知道对应的数据是什么类型的时候使用，可以对数据做修改，包括数据类型的修改。有点像是JS中的一个任意对象，能够修改这个变量的值。

#### Void

```ts
function warnUser(): void {
	console.log('This is some warning message.');
}

let unusable: void = undefined;
```

官方文档介绍是 Ary 数据的反面，就是一个默认为空的数据，没有任何值，可以对其赋值为`null`或者`undefined`。

#### Null & Undefined

是所有数据类型的子类型（subtype）

#### Never

并没有理解，通过英文文档，中文文档翻译是一个“永不存在”的类型。

#### Object

除了number，string，boolean，symbol，null 或者 undefined之外的数据都是使用Object。

```ts
declare function create(o: object | null): void;

create({ prop: 0 })
```

#### Type assertions

对于数据类型的判断，可以使用尖括号或者`as`的方式来完成对应的变量类型转换的声明

```ts
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;

let strLength: number = (someValue as string).length;
```



------

```
hexadecimal: 十六进制的
octal: 八进制的
textual: 文本的
denote: 表示
tuple: 元组
compilation: 汇编
arbitrary: 武断的、随意的
compiler: 编辑者
handy: 好用的
assertions: 断言，严明
```

###### substring 截取字符串

```
str.substring(indexStart[, index])
```

###### 参考资料：

[Basic Type](https://www.typescriptlang.org/docs/handbook/basic-types.html)