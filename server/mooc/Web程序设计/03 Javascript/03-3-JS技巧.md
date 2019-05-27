title: Javascript Tips

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: T07-web-javascript-tips.html

--
#  Javascript Tips
## Javascript编程规范和技巧

-- 
### 1、首次为变量赋值时务必使用var关键字
变量没有声明而直接赋值得话，默认会作为一个新的全局变量，要尽量避免使用全局变量。

--
### 2、使用===取代==
==和!=操作符会在需要的情况下自动转换数据类型。但===和!==不会，它们会同时比较值和数据类型，这也使得它们要比==和!=快。
```js
[10] === 10    // is false
[10]  == 10    // is true
'10' == 10     // is true
'10' === 10    // is false
 []   == 0     // is true
 [] ===  0     // is false
 '' == false   // is true but true == "a" is false
 '' === false  // is false
```

--
### 3、underfined、null、0、false、NaN、空字符串的逻辑结果均为false

--
### 4、行尾使用分号
实践中最好还是使用分号，忘了写也没事，大部分情况下JavaScript解释器都会自动添加。对于为何要使用分号，可参考文章JavaScript中关于分号的真相。

--
### 5、使用对象构造器
```js
function Person(firstName, lastName){
    this.firstName =  firstName;
    this.lastName = lastName;
}
var Saad = new Person("Saad", "Mousliki");
```

--
### 6、小心使用typeof、instanceof和contructor
- typeof：JavaScript一元操作符，用于以字符串的形式返回变量的原始类型，注意，typeof null也会返回object，大多数的对象类型（数组Array、时间Date等）也会返回object
- contructor：内部原型属性，可以通过代码重写
- instanceof：JavaScript操作符，会在原型链中的构造器中搜索，找到则返回true，否则返回false
```js
var arr = ["a", "b", "c"];
typeof arr;   // 返回 "object" 
arr instanceof Array // true
arr.constructor();  //[]
```

--
### 7、使用自调用函数
函数在创建之后直接自动执行，通常称之为自调用匿名函数（Self-Invoked Anonymous Function）或直接调用函数表达式（Immediately Invoked Function Expression ）。格式如下：
```js
(function(){
    // 置于此处的代码将自动执行
})();  
(function(a,b){
    var result = a+b;
    return result;
})(10,20)
```

--
### 8、从数组中随机获取成员
```js
var items = [12, 548 , 'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' , 2145 , 119];
var  randomItem = items[Math.floor(Math.random() * items.length)];
```

--
### 9、获取指定范围内的随机数
这个功能在生成测试用的假数据时特别有数，比如介与指定范围内的工资数。
```js
var x = Math.floor(Math.random() * (max - min + 1)) + min;
```

--
### 10、生成从0到指定值的数字数组

```HTML
var numbersArray = [] , max = 100;
for( var i=1; numbersArray.push(i++) < max;);  // numbers = [1,2,3 ... 100]
```

--
### 11、生成随机的字母数字字符串
```js
function generateRandomAlphaNum(len) {
    var rdmString = "";
    for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
    return  rdmString.substr(0, len);
}
```

--
### 12、打乱数字数组的顺序
```js
var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
numbers = numbers.sort(function(){ return Math.random() - 0.5});
/* numbers 数组将类似于 [120, 5, 228, -215, 400, 458, -85411, 122205]  */
```

--
### 13、字符串去空格
Java、C#和PHP等语言都实现了专门的字符串去空格函数，但JavaScript中是没有的，可以通过下面的代码来为String对象函数一个trim函数：
```js
//新的JavaScript引擎已经有了trim()的原生实现。
String.prototype.trim = function(){return this.replace(/^\s+|\s+$/g, "");};
```

--
### 14、数组之间追加
```js
var array1 = [12 , "foo" , {name "Joe"} , -2458];
var array2 = ["Doe" , 555 , 100];
Array.prototype.push.apply(array1, array2);
/* array1 值为  [12 , "foo" , {name "Joe"} , -2458 , "Doe" , 555 , 100] */
```

--
### 15、对象转换为数组
```js
var argArray = Array.prototype.slice.call(arguments);
```

