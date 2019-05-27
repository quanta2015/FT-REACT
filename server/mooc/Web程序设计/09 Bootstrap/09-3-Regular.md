title: JS正则表达式详解

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: T13-web-regular.html

--
#  JS正则表达式详解
## JavaScript Regular Expression

--
### 1. 创建一个正则表达式
- 第一种方法
```js
  var reg = /pattern/;
```
- 第二种方法
```js
  var reg = new  RegExp('pattern');
```
- 正则表达式的exec方法简介
```js
  //其中str为要执行正则表达式的目标字符串
  reg.exec(str);

  var reg = /test/;
  var str = 'testString';
  var result =  reg.exec(str);
  alert(result);//test
```

--
### 2. 数量匹配
> `c{n}`表示匹配n个的意思。
```js
  /c{1}/ 只能匹配一个c
  /c{2}/ 则会匹配两个连续的c
  以此类推
  /c{n}/ 则会匹配n个连续的c
```
```js
  reg = /c{1}/;
  str='cainiao';
  reg.exec(str);//c
```
```js
  reg = /c{2}/;
  str='ccainiao';
  reg.exec(str);//cc
```
```js
  reg = /c{3,4}/;
  str='cccTest';
  reg.exec(str);//ccc
```
```js
  reg = /c{1,}/;//c{1,}表示1个以上的c。
  str='cainiao';
  reg.exec(str);//c
```

> `*`表示0次或者多次，等同于`{0,}`
```js
  c* 和 c{0,} 是一个意思
```
> `+`表示一次或者多次，等同于`{1,}`
```js
  c+ 和 c{1,} 是一个意思
```
> `?`表示0次或者1次，等同于`{0,1}`
```js
  c? 和 c{0,1} 是一个意思
```

--
### 3. 贪心与非贪心
正则的贪心模式：会尽量多去匹配字符。
> 在例子`reg = /c{3,4}/; str='ccccTest';`的例子中已经看到了，能匹配四个的时候，正则绝对不会去匹配三个。

> 如果我们希望正则尽量少地匹配字符，那么就可以在表示数字的符号后面加上一个`?`,比如`{n,}?`, `*?`, `+?`, `??`, `{m,n}?`
```js
reg = /c{1,}?/;
str='ccccc';
reg.exec(str);//c
```

--
### 4. 首尾匹配
> ^表示只匹配字符串的开头。看下面的例子：
```js
reg = /^c/;
str='维生素c';
reg.exec(str); //null 因为字符串‘维生素c’的开头并不是c，所以匹配失败。
```
> 与`^`相反，`$`则只匹配字符串结尾的字符
```js
reg = /c$/;
str='cainiao';
reg.exec(str); //返回null  表示正则表达式没能在字符串的结尾找到c这个字符

reg = /c$/;
str='维生素c';
reg.exec(str);//c
```

--
### 5. 模糊匹配
> 点 `.` 会匹配字符串中除了换行符`\n`之外的所有字符
```js
reg = /./;
str='cainiao';
reg.exec(str);//c

reg = /.+/;
str='blueidea——经典论...坛  好_。';
reg.exec(str);//"blueidea——经典论坛... 好_。"
//也就是说所有的字符都被匹配掉了，包括一个空格，一个下滑线，和一个破折号。
//还有'.'本身也可以匹配

reg = /^./;
str='\ncainiao';
reg.exec(str);//null，终于失败了，正则要求字符串的第一个字符不是换行，但是恰恰字符是以\n开始的。
```

--
### 6. 二选一匹配
> 二选一，正则表达式中的或`|` ; `b|c`表示，匹配`b`或者`c`。
```js
reg = /b|c/;
str='blueidea';
reg.exec(str);//b

reg = /b|c/;
str='cainiao';
reg.exec(str);//c

reg = /^b|c.+/;
str='cainiao';
ereg.exec(str);//cainiao

reg = /^b|c.+/;
str='bbs.blueidea.com';
reg.exec(str);//b   因为上面正则表达式的意思是，匹配开头的b或者是c.+

reg = /^(b|c).+/;
str='bbs.blueidea.com';
reg.exec(str);//bbs.blueidea.com
```

