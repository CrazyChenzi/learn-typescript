interface ITypeAlias {
  name: string;
  age: number;
  location?: string
}

type keyofTest = keyof ITypeAlias

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
const test = { a: 1, b: 2, c: 3, d: 4 };
getProperty(test, "a"); // okay
// getProperty(test, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.