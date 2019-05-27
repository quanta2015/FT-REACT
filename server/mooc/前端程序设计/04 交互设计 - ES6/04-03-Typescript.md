# ES 2015 

# const & let
- 忘记var
- const 和 let 都是局部有效
- const 不能重复定义

```js
if (1 === 1) {
  let name = 'Steve';
}

console.log(name);
```

# object 
- 属性名称和赋值变量同名的话，不需要重复书写
- 动态读取对象属性

```js
const person = {
  name: 'Steve',
  age: 30,
  hobbies: ['waterpolo', 'reading']
};
const name = person.name;
const { name: firstName } = person;
console.log(firstName);


const response = {
  count: 10,
  data: [{
    name: 'Luke Skywalker',
    films: ['Empire Strikes Back', 'The Force Awakens']
  }]
};
const { count, data: [{ name, films }]} = response;
console.log(name);


//同名变量赋值
const name = 'Steve';
const age = 30;
const person = {
  name,
  age
};

//动态读取对象属性
function nameMe(name) {
  return {
    [name.toLowerCase()]: {
      message: `My name is ${name}`
    }
  };
}
console.log( nameMe('Steve') );
```


# arrow function
- 语法 =>
- this对象边界
- 如果函数有一个参数，不要使用括号
- 对于多个参数，使用括号
- 多行代码需要大括号，否则不需要大括号，返回是隐式的
- 返回对象需要在返回语句周围加括号

```js
const numbers = [0, 1, 2];
numbers.map(number => console.log(number));

const quotient = {
  numbers: [1, 2, 3, 4, 5, 6, 7],
  results: [],
  divideFn: function(divisor) {
    return this.numbers.map(divident => {
      if (divident % divisor === 0) {
        return this.results.push(divident);
      }
    });
  }
};

quotient.divideFn(3);
console.log(quotient.results);

const greet = (name, age) => ({
  name,
  age
});
console.log( greet('Steve', 18) );
```

# Template
- 使用 ``
- 变量 ${expr}

```js
const name = 'Steve';
console.log(`Hello ${name}`);
```

# Classes
- Class
- extends
- super

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `Hello ${this.name}`;
  }
}

class SuperHero extends Person {
  constructor(name, power) {
    super(name);
    this.power = power;
  }

  introduce() {
    return `${super.introduce()}. Your superpower: ${this.power}`;
  }
}

const peter = new SuperHero('Spiderman', 'webbing');
console.log(peter.introduce());
```

# 安装 typescript
```bash
npm i -g typescript
npm i -g ts-node
```

# 编译typescript文件
demo.ts
```js
const numbers = [0, 1, 2, 3];
const greaterThanTwo = 
  numbers.filter(number => number > 2);
