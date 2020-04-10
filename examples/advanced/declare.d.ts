declare var DeclareVar: (params: string) => any

declare function DeclareFunction(params: string): string

declare class DeclareClass {
  name: string;
  constructor(name: string);
  getName(): string;
}

declare enum DeclareEnum {
  RED = 'red',
  BLUE = 'blue'
}

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