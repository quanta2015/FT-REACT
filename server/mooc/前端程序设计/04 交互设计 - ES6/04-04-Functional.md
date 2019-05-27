title: ES6详解
theme: light

[slide]
# 函数式编程

[slide]
# 副作用
- 全局更改值（变量、属性或数据结构）。
- 更改函数参数的原始值。
- 引发异常。
- 打印到屏幕或记录。
- 触发外部流程。
- 调用其他有副作用的函数。


[slide]
# 对比
```js
//no functional
let cnt = 0;
let increment = function() {
    cnt++;
    return cnt;
};

//functional
let increment = function(num) {
    return num + 1;
};
let average = function(scores) {
    var total = 0;
    for (let i = 0; i < scores.length; i++) {
        total += scores[i];
    }
    return total/scores.length;
};
average([90, 30, 40, 50, 60]);
```


[slide]
# User Example - NO Functional
```js
var currentUser = 0,
    users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];

var updateScore = function(newAmt) {
    users[currentUser].score += newAmt;
};
var returnUsers = function() {
    return users;
};
var updateTries = function() {
    users[currentUser].tries++;
};
var updateUser = function(newUser) {
    currentUser = newUser;
};
```

[slide]
# User Example - Step1
```js
var users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];

//可变函数
var recordData = function(arr, prop) {
    users.forEach(function(val, i, a) {
        if (val.name.toLowerCase() === arr[0].toLowerCase()) {
            a[i][prop] = arr[1];
        }
    });
};

//纯函数
var getScore = function(arr, name) {
    let score;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.toLowerCase() === name.toLowerCase()) {
            score = arr[i].score;
            break;
        }
    };
    return [name, score];
};
var getTries = function(arr, name) {
    let tries;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.toLowerCase() === name.toLowerCase()) {
            tries = arr[i].tries;
            break;
        }
    };
    return [name, tries];
};
var updateScore = function(arr, amt) {
    let newAmt = arr[1] + amt;
    return [arr[0], newAmt];
};
var updateTries = function(arr) {
    let newTries = arr[1] + 1;
    return [arr[0], newTries];
};
let newScore = updateScore(getScore(users, "Henry"), 30);
recordData(newScore, "score");
recordData(updateTries(getTries(users, "Henry")),"tries");
```

[slide]
# User Example - Step2
```js
var users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];
var storeUser = function(arr, user) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.toLowerCase() === user.name.toLowerCase()) {
            arr[i] = user;
            break;
        }
    }
};
//纯函数
var getUser = function(arr, name) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.toLowerCase() === name.toLowerCase()) {
            return arr[i];
        }
    }
    return null;
};
var updateScore = function(user, newAmt) {
    if (user) {
        user.score += newAmt;
        return user;
    }
};
var updateTries = function(user) {
    if (user) {
        user.tries++;
        return user;
    }
};
let usr = getUser(users, "Henry");
let usr1 = updateScore(usr, 30);
let usr2 = updateTries(usr1);
```


[slide]
# User Example - Step3
```js
var users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];
var newScore = function(arr, name, amt) {
    arr.forEach(function(val) {
        if (val.name.toLowerCase() === name.toLowerCase()) {
            val.score = val.score + amt;
        }
    });
    return arr;
};
var newTries = function(arr, name) {
    arr.forEach(function(val) {
        if (val.name.toLowerCase() === name.toLowerCase()) {
            val.tries++;
        }
    });
    return arr;
};
var newArray1 = newScore(users, "Henry", 30);
var newArray2 = newTries(users, "Henry");
```

[slide]
# Avoiding Shared State
```js
const arr = [3,4,2,5,1,6];
console.log(arr);
arr.sort();
console.log(arr);
```

```js
"use strict";
const arr = [3,4,2,5,1,6];
// Object.freeze(arr);
const sortArray = function(arr1) {
    return arr1.sort();
};
const newNums = sortArray(arr);
console.log(newNums);
console.log(arr);
```

[slide]
# Clone
```js
let obj = {
    fName: "Steven",
    lName: "Hancock",
    score: 85,
    completion: true
};
let obj2 = Object.assign({}, obj);
obj2.score=90
```

