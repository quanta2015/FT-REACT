title: JSon & Ajax

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: 11-web-ajax.html

--
# JSon & Ajax
##  json格式 和 ajax异步式调用

--
##  JSON 是什么
`JSON` 全称是 `JavaScript Object Notation`, 即 `JavaScript` 对象标记法。这是一种轻量级（Light-Weight）、基于文本的（Text-Based）、可读的（Human-Readable）格式。

--
## JSON 的语法规则
- 数组（Array）用方括号(“[]”)表示。
- 对象（Object）用大括号（”{}”）表示。
- 名称/值对（name/value）之间用冒号（”：”）隔开。
- 名称（name）置于双引号中，值（value）有字符串、数值、布尔值、null、对象和数组。
- 并列的数据之间用逗号（“,”）分隔
```js
{
    "name": "Geoff Lui",
    "age": 26,
    "isChinese": true,
    "friends":["Lucy", "Lily", "Gwen"],
    "Mother": {
        "name": "Mary Lui",
        "age": 54
    }
}
```

--
### JSON - 对象（Object）
对象用大括号（“{}”）括起来，大括号里是一系列的“名称/值对”, 两个并列的数据之间用逗号（“,”）隔开，注意两点：

- 使用英文的逗号（“,”），不要用中文的逗号（“，”）
- 最后一个“名称/值对“之后不要加逗号

<img src="img/web/webajax01.png" width="621">
```js
{}  //空对象

{"name":"Geoff Lui"} 

{"name":"Mary", "age": 10}

{
    "name":"Alice",
    "age":14,
    "mother":{                //对象里包含对象
        "name":"Gwen",
        "age":40
    }
}
```

--
### JSON - 数组（Array）
数组表示一系列有序的值，用方括号 `[]` 包围起来，并列的值之间用逗号分隔。
<img src="img/web/webajax02.png" width="627">
```js
[]    //空数组

[1, 2, 3, 4]

["one", "two", "three", "four"]

["one", "two", 3, 4]     //同一个数组中可以有不同的数据类型

["one", ["two", "three"]]  //数组里可以有数组

[1, true, {"name":"John"}]  //数组里可以有对象
```

--
### JSon - 名称/值对（Name/Value）
- 名称 `Name` 是一个字符串，要用双引号括起来，不能用单引号，也不能没有引号，这一点与 `JavaScript` 不同。
- 值的类型只有六种：字符串、数值、对象、数组、布尔、null。不能有这之外的类型，例如 undefined、函数等。
<img src="img/web/webajax03.png" width="500">

--
### JSon - 字符串（string）
- 英文双引号括起来，不能用单引号，也不能没有。
- 字符串中不能单独出现双引号（”） 和右斜杠（“\”）。
- 如果要打双引号或右斜杠，需要使用“右斜杠+字符”的形式，例如 \” 和 \\，其它的转意字符也是如此
<img src="img/web/webajax04.png" width="500">
```js
{"string": "one" }    //合法
{"string": 'one' }    //不合法，不能用单引号
{"string": one }    //不合法，没有加双引号
{"string": "My father's name is John"}    //合法
{"string": "My father said, "He likes dogs.""}    //不合法，字符串中有双引号
{"string": "My father said, \"He likes dogs.\""}    //合法
{"string": "\tMy Name is Alice."}    //合法
```

--
### JSon - 数值
- 英文双引号括起来，不能用单引号，也不能没有。
- 字符串中不能单独出现双引号（”） 和右斜杠（“\”）。
- 如果要打双引号或右斜杠，需要使用“右斜杠+字符”的形式，例如 \” 和 \\，其它的转意字符也是如此
<img src="img/web/webajax05.png" width="500">
```js
{"money": 10 }   //合法
{"money": 0.33 }   //合法
{"money": -5.5 }   //合法
{"money": 1e-5 }   //合法
{"money": 1e5 }   //合法
{"money": 0x55 }   //不合法，不能用十六进制
{"money": 055 }   //不合法，不能用八进制
``` 

--
### JSON 和 XML
`JSON` 的诞生本来有取代 `XML` 的意思, 相比 `XML`, `JSON` 的优势如下：  

- 没有结束标签，长度更短，读写更快  
- 能够直接被 JavaScript 解释器解析  
- 可以使用数组  
```JS
//JSON
{
    "name": "Geoff Lui",
    "age": 26,
    "isChinese": true,
    "friends":["Lucy", "Lily", "Gwen"]
}
```
```HTML
//XML
<root>
    <name>Geoff Lui</name>
    <age>Geoff Lui</age>
    <friends>Lucy</friends>
    <friends>Lily</friends>
    <friends>Gwen</friends>
</root>
```