--
### 7. 字符集合匹配
> 字符集合`[abc]`: `[abc]`表示`a`或者`b`或者`c`中的任意一个字符。
> 使用表示式:[a-z],[A-Z],[0-9]，表示小写字母，大写字母，数字。
```js
reg = /^[abc]/;
str='bbs.blueidea.com';
reg.exec(str);//b

reg =  /^[a-zA-Z][a-zA-Z0-9_]+/;
str='test';
reg.exec(str);//test
```

> 反字符集合`[^abc]`: `^`在正则表达式开始部分的时候表示开头的意思，例如`/^c/`表示开头是`c`；但是在字符集和中，它表示的是类似`"非"`的意思，例如`[^abc]`就表示不能是`a`，`b`或者`c`中的任何一个。
```js
reg = /[^abc]/;
str='blueidea';
reg.exec(str);//l 返回的结果是l，因为它是第一个非abc的字符（即第一个b没有匹配）

reg = /[^abc]/;
str='cainiao';
reg.exec(str);// i  前两个字符都是[abc]集合中的。

//[^0-9]表示非数字，[^a-z]表示非小写字母
```

--
### 8. 边界匹配
> 边界与非边界

`\b`表示的边界的意思，也就是说，只有字符串的开头和结尾才算数。例如`/\bc/`就表示字符串开始的`c`或者是结尾的`c`。
```js
reg = /\bc/;
str='cainiao';
reg.exec(str);// c  匹配到了左边界的c字符

reg = /\bc/;
str='维生素c';
reg.exec(str);//c，不过这次返回的是右侧边界的c。

reg = /\bc/;
str='bcb';
reg.exec(str);//null 因为bcb字符串中的c被夹在中间，既不在左边界也不再右边界。
```

与`\b`对应`\B`表示非边界。
```js
reg = /\Bc/;
str='bcb';
reg.exec(str);//这次会成功地匹配到bcb中的c

reg = /\Bc/;
str='cainiao';
reg.exec(str); //则会返回null。因为\B告诉正则，只匹配非边界的c。
```

--
### 9. 数字匹配
> 数字与非数字: `\d`表示数字的意思，相反，`\D`表示非数字。
```js
reg = /\d/;
str='cainiao8';
reg.exec(str);//返回的匹配结果为8，因为它是第一个数字字符。

reg = /\D/;
str='cainiao8';
reg.exec(str);//c
```

--
### 10. 空白匹配
> 空白: `\f`匹配换页符，`\n`匹配换行符，`\r`匹配回车，`\t`匹配制表符，`\v`匹配垂直制表符, `\s`匹配单个空格，等同于`[\f\n\r\t\v]`。
```js
reg = /\s.+/;
str='This is a test  String.';
reg.exec(str);//“is a test String.”，正则的意思是匹配第一个空格以及其后的所有非换行字符。

//同样，\S表示非空格字符。
reg = /\S+/;
str='This is a test  String.';
reg.exec(str);//匹配结果为This，当遇到第一个空格之后，正则就停止匹配了。
```

--
### 11. 单词字符匹配
> `\w`表示单词字符，等同于字符集合`[a-zA-Z0-9_]`。
```js
reg = /\w+/;
str='blueidea';
reg.exec(str);//的blueidea字符串，因为所有字符都是单词字符。

reg = /\w+/;
str='.className';
reg.exec(str);//结果显示匹配了字符串中的className，只有第一个“.”——唯一的非单词字符没有匹配。

reg = /\w+/;
str='中文如何？';
reg.exec(str);//null  \W表示非单词字符，等效于[^a-zA-Z0-9_]

reg = /\W+/;
str='中文如何？';
reg.exec(str);// 返回完整的字符串，因为，无论是中文和“？”都算作是非单词字符。
```

