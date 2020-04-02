## 关键字

使用类型别名可以实现很多的复杂类型，很多复杂类型都需要借助关键字来实现

*全局interface定义*在后面会用到

```ts
interface ITypeAlias {
  name: string;
  age: number;
  location?: string
}
```

*全局function定义*在后面会用到

```ts
function fun(arg: { a: number, b: string }): { a: number } {
  return { a: 0 }
}
```

*全局Class定义*

```ts
class Person {
  public firstName: string
  public lastName: number

  constructor(firstName: string, lastName: number) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

### extends

`extends`可以用来继承一个类，也可以用来继承一个`interface`，还可以用来判断有条件的类型

```ts
type text = 'a' | 'b' | 'c'

type textE<T> = T extends text ? true : false

type text1 = textE<'a'> // true
type text2 = textE<'f'> // false
```

### typeof

在`js`中`typeof`可以用来判断一个变量的基础数据类型，在`TS`中，它还有一个作用就是获取一个变量的`声明类型`，如果不存在，则获取该类型的`推论类型`

```ts
const obj = {
  name: 'zhangsan',
  age: 18
}

type typeofObj = typeof obj
```

### keyof

用来获取一个对象接口所有的`key`值

```ts
type keyofTest = keyof ITypeAlias // "name" | "age" | "location"

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
const test = { a: 1, b: 2, c: 3, d: 4 };
getProperty(test, "a"); // okay
// getProperty(test, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

### in

可以用来遍历`枚举类型`

```ts
enum ENUMTEST {
  name = 'name',
  age = 'age'
}

type inEnumTest = {
  [p in ENUMTEST]: number
}
```

## 内置类型别名

[源码](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts)

### Partial

把所有`属性`转换为`可写`

> 源码: `type Partial<T> = { [P in keyof T]?: T[P]; }`

```ts
type partialTest = Partial<ITypeAlias>
```

### Required

把所有`属性`转换为`必填`

> 源码: `type Required<T> = { [P in keyof T]-?: T[P]; }`

```ts
type requiredTest = Required<ITypeAlias>
```

### Readonly

把所有`属性`转换为`只读`

> 源码: `type Readonly<T> = { readonly [P in keyof T]: T[P]; }`

```ts
type readonlyTest = Readonly<ITypeAlias>
```

### Pick

将某个`类型`的`子类型`挑出来

> 源码: `type Pick<T, K extends keyof T> = { [P in K]: T[P]; }`

```ts
type pickTest = Pick<ITypeAlias, 'name' | 'age'> 
```

### Record

根据`key`中所有可能值来设置`key`以及`value`的`类型`

> 源码: `type Record<K extends string | number | symbol, T> = { [P in K]: T; }`

```ts
type recordTest = Record<'zhangsan' | 'lisi', ITypeAlias>
```

### Exclude

Exclude from T those types that are assignable to U 提取T中不包含U的元素

> 源码: `type Exclude<T, U> = T extends U ? never : T`

```ts
type excludeTest = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'f'>
// 扩展-剔除一个属性
type excludeTest1 = Pick<ITypeAlias, Exclude<keyof ITypeAlias, 'name'>>
```

### Extract

Extract from T those types that are assignable to U 提取出T中包含在U中的元素

> 源码: `type Extract<T, U> = T extends U ? T : never`

```ts
type extractTest = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'f'>
type extractTest1 = Extract<keyof ITypeAlias, 'name'>
```

### Omit

Construct a type with the properties of T except for those in type K 从T中剔除一个K的属性

这与`Pick<ITypeAlias, Exclude<keyof ITypeAlias, 'name'>>`类似

> 源码: `type Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }`

```ts
type omitTest = Omit<ITypeAlias, 'name'>
```

### NonNullable

过滤类型中的`null`和`undefined`

> 源码: `type NonNullable<T> = T extends null ? never : T`

```ts
type nonNullableTest = NonNullable<string | null | undefined>
```

### Parameters

获得函数的参数类型组成的`元组类型`

> 源码: `type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never`

```js
type parametersTest = Parameters<typeof fun>
```

### ConstructorParameters

获得类的参数类型组成的`元组类型`

> 源码: `type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never`

```ts
type constructorParametersTest = ConstructorParameters<FunctionConstructor>
type constructorParametersTest1 = ConstructorParameters<typeof Person>
```

### ReturnType

获取`函数`的`返回类型`

> 源码: `type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any`

```ts
type returnTypeTest = ReturnType<typeof fun>
```

### InstanceType

获取`构造函数`的`实例类型`

> 源码: `type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any`

```ts
type instanceTypeTest = InstanceType<typeof Person>
```

### ThisType

`ThisType` 此实用程序不返回转换后的类型。 相反，它可以作为这种类型上下文的标记。 请注意，必须启用 `-- noImplicitThis` 标志才能使用此实用程序

> 源码: `interface ThisType<T>`

```ts
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;  // Type of 'this' in methods is D & M
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
      moveBy(dx: number, dy: number) {
          this.x += dx;  // Strongly typed this
          this.y += dy;  // Strongly typed this
      }
  }
});
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```

## 自定义的一些类型别名

### MoveReadonly

移除所有`readonly`属性

> 源码: `type MoveReadonly<T> = {-readonly [P in keyof T]: T[P]}`

```ts
type MoveReadonly<T> = {-readonly [P in keyof T]: T[P]}
type moveReadonlyTest = MoveReadonly<readonlyTest>
```

### PowerPartial

内置的 `Partial` 有个局限性，就是只支持处理第一层的属性，如果是嵌套多层的就没有效果了，不过可以如下自定义

> 源码: `type PowerPartial<T> = {[U in keyof T]?: T[U] extends object ? PowerPartial<T[U]> : T[U]}`

```ts
type PowerPartial<T> = {[U in keyof T]?: T[U] extends object ? PowerPartial<T[U]> : T[U]}

interface ITypeAliasMore {
  name: string;
  age: number;
  address: {
    location: string;
    country: string;
    city: string
  }
}
type powerPartialTest = PowerPartial<ITypeAliasMore>
```

### DeferredPromise

将每一个`属性`包装为一个`Promise`返回

> 源码: `type DeferredPromise<T> = {[P in keyof T]: Promise<T[P]>}`

```ts
type DeferredPromise<T> = {[P in keyof T]: Promise<T[P]>}
type deferredPromiseTest = DeferredPromise<ITypeAlias>
type deferredPromiseTest1 = DeferredPromise<Person>
```

### Proxify

为`属性`添加`get set`

> 源码: `type Proxify<T> = {[P in keyof T]: { get(): T[P]; set(v: T[P]): void }}`

```ts
type Proxify<T> = {[P in keyof T]: { get(): T[P]; set(v: T[P]): void }}
type proxifyTest = Proxify<Person>
type proxifyTest1 = Proxify<ITypeAlias>
```