--
### JSON 解析
`JavaScript` 提供了两个方法：`JSON.stringify` 和 `JSON.parse`：

- `JSON.stringify` 用于将 `JavaScript` 对象转换成 `JSON` 字符串。
- `JSON.parse` 用于将 `JSON` 字符串转换成 `JavaScript` 对象。
```js
var str = '{"name": "Geoff Lui","age": 26,"friends":["Lucy","Lily","Gwen"]}';
var obj = JSON.parse(str);  //返回一个 JavaScript 对象
console.log(obj);

var jsonstr = JSON.stringify(obj);  //返回一个 JSON 字符串
console.log(jsonstr);
```

--
### JSON.parse() 函数
- JSON.parse() 函数有两个参数：name 和 value，分别代表名称和值。
- 当传入一个 JSON 字符串后，JSON 的每一组名称/值对都要调用此函数。
- 该函数有返回值，返回值将赋值给当前的名称（name）。
```js
var str = '{"name":"Geoff Lui", "age": 26}';
var obj = JSON.parse(str);
console.log(obj);  //输出解析后的对象

var obj = JSON.parse(str, fun);
function fun(name, value){
    console.log(name + ": " + value);
        return value;    //注意不要忘记返回 value
}
//输出：
//name: Geoff Lui
//age: 26

JSON.parse("{age: 26}");  //报错，因为 age 没有用双引号
```


--
### JSON.stringify() 函数
- JSON.stringify() 能够将 JavaScript 值转换成 JSON 字符串。
- JSON.stringify() 生成的字符串可以用 JSON.parse() 再还原成 JavaScript 值。

--
#### 1. 参数的含义
```js
  JSON.stringify(value[, replacer[, space]])
```
- value：必选参数。被变换的 JavaScript 值，一般是对象或数组。
- replace：可以省略。有两种选择：函数或数组。
如果是函数，则每一组名称/值对都会调用此函数，该函数返回一个值，作为名称的值变换到结果字符串中，如果返回 undefined，则该成员被忽略。
如果是数组，则只有数组中存在名称才能够被转换，且转换后顺序与数组中的值保持一致。
- space：可以省略。这是为了排版、方便阅读而存在的。可以在 JSON 字符串中添加空白或制表符等。

--
#### 2. value 用法
- 只用第一个参数，就是直接将 `JavaScript` 值转换成 `JSON` 字符串，不做任何的处理。
```js
var obj = {
    name: "Geoff Lui",
    age: 26,
    nationality: "China"
};
var json = JSON.stringify(obj);
console.log(json);
//输出：
//{"name":"Geoff Lui","age":26,"nationality":"China"}
```
- 如果存在不符合 JSON 语法的值，则自动忽略，例如 `undefined` 和 `function`
```js
var obj = {
    name: "Geoff Lui",
    age: 26,
    nationality: "China",
    school: undefined,
    add: function(){
        this.age++;
    }
};
var json = JSON.stringify(obj);
console.log(json);
//输出：
//{"name":"Geoff Lui","age":26,"nationality":"China"}
//属性school和函数add被省略
```
- 如果数组里有函数，则转换为 null。
```js
var obj = {
    name: "Geoff Lui",
    friends: [function(){}]
};
var json = JSON.stringify(obj);
//结果：
//{"name":"Geoff Lui","friends":[null]}
```

--
#### 3. replace 的用法
- `replace` 可以是函数或数组。如果是函数，则每一组名称/值对都会调用此函数。与 `JSON.parse()` 类似。
```js
var obj = {
    name: "Geoff Lui",
    age: 26
};
var json = JSON.stringify(obj, fun);
function fun(name, value){
    console.log(name + ":" + value);
    return value;
}
// 输出
// :[object Object]
// name:Geoff Lui
// age:26
```
- 如果是数组，则只有数组中存在名称才能够被转换，且转换后顺序与数组中的值保持一致。
```js
var obj = { a: 1, b: 2, c: 3, d: 4 };
var json = JSON.stringify(obj, ["c","b","a"]);
console.log(json);
//输出：
//{"c":3,"b":2,"a":1}
```

-- 
#### 4. space 的用法
- `space` 是用于排版的，可在 `JSON` 中插入制表符能使其更加美观。
```js
var obj = { a: 1, b: 2, c: 3, d: 4 };
var json = JSON.stringify(obj, ["c","b","a"], "\t");
console.log(json);
//输出：
//{
//  "c": 3,
//  "b": 2,
//  "a": 1
//}
```