--
### 16、验证是否是数字
```js
function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}
```

--
### 17、验证是否是数组
```js
function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}
```
- 但如果toString()方法被重写过得话，就行不通了。也可以使用下面的方法：
```js
Array.isArray(obj); // its a new Array method
}
```
- 如果在浏览器中没有使用frame，还可以用instanceof，但如果上下文太复杂，也有可能出错。
```js
var myFrame = document.createElement('iframe');
document.body.appendChild(myFrame);
var myArray = window.frames[window.frames.length-1].Array;
var arr = new myArray(a,b,10); // [a,b,10]  
// myArray 的构造器已经丢失，instanceof 的结果将不正常
// 构造器是不能跨 frame 共享的
arr instanceof Array; // false
```

--
### 18、获取数组中的最大值和最小值
```js
var  numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411]; 
var maxInNumbers = Math.max.apply(Math, numbers); 
var minInNumbers = Math.min.apply(Math, numbers);
```

--
### 19、清空数组
```js
var myArray = [12 , 222 , 1000 ];  
myArray.length = 0; // myArray will be equal to [].
```

--
### 20、不要直接从数组中delete或remove元素
如果对数组元素直接使用delete，其实并没有删除，只是将元素置为了undefined。数组元素删除应使用splice。
```js
//切忌：
var items = [12, 548 ,'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' ,2154 , 119 ]; 
items.length; // return 11 
delete items[3]; // return true 
items.length; // return 11 
/* items 结果为 [12, 548, "a", undefined × 1, 5478, "foo", 8852, undefined × 1, "Doe", 2154, 119] */

//而应：
var items = [12, 548 ,'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' ,2154 , 119 ]; 
items.length; // return 11 
items.splice(3,1) ; 
items.length; // return 10 
// items 结果为 [12, 548, "a", 5478, "foo", 8852, undefined × 1, "Doe", 2154, 119]
//删除对象的属性时可以使用delete。
```

--
### 21、使用length属性截断数组
前面的例子中用length属性清空数组，同样还可用它来截断数组：
```js
var myArray = [12 , 222 , 1000 , 124 , 98 , 10 ];  
myArray.length = 4; // myArray will be equal to [12 , 222 , 1000 , 124].

//与此同时，如果把length属性变大，数组的长度值变会增加，会使用undefined来作为新的元素填充。length是一个可写的属性。
myArray.length = 10; // the new array length is 10 
myArray[myArray.length - 1] ; // undefined
```

--
### 22、在条件中使用逻辑与或
```js
var foo = 10;  
foo == 10 && doSomething(); // is the same thing as if (foo == 10) doSomething(); 
foo == 5 || doSomething(); // is the same thing as if (foo != 5) doSomething();

//逻辑或还可用来设置默认值，比如函数参数的默认值。
function doSomething(arg1){ 
    arg1 = arg1 || 10; // arg1 will have 10 as a default value if it’s not already set
}
```

--
### 23、使得map()函数方法对数据循环
```js
var squares = [1,2,3,4].map(function (val) {  
    return val * val;  
}); 
// squares will be equal to [1, 4, 9, 16]
```

--
### 24、保留指定小数位数
```js
var num =2.443242342;
num = num.toFixed(4);  // num will be equal to 2.4432
注意，toFixec()返回的是字符串，不是数字。
```

--
### 25、浮点计算的问题
```js
// is false 9007199254740992 + 1
// is equal to 9007199254740992 9007199254740992 + 2 
// is equal to 9007199254740994
0.1 + 0.2 === 0.3 

//注意
//为什么呢？因为0.1+0.2等于0.30000000000000004。
//JavaScript的数字都遵循IEEE 754标准构建，在内部都是64位浮点小数表示
```
> 可以通过使用toFixed()和toPrecision()来解决这个问题。


--
### 26、通过for-in循环检查对象的属性
下面这样的用法，可以防止迭代的时候进入到对象的原型属性中。
```js
for (var name in object) {  
    if (object.hasOwnProperty(name)) { 
        // do something with name
    }  
}
```