--
### 12. 反向引用匹配
> 反向引用: `/(子正则表达式)\1/`
```js
reg = /\w/;
str='blueidea';
reg.exec(str); //返回b。

reg = /(\w)(\w)/;
str='blueidea';
reg.exec(str);//返回bl,b,l  
//bl是整个正则匹配的内容，b是第一个括号里的子正则表达式匹配的内容，l是第二个括号匹配的内容。

reg = /(\w)\1/;
str='blueidea';
reg.exec(str);//null
//这里的“\1”就叫做反向引用，它表示的是第一个括号内的字正则表达式匹配的内容。
//第一个括号里的(\w)匹配了b，因此"\1"就同样表示b了，在余下的字符串里自然找不到b了。

reg = /(\w)\1/;
str='bbs.blueidea.com';
reg.exec(str);//bb, b

reg = /(\w)(\w)\2\1/;
str='woow';
reg.exec(str);//"woow", "w", "o"

reg = /^(b|c).+/;
str='bbs.blueidea.com';
reg.exec(str); // bbs.blueidea.com b 
```
> 使用形如(?:pattern)的正则就可以避免保存括号内的匹配结果
```js
reg = /^(?:b|c).+/;
str='bbs.blueidea.com';
reg.exec(str);//bbs.blueidea.com  //返回的结果不再包括那个括号内的字正则表达式多匹配的内容。不返回捕获结果


//反向引用也不好使了
reg = /^(b|c)\1/;
str='bbs.blueidea.com';
reg.exec(str);//返回bb,b  bb是整个正则表达式匹配的内容，而b是第一个子正则表达式匹配的内容。

reg = /^(?:b|c)\1/;
str='bbs.blueidea.com';
reg.exec(str);//返回null。由于根本就没有记录括号内匹配的内容，自然没有办法反向引用了。
```

--
### 13. 正向预查匹配
> 正向预查: `(?=pattern)`
所谓正向预查，意思就是：要匹配的字符串，后面必须紧跟着pattern！
正则表达式`/cainiao/`会匹配`cainiao`。同样，也会匹配`cainiao9`中的`cainiao`。但是我们可能希望，`cainiao`只能匹配`cainiao8`中的菜鸟。这时候就可以像下面这样写：`/cainiao(?=8)/`
```js
reg = /cainiao(?=8)/;
str='cainiao9';
reg.exec(str);//null

reg = /cainiao(?=8)/;
str='cainiao8';
reg.exec(str);//cainiao
```
括号里的内容并不参与真正的匹配，只是检查一下后面的字符是否符合要求而已，例如上面的正则，返回的是cainiao，而不是cainiao8。
```js
reg = /blue(?=idea)/;
str='blueidea';
reg.exec(str);//blue

reg = /blue(?=idea)/;
str='bluetooth';
reg.exec(str);//null
```
> `?!`: 形式`(?!pattern)`和`?=`恰好相反，(就是一个等于一个不等于)要求字符串的后面不能紧跟着某个`pattern`
```js
reg = /blue(?!idea)/;
str='blueidea';
reg.exec(str);//返回null，因为正则要求，blue的后面不能是idea。

reg = /blue(?!idea)/;
str='bluetooth';
reg.exec(str);//blue

//首先要搞清楚什么是元字符呢？
//我们之前用过*,+,?之类的符号，它们在正则表达式中都有一定的特殊含义，类似这些有特殊功能的字符都叫做元字符。

//表示有任意个c
reg = /c*/;

//如果想匹配’c’这个字符串的时候怎么办呢？
reg = /c\*/;
str='c*';
reg.exec(str);//c*
//要匹配其他元字符，只要在前面加上一个“\”就可以了。
```

--
### 14. 不区分大小写匹配
修饰符i：`/pattern/i`
```js
var reg = /b/;
var str = 'BBS';
reg.exec(str);//null

var reg = /b/i;
var str = 'BBS';
reg.exec(str);//B   这个就是i修饰符的作用了。
```