--
### Ajax 和 JSON
`JSON` 文件被放置在服务器端，客户端请求该文件用得最多的是 `Ajax` 能够实现异步请求。

--
### Ajax 是什么
- `AJAX`，全称 `Asynchronous JavaScript and XML`，即“异步的 JavaScript 和 XML”，一般写作 `Ajax` 。
- `Ajax` 能够与服务器交换少量数据，从而异步地更新部分网页。异步指的是当 `Ajax` 执行交换数据的操作时，其他的操作仍然可以执行。
 
--
### 创建和使用 Ajax
- 创建 Ajax 对象要考虑浏览器的版本问题，主要分为两大类：IE7+/Chrome/Firefox/… 和 IE6/IE5.。
```js
function CreateXHR(){
    if (window.XMLHttpRequest)
    {
        //对浏览器 IE7+, Firefox, Chrome, Opera, Safari
        return new XMLHttpRequest();
    }
    else
    {
        //对浏览器 IE6, IE5
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}
```
- 然后，只要用如下方式创建即可。
```js
var xmlhttp; 
xmlhttp = CreateXHR();
```
- 假设服务器端有一个文件 test.json，则异步地请求文件，并输出到控制台的代码如下。
```js
xmlhttp.open("GET","test.json",true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var jsonstr = xmlhttp.responseText;
        console.log(jsonstr);
    }
}
```
> 其中`xmlhttp.readyState` 存有 `XMLHttpRequest` 的状态，有五个值：
```html
0: 请求未初始化
1: 服务器连接已建立
2: 请求已接收
3: 请求处理中
4: 请求已完成，且响应已就绪
xmlhttp.staus 的值为请求结果，200表示OK，404表示未找到页面。
获取来自服务器的响应，可使用XMLHttpRequest对象的responseText属性[字符串]或 responseXML属性[XML]
```

--
### $.ajax函数
`$.ajax`是JQuery对ajax封装的最基础步，通过使用这个函数可以完成异步通讯的所有功能。也就是说什么情况下我们都可以通过此方法进行异步刷新的操作。基本语法格式为：
```js
var configObj = {
       method   //数据的提交方式：get和post
       url   //数据的提交路劲
       async   //是否支持异步刷新，默认是true
       data    //需要提交的数据
       dataType   //服务器返回数据的类型，例如xml,String,Json等
       success    //请求成功后的回调函数
       error   //请求失败后的回调函数
    }
 
$.ajax(configObj);//通过$.ajax函数进行调用。

```
url传参数的范例
```js
$.ajax({
	type: "POST", //提交方式  
	url: "doDelete.action?id="+id+"&name="+name,
	success: function(result) { //返回数据根据结果进行相应的处理  
		if (result.success) {
			$("#tipMsg").text("删除数据成功");
		} else {
			$("#tipMsg").text("删除数据失败");
		}
	}
});
//如果参数中存在中文字符的话，必须用encodeURI进行转义
```

data传参数的范例
```js
$.ajax({
	type: "POST", //提交方式  
	url: "doDelete.action", //路径  
	data: {
		"id": id,"name":name
	}, //数据，这里使用的是Json格式进行传输  
	success: function(result) { //返回数据根据结果进行相应的处理  
		if (result.success) {
			$("#tipMsg").text("删除数据成功");
		} else {
			$("#tipMsg").text("删除数据失败");
		}
	}
});
```

--
### $.post
`$.post`这个函数其实就是对`$.ajax`进行了更进一步的封装，减少了参数，简化了操作，但是运用的范围更小了。`$.post`简化了数据提交方式，只能采用POST方式提交。只能是异步访问服务器，不能同步访问，不能进行错误处理。
```html
url:发送请求地址。
data:待发送 Key/value 参数。
callback:发送成功时回调函数。
type:返回内容格式，xml, html, script, json, text,_default。
```

-- 
### $.get
`$.get`和`$.post`一样，这个函数是对get方法的提交数据进行封装，只能使用在get提交数据解决异步刷新的方式上

--  
### $.getJSON
`$.getJSON`是进一步的封装，也就是对返回数据类型为Json进行操作。里边就三个参数，需要我们设置，非常简单：url,[data],[callback]

-- 
### deferred对象
从jQuery 1.5.0版本开始引入的一个新功能`deferred对象`。
这个功能很重要，未来将成为jQuery的核心方法，它彻底改变了如何在jQuery中使用ajax。为了实现它，jQuery的全部ajax代码都被改写了

