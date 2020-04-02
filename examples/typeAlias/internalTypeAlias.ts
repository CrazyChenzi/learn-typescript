interface ITypeAlias {
  name: string;
  age: number;
  location?: string
}

function fun(arg: { a: number, b: string }): { a: number } {
  return { a: 0 }
}

class Person {
  public firstName: string
  public lastName: number

  constructor(firstName: string, lastName: number) {
    this.firstName = firstName
    this.lastName = lastName
  }
}

// Partial
type partialTest = Partial<ITypeAlias>

// Required
type requiredTest = Required<ITypeAlias>

// Readonly
type readonlyTest = Readonly<ITypeAlias>

// Pick
type pickTest = Pick<ITypeAlias, 'name' | 'age'>

// Record
type recordTest = Record<'zhangsan' | 'lisi', ITypeAlias>

// Exclude
type excludeTest = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'f'>
// 剔除一个属性
type excludeTest1 = Pick<ITypeAlias, Exclude<keyof ITypeAlias, 'name'>>

// Extract
type extractTest = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'f'>
type extractTest1 = Extract<keyof ITypeAlias, 'name'>

// Omit
type omitTest = Omit<ITypeAlias, 'name'>

// NonNullable
type nonNullableTest = NonNullable<string | null | undefined>

// Parameters
type parametersTest = Parameters<typeof fun>

// ConstructorParameters
type constructorParametersTest = ConstructorParameters<FunctionConstructor>
type constructorParametersTest1 = ConstructorParameters<typeof Person>

// ReturnType
type returnTypeTest = ReturnType<typeof fun>

// InstanceType
type instanceTypeTest = InstanceType<typeof Person>

// ThisType
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

// MoveReadonly
type MoveReadonly<T> = {-readonly [P in keyof T]: T[P]}
type moveReadonlyTest = MoveReadonly<readonlyTest>

// PowerPartial
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

// DeferredPromise
type DeferredPromise<T> = {[P in keyof T]: Promise<T[P]>}
type deferredPromiseTest = DeferredPromise<ITypeAlias>
type deferredPromiseTest1 = DeferredPromise<Person>

// Proxify
type Proxify<T> = {[P in keyof T]: { get(): T[P]; set(v: T[P]): void }}
type proxifyTest = Proxify<Person>
type proxifyTest1 = Proxify<ITypeAlias>
