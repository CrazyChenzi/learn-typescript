`unknown`和`nay`的主要区别是`unknown`类型会更加严格，在对`unknown`类型的值执行大多数操作之前，我们必须进行某种形式的检查。而在对`any`类型的值执行操作之前，我们不必进行任何检查。

## any

在`TypeScript`中，任何类型都可以被归为`any`类型。这让`any`类型成为了类型系统的**顶级类型**(也被称作**全局超级类型**)。

```ts
let value: any;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = Math.random;      // OK
value = null;             // OK
value = undefined;        // OK
value = new TypeError();  // OK
value = Symbol("type");   // OK
```

我们将`value`定义为`any`，`TypeScript`认为以下所有操作的类型都是正确的

```ts
let value: any;

value.foo.bar;  // OK
value.trim();   // OK
value();        // OK
new value();    // OK
value[0][1];    // OK
```

## unknown类型

就像所有类型都可以被归为`any`，所有类型也都可以被归为`unknown`。这使得`unknown`成为`TypeScript`类型系统的另一种`顶级类型`（另一种是`any`）。

```ts
let value: unknown;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = Math.random;      // OK
value = null;             // OK
value = undefined;        // OK
value = new TypeError();  // OK
value = Symbol("type");   // OK
```

我们尝试将`unknown`赋值给其它类型的变量

```ts
let value: unknown;

let value1: unknown = value;   // OK
let value2: any = value;       // OK
let value3: boolean = value;   // Error
let value4: number = value;    // Error
let value5: string = value;    // Error
let value6: object = value;    // Error
let value7: any[] = value;     // Error
let value8: Function = value;  // Error
```

`unknown`类型只能赋值给`any`和`unknown`本身

我们尝试将`unknown`赋值给执行操作

```ts
let value: unknown;

value.foo.bar;  // Error
value.trim();   // Error
value();        // Error
new value();    // Error
value[0][1];    // Error
```

将`value`设置为`unknown`后，这些操作都不再是正确的，因此我们必须执行某种类型检查以所小我们正在使用值得范围

## 缩小`unknown`类型范围

使用`typeof`和`interface`运算符进行范围缩小

```ts
function stringifyForLogging(value: unknown): string {
  if (typeof value === "function") {
    // Within this branch, `value` has type `Function`,
    // so we can access the function's `name` property
    const functionName = value.name || "(anonymous)";
    return `[function ${functionName}]`;
  }

  if (value instanceof Date) {
    // Within this branch, `value` has type `Date`,
    // so we can call the `toISOString` method
    return value.toISOString();
  }

  return String(value);
}
```

还可以使用自定义保护类型(`is`)来缩小`unknown`的范围


```ts
/**
 * A custom type guard function that determines whether
 * `value` is an array that only contains numbers.
 */
function isNumberArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.every(element => typeof element === "number")
  );
}

const unknownValue: unknown = [15, 23, 8, 4, 42, 16];

if (isNumberArray(unknownValue)) {
  // Within this branch, `unknownValue` has type `number[]`,
  // so we can spread the numbers as arguments to `Math.max`
  const max = Math.max(...unknownValue);
  console.log(max);
}
```

## 联合类型中的`unknown`类型

**在联合类型中`unknown`会吸收任何类型，any除外**

```ts
type UnionType1 = unknown | null;       // unknown
type UnionType2 = unknown | undefined;  // unknown
type UnionType3 = unknown | string;     // unknown
type UnionType4 = unknown | number[];   // unknown
type UnionType5 = unknown | any;  // any
```

## 交叉类型中的`unknown`类型

**在交叉类型中，任何类型都可以吸收`unknown`类型**

```ts
type IntersectionType1 = unknown & null;       // null
type IntersectionType2 = unknown & undefined;  // undefined
type IntersectionType3 = unknown & string;     // string
type IntersectionType4 = unknown & number[];   // number[]
type IntersectionType5 = unknown & any;        // any
```

## `unknown`可以使用的运算符

- `===`
- `==`
- `!==`
- `!=`

如果要对类型为`unknown`的值使用任何其它的运算符，则必须先指定类型

## example： 从`localStorage`中读取JSON

如果该项不存在或者是无效 JSON，则该函数应返回错误结果，否则，它应该反序列化并返回值

因为我们不知道在反序列化持久化的 JSON 字符串后我们会得到什么类型的值。我们将使用`unknown`作为反序列化值的类型。这意味着我们函数的调用者必须在对返回值执行操作之前进行某种形式的检查（或者使用类型断言）

```ts
type Result =
  | { success: true, value: unknown }
  | { success: false, error: Error };

function tryDeserializeLocalStorageItem(key: string): Result {
  const item = localStorage.getItem(key);

  if (item === null) {
    // The item does not exist, thus return an error result
    return {
      success: false,
      error: new Error(`Item with key "${key}" does not exist`)
    };
  }

  let value: unknown;

  try {
    value = JSON.parse(item);
  } catch (error) {
    // The item is not valid JSON, thus return an error result
    return {
      success: false,
      error
    };
  }

  // Everything's fine, thus return a success result
  return {
    success: true,
    value
  };
}
```

## References

[New 'unknown' top type ](https://github.com/Microsoft/TypeScript/pull/24439)

[RC announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-3-0-rc-2/#the-unknown-type)

[The unknown Type in TypeScript](https://mariusschulz.com/blog/the-unknown-type-in-typescript)

[[译] TypeScript 3.0: unknown 类型](https://juejin.im/post/5d04ac745188250a8b1fd203#heading-0)

<Vssue title="AnyDiffUnknown" />
