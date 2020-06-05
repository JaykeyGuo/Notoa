# Interfaces

TS中的接口，类似于一个数据格式的定义，必须先声明一个数据的格式才能调用。

类似于Vue中Data的一个对象，需要把每一个对象都声明，必须要有数据的类型，可以通过一些语法来实现“可选”、“只读”、“可索引”……

```ts
// 接口
interface label {
  label: string,
  count: number
}

// Optional Properties
interface label {
  color?: string;
  width?: number;
}

// Readonly properties
interface label {
  readonly name: string;
  readonly tag: string;
}

// Excess Property Checks
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSC(config: SquareConfig): { color: string; area: number } {
  // do sth...
}
// Do something better
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
// can use it in this way
let configDemo = { other: 'red', width: 100 };
let mySC = createSC(configDemo);
```

###### `readonly` vs `const`

When to use `readonly`? When you need use properties.

When to use `const`? When you just need it like a variable or just one property.

#### Interfaces in Function

1. When you use Interface in function, the function can ignore the interfaces' propties name, you don't need to pair all propties name as interfaces declare.
2. TS will check the type of the parameters when you use the interface, so you don't need to declare all the type of the parameters.

```ts
interface SearchFunc {
	(source: string, subString: string): boolean;
}

// You can use it in this way
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

// OR you can use it in a new way
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string) {
  let result = src.search(sub);
  return result > -1;
}

// TS do something that you don't need to check type of interface
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

#### Indexable Types

> This is because when indexing with a `number`, JavaScript will actually convert that to a `string` before indexing into an object. That means that indexing with `100` (a `number`) is the same thing as indexing with `"100"` (a `string`), so the two need to be consistent.

👆This is the reason why when you use the number in Vue data can't bind on the Dom, Beacause the number will convert to a string .

```typescript
// A better way to use Index
interface ReadonlyStringArray {
  readonly [index: number]: string
}
let myArray: ReadonlyStringArray = ['Alice', 'Bob'];
myArray[2] = 'Mallory';
```

---



### Class

Just like Java, you can use the word `super` to cakk the father constructor. The `super` word is direct to the `this` in father class.



#### Public, private and protected

When you declare a class, the `public` is the defalut config. you can call the object in the derived class. 

When you use `private`, you can't call the member in the top that class. 

When you uer `protected`, you can't call the member outer of the class, example the subclass. But you can use the function in the class to call the protected member.

```ts
class Person {
  protected name: string;
  protected constructor(theNmae: string) {
    this.name = theName;
  }
}

// Employee can extend Person
class Employee extend Person {
  private department: string;
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }
  public getElevatorPitch() {
    return `name is ${this.name} and work in ${this.department}.`
  }
}

let howard = new Employee("howard", "sales");
let john = new Person("John"); // Error: protected
```



#### Readonly modifier

Just like `Interfaces`, can use `readonly` word to just declare the member just can be gotten but can be set.

#### Accessors

```ts
const fullNameMaxLength = 10;

class Employee {
  private _fullName: string;
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength)
    }
    this._fullName = newName;
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  console.log(employee.fullName);
}
```

---



### Function

> ##### Something about `this`
>
> In js, `this` is the background direction for a function or a block scope.
>
> You can use `call() ` or `apply()`, these two function to show where is `this`  direct to.
>
> the window is the default `this` direct to, When you are under strict mode, the default `this` direct to undefined. In these to function, the function's first argument is `this`.
>
> |                      Type                       |    this     |
> | :---------------------------------------------: | :---------: |
> |                  func(...args)                  |   window    |
> | func(...args) *func defined in ES5 Strict Mode* |  undefined  |
> |            path.to.obj.func(..args)             | path.to.obj |

##### This `this`

When you want to use `this` in ts, you have to declare `this` in which block scope, otherwise `this` will be an `undefined`.

```ts
interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);
      
      return {suit: this.suits[pickedSuit], card: pickedCard% 13};
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log(`card: ${pickedCard.card} of ${pickedCard.suit}`);
```

#### Overloads

When you want to use One function to fit different situation, you can use `overloads` to make output change refers to inputs.

```ts 
let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

function pickCard(x: {suit: string; card: number;}[]): number;
function pickCard(x: number): {suit: string; card: number;};
function pickCard(x): any {
  if (typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x/13);
    return { suit: suits[pickedSuit], card: x % 13};
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log(`card: ${pickedCard1.card} of ${pickedCard1.suit}`);

let pickedCard2 = pickCard(15);
console.log(`card: ${pickedCard2.card} of ${pickedCard2.suit}`);
```



---

### Summary

1. There are some questions about function in TS, I don't know how to write a function in TS, and how to declare the type of data and output data.

   ![](http://ww2.sinaimg.cn/large/006tNc79gy1g65vouu1k5j30ji05674o.jpg)

   ```ts
   // Function
   let sumInTS = function (x: number, y: number): number {
     return x + y;
   }
   // Declare output data type
   let sumInTS: (x: number, y:number) => number
   	= function (x: number, y: number): number {
       return x + y;
     }
   // Use Interface to Declare
   interface searchFunc {
     (src: string, subString: string): boolean;
   }
   
   let mySearch: SearchFunc;
   mySearch = function(src: string, subString: string) {
     return src.search(subString) !== -1;
   }
   ```

2. In TS, the class and interfaces has some key word to declare the block scope for the data. In different situation, can use different keyword to make the member be clear to use.

