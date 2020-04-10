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

new Tools.Ftp()
Tools.parseURL()

namespace Person {
  export type personMes = {
    name: string,
    age: number,
    location?: string
  }
  export interface IPersonPhone {
    phone: number
  }
}

const person: Person.personMes & Person.IPersonPhone = {
  name: '',
  age: 0,
  phone: 0
}