--
### 27、逗号操作符
```js
// a will be equal to 1 console.log(b); 
// b is equal to 99
var a = 0; var b = ( a++, 99 ); console.log(a); 
```

--
### 28、临时存储用于计算和查询的变量
在jQuery选择器中，可以临时存储整个DOM元素。
```js
var navright = document.querySelector('#right'); 
var navleft = document.querySelector('#left'); 
var navup = document.querySelector('#up'); 
var navdown = document.querySelector('#down');
```

--
### 29、提前检查传入isFinite()的参数
```js
isFinite(0/0) ; // false
isFinite("foo"); // false
isFinite("10"); // true
isFinite(10);   // true
isFinite(undefined);  // false
isFinite();   // false
isFinite(null);  // true，这点当特别注意
```

--
### 30、避免在数组中使用负数做索引
```js
var numbersArray = [1,2,3,4,5];
var from = numbersArray.indexOf("foo") ;  // from is equal to -1
numbersArray.splice(from,2);    // will return [5]
//注意传给splice的索引参数不要是负数，当是负数时，会从数组结尾处删除元素。
```

--
### 31、用JSON来序列化与反序列化
```js
var person = {name :'Saad', age : 26, department : {ID : 15, name : "R&D"} };
var stringFromPerson = JSON.stringify(person);
/* stringFromPerson 结果为 "{"name":"Saad","age":26,"department":{"ID":15,"name":"R&D"}}"   */
var personFromString = JSON.parse(stringFromPerson);
/* personFromString 的值与 person 对象相同  */
```

--
### 32、不要使用eval()或者函数构造器
```js
//eval()和函数构造器（Function consturctor）的开销较大，每次调用，JavaScript引擎都要将源代码转换为可执行的代码。
var func1 = new Function(functionCode);
var func2 = eval(functionCode);
```

--
### 33、避免使用with()
使用with()可以把变量加入到全局作用域中，因此，如果有其它的同名变量，一来容易混淆，二来值也会被覆盖。

--
### 34、不要对数组使用for-in
```js
//避免：
var sum = 0;  
for (var i in arrayNumbers) {  
    sum += arrayNumbers[i];  
}

//而是：
var sum = 0;  
for (var i = 0, len = arrayNumbers.length; i < len; i++) {  
    sum += arrayNumbers[i];  
}
//另外一个好处是，i和len两个变量是在for循环的第一个声明中，二者只会初始化一次，这要比下面这种写法快：
for (var i = 0; i < arrayNumbers.length; i++)
```

--
### 35、传给setInterval()和setTimeout()时使用函数而不是字符串
如果传给setTimeout()和setInterval()一个字符串，他们将会用类似于eval方式进行转换，这肯定会要慢些
```js
//不要使用：
setInterval('doSomethingPeriodically()', 1000);  
setTimeout('doSomethingAfterFiveSeconds()', 5000);

//而是用：
setInterval(doSomethingPeriodically, 1000);  
setTimeout(doSomethingAfterFiveSeconds, 5000);
```

--
### 36、使用switch/case代替一大叠的if/else
当判断有超过两个分支的时候使用switch/case要更快一些，而且也更优雅，更利于代码的组织，当然，如果有超过10个分支，就不要使用switch/case了。


--
### 37、在switch/case中使用数字区间
```js
function getCategory(age) {  
    var category = "";  
    switch (true) {  
        case isNaN(age):  
            category = "not an age";  
            break;  
        case (age >= 50):  
            category = "Old";  
            break;  
        case (age <= 20):  
            category = "Baby";  
            break;  
        default:  
            category = "Young";  
            break;  
    };  
    return category;  
}  
getCategory(5);  // 将返回 "Baby"
```

--
### 38、使用对象作为对象的原型
下面这样，便可以给定对象作为参数，来创建以此为原型的新对象：
```js
function clone(object) {  
    function OneShotConstructor(){}; 
    OneShotConstructor.prototype = object;  
    return new OneShotConstructor(); 
} 
clone(Array).prototype ;  // []
```

