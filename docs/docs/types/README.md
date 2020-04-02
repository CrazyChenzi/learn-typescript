## Basic Types

### Boolean

```js
const isDone: boolean = false
```

### Number

```js
const arrLength: number = 10
```

### String

```js
const name: string = 'zhangsan'
```

### Array

```js
const list: number[] = [1, 2, 3]
// 使用泛型
const list: Array<number> = [1, 2, 3]
const listStr: string[] = ['1', '2', '3']
```

### Tuple

```js
let x: [string, number]
x = ['hello', 1]  // Ok
x = [1, 'hello']  // Error
```

### Enum

```js
enum Color {Red, Blue, Yellow} // 默认情况下是从0开始编号
enum Color {Red = 3, Blue, Yellow}  // 从3开始编号
enum Color {Red = 'Red', Blue = 'Blue', Yellow = 'Yellow'}
```

### Any

**可以为任何类型，是一个顶层类型**

[Any和Unknown的区别]()

### Void

**某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void**

```js
function warnUser(): void {
  console.log("This is my warning message");
}
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
let unusable: void = undefined;
```

### Null/Undefined

**TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大**

```js
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

### Never

**never类型表示的是那些永不存在的值的类型。**

```js
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}
```

### Object

**object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型**

使用object类型，就可以更好的表示像Object.create这样的API。例如

```js
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

[官方文档](https://www.typescriptlang.org/docs/handbook/basic-types.html)

## advanced-types

[官方文档](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