--
### 什么是deferred对象？
deferred对象就是jQuery的回调函数解决方案。在英语中，defer的意思是"延迟"，所以deferred对象的含义就是"延迟"到未来某个点再执行。它解决了如何处理耗时操作的问题，对那些操作提供了更好的控制，以及统一的编程接口。

-- 
### ajax操作的链式写法
jQuery的ajax操作的传统写法：
```js
$.ajax({　　　　
  url: "test.html",
  success: function() {　　　　　　
    alert("哈哈，成功了！");　　　　
  },
  error: function() {　　　　　　
    alert("出错啦！");　　　　
  }　　
});
```
`$.ajax()`接受一个对象参数，这个对象包含两个方法：success方法指定操作成功后的回调函数，error方法指定操作失败后的回调函数。
  
--
### deferred对象的写法
`$.ajax()`操作完成后，如果使用的是低于1.5.0版本的jQuery，返回的是`XHR`对象，你没法进行链式操作；如果高于1.5.0版本，返回的是`deferred`对象，可以进行链式操作。
```js
$.ajax("test.html")
  .done(function() {
    alert("哈哈，成功了！");
  })
  .fail(function() {
    alert("出错啦！");
  });
//done()相当于success方法，fail()相当于error方法。采用链式写法以后，代码的可读性大大提高
```

--
### 指定同一操作的多个回调函数
deferred对象的一大好处，就是它允许你自由添加多个回调函数。
如果ajax操作成功后，除了原来的回调函数，我还想再运行一个回调函数，怎么办？
很简单，直接把它加在后面就行了。
```js
$.ajax("test.html")
  .done(function() {
    alert("哈哈，成功了！");
  })
  .fail(function() {
    alert("出错啦！");
  })
  .done(function() {
    alert("第二个回调函数！");
  });
//回调函数可以添加任意多个，它们按照添加顺序执行
```

--
### 为多个操作指定回调函数
deferred对象的另一大好处，就是它允许你为多个事件指定一个回调函数，这是传统写法做不到的。
请看下面的代码，它用到了一个新的方法`$.when()`
```js 
$.when($.ajax("test1.html"), $.ajax("test2.html"))　　
  .done(function() {
    alert("哈哈，成功了！");
  })　　
  .fail(function() {
    alert("出错啦！");
  });
//如果有一个失败或都失败了，就执行fail()指定的回调函数。
```

--
### 普通操作的回调函数接口 1
deferred对象的最大优点，就是它把这一套回调函数接口，从ajax操作扩展到了所有操作。不管是ajax操作还是本地操作，也不管是异步操作还是同步操作，都可以使用deferred对象的各种方法，指定回调函数。
```js
var wait = function() {　　　　
  var tasks = function() {　　　　　　
    alert("执行完毕！");　　　　
  };　　　　
  setTimeout(tasks, 5000);　　
};
```
为它指定回调函数，应该怎么做呢？很自然的，你会想到，可以使用$.when()
```js
$.when(wait())
  .done(function() {
    alert("哈哈，成功了！");
  })
  .fail(function() {
    alert("出错啦！");
  });
```
但是，这样写的话，done()方法会立即执行，起不到回调函数的作用。原因在于$.when()的参数只能是deferred对象，所以必须对wait()进行改写：
```js
var dtd = $.Deferred(); // 新建一个deferred对象
var wait = function(dtd) {　　　　
  var tasks = function() {　　　　　　
    alert("执行完毕！");　　　　　　
    dtd.resolve(); // 改变deferred对象的执行状态
  };　　　　
  setTimeout(tasks, 5000);　　　　
  return dtd;　　
};

$.when(wait(dtd))
  .done(function() {
    alert("哈哈，成功了！");
  })
  .fail(function() {
    alert("出错啦！");
  });
//wait()函数运行完，就会自动运行done()方法指定的回调函数。
```

--
### deferred.resolve() & deferred.reject()
jQuery规定，deferred对象有三种执行状态: `未完成`，`已完成`和`已失败`。

- 如果执行状态是`已完成`(resolved),deferred对象立刻调用`done()`方法指定的回调函数；
- 如果执行状态是`已失败`，调用`fail()`方法指定的回调函数；
- 如果执行状态是`未完成`，则继续等待，或者调用`progress()`方法指定的回调函数（jQuery1.7版本添加）。