--
### 39、HTML字段转换函数
```js
function escapeHTML(text) {  
    var replacements= {"<": "&lt;", ">": "&gt;","&": "&amp;", "\"": "&quot;"};                      
    return text.replace(/[<>&"]/g, function(character) {  
        return replacements[character];  
}); 
```

--
### 40、不要在循环内部使用try-catch-finally
try-catch-finally中catch部分在执行时会将异常赋给一个变量，这个变量会被构建成一个运行时作用域内的新的变量。
```js
//切忌：
var object = ['foo', 'bar'], i;  
for (i = 0, len = object.length; i<len; i++) {  
    try {  
        // do something that throws an exception 
    }  
    catch (e) {   
        // handle exception  
    } 
}

//而应该：
var object = ['foo', 'bar'], i;  
try { 
    for (i = 0, len = object.length; i <len; i++) {  
        // do something that throws an exception 
    } 
} 
catch (e) {   
    // handle exception  
}
```

--
### 41、使用XMLHttpRequests时注意设置超时
XMLHttpRequests在执行时，当长时间没有响应（如出现网络问题等）时，应该中止掉连接，可以通过setTimeout()来完成这个工作：
```js
var xhr = new XMLHttpRequest (); 
xhr.onreadystatechange = function () {  
    if (this.readyState == 4) {  
        clearTimeout(timeout);  
        // do something with response data 
    }  
}  
var timeout = setTimeout( function () {  
    xhr.abort(); // call error callback  
}, 60*1000 /* timeout after a minute */ ); 
xhr.open('GET', url, true);  
xhr.send();
//同时需要注意的是，不要同时发起多个XMLHttpRequests请求。
```

--
### 42、处理WebSocket的超时
通常情况下，WebSocket连接创建后，如果30秒内没有任何活动，服务器端会对连接进行超时处理，防火墙也可以对单位周期没有活动的连接进行超时处理。
为了防止这种情况的发生，可以每隔一定时间，往服务器发送一条空的消息。可以通过下面这两个函数来实现这个需求，一个用于使连接保持活动状态，另一个专门用于结束这个状态。
```HTML
var timerID = 0; 
function keepAlive() { 
    var timeout = 15000;  
    if (webSocket.readyState == webSocket.OPEN) {  
        webSocket.send('');  
    }  
    timerId = setTimeout(keepAlive, timeout);  
}  
function cancelKeepAlive() {  
    if (timerId) {  
        cancelTimeout(timerId);  
    }  
}
keepAlive()函数可以放在WebSocket连接的onOpen()方法的最后面，cancelKeepAlive()放在onClose()方法的最末尾。
```

--
### 43、时间注意原始操作符比函数调用快，使用VanillaJS
```js
//不要这样：
var min = Math.min(a,b); 
A.push(v);

//可以这样来代替：
var min = a < b ? a : b; 
A[A.length] = v;
```

--
### 44、使用构造函数属性来判断对象的类型
```js
//检查数字实际上是否为字符串
if (num.constructor == String) {
    //如果是，则把字符串解析为整数
    num = parseInt(num);
}
//检查字符串实际上是否为数组
if (str.constructor == Array) {
    //如果是，则根据数组用逗号归并出字符串来
    str = str.join(',');
}
```

--
### 45、变量的类型检查
```js
变量              typeof变量    变量.构造函数
{an:"object"}       object      Object
["an","array"]      object      Array
function(){}        function    Function
"a string"          string      String
55                  number      Number
true                boolean     Boolean
new User()          object      User
```

--
### 46、用闭包实现的函数Curry化
```js
//数字求和函数的函数生成器
function addGenerator(num) {
    //返回一个简单的函数，求两个数字的和，其中第一个数字来自生成器
    return function (toAdd) {
        return num + toAdd
    }
}
//addFive现在包含一个接受单一参数的函数，这个函数能求得5加上该参数的和
var addFive = addGenerator(5);
console.log(addFive(4));//输出9
```

--
### 47、使用匿名函数来隐藏全局作用域变量
```js
(function(){
    //变量原本应该是全局的
    var msg = "test";
    //将一个新函数绑定到全局对象
    window.onunload = function(){
        //这个函数使用了隐藏的msg
        alert(msg);
    };
    //关闭匿名函数并执行
})();
```

