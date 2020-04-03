## Type assertions 输入断言

1. Type assertions have two forms. One is the “angle-bracket” syntax: 类型断言有两种形式，一种是“角括号”语法:

```js
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

2. And the other is the as-syntax: 另一个是 as-syntax:

```js
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

>The two samples are equivalent. Using one over the other is mostly a choice of preference; however, when using TypeScript with JSX, only as-style assertions are allowed.

## Interface

### Optional Properties 可选属性

```js
interface SquareConfig {
  color?: string;
  width?: number;
}
```

### Readonly properties 只读属性

```js
interface Point {
  readonly x: number;
  readonly y: number;
}

// You can construct a Point by assigning an object literal. After the assignment, x and y can’t be changed.
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!

// TypeScript comes with a ReadonlyArray<T> type that is the same as Array<T> with all mutating methods removed, so you can make sure you don’t change your arrays after creation:

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error

// On the last line of the snippet you can see that even assigning the entire ReadonlyArray back to a normal array is illegal. You can still override it with a type assertion, though:
a = ro as number[]
```

### Function Types

```js
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```

### Indexable Types

```js
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// you can make index signatures readonly in order to prevent assignment to their indices:
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```

## Optional Chaining

我们可以用`?`来过滤`null`和`undefined`

```ts
let x = foo?.bar.baz();
// 等同于
let x = (foo === null || foo === undefined) ?
    undefined :
    foo.bar.baz();
```

## Nullish Coalescing 

我们可以用`??`起到类似js`||`的一个作用

```ts
let x = foo ?? bar();
// 等同于
let x = (foo !== null && foo !== undefined) ?
    foo :
    bar();
```

<Vssue title="Guide" />