[slide]
# Clone children 
```hs
let obj = {
    fName: "Steven",
    lName: "Hancock",
    score: 85,
    completion: true,
    questions: {
        q1: {success: true, value: 1},
        q2: {success: false, value: 1}
    }
};
let obj2 = Object.assign({}, obj);
obj2.question.q1.value = 5;

let obj3 = JSON.parse(JSON.stringify(obj));
obj3.question.q1.value = 5;
```

[slide]
# Clone function
```js
"use strict";
const arr = [3,4,2,5,1,6];
Object.freeze(arr);

const cloneObj = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};
const newNums = cloneObj(arr).sort();
console.log(newNums);
console.log(arr);
```

[slide]
# User Clone Example 
```js
const users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];
const cloneObj = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};
var newScore = function(arr, name, amt) {
    arr.forEach(function(val) {
        if (val.name.toLowerCase() === name.toLowerCase()) {
            val.score = val.score + amt;
        }
    });
    return arr;
};
var newTries = function(arr, name) {
    arr.forEach(function(val) {
        if (val.name.toLowerCase() === name.toLowerCase()) {
            val.tries++;
        }
    });
    return arr;
};
const newArray1 = newScore(cloneObj(users), "Henry", 30);
const newArray2 = newTries(cloneObj(newArray1), "Henry");
```


[slide]
# reduce map filter
- reduce and reduceRight：使用指定的函数组合数组元素。
- map：将数组的每个元素传递给提供的函数，并返回由该函数返回的值组成的新数组。
- filter：返回一个新数组，该数组是现有数组的子集。

```js
let arr = [1, 2, 3, 4, 5];
let total = arr.reduce(function(accumulator, elem) {
    return accumulator + elem;
}, 0);
let newArray = arr.map(function(val, index, array) {
    console.log(val);
    console.log(index);
    console.log(array)
    return val ** 2;
});
let filterArray = arr.filter(function(val) {
    return val < 3;
});
```


[slide]
# Reduce 语法
`arr.reduce(callback,[initialValue])`

reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。

```
callback （执行数组中每个值的函数，包含四个参数）
    1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
    2、currentValue （数组中当前被处理的元素）
    3、index （当前元素在数组中的索引）
    4、array （调用 reduce 的数组）

initialValue （作为第一次调用 callback 的第一个参数。）
```

[slide]
# initialValue 范例1
```js
var arr = [1, 2, 3, 4];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
})
console.log(arr, sum);

// index从1开始的，第一次prev是数组的第一个值。数组长度是4，但是reduce函数循环3次。
1 2 1
3 3 2
6 4 3
[1, 2, 3, 4] 10
```

[slide]
# initialValue 范例2
```js
var  arr = [1, 2, 3, 4];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
}，0) //注意这里设置了初始值
console.log(arr, sum);

// index是从0开始的，第一次的prev的值是我们设置的初始值0，数组长度是4，reduce函数循环4次
0 1 0
1 2 1
3 3 2
6 4 3
[1, 2, 3, 4] 10
```

> 如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。


[slide]
# initialValue 范例3
```js
var  arr = [];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
})
//报错，"TypeError: Reduce of empty array with no initial value"

// 但是设置了初始值就不会报错
var  arr = [];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
}，0)
console.log(arr, sum); // [] 0
```

> 一般来说提供初始值通常更安全

[slide]
# reduce的简单用法
```js
// 数组求和，求乘积了。
var  arr = [1, 2, 3, 4];
var sum = arr.reduce((x,y)=>x+y)
var mul = arr.reduce((x,y)=>x*y)
console.log( sum ); //求和，10
console.log( mul ); //求乘积，24
```

[slide]
# reduce的高级用法
（1）计算数组中每个元素出现的次数
```
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

let nameNum = names.reduce((pre,cur)=>{
  if(cur in pre){
    pre[cur]++
  }else{
    pre[cur] = 1 
  }
  return pre
},{})
console.log(nameNum); //{Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}
```


[slide]
（2）数组去重
```
let arr = [1,2,3,4,4,1]
let newArr = arr.reduce((pre,cur)=>{
    if(!pre.includes(cur)){
      return pre.concat(cur)
    }else{
      return pre
    }
},[])
console.log(newArr);// [1, 2, 3, 4]
```