--
### 15. 行首行尾匹配
修饰符m: `/pattern/m`
```js
//m修饰符的作用是修改^和$在正则表达式中的作用，让它们分别表示行首和行尾。
var reg = /^b/;
var str = 'test\nbbs';
reg.exec(str);//匹配失败，因为字符串的开头没有b字符。

//但是加上m修饰符之后
var reg = /^b/m;
var str = 'test\nbbs';
reg.exec(str);//b
```

--
### 16. exec方法详解
> `exec`方法返回的其实并不是匹配结果字符串，而是一个对象，简单地修改一下`execReg`函数，来做一个实验就可以印证这一点：
```js
function  regexec(str){
 var result =  reg.exec(str);
 alert(typeof result);
}
var reg = /b/;
var str='bbs.bblueidea.com';
regexec(str);//object
//而且是一个类似数组的对象。使用for in可以知道它的属性: index input 0。其中index是表示匹配在原字符串中的索引；而input则是表示输入的字符串；
```
而且是一个类似数组的对象。使用`for in`可以知道它的属性: `index input 0`。其中`index`是表示匹配在原字符串中的索引；而`input`则是表示输入的字符串；
```js
function regexec(reg, str) {
  var result = reg.exec(str);
  document.write('index:' + result.index + '<br  />' + 'input:' + result.input + '<br  />');
  for (i = 0; i < result.length; i++) {
    document.write('result[' + i + ']:' + result[i] + '<br  />')
  }
}

//马上来实验一下：
var reg = /\w/;
var str = 'bbs.bblueidea.com';
regexec(reg, str);

//结果如下：
//index:0
//input:bbs.bblueidea.com
//result[0]:b

var reg =  /(\w)(\w)(.+)/;
var str='bbs.bblueidea.com';
regexec(reg,str);
//index:0
//input:bbs.bblueidea.com
//result[0]:bbs.bblueidea.com
//result[1]:b
//result[2]:b
//result[3]:s.bblueidea.com

//由上面两个例子可见，返回对象[0]就是整个正则表达式所匹配的内容。后续的元素则是各个子正则表达式的匹配内容。
```
> `exec`方法在返回结果对象的同时，还可能会更新原来的正则表达式，这就要看正则表达式是否设置了`g修饰符`。
```js
var reg = /b/;
var str =  'bbs.blueidea.com';
regexec(reg,str);
regexec(reg,str);
//结果如下：
//index:0
//input:bbs.blueidea.com
//result[0]:b
//index:0
//input:bbs.blueidea.com
//result[0]:b
//两次匹配的结果完全一样，从索引可以看出来，匹配的都是字符串首的b字符。

//设置了g的正则表达式表现如何：
var reg = /b/g;
var str =  'bbs.blueidea.com';
regexec(reg,str);
regexec(reg,str);
//结果如下：
//index:0
//input:bbs.blueidea.com
//result[0]:b
//index:1
//input:bbs.blueidea.com
//result[0]:b
```
如果正则表达式没有设置g，那么exec方法不会对正则表达式有任何的影响，如果设置了g，那么exec执行之后会更新正则表达式的lastIndex属性，表示本次匹配后，所匹配字符串的下一个字符的索引，下一次再用这个正则表达式匹配字符串的时候就会从上次的lastIndex属性开始匹配，也就是上面两个例子结果不同的原因了。


--
### 17. test方法
> `test`方法仅仅检查是否能够匹配`str`，并且返回布尔值以表示是否成功。同样建立一个简单的测试函数：
```js
function testReg(reg, str) {
  alert(reg.test(str));
}

var reg = /b/;
var str =  'bbs.blueidea.com';
testReg(reg,str);//true

var reg = /9/;
var str =  'bbs.blueidea.com';
testReg(reg,str);//false
```

--
### 18. match方法
> match方法：`str.match(reg)`;