console.log(greaterThanTwo);
```

编译demo.ts
```
tsc --target es6 demo.ts
```

编译结果
```js
var numbers = [0, 1, 2, 3];
var greaterThanTwo = numbers.filter(function (number) { return number > 2; });
console.log(greaterThanTwo);
```

配置文件
```json
{
  "compilerOptions": {
    "target": "es6"
  },
  "files": [],
  "include": [
    "*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

# Typescript 数据类型

# Boolean
```js
const isAdmin: boolean = true;
```

# Number
```js
const age: number = 33;
const hexadecimal: number = 0xa00f;
const binary: number = 0b1100;
```

# String
```js
const user: string = "John";
const message: string = 'hello';
```

# any
```js
const data: any = "4";
const mix: any[] = [1, "John", false];
```

# array
```
const numbers: number[] = [0, 1, 2];
numbers.push(123);

const names: string[] = ["john", "adam"];
names.push("123");

const numbers: Array<number> = [0, 1];

const mixed: (string|number|boolean)[] = [1, "john", 2, "adam"];
const mixed: Array<number|string|boolean> = [1, "john"];

mixed.push(1);
mixed.push("asdf");
mixed.push(true);
```

# assertion
```js
type User = {
  name: string;
  age: number;
};

const myUser = {};
// (myUser as User).age = 35;
(<User>myUser).age = 28;
```

# enum 
```
enum Cardtype { Hearts, Diamons, Spades, Clubs }
let myCard: Cardtype = Cardtype.Hearts;
let cardName: string = Cardtype[2];
```

# function
```js
function greet(name: string, age: number): string {
  return `Hello ${name}, you are ${age} years old`;
}
```

# never
```
function error(): never {
  throw new Error('error!');
}

function fail() {
  return error();
}

function infinite(): never {
  while (true) { }
}
```

# null undefined
```
let test: undefined = undefined;
let test2: null = null;

let test: number = 1;
test = 2;
```

# object
```
// const person = {
//   age: 33
// };
// person.age = 35;

const users: { name: string, age: number }[] = [
  {
    name: "John",
    age: 33
  },
  {
    name: "Adam",
    age: 18
  }
];
```

# tuple
```js
let mix: [string, number];
mix = ["john", 35];
mix[0].toUpperCase(); // string specific method
mix[1].toFixed(); // number specific method
```

# type
```js
type User = {
  name: string;
  age: number;
};

const myUser: User = {
  name: "John",
  age: 34
};

```

# void
```js
function greet(name): void {
  console.log(name);
}
```

# extends
```js
interface IPerson {
  name: string;
}

interface IHero extends IPerson {
  superpower: string;
}

let regularJoe: IPerson = {
  name: "John"
};

let batman: IHero = {
  name: "Bruce",
  superpower: "money"
}
```

# interface 
```js
interface IUser {
  name: string;
  readonly age: number;
  address?: string;
}

interface IGreet {
  (name: string, language: string): string
}

let hello: IGreet;
hello = function(n: string, lang: string) {
  if(lang === "en") {
    return `Hello ${n}!`;
  } else {
    return `Hola ${n}!`;
  }
}

hello("John", "en");

let myUser: IUser = {
  name: "John",
  age: 33
};

// myUser.age = 43;
```

# interface-extra
```
interface IUser {
  name: string;
  readonly age: number;
  address?: string;
  [property: string]: any;
}

let adminUser: IUser = {
  name: "John",
  age: 33,
  test: 1,
  xyz: "asdf"
}

adminUser.test;
// adminUser["test"] --> ts version < 2.2
```

# type vs interface
```js
// type User = {
//   name: string;
//   age: number;
// };

// type User = {
//   address: string
// }

interface User {
  name: string;
  age: number;
};

interface User {
  address: string;
}

let userX: User = {
  name: "",
  age: 1,
  address: ""
}
```

# class
```js
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet(): string {
    return `Hello ${this.name}`
  }
}

let myPerson = new Person("John");
myPerson.greet();

class Hero extends Person {
  superpowers: string[] = [];
  constructor(name: string) {
    super(name);
  }
  addPower(power: string): void {
    this.superpowers.push(power);
  }
  listPowers(): string[] {
    return this.superpowers;
  }
}

let batman = new Hero("Bruce");
batman.addPower("money");
console.log(batman.listPowers());
```

# 函数可选参数
```
function greet(name: string, language:string = 'en', exclamationMark?: string): string {
  if (language === 'en') {
    return `Hello ${name}${exclamationMark}`;
  } else if (language === 'es') {
    return `Hola ${name}${exclamationMark}`;
  } else {
    return `Yo, ${name}${exclamationMark}`;
  }
}

greet('John');
greet('Alejandro', 'es');
greet('John', 'es', '!');
```

# 成员类型
- public: 父子外读写
- private: 自身读写
- protected: 父子读写
- readonly: 父子外读

# implements
```js
interface IPerson {
  name: string;
}

class Person implements IPerson {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet(): string {
    return `Hello ${this.name}`
  }
}
```

# abstract class
```js
abstract class Human {
  public name: string;
  public age: number;
  constructor(name: string) {
    this.name = name;
  }

  abstract greet(): void;
}
```

# example 
```js
interface IPerson {
  name: string;
  age: number;
}

interface IHero extends IPerson {
  superpowers: string[]
}

abstract class Human implements IPerson {
  name: string;
  age: number;
  constructor(name: string) {
    this.name = name;
  }
  abstract showAge(): number;
}

class Person extends Human {
  constructor(name: string) {
    super(name);
  }
  showAge(): number {
    return this.age;
  }
}

class Hero extends Person implements IHero {
  superpowers: string[] = [];
  constructor(name: string) {
    super(name);
  }
  addPower(power: string): void {
    this.superpowers.push(power);
  }
  listPowers(): string[] {
    return this.superpowers;
  }
}

let batman = new Hero("batman");
batman.age = 33;
batman.addPower("money");
batman.addPower("batarang");
console.log(batman.listPowers());
```

# generics
```js
//two function with same logic
function pickNumber(numbers: number[]): number {
  const randomIndex = Math.floor(Math.random() * numbers.length);
  return numbers[randomIndex];
}

const numbers = [...Array(13).keys()];
const pickedNumber = pickNumber(numbers);
console.log(pickedNumber);

function pickSuit(suits: string[]): string {
  const randomIndex = Math.floor(Math.random() * suits.length);
  return suits[randomIndex];
}

const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
const pickedSuit = pickSuit(suits);
console.log(pickedSuit);


//use generics 
function picker<T>(args: T[]): T {
  const randomIndex = Math.floor(Math.random() * args.length);
  return args[randomIndex];
}

const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
const numbers = [...Array(13).keys()];
const pickedNumber: number = picker(numbers);
const pickedSuit: string = picker(suits);
console.log(`Your card is: ${pickedNumber} ${pickedSuit}`);
```

# Webpack Compile
```
npm i -g webpack 
npm i typescript ts-loader tslint tslint-loader

webpack
```



