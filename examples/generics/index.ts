enum eDirective {
  Walk,
  Jump,
  Smile
}

class DirectiveManager<T> {
  private directives: Array<T> = []
  add = (directive: T): Array<T> => {
    this.directives = this.directives.concat(directive)
    return this.directives
  }
  get = (index: number): T => {
    return this.directives[index]
  }
  shift = (): Array<T> => {
    this.directives.shift()
    return this.directives
  }
}

const system = new DirectiveManager<number>()
system.add(eDirective.Jump)
system.add(1)

/**
 * extends
 * 可以用来继承一个类，也可以用来继承一个 interface，但还可以用来判断有条件类型
 */
type textExtends = '男' | '女'
type textE<T> = T extends textExtends ? true : false

type text1 = textE<'男'>
type text2 = textE<'男nv'>

/**
 * typeof
 * 在 JS 中 typeof 可以判断一个变量的基础数据类型，在 TS 中，它还有一个作用，就是获取一个变量的声明类型，如果不存在，则获取该类型的推论类型
 */

const objectTypeOf = {
  name: '张三',
  age: 18
}

type typeObjectTypeOf = typeof objectTypeOf

const objectTypeOf1: typeObjectTypeOf = {
  name: '王五',
  age: 19
}

/**
 * keyof
 * 用来取得一个对象接口的所有 key 值
 */

interface IKeyOf {
  name: string;
  age: number;
  location?: string
}

type keyof1 = keyof IKeyOf

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let keyof2 = { a: 1, b: 2, c: 3, d: 4 };

getProperty(keyof2, "a"); // okay
// getProperty(keyof2, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

/**
 * in
 * 可以用来遍历枚举类型
 */
enum Keys {
  name = 'name',
  age = 'age'
}

type in1 = {
  [p in Keys]: string
}

/**
 * Partial 把所有属性转换为可写
 */

type newIKeyOf = Partial<IKeyOf>

/**
 * Required 把所有属性转换为必填
 */
type newIKeyOf1 = Required<IKeyOf>

/**
 * Readonly 把所有属性转换为只读
 */

type newIKeyOf2 = Readonly<IKeyOf>

let keyof3: newIKeyOf2 =  {
  name: '张三',
  age: 18,
  location: ''
}

keyof3.name = '王五'  // Cannot assign to 'name' because it is a read-only property

/**
 * Pick 将某个类型的子类型挑出来
 */

type newIKeyOf3 = Pick<IKeyOf, 'name' | 'age'>

/**
 * Record 获得根据 K 中的所有可能值来设置 key 以及 value 的类型
 */

type newIKeyOf4 = Record<'a' | 'b', IKeyOf>

/**
 * Exclude
 */

type newIKeyOf5 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'f'>
// 剔除一个属性
type newIKeyOf6 = Pick<IKeyOf, Exclude<keyof IKeyOf, 'name'>>

/**
 * Extract 提取出T中包含在U中的元素
 */

type newIKeyOf7 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'f'>
type newIKeyOf8 = Extract<keyof IKeyOf, 'name'>