[slide]
（3）将二维数组转化为一维
```js
let arr = [[0, 1], [2, 3], [4, 5]]
let newArr = arr.reduce((pre,cur)=>{
    return pre.concat(cur)
},[])
console.log(newArr); // [0, 1, 2, 3, 4, 5]
```

[slide]
（4）对象里的属性求和
```js
var result = [{
        subject: 'math',    score: 10
    },{
        subject: 'chinese', score: 20
    },{
        subject: 'english', score: 30
    }];

var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, 0);
console.log(sum) //60
```

[slide]
# 5 logic function `5LF`
```
const scores = [50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 110];

//个位数乘10
const boostSingleScores = scores.map(function(val) {
    return (val < 10) ? val * 10 : val;
});

//求100之内的数
const rmvOverScores = boostSingleScores.filter(function(val) {
    return val <= 100;
});

//求正数
const rmvZeroScores = rmvOverScores.filter(function(val) {
    return val > 0;
});

//求和
const scoresSum = rmvZeroScores.reduce(function(sum, val) {
    return sum + val;
}, 0);

//求数组大小
const scoresCnt = rmvZeroScores.reduce(function(cnt, val) {
    return cnt + 1;
}, 0);
```

[slide]
# User with map reduce Example
```js
const users = ...;

var storeUser = function(arr, user) {
    return arr.map(function(val) {
        if (val.name.toLowerCase() === user.name.toLowerCase()) {
            return user;
        } else {
            return val;
        }
    });
};

var getUser = function(arr, name) {
    return arr.reduce(function(obj, val) {
        if (val.name.toLowerCase() === name.toLowerCase()) {
            return val;
        } else {
            return obj;
        }
    }, null); 
};
```

[slide]
# First-class Function 
**Assign a function to a variable**
```js
const foo = function() {
   console.log("foobar");
}
foo();
```

[slide]
**Function storge in array**
```js
var arr = [28, function() { console.log("hello")}]
arr[1]()
```

[slide]
**Function storge in object**
```js
var obj = {
    num:20,
    func: function() { console.log("hello");}
}
obj.funct()

console.log(28 + (function() {return 10;})())
```

[slide]
**Pass a function to a function**
```js
var addTwo = function(num, fn) {
    console.log(num + fn())
}

addTwo(28, function() {return 28;})
```

[slide]
**Return a function**
```js
var returnFun = function() {
    return function() {console.log("Hello for last time!")}
}
var returnFun();
returnFun()();
var myFunc = return();
myFunc();
```



[slide]
# Higher Order Function
```js
let things = ['Build','car','zipp','Tree','house','apple']

things.sort(function(a,b) {
    let x=a.toLowerCase()
    let y=b.toLowerCase()
    if (x<y) {return -1}
    if (x>y) {return 1}
    return 0;
})
```

[slide]
# Function Composition - BEFORE
```js
str = 'Innovation distinguishes between a leader and a follower.';
let prepareString = function() {
    let str1 = str.trim();
    let str2 = str1.replace(/[?.,!]/g,'');
    let str3 = str2.toUpperCase();
    let arr = str3.split(" ");

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'A' || arr[i] === 'AN' || arr[i] === 'THE') {
            arr.splice(i,1);
        }
    }
    return arr;
};
```

[slide]
# Function Composition - AFTER
```js
str = 'Innovation distinguishes between a leader and a follower.';
const trim = str => str.replace(/^\s*|\s*$/g, '');
const noPunct = str => str.replace(/[?.,!]/g,'');
const capitalize = str => str.toUpperCase();
const breakout = str => str.split(" ");
const noArticles = str => (str !== "A" && str !== "AN" && str !== "THE");
const filterArticles = arr => arr.filter(noArticles);

const pipe = function(...fns) {
    return function(x) {
        return fns.reduce(function(v, f) {
            return f(v);
        }, x);
    }
};

const prepareString = pipe(
    trim,
    noPunct,
    capitalize,
    breakout,
    filterArticles);
console.log(prepareString(str));
```


