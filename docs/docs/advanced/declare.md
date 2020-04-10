*`declare` 只能声明不能有具体实现*

通常常用的声明文件社区已经帮我们写好了。但有时候我们发现第三方库并没有，自己需要手动书写。

exapmle:

```js
npm install @types/jquery --save-dev
```

## 全局变量

- 暴力操作，通过`script`引入，全局声明`xxx`
- `npm install @types/xxx -D`，不需要任何配置
- 声明文件 xxx.d.ts 存放在当前项目中，如若没有生效请检查所放位置和`tsconfig.ts`中的`file include exclude`等配置

| 声明语句              | 含义         |
| --------------------- | ------------ |
| declare var/let/const | 声明全局变量 |
| declare function      | 声明全局方法 |
| declare class         | 声明全局类   |
| declare enum          | 声明全局枚举 |
| declare namespace     | 声明全局对象 |


### declare var/let/const

```ts
declare var DeclareVar: (params: string) => any
```

### declare function

```ts
declare function DeclareFunction(params: string): string
```

### declare class

```ts
declare class DeclareClass {
  name: string;
  constructor(name: string);
  getName(): string;
}
```

### declare enum

```ts
declare enum DeclareEnum {
  RED = 'red',
  BLUE = 'blue'
}
```

### declare namespace

*在声明对象中可继续嵌入声明对象*

> namespace 解决模块化，那模块化单词是 module，可后来 ES6 也是用了 module，由于 ts 要兼容 ES6，不得已将 module 改为 namespace。

> 不建议用：ES6 的出现，ts 不建议再用 namespace 来解决模块化问题，而是推荐使用 ES6 的模块化方案（ts 还是很包容的，一切为了程序员的便利）。

> 了解其原理：虽然 namespace 不建议用了，但 declare namespace 还是常用的，表示全局变量的一个对象，所以就有子属性。

```ts
declare namespace DeclareNameSpace {
  const name: string
  function getName(): string
  class Person {
    getConstructor(): this
  }
  enum Color {
    RED = 'red',
    BLUE = 'blue'
  }
  namespace ns {
    function getNs(): string
  }
}
```

## References

[declaration-files](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html)

<Vssue title="TypeAlias" />