> - ajax操作时，deferred对象会根据返回结果，自动改变自身的执行状态；  
> - 在wait()函数中，这个执行状态必须手动指定。
> > `dtd.resolve()`的意思是，将dtd对象的执行状态从`未完成`改为`已完成`，从而触发`done()`方法。
> > `deferred.reject()`方法，作用是将dtd对象的执行状态从`未完成`改为`已失败`，从而触发`fail()`方法。
```js
var dtd = $.Deferred(); // 新建一个Deferred对象
var wait = function(dtd) {　　　　
  var tasks = function() {　　　　　　
    alert("执行完毕！");　　　　　　
    dtd.reject(); // 改变Deferred对象的执行状态
  };　　　　
  setTimeout(tasks, 5000);　　　　
  return dtd;　　
};　　

$.when(wait(dtd))
  .done(function() {
    alert("哈哈，成功了！");
  })
  .fail(function() {
    alert("出错啦！");
  });
```


--
### deferred.promise()方法
上面这种写法，还是有问题。那就是dtd是一个全局对象，所以它的执行状态可以从外部改变。
```js
var dtd = $.Deferred(); // 新建一个Deferred对象
var wait = function(dtd) {　　　　
  var tasks = function() {　　　　　　
    alert("执行完毕！");　　　　　　
    dtd.resolve(); // 改变Deferred对象的执行状态
  };　　　　
  setTimeout(tasks, 5000);　　　　
  return dtd;　　
};

$.when(wait(dtd))
  .done(function() {
    alert("哈哈，成功了！");
  })
  .fail(function() {
    alert("出错啦！");
  });　　
dtd.resolve();
//代码的尾部加了一行dtd.resolve()，这就改变了dtd对象的执行状态
//导致done()方法立刻执行，跳出"哈哈，成功了！"的提示框，等5秒之后再跳出"执行完毕！"的提示框。
```

为了避免这种情况，jQuery提供了`deferred.promise()`方法。它的作用是，在原来的deferred对象上返回另一个deferred对象，后者只开放与改变执行状态无关的方法（比如`done()`方法和`fail()`方法），屏蔽与改变执行状态有关的方法（比如`resolve()`方法和`reject()`方法），从而使得执行状态不能被改变。
```js
var dtd = $.Deferred(); // 新建一个Deferred对象
var wait = function(dtd) {　　　　
  var tasks = function() {　　　　　　
    alert("执行完毕！");　　　　　　
    dtd.resolve(); // 改变Deferred对象的执行状态　　
  };　　　
  setTimeout(tasks, 5000);　　　　
  return dtd.promise(); // 返回promise对象　
};

var d = wait(dtd); // 新建一个d对象，改为对这个对象进行操作
$.when(d)
  .done(function() {
    alert("哈哈，成功了！");
  })
  .fail(function() {
    alert("出错啦！");
  });
//wait()函数返回的是promise对象。然后，我们把回调函数绑定在这个对象上面，而不是原来的deferred对象上面。
//这样的好处是，无法改变这个对象的执行状态，要想改变执行状态，只能操作原来的deferred对象。
```

不过，更好的写法是allenm所指出的，将dtd对象变成`wait()`函数的内部对象。
```js
var wait = function(dtd) {　　　　
  var dtd = $.Deferred(); //在函数内部，新建一个Deferred对象
  var tasks = function() {　　　　　　
    alert("执行完毕！");　　　　　　
    dtd.resolve(); // 改变Deferred对象的执行状态　　
  };　　
  setTimeout(tasks, 5000);　　　　
  return dtd.promise(); // 返回promise对象　
};　　

$.when(wait())
  .done(function() {
    alert("哈哈，成功了！");
  })
  .fail(function() {
    alert("出错啦！");
  });
```

--
### $.Deferred() 建构函数
另一种防止执行状态被外部改变的方法，是使用deferred对象的建构函数`$.Deferred()`。这时，`wait()`函数还是保持不变，我们直接把它传入`$.Deferred()`
```HTML
var wait = function(dtd) {
  var tasks = function() {
    alert("执行完毕！");
    dtd.resolve(); // 改变Deferred对象的执行状态
  };
  setTimeout(tasks, 5000);
  return dtd.promise();
};

$.Deferred(wait)
  .done(function() {
    alert("哈哈，成功了！");
  })
  .fail(function() {
    alert("出错啦！");
  });
};
//$.Deferred()可以接受一个函数名（注意，是函数名）作为参数
//$.Deferred()所生成的deferred对象将作为这个函数的默认参数。
```