[slide]
# EXAMPLE - BEFORE
```js
const scores = [50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 110];
const boostSingleScores = scores.map(val => (val < 10) ? val * 10 : val);
const rmvOverScores = boostSingleScores.filter(val => val <= 100);
const rmvZeroScores = rmvOverScores.filter(val => val > 0);
const scoresSum = rmvZeroScores.reduce((sum, val) => sum + val, 0);
const scoresCnt = rmvZeroScores.reduce((cnt, val) => cnt + 1, 0);
```

[slide]
# EXAMPLE - AFTER
```js
const scores = [50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 110];

const singleScoresByTen = function(arry) {
    return arry.map(val => (val < 10) ? val * 10 : val);
};
const rmvOverScores = function(arry) {
    return arry.filter(val => val <= 100);
};
const rmvZeroScores = function(arry) {
    return arry.filter(val => val > 0);
};
const sumScores = function(arry) {
    return arry.reduce((sum, val) => sum + val, 0);
};
const countScores = function(arry) {
    return arry.reduce((cnt, val) => cnt + 1, 0);
};

const rmvBothHighLow = pipe(
    rmvOverScores,
    rmvZeroScores);
const noHighLowArray = rmvBothHighLow(scores);

const prepareScores = pipe(
    rmvBothHighLow,
    singleScoresByTen);
const preparedArray = prepareScores(scores);

const computeAverage = function(arry) {
    return sumScores(arry) / arry.length;
};
const prepareAndComputeAve = pipe (
    prepareScores,
    computeAverage);
const ave = prepareAndComputeAve(scores);
```

[slide]
# Arity of Function - Before
```js
const users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];

var storeUser = function(arr, user) {
    return arr.map(function(val) {
        if (val.name.toLowerCase() === user.name.toLowerCase()) {
            return user;
        } else {
            return val;
        }
    });
};

const cloneObj = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

var getUser = function(arr, name) {
    return arr.reduce(function(obj, val) {
        if (val.name.toLowerCase() === name.toLowerCase()) {
            return val;
        }
    }, null);
};

var updateScore = function(user, newAmt) {
    if (user) {
        user.score += newAmt;
        return user;
    }
};

var updateTries = function(user) {
    if (user) {
        user.tries++;
        return user;
    }
};

const usr = getUser(users, "Henry");
const usr1 = updateScore(cloneObj(usr), 30);
const usr2 = updateTries(cloneObj(usr1));
const newArray = storeUser(users, usr2);
```

[slide]
# Arity of Function - After
```js

const users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];

var storeUser = function(arr, user) {
    return arr.map(function(val) {
        if (val.name.toLowerCase() === user.name.toLowerCase()) {
            return user;
        } else {
            return val;
        }
    });
};

const cloneObj = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

var getUser = function(arr, name) {
    return arr.reduce(function(obj, val) {
        if (val.name.toLowerCase() === name.toLowerCase()) {
            return val;
        }
    }, null);
};

var updateScore = function(newAmt, user) {
    if (user) {
        user.score += newAmt;
        return user;
    }
};

var updateTries = function(user) {
    if (user) {
        user.tries++;
        return user;
    }
};

//this指向null，不改变this指向，可以在后续的调用中去传入剩余的参数
const partGetUser = getUser.bind(null, users);
const partUpdateScore30 = updateScore.bind(null, 30);

const updateUser = pipe(
    partGetUser,
    cloneObj,
    partUpdateScore30,
    updateTries);

const newestUser = updateUser("Henry");
```


[slide]
# Currying 
```js
const curryGreeting = function(greeting) {
    return function(name) {
        console.log(greeting + " " + name);
    };
};

const welcomeGreet = curryGreeting("Welcome");

welcomeGreet("Steve");
welcomeGreet("Mary");
```

[slide]
# Curring Example 1
```js
const ffun = function(a, b, c) {
    return a + b + c;
};

const gfun = function(d, e) {
    return d + e;
};

const hfun = function(f, g, h) {
    return f + g + h;
};

/*const curriedF = curry(ffun);
const curriedG = curry(gfun);
const curriedH = curry(hfun);

const newFun = pipe (
    curriedF(1)(2),
    curriedG(4),
    curriedH(5)(6));*/

const newFun = pipe (
    curry(ffun)(1)(2),
    curry(gfun)(4),
    curry(hfun)(5)(6));
```

