// Intersection Types 交叉类型

function funIntersection<T, U> (first: T, second: U): T & U {
  let result = <T & U> {}
  for (let id in first) {
    result['first'] = id;
    (<any> result)[id] = (<any> first)[id]
  }
  return result
}

// Union Types 联合类型

function funUnion(parame: number | string): void {}

funUnion(1)
funUnion('1')

interface IUnionBird {
  fly();
  layEggs()
}
interface IUnionFish {
  swim();
  layEggs()
}

function getSmallPet(): IUnionBird | IUnionFish {
  return
}

let pet = getSmallPet()
pet.swim()  // error
pet.fly() // error

if ((<IUnionFish>pet).swim) {
  (<IUnionFish>pet).swim()
}

// 为了避免使用类型断言，我们可以使用类型保护与类型区分 parameterName is Type
// Type Guards and Differentiating Types 类型保护与类型区分

// 用户自定义的类型保护

function isFish(pet: IUnionFish | IUnionBird): pet is IUnionBird {
  return (<IUnionFish>pet).swim !== undefined;
}

if (isFish(pet)) {
  pet.fly()
} else {
  pet.swim()
}

// typeof类型保护

function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
      return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// instanceof类型保护 https://www.typescriptlang.org/docs/handbook/advanced-types.html#instanceof-type-guards