与正则表达式的`exec`方法类似，该方法同样返回一个类似数组的对象，也有`input`和`index`属性。
```js
function matchReg(reg, str) {
  var result = str.match(reg);
  if (result) {
    document.write('index:' + result.index + '<br  />' + 'input:' + result.input + '<br  />');
    for (i = 0; i < result.length; i++) {
      document.write('result[' + i + ']:' + result[i] + '<br  />')
    }
  } else {
    alert('null：匹配失败！')
  }
}

var reg = /b/;
var str =  'bbs.blueidea.com';
matchReg(reg,str);
//结果如下：
//index:0
//input:bbs.blueidea.com
//result[0]:b

//但是如果正则表达式设置了g修饰符，exec和match的行为可就不一样了
//index:undefined
//input:undefined
//result[0]:b
//result[1]:b
//result[2]:b
//设置了g修饰符的正则表达式在完成一次成功匹配后不会停止，而是继续找到所有可以匹配到的字符。
//返回的结果包括了三个b。不过没有提供input和index这些信息。
```

--
### 19. replace方法
> replace方法: `str.replace(reg,'new str')`

它的作用是将`str`字符串中匹配`reg`的部分用`new str`部分代码，值得注意的是原字符串并不会被修改，而是作为返回值被返回。
```js
var reg = /b/;
var str = 'bbs.blueidea.com';
var newStr = str.replace(reg, 'c');
document.write(newStr); //cbs.blueidea.com，只有第一个b被替换为c。

var reg = /b/g;
var str = 'bbs.blueidea.com';
var newStr = str.replace(reg, 'c');
document.write(newStr); //ccs.clueidea.com

//由于，设置了g修饰符，所以会替换掉所有的b。
var reg = /\w+/g;
var str = 'bbs.blueidea.com';
var newStr = str.replace(reg, 'word');
document.write(newStr); //word.word.word。

//在replace函数中使用$引用子正则表达式匹配内容
//就像在正则里我们可以使用\1来引用第一个子正则表达式所匹配的内容一样
//在replace函数的替换字符里也可以使用$1来引用相同的内容。
```
```js
var reg =  /(\w+).(\w+).(\w+)/;
var str =  'bbs.blueidea.com';
var newStr =  str.replace(reg,'$1.$1.$1');
document.write(newStr);//bbs.bbs.bbs
//第一个子正则表达式匹配到了bbs，那么$1也就代表bbs了
//其后把替换字符串设置为'$1.$1.$1',其实也就是"bbs.bbs.bbs"同理，$2就是blueidea，$3就是com

//颠倒空格前后两个单词的顺序
var reg =  /(\w+)\s(\w+)/;
var str = 'cainiao  gaoshou';
var newStr =  str.replace(reg,'$2 $1');
document.write(newStr);//gaoshou cainiao
```
> 在替换文本里$有了特殊的含义，所以我们如果想要是用$这个字符的话，需要写成$$
```js
var reg =  /(\w+)\s(\w+)/;
var str = 'cainiao  gaoshou';
var newStr =  str.replace(reg,'$$ $$');
document.write(newStr);//$ $
```

--
### 20. search方法
> search方法：`str.search(reg)`

`search`返回正则表达式第一次匹配的位置。
```js
var reg = /idea/;
var str = 'blueidea';
var pos =  str.search(reg);
document.write(pos);//4

//找出第一个非单词字符：
var reg = /\W/;
var str =  'bbs.blueidea.com';
var pos =  str.search(reg);
document.write(pos);//3   也就是那个点“.”的位置。
str.split(reg,’seprator’);
```

--
### 21. split方法
> split方法: `str.split(reg)`

`split`返回分割后的数组
```js
var reg = /\W/;
var str =  'bbs.blueidea.com';
var arr =  str.split(reg);
document.write(arr); //bbs,blueidea,com

var  reg = /\W/;
var  str = 'http://www.baidu.com/';
var  arr = str.split(reg);
document.write(arr.length+'<br/>');//
document.write(arr);//http,,,www,baidu,com,
//可见字符串被分为了有7个元素的数组，其中包括了三个为空字符串的元素。
```