[slide]
# Curring Example 2
```js
const doubleNum = function(num) {
    return num + num;
};

const totalIt = function(n1, n2, n3, n4) {
    return n1 + n2 + n3 + n4;
};

const doArray = function(num1, num2) {
    return [num1, num2];
};

// const newFunction = pipe(
//     doubleNum,
//     curry(totalIt)(3)(2)(1),
//     curry(doArray)(50));

const curriedTotalIt = curry(totalIt);
const curriedDoArray = curry(doArray);

const newFunction = pipe(
    doubleNum,
    curriedTotalIt(3)(2)(1),
    curriedDoArray(50));
```

[slide]
# User with curring example
```js
const users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];

var storeUser = function(arr, user) {
    return arr.map(function(val) {
        if (val.name.toLowerCase() === user.name.toLowerCase()) {
            return user;
        } else {
            return val;
        }
    });
};

const cloneObj = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

var getUser = function(arr, name) {
    return arr.reduce(function(obj, val) {
        if (val.name.toLowerCase() === name.toLowerCase()) {
            return val;
        } else {
            return obj;
        }
    }, null);
};

var updateScore = function(user, newAmt) {
    if (user) {
        user.score += newAmt;
        return user;
    }
};

var updateTries = function(user) {
    if (user) {
        user.tries++;
        return user;
    }
};

// orginal method
// const usr = getUser(users, "Henry");
// const usr1 = updateScore(cloneObj(usr), 30);
// const usr2 = updateTries(cloneObj(usr1));
// const newArray = storeUser(users, usr2);

// curring method
const getUsersUser = pipe(
    curry(getUser)(users),
    cloneObj);

const getHenry = function() {
    return getUsersUser("Henry");
};

const updateHenry = pipe(
    curry(updateScore)(getHenry()),
    cloneObj,
    updateTries,
    curry(storeUser)(users));
```


[slide]
# Example OOP Function
```js
let userFld = document.getElementById('user');
let statusFld = document.getElementById('score');

const createUser = function(id) {
    return {
        userId: id,
        questions: []
    };
};

const addQuestion = function(qID, response, result, weight, user) {
    const questions = clone(user.questions);
    const newQuestion = {
        qID: qID,
        response: response,
        result: result,
        weight: weight
    };
    return {
        userId: user.userId,
        questions: [...questions, newQuestion]
    };
}

const calcScore = function(user) {
    return user.questions.reduce((tot, quest) => tot + (quest.result ? quest.weight : 0), 0);
}

const calcPossible = function(user) {
    return user.questions.reduce((tot, quest) => tot + quest.weight, 0);
};
const formatResults = (user) => calcScore(user) + " out of " + calcPossible(user);
const getProp = (prop, obj) => obj[prop];
const setDOMelem = (elem, data) => elem.innerHTML = data;
    
const displayResults = pipe(
    formatResults,
    curry(setDOMelem)(statusFld));

const displayUser = pipe(
    curry(getProp)('userId'),
    curry(setDOMelem)(userFld));

const updateScore = function(user, qID, response, result, weight) {
    let usr = addQuestion(qID, response, result, weight, user);
    /* side effects */
    displayResults(usr);
    displayUser(usr);
    return usr;
};

// To test at console:
const usr1 = createUser(1);
const usr2 = updateScore(usr1, "q1", "answer", true, 1);
const usr3 = updateScore(usr2, "q2", "wrong answer", false, 2);
```

[slide]
# 推荐库函数
- Lodash
- Ramda

[slide]
# Lodash
Lodash是一个一致性、模块化、高性能的 JavaScript 实用工具库。Lodash 通过降低 `array`、`number`、`objects`、`string` 等等的使用难度从而让 JavaScript 变得更简单

[slide]
# Ramda 
Ramda 的目标更为专注：专门为函数式编程风格而设计，更容易创建函数式 pipeline、且从不改变用户已有数据。

主要特性如下：

- Ramda 强调更加纯粹的函数式风格。数据不变性和函数无副作用是其核心设计理念。这可以帮助你使用简洁、优雅的代码来完成工作。
- Ramda 函数本身都是自动柯里化的。这可以让你在只提供部分参数的情况下，轻松地在已有函数的基础上创建新函数。
- Ramda 函数参数的排列顺序更便于柯里化。要操作的数据通常在最后面。