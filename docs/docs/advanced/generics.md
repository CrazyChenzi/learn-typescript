> 泛型允许我们延迟编写类或方法中的编程元素的数据类型的规范，直到实际在程序中使用它的时候。

## 使用泛型

```ts
function identity<T> (arg: T): T {
  return arg
}
```

```ts
identity<number>(1) // 1
```

## 误用的泛型

```ts
declare function foo<T>(arg: T): void
```

在这里，泛型完全没有必要使用，因为它仅用于单个参数的位置

这样会更好

```ts
declare function foo(arg: any): void

declare function foo<T>(arg: T): T
```

## References

[generics](https://www.typescriptlang.org/docs/handbook/generics.html)

<Vssue title="TypeAlias" />
