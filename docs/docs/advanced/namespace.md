> As we add more validators, we’re going to want to have some kind of organization scheme so that we can keep track of our types and not worry about name collisions with other objects. Instead of putting lots of different names into the global namespace, let’s wrap up our objects into a namespace.

`namespace`将多个实例组合在一起，对其进行分组管理，`export`导出可以使外部成员访问`namespace`空间中的一些功能

## 使用

```ts
namespace Tools {
  const TIMEOUT = 100;

  export class Ftp {
    constructor() {
      setTimeout(() => {
          console.log('Ftp');
      }, TIMEOUT)
    }
  }

  export class Http {
    constructor() {
      console.log('Http');
    }
  }

  export function parseURL() {
    console.log('parseURL');
  }
}
```

**编译过后**

```js
var Tools;
(function (Tools) {
    var TIMEOUT = 100;
    var Ftp = /** @class */ (function () {
        function Ftp() {
            setTimeout(function () {
                console.log('Ftp');
            }, TIMEOUT);
        }
        return Ftp;
    }());
    Tools.Ftp = Ftp;
    var Http = /** @class */ (function () {
        function Http() {
            console.log('Http');
        }
        return Http;
    }());
    Tools.Http = Http;
    function parseURL() {
        console.log('parseURL');
    }
    Tools.parseURL = parseURL;
})(Tools || (Tools = {}));
new Tools.Ftp();
Tools.parseURL();
```

我们发现编译过后的`namespace`在`js`中其实就是一个`*全局变量*`，如果你开发过程中想要暴漏一个全局变量就可以使用`namespace`

## 使用namspace管理类型

```ts
namespace Person {
  export type personMes = {
    name: string,
    age: number,
    location?: string
  }
  export interface IPersonPhone {
    phone?: number
  }
}

const person: Person.personMes & Person.IPersonPhone = {
  name: '',
  age: 0
}
```

## 引入写好的namespace

- 通过`/// <reference path='xxx.ts'/>`
- 我们可以编译每一个文件，然后通过`script`的方式导入

### reference path='xxx.ts'

```ts
/// <reference path="./namespace.ts" />

namespace Food {
  export interface Fruits{
      taste: string;
      hardness: number;
  }
  const person: Person.personMes = {
    name: '',
    age: 0
  }
}
```

### script

```js
<script src="./namespace.js" type="text/javascript"></script>
```

## 合并多个命名空间

与`interface`合并类似

```ts
/// <reference path="./namespace.ts" />

namespace Person {
  export interface Fruits{
      taste: string;
      hardness: number;
  }
  const person: Person.personMes = {
    name: '',
    age: 0
  }
}
```

## References

[namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)

<Vssue title="Namespace" />