--
### 48、使用匿名函数来激发出创建多个使用闭包的函数所需的作用域
```js
//一个ID为main的元素
var obj = document.getElementById("main");
//用于绑定一个数组
var items = ["click", "keypress"];
//遍历数组的每个成员
for (var i = 0; i < items.length; i++) {
    //使用一个自执行的匿名函数来激发出作用域
    (function () {
        //记住在这个作用域内的值
        var item = items[i];
        obj["on" + item] = function () {
            /item引用本for循环上下文所属作用域中的一个父变量
            alert("alert" + item);
        }
    })();
}
```

--
### 49、在上下文对象内使用函数并将其上下文对象切换为另一个变量
```js
var obj = {
    yes: function () {
        //this==obj
        this.val = true;
    },
    no: function () {
        this.val = false;
    }
};

//我们发现'obj'对象没有val属性
alert(obj.val == null);

//执行yes函数后，将val属性与'obj'对象关联起来
obj.yes();
alert(obj.val == true);

//不过现在把window.no指向obj.no并执行之
window.no = obj.no;
window.no();

//结果是obj对象的val不变（因为no的上下文已经变为window对象了）
alert(obj.val == true);

//而window的val属性被更新了
alert(window.val == false);
```

--
### 50、修改函数上下文对象的例子
```js
//一个设置上下文对象颜色样式的简单函数
function changeColor(color) {
    this.style.color = color;
}

//在window对象中调用此函数会失败，因为window对象没有style属性
changeColor("white");

//找出ID为main的文档
var main = document.getElementById("main");

//使用call方法将它的颜色置为黑色
changeColor.call(main, "black");

//设置body元素颜色的函数
function setBodyColor() {
    //apply方法将上下文对象设置为第一个参数指定的body元素，第二个参数是传给函数的所有参数的数组
    changeColor.apply(document.body, arguments);
}

//将body的背景色置为黑色
setBodyColor("black");
```

--
### 51、使用constructor属性的例子
```js
//创建一个新的简单的User对象
function User() {
}

//创建一个User对象
var me = new User();

//还是创建一个新的User对象（用前一个对象的constructor引用来创建）
var you = new me.constructor();

//你可以发现这两个对象的constructor实质上是一致的
alert(me.constructor == you.constructor);
```

--
### 52、对象的方法通过prototype对象添加的例子
```js
//创建一个新的User构造函数
function User(name, age) {
    this.name = name;
    this.age = age;
}

//将一个新的函数添加到此对象的prototype对象中
User.prototype.getName = function () {
    return this.name;
};

//并再给此prototype对象添加一个函数，注意其上下文是实例化后的对象
User.prototype.getAge = function () {
    return this.age;
};

//实例化一个新的User对象
var user = new User("Bob", 44);

//可以看到我们添加的这两个属性都在刚才创建的对象中，并且有合适的上下文
alert(user.getName == "Bob");
alert(user.getAge == 44);
```

--
### 53、私有方法
私有方法和私有变量只允许其他的私有方法、私有变量和特权方法访问。这种方法可以定义一些只让对象内部访问，而外部访问不到的代码。
```js
//表示教室的一个对象构造函数
function Classroom(students, teacher) {
    //用于显示所有班上学生的私有方法
    function disp() {
        alert(this.names.join(","));
    }

    //将班级数据存入公共对象属性中
    this.students = students;
    this.teacher = teacher;

    //调用私有方法来显示错误
    disp();
}

//创建一个新的classroom对象
var c = new Classroom(["John", "Bob"], "Mr. Smith");

//调用disp方法会失败，因为它不是该对象的公共属性
c.disp();
```

--
### 54、特权方法
特权方法用来指代哪些在查看并处理私有变量的同时允许用户以公共方法的方式访问的方法。
```js
//创建一个新的User对象构造函数
function User(name, age) {
    //尝试算出用户出生的年份
    var year = (new Date()).getFullYear() - age;

    //创建一个新的特权方法，能够访问year变量，同时自身属于公共可访问的
    this.getYearBorn = function () {
        return year;
    }
}

//创建User对象的一个新示例
var user = new User("Bob", 44);

//验证返回的年份正确
alert(user.getYearBorn() == 1962);

//注意我们无法访问该对象私有的年份属性
alert(user.year == null);
```

--
### 55、静态方法
静态方法的实质与任何其他一般函数没有什么不同，最主要的区别在于，其他函数是以对象的静态属性形式存在的。作为一个属性，它们不能在该对象的实例的上下文中访问，而只属于主对象本身的那个上下文中。
```js
//添加到一个User对象的静态方法
User.clnoeUser = function (user) {
    //创建并返回一个新的用户
    return new User(user.getName(), user.getAge());
};
```

--
### 56、原型式继承的例子
```js
//为Person对象创建一个构造函数
function Person(name) {
    this.name = name;
}

//给Person对象添加一个新方法
Person.prototype.getName = function () {
    return this.name;
};

//创建一个新的User对象的构造函数
function User(name, password) {
    //注意，这里并没有支持方法的重载/集成，也就是说，不能调用父类的构造函数
    this.name = name;
    this.password = password;
}

//User对象继承所有Person对象的方法
User.prototype = new Person();

//我们添加一个新方法到User对象中
User.prototype.getPassword = function () {
    return this.password;
};
```

--
### 57、JavaScript中的命名空间化及其实现
```js
//创建一个默认的、全局的命名空间
var YAHOO = {};

//使用对象设置一些子命名空间
YAHOO.util = {};

//创建最终命名空间，它包含一个值为函数的属性
YAHOO.util.Event = {
    addEventListener: function () {

    }
};

//调用某个具体命名空间中的函数
YAHOO.util.Event.addEventListener();
```

--
### 58、 使用!!操作符转换布尔值
有时候我们需要对一个变量查检其是否存在或者检查值是否有一个有效值，如果存在就返回true值。为了做这样的验证，我们可以使用`!!`操作符来实现是非常的方便与简单。对于变量可以使用`!!variable`做检测，只要变量的值为:`0`、`null`、`" "`、`undefined`或者`NaN`都将返回的是false，反之返回的是true。比如下面的示例：
```js
function Account(cash) {
    this.cash = cash;
    this.hasMoney = !!cash;
}
var account = new Account(100.50);
console.log(account.cash); // 100.50
console.log(account.hasMoney); // true

var emptyAccount = new Account(0);
console.log(emptyAccount.cash); // 0
console.log(emptyAccount.hasMoney); // false

//只要account.cash的值大于0，那么account.hasMoney返回的值就是true。
```

--
### 59、 使用+将字符串转换成数字
这个技巧非常有用，其非常简单，可以交字符串数据转换成数字，不过其只适合用于字符串数据，否则将返回`NaN`
```js
function toNumber(strNumber) {
    return +strNumber;
}
console.log(toNumber("1234")); // 1234
console.log(toNumber("ACB")); // NaN

//这个也适用于Date，在本例中，它将返回的是时间戳数字：
console.log(+new Date()) // 1461288164385
```

--
### 60、 并条件符
```js
//如果你有一段这样的代码：
if (conected) {
    login();
}

//你也可以将变量简写，并且使用&&和函数连接在一起，比如上面的示例，可以简写成这样：
conected && login();

//如果一些属性或函数存在于一个对象中，你也可以这样做检测，如下面的代码所示：
user && user.login();
```

--
### 61、 使用||运算符
在ES6中有默认参数这一特性。为了在老版本的浏览器中模拟这一特性，可以使用||操作符，并且将将默认值当做第二个参数传入。如果第一个参数返回的值为false，那么第二个值将会认为是一个默认值。如下面这个示例
```js
function User(name, age) {
    this.name = name || "Oliver Queen";
    this.age = age || 27;
}
var user1 = new User();
console.log(user1.name); // Oliver Queen
console.log(user1.age); // 27

var user2 = new User("Barry Allen", 25);
console.log(user2.name); // Barry Allen
console.log(user2.age); // 25
```

--
### 62、 在循环中缓存array.length
这个技巧很简单，这个在处理一个很大的数组循环时，对性能影响将是非常大的。基本上，大家都会写一个这样的同步迭代的数组：
```js
for(var i = 0; i < array.length; i++) {
    console.log(array[i]);
}

//如果是一个小型数组，这样做很好，如果你要处理的是一个大的数组，这段代码在每次迭代都将会重新计算数组的大小，这将会导致一些延误。为了避免这种现象出现，可以将array.length做一个缓存：
var length = array.length;
for(var i = 0; i < length; i++) {
    console.log(array[i]);
}

//你也可以写在这样：
for(var i = 0, length = array.length; i < length; i++) {
    console.log(array[i]);
}
```

--
### 63、 检测对象中属性
当你需要检测一些属性是否存在，避免运行未定义的函数或属性时，这个小技巧就显得很有用。如果你打算定些一些跨兼容的浏览器代码，你也可能会用到这个小技巧。例如，你想使用`document.querySelector()`来选择一个id，并且让它能兼容IE6浏览器，但是在IE6浏览器中这个函数是不存在的，那么使用这个操作符来检测这个函数是否存在就显得非常的有用，如下面的示例：
```js
if ('querySelector' in document) {
    document.querySelector("#id");
} else {
    document.getElementById("id");
}
//如果document不存在querySelector函数，那么就会调用docuemnt.getElementById("id")
```

--
### 64、 获取数组中最后一个元素
`Array.prototype.slice(begin,end)`用来获取begin和end之间的数组元素。如果你不设置end参数，将会将数组的默认长度值当作end值。但有些同学可能不知道这个函数还可以接受负值作为参数。如果你设置一个负值作为begin的值，那么你可以获取数组的最后一个元素。
```js
var array = [1,2,3,4,5,6];
console.log(array.slice(-1)); // [6]
console.log(array.slice(-2)); // [5,6]
console.log(array.slice(-3)); // [4,5,6]
```

--
### 65、 数组截断
这个小技巧主要用来锁定数组的大小，如果用于删除数组中的一些元素来说，是非常有用的。例如，你的数组有10个元素，但你只想只要前五个元素，那么你可以通过`array.length=5`来截断数组。如下面这个示例：
```js
var array = [1,2,3,4,5,6];
console.log(array.length); // 6
array.length = 3;
console.log(array.length); // 3
console.log(array); // [1,2,3]
```

--
### 66、 替换所有
`String.replace()`函数允许你使用字符串或正则表达式来替换字符串，本身这个函数只替换第一次出现的字符串，不过你可以使用正则表达多中的/g来模拟replaceAll()函数功能：
```js
var string = "john john";
console.log(string.replace(/hn/, "ana")); // "joana john"
console.log(string.replace(/hn/g, "ana")); // "joana joana"
```

--
### 67、 合并数组
如果你要合并两个数组，一般情况之下你都会使用`Array.concat()`函数：
```js
var array1 = [1,2,3];
var array2 = [4,5,6];
console.log(array1.concat(array2)); // [1,2,3,4,5,6];
```
然后这个函数并不适合用来合并两个大型的数组，因为其将消耗大量的内存来存储新创建的数组。在这种情况之个，可以使用`Array.pus().apply(arr1,arr2)`来替代创建一个新数组。这种方法不是用来创建一个新的数组，其只是将第一个第二个数组合并在一起，同时减少内存的使用：
```js
var array1 = [1,2,3];
var array2 = [4,5,6];
console.log(array1.push.apply(array1, array2)); // [1,2,3,4,5,6];
```

--
### 68、 将NodeList转换成数组
如果你运行`document.querySelectorAll(“p”)`函数时，它可能返回DOM元素的数组，也就是NodeList对象。但这个对象不具有数组的函数功能，比如`sort()`、`reduce()`、`map()`、`filter()`等。为了让这些原生的数组函数功能也能用于其上面，需要将节点列表转换成数组。可以使用`[].slice.call(elements)`来实现：
```js
var elements = document.querySelectorAll("p"); // NodeList
var arrayElements = [].slice.call(elements); // Now the NodeList is an array
var arrayElements = Array.from(elements); // This is another way of converting NodeLi
```