--
### 20个经典正则表达式
> 1 . 校验密码强度  

密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间。
```html
^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$
```

> 2 . 校验中文
字符串仅能是中文。
```html
^[\\u4e00-\\u9fa5]{0,}$
```

> 3 . 由数字、26个英文字母或下划线组成的字符串
```html
^\\w+$
```

> 4 . 校验E-Mail 地址
同密码一样，下面是E-mail地址合规性的正则检查语句。

```html
[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?
```

> 5 . 校验身份证号码
下面是身份证号码的正则校验。15 或 18位。

```html
15位: 
^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$
18位：
^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$
```

> 6 . 校验日期
“yyyy-mm-dd“ 格式的日期校验，已考虑平闰年。

```
^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$
```

> 7 . 校验金额
金额校验，精确到2位小数。

```html
^[0-9]+(.[0-9]{2})?$
```

> 8 . 校验手机号
下面是国内 13、15、18开头的手机号正则表达式。

```html
^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$
```

> 9 . 判断IE的版本
IE目前还没被完全取代，很多页面还是需要做版本兼容，下面是IE版本检查的表达式。

```html
^.*MSIE [5-8](?:\\.[0-9]+)?(?!.*Trident\\/[5-9]\\.0).*$
```

> 10 . 校验IP-v4地址
IP4 正则语句。

```html
\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b
```

> 11 . 校验IP-v6地址
IP6 正则语句。

```html
(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))
```

> 12 . 检查URL的前缀
应用开发中很多时候需要区分请求是HTTPS还是HTTP，通过下面的表达式可以取出一个url的前缀然后再逻辑判断。

```html
if (!s.match(/^[a-zA-Z]+:\\/\\//))
{
    s = 'http://' + s;
}
```

> 13 . 提取URL链接
下面的这个表达式可以筛选出一段文本中的URL。

```html
^(f|ht){1}(tp|tps):\\/\\/([\\w-]+\\.)+[\\w-]+(\\/[\\w- ./?%&=]*)?
```

> 14 . 文件路径及扩展名校验
验证文件路径和扩展名

```html
^([a-zA-Z]\\:|\\\\)\\\\([^\\\\]+\\\\)*[^\\/:*?"<>|]+\\.txt(l)?$
```

> 15 . 提取Color Hex Codes
有时需要抽取网页中的颜色代码，可以使用下面的表达式。

```html
\\#([a-fA-F]|[0-9]){3,6}
```

> 16 . 提取网页图片
假若你想提取网页中所有图片信息，可以利用下面的表达式。

```html
\\< *[img][^\\>]*[src] *= *[\\"\\']{0,1}([^\\"\\'\\ >]*)
```

> 17 . 提取页面超链接
提取html中的超链接。

```html
(<a\\s*(?!.*\\brel=)[^>]*)(href="https?://)((?!(?:(?:www\\.)?'.implode('|(?:www\\.)?', $follow_list).'))[^"]+)"((?!.*\\brel=)[^>]*)(?:[^>]*)>
```

> 18 . 精炼CSS
通过下面的表达式，可以搜索相同属性值的CSS，从而达到精炼代码的目的。

```html
^\\s*[a-zA-Z\\-]+\\s*[:]{1}\\s[a-zA-Z0-9\\s.#]+[;]{1}
```

> 19 . 抽取注释
如果你需要移除HMTL中的注释，可以使用如下的表达式。

```html
<!--(.*?)-->
```
> 20 . 匹配HTML标签
通过下面的表达式可以匹配出HTML中的标签。

```html
</?\\w+((\\s+\\w+(\\s*=\\s*(?:".*?"|'.*?'|[\\^'">\\s]+))?)+\\s*|\\s*)/?>
```

