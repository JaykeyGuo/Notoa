# Enum

> TypeScript provides both numeric and string-based enums.

`enum` is a data that can accept some members for you to make it a list.

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
};

console.log(Direction)
// { 1: 'Up', 2: 'Down', 3: 'Left', 4: 'Right',
// 	 Up: 1, Donw: 2, Left: 3, Right: 4 }
```

---

###### JS power operation

```js
a << b // = a*2^b
a >> b // = a/2^b
```

---

Enum is a type can be computed, when you declare the member in it.

```ts
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1, // 2
  Write = 1 << 2, // 4
  ReadWrite = Read | Write, // 6
  // computed member
  G = '123'.length // 3
}
```

#### Get the member of `enum` and **reverse mappings**

```ts
enum Enum { A };
let a = Enum.A; // 0
let nameOfA = Enum[a]; // 'A'
```

#### How Enum works ?

```ts
enum Week {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}
// TS convert to JS
var Week;
(function (Week) {
    Week[Week["Sunday"] = 0] = "Sunday";
    Week[Week["Monday"] = 1] = "Monday";
    Week[Week["Tuesday"] = 2] = "Tuesday";
    Week[Week["Wednesday"] = 3] = "Wednesday";
    Week[Week["Thursday"] = 4] = "Thursday";
    Week[Week["Friday"] = 5] = "Friday";
    Week[Week["Saturday"] = 6] = "Saturday";
})(Week || (Week = {}));
```

So the Enum is a type the `name` and the `value` can direct to each other.

```ts
Week[5]; // => => 'Firday'
Week['Firday']; // => 5
```

