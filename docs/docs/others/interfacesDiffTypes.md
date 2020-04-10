interface和types的区别

官方文档是这么说的

> “type aliases can act sort of like interfaces, however, there are some subtle differences.” 类型别名可以起到类似接口的作用，但是，它们之间有一些细微的差别

## Same point

### 都可以描述一个对象或者函数

```ts
interface PointInterface {
  x: number
  y: number
}

type PointType = {
  x: number
  y: number
}

const getRectangleAreaInterface = (args: PointInterface) => args.x * args.y
const getRectangleAreaAliased = (args: PointType) => args.x * args.y
```


### 都可以进行拓展

我们可以使用`类型别名`来扩展`接口`

```ts
interface ThreeDimesions extends PointType {
  z: number
}
```

或者使用`类型别名`实现类约束

```ts
class Rectangle implements PointType {
  x: 2
  y: 4
}
```

或者使用`类型扩展`的`接口`来实现类的约束

```ts
class RectanglePrism implements ThreeDimesions {
  x: 1
  y: 2
  z: 3
}
```

还可以结合`类型别名`和`接口`来实现类约束

```ts
interface Shape {
  area(): number
}
type Perimeter = {
  perimiter(): number
}

class Rectangles implements PointType, Shape, Perimeter {
  x: 1
  y: 2
  area() {
    return this.x * this.y
  }
  perimiter() {
    return 2 * (this.x + this.y)
  }
}
```

我们还可以通过`Partial`来让`Shape` `Perimeter`可选

```ts
type RectangleShape = Partial<Shape & Perimeter> & PointType

class PartialRectangle implements RectangleShape {
  x: 1
  y: 2
}
```

### 具有类型别名和接口的混合类型

```ts
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

const getCounter = () => {
  const counter = ((start: number) => {}) as Counter
  counter.interval = 2
  counter.reset = () => {}
  return counter
}

const callable = getCounter()
callable(10)
callable.reset()
callable.interval = 5.0
```

它同样适用于`类型别名`

```ts
type Counter = {
  (start: number): string
  interval: number
  reset(): void
}
```

## Difference

### 如果在类型定义中使用联合运算符，则不能在类型别名的类上使用 implements

> you cannot use implements on an class with type alias if you use union operator within your type definition

```ts
type RectangleShape1 = (Shape | Perimeter) & PointType

// Error: A class can only implement an object type or intersection of object types with statically known members.ts
class PartialRectangle1 implements RectangleShape1 {
}
```

### 如果在类型定义中使用联合运算符，则不能在具有类型别名的接口上使用 extends

> you cannot use extends on an interface with type alias if you use union operator within your type definition

```ts
type RectangleShape2 = Shape | Perimeter

// Error: An interface can only extend an object type or intersection of object types with statically known members.
interface RectangleShape2Interface extends RectangleShape2 {}
interface RectangleShape2Interface extends RectangleShape2 {}
```

### 声明合并不适用于类型别名

> declaration merging doesn’t work with type alias

*`interface`*

```ts
interface Box {
  height: number
  width: number
}
interface Box {
  scale: number
}

const box: Box = {height: 1, width: 2, scale: 3}
```

*`type`*

```ts
// Error: 标示符BoxType重复
type BoxType = {
  height: number
  width: number
}
type BoxType = {
  scale: number
}
```

## References

[interface vs type alias](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)

[interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

[type-aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases)

<Vssue title="InterfacesDiffTypes" />