--
### 直接部署deferred接口
除了上面两种方法以外，还可以直接在wait对象上部署deferred接口。
```js
var dtd = $.Deferred(); // 生成Deferred对象　
var wait = function(dtd) {　　　
  var tasks = function() {
    alert("执行完毕！");　　　　
    dtd.resolve(); // 改变Deferred对象的执行状态　　
  };　　　
  setTimeout(tasks, 5000);
};

dtd.promise(wait);
wait.done(function() {
  alert("哈哈，成功了！");
}).fail(function() {
  alert("出错啦！");
});　
wait(dtd);
//关键是dtd.promise(wait)这一行，它的作用就是在wait对象上部署Deferred接口。
//正是因为有了这一行，后面才能直接在wait上面调用done()和fail()。
```

--
### [1] Deferred范例
```js
function sleep(timeout) {  
    var dtd = $.Deferred();
    setTimeout(dtd.resolve, timeout);
    return dtd;
}

// 等同于上面的写法
function sleep(timeout) {  
    return $.Deferred(function(dtd) {
        setTimeout(dtd.resolve, timeout);
    });
}

console.time('sleep');  
sleep(2000).done(function() {  
    console.timeEnd('sleep');
});
```

--
### [2] Deferred范例
```js
function loadImg(src) {
  var dtd = $.Deferred(),
    img = new Image;
  img.onload = function() {
    dtd.resolve(img);
  }
  img.onerror = function(e) {
    dtd.reject(e);
  }
  img.src = src;
  return dtd;
}

loadImg('http://www.baidu.com/favicon.ico').then(
  function(img) {
    $('body').prepend(img);
  }, function() {
    alert('load error');
  }
)
```

--
### [3] Deferred范例 
5s后把百度Logo显示出来
```js
setTimeout(function() {
  loadImg('http://www.baidu.com/favicon.ico').done(function(img) {
    $('body').prepend(img);
  });
}, 5000);
```

```js
sleep(5000)
  .done(function() {
    loadImg('http://www.baidu.com/favicon.ico').done(function(img) {
      $('body').prepend(img);
    });
  });
```

```js
$.when(sleep(5000), loadImg('http://www.baidu.com/favicon.ico'))
  .done(function(ignore, img) {
    $('body').prepend(img);
  });
```

--
### deferred对象的方法
deferred对象总结：
1 . `$.Deferred()` 生成一个deferred对象。  
2 . `deferred.done()` 指定操作成功时的回调函数  
3 . `deferred.fail()` 指定操作失败时的回调函数  
4 . `deferred.promise()` 没有参数时，返回一个新的deferred对象，该对象的运行状态无法被改变；接受参数时，作用为在参数对象上部署deferred接口。  
5 . `deferred.resolve()`   手动改变deferred对象的运行状态为"已完成"，从而立即触发`done()`方法  
6 . `deferred.reject()` 这个方法与`deferred.resolve()`  正好相反，调用后将deferred对象的运行状态变为"已失败"，从而立即触发fail()方法  
7 . `$.when()` 为多个操作指定回调函数  
除了这些方法以外，deferred对象还有二个重要方法，上面的教程中没有涉及到  
8 . `deferred.then()`
有时为了省事，可以把`done()`和`fail()`合在一起写，这就是`then()`方法  
```js
$.when($.ajax( "/main.php" ))
  .then(successFunc, failureFunc );
//如果then()有两个参数，那么第一个参数是done()方法的回调函数，第二个参数是fail()方法的回调方法。
//如果then()只有一个参数，那么等同于done()  
```
9 . `deferred.always()`
这个方法也是用来指定回调函数的，它的作用是，不管调用的是`deferred.resolve()`还是`deferred.reject()`，最后总是执行。
```js
$.ajax( "test.html" )
  .always( function() { alert("已执行！");} );
```

--
### deferred对象技巧
使用deferred对象写JS动画非常方便
```js
// Animation flows.
$.when( preloadImage() )
.then( animation01 )
.then( animation02 )
.then( animation03 )
.then( transition )
.then( merge )
.then( zoom )
.then( showContent )
.then( flicker );
```

优点：  
1、可以任意调整动画的先后顺序  
2、添加 SKIP（跳过动画）功能也很方便  
3、调试动画也可以节省大量时间。 把不需要调试的动画项注释掉  
```js
$.when( preloadImage() )
// .then( animation01 )
// .then( animation02 )
// .then( animation03 )
// .then( transition )
// .then( merge )
// .then( zoom )
.then( showContent )
.then( flicker );
```
