/**
 * Boolean
 * Number
 * String
 * Array
 * Tuple
 * Enum
 * Any
 * Void
 * Null and Undefined
 * Never
 * Object
 * Type assertions
 * A note about 'let'
 */

// Tuple 元组 定义一对值为string number的数组

let x: [string, number]

x = ['x', 1]

// Enum 枚举

enum Color {Red = 'red', Green = 'green', Blue = 'blue'}

let c: Color = Color.Blue

// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
  while (true) {
  }
}

let someValue: any = 'this is a string'
const strLength: number = (<string> someValue).length
