# Generics

```ts
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<number>(990);
// this wont throw error.
let output = identity<string>(990)
// Error: Argument of type '990' is not assignable to parameter of type 'string'
```

The generics is defined the type of data, which is used in the function or interface. The generics is used to declare the type of the member in argument.

###### If you don't declare the generics

```ts
function loggingIdentity<T>(arg: T): T {
	console.log(arg.length)	// Error: arg has not .length
	return arg
}
// can use this way to declare generics
function loggingIdentity<T>(arg: T:[]): T[] {
  console.log(arg.length)
  return arg;
}
// or this way
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);
  return arg;
}
```

#### Where U can use Generics

```ts
// use in function
function identity<T>(arg: T): T {
  return arg
}

// use in data
let myIdentity: <T>(arg: T) => T = identity;

// use in interface
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;

// one more step in interface
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentity<number> = idetity;

// use in classes
class GenericNumber<T> {
  public zeroValue: T;
  public add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;

```

---

###### Summary

The Generics is sth that declare the member type within the data, You can know the inner member type relay on Generics. Generics is also have differernt declaration, such as `function, interface, data, classes`.

### Type Inference

```ts
let x = 3; // Type Inference is number

let x = [0, 1, null]; // TI is number and null

let zoo = [new Rhino(), new Elephant(), new Snake()]; // No inference
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()]; // TI is `(Rhino | Elephant | Snake)[]`

```

