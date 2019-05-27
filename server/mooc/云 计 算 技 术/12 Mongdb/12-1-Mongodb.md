title: Mongodb
theme: light

[slide]
# Mongodb

[slide]
# 1. MongoDB简介
MongoDB 是一个基于分布式文件存储的数据库，由 C++ 语言编写，旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

<img src="img/cloud/cloud/mongo01.png" alt="">


[slide]
# 2. MongoDB 特点

- 安装简单。
- 面向文档存储，没有表结构的概念，每天记录可以有完全不同的结构，操作起来比较简单和容易。
- 完全的索引支持（单键索引、数组索引、全文索引、地理位置索引等）
- 如果负载的增加，它可以分布在计算机网络中的其他节点上
- 支持丰富的查询表达式，查询指令使用JSON形式的标记，可轻易查询文档中内嵌的对象及数组。
- 使用`update()`命令可以实现替换完成的文档或者一些指定的数据字段 。
- `Map/reduce`主要是用来对数据进行批量处理和聚合操作。
- `Map`函数调用`emit(key,value)`遍历集合中所有的记录，将`key`与`value`传给`Reduce`函数进行处理。
- Map函数和Reduce函数是使用Javascript编写的，并可以通过`db.runCommand`或`Map/reduce`命令来执行MapReduce操作。
- GridFS是MongoDB中的一个内置功能，可以用于存放大量小文件。
- 允许在服务端执行脚本，可以用Javascript编写某个函数，直接在服务端执行，也可以把函数的定义存储在服务端，下次直接调用即可。
- 支持多种编程语言: `C` `C++` `C#`  `Java` `JavaScript` `Lisp`  `Perl` `PHP` `Python` `Ruby` 等

[slide]
# 3. MongoDB 重要概念

| SQL术语概念 | mongoDB概念 | 解释说明 |
|-------------|-------------|--------------------------------|
| database | database | 数据库 |
| table | colletction | 数据库表/集合 |
| row | document | 数据记录行/文档 |
| column | field | 数据字段/域 |
| index | index | 索引 |
| table joins | 不支持 | 表连接 |
| primary key | 自动将_id设置为主键 | 组件  |

[slide]
# 4. 数据库
在MongoDB中，多个文档年组成集合，而多个集合可以组成数据库。数据库通过名称来标识，这点与集合类似。数据库名可以是满足以下条件的任意UTF-8字符串。

- 不能是空字符串 `""` 
- 不得含有`/`、`\`、`.`、`"`、`*`、`<`、`>`、`:`、`|`、`?`、`$`、`\0（空字符）`，只能使用ASCII中的字母和数字
- 数据库名区分大小写，即便是在不区分大小写的文件系统中也是如此
- 数据库名应全部小写
- 数据库名最多64字节

> 注意：数据库最终会变成文件系统里的文件，而数据库名就是相应的文件名。另外有一些数据库名是保留的，可以直接访问这些有特殊语义的数据库。
> 
> - admin：从身份验证的角度来讲，这是"root"数据库。如果将一个用户添加到admin数据库，这个用户将自动获得所有数据库的权限。再者，一些特定的服务器端命令也只能从admin数据库运行，如列出所有数据库或关闭服务器。
> - local：这个数据库永远都不可以复制，且一台服务器上的所有本地集合都可以存储在这个数据库中。
> - config：MongoDB用于分片设置时，分片信息会存储在config数据库中。




[slide]
# 5. 集合 `collection` 

集合就是一组文档。如果将MongoDB中的一个文档比喻为关系型数据库中的一行,那么一个集合就相当于一张表。所有存储在集合中的数据都是 `BSON` 格式，`BSON` 是类 `JSON` 的一种二进制形式的存储格式，简称 `Binary JSON`。

[slide]
# 5.1 动态模式
集合是动态的，也就是说，一个集合里的文档可以是各式各样的。如下面的文档可以同时存在于同一个集合中。

```js
{"greeting" : "Hello, world!"}
{"foo" : 5}
```

[slide]
# 5.2 命名

集合使用名称进行标识。集合名可以是满足下列条件的任意UTF-8字符串。

- 集合名不能是空字符串`""`
- 集合名不能包含`\0`字符串（空字符），这个字符表示集合名的结束。
- 集合名不能以 `system.` 开头，这是为系统集合保留的前缀。如，`system.users`集合保存着数据库的用户信息，而`system.namespaces`集合保存着所有数据库集合的信息。
- 用户创建的集合不能在集合名中包含保留字符 `$` 。因为某些系统生成的集合中包含它。

> 组织集合的一种管理是使用 `.` 分隔不同命名空间的子集合。如具有博客功能的应用可能包含两个集合，分别是`blog.posts`、`blog.authors`。这是为了使组织结构更清晰，这里的blog集合跟其子集合没有任何关系。

在mongoDB数据库中名字空间 `<dbname>.system.*` 是包含多种系统信息的特殊集合 `Collection`，如下：

| 集合命名空间 | 描述 |
|-------|-------|
| dbname.system.namespaces | 列出所有名字空间 |
| dbname.system.indexs | 列出所有索引 |
| dbname.system.profile包含数据库概要profile信息 |  |
| dbname.system.users | 列出所有可访问数据库的用户 |
| dbname.local.sources | 包含复制对端slave的服务器信息和状态 |


[slide]
# 6. 文档 `Document`
文档是MongoDB的核心概念。文档就是键值对的一个有序集合。在JS中，文档被表示为对象。文档的键是字符串。除了少数例外情况，键可以使用任意UTF-8字符。

- 键不能含有\0（空字符）。这个字符用于表示键的结尾。
- `.` 和 `$` 具有特殊意义，只能在特定环境下使用。
- MongoDB不但区分类型，而且区分大小写。
- 文档中的值不仅可以是在双引号里面的字符串，还可以是其他几种数据类型
- 文档的键是字符串。除了少数例外情况，键可以使用任意UTF-8字符。

需要注意的是：

- 文档就是键值对的一个有序集
```js
// 下面的两个文档是不同的
{ "x": 1, "y": 2 }
{ "y": 2, "x": 1 }
```

> 通常,字段顺序并不重要,无须让数据库模式依赖特定的字段顺序(MongoDB会对字段重新排序)。
> 在某些特殊情况下,字段顺序变得非常重要
> 一些编程语言对文档的默认表示根本就不包含顺序问题(如:Python中的字典、Perl和Ruby
 1.8中的散列)。通常,这些语言的驱动具有某些特殊的机制,可以在必要时指定文档的顺序。

- MongoDB不但区分类型,而且区分大小写

```js
// 下面的两个文档是不同的
{"foo" : 3}
{"foo" : "3"}

// 下面两个文档也是不同的
{"foo" : 3}
{"Foo" : 3}
```

- MongoDB的文档不能有重复的键
```js
// 下面的文档是非法的:
{"greeting" : "Hello, world!", "greeting" : "Hello, MongoDB!"}
```


[slide]
# 7. 数据类型

[slide]
# 7.1 基本数据类型

在概念上，MongoDB的文档与JS中的对象相近，因而可认为它类似于JSON。JSON是一种简单的数据表示方式：其规范仅用一段文字就能描述清楚，且仅包含六种数据类型。这其中只有`null`、`布尔`、`数字`、`字符串`、`数组`和`对象`这几种数据类型，所以JSON的表达能力有一定的局限。如JSON没有`日期类型`。只有一种数字类型，无法区分浮点数和整数，更别说区分32位和64位数字了。基于此原因，MongoDB在保留JSON基本键值对的基础上，添加了其他一些数据类型。

**1. null**

`null`用于表示空值或者不存在的字段：
```js
{ "x" : null }
```

**2. 布尔值**

布尔类型有两个值true和false
```js
{"x" : true}
```

**3. 数值**

shell默认使用64位浮点数值。
```js
{"x" : 3.14}
{"x" : 3}
```
对于整型值，可使用`NumberInt`类（表示四字节带符号整数）或`NumberLong`类（表示八字节带符号整数），分别举例如下：
```js
{"x" : NumberInt("3")}
{"x" : NumberLong("3")}
```

**4. 字符串**

UTF-8字符串都可表示为字符串类型的数据
```js
{"x" : "foobar"}
```

**5. 日期**
日期被存储为自新纪元来经过的毫秒数，不存储时区
```js
{"x" : new Date()}
```

**6. 正则表达式**
查询时，使用正则表达式作为限定条件，语法也与JS的正则表达式语法相同
```js
{"x" : /foobar/i}
```

**7. 数组**

数据列表或数据集可以表示为数组
```js
{"x" : ["a", "b", "c"]}
```

**8. 内嵌文档**
文档可嵌套其他文档，被嵌套的文档作为父文档的值
```js
{"x" : {"foo" : "bar"}}
```

**9. 对象id**

对象id是一个12字节的ID，是文档的唯一标识。
```js
{"x" : ObjectId()}
```

[slide]
# 7.2 日期

在JS中，Date类型可以用作MongoDB的日期类型。创建日期对象时，应使用`new Date(...)`，而非`Date(...)`。如果将构造函数作为函数进行调用（即不包括new的方式），返回的是日期的字符串表示，而非日期（Date）对象。shell根据本地时区设置显示日期对象。然而，数据库中存储的日期仅为新纪元以来的毫秒数，并未存储对应的时区。（当然，可将时区信息存储为另一个键的值）。

[slide]
# 7.3 数组

数组是一组值，它既能作为有序对象（如列表、栈或队列），也能作为无无序对象（如数据集）来操作。在下面的文档中，`"things"`这个键的值是一个数组：
```js
{"things" : ["pie", 3.14]}
```

此例表示，数组可包含不同数据类型的元素（在此，是一个字符串和一个浮点数）。实际上，常规的键值对支持的所有值都可以作为数组的值，数组中甚至可以嵌套数组。

[slide]
# 7.4 内嵌文档

文档可以作为键的值，这样的文档就是内嵌文档。如用一个文档来表示一个人，同时还要保存他的地址，可以将地址信息保存在内嵌的 `address` 文档中：
```js
{
  "name" : "Tom",
  "address" : {
    "street" : "123 Park Street",
    "city" : "Anytown",
    "state" : "NY"
  }
}
```

同数组一样，MongoDB能够理解内嵌文档的结构， 并能深入其中构建索引，执行查询或更新。在关系型数据库中，这个例子中的文档一般会被拆分成两个表中的两个行（"people"和"address"各一行）。而MongoDB中直接将地址文档嵌入到人员文档中。这样做的坏处就是会导致更多的数据重复。假设"address"是关系数据库中的一个独立的表，我们需要修正地址中的错误。当我们对"people"和"address"执行连续操作时，使用这个地址的每个人的信息都会得到更新。但是在MongoDB中，则需要对每个人的文档分别修正拼写错误。

[slide]
# 7.5 _id 和 ObjectId

在MongoDB中存储的文档必须有一个 `_id` 键。这个键的值可以是任何类型的，默认是个 `ObjectId` 对象。在一个集合里面，每个文档都有唯一的 `_id` ，确保集合里面每个文档都能被唯一标识。如果有两个集合的话，两个集合可以都有一个 `_id` 的值为123（一个数据库中集合名不能重复），但是每个集合里面只能有一个文档的 `_id` 值为123。

**1. ObjectId**

`ObjectId`是`_id`的默认类型。它设计成轻量型的，不同的机器都能用全局唯一的同一种方法方便的生成它。这是MongoDB不采用其他比较常规的做法（比如自动增加的主键）的主要原因，因为在多个服务器上同步自动增加主键既费时又费力。

`ObjectId`使用十二字节的存储空间，是一个由二十四个十六进制数字组成的字符串（每个字节可以存储两个十六进制数字）。如果快速连续创建多个`ObjectId`，会发现每次只有最护几位数字有变化。另外，中间的几位数字也会变化。这是`ObjectId`的创建方式导致的。其十二字节按照如下方式生成：

<img src="img/cloud/cloud/mongo02.png" alt="">

> 说明：`ObjectId`的前四个字节是从标准纪元开始的时间戳，单位为秒。这样会带来一些有用的属性。

- 时间戳，与随后的五字节组合起来，提供了秒级别的唯一性。
- 由于时间戳在前，这意味着`ObjectId`大致会按照插入的顺序排列。但是不是绝对的
- 这四字节也隐含了文档创建的事件。绝大多数驱动程序都会提供一个方法，用于从`ObjectId`获取这些信息。

用户不必担心多服务器时钟同步的问题，因为时间戳的实际值并不重要，只要它总是不停增加就好了（每秒一次）。接下来的三字节是所在主机的唯一标识。通常是机器主机名的散列值。这样就可以确保不同主机生成不同的`ObjectId`，不产生冲突。为了确保在同一台机器上并发的多个进程产生的`ObjectId`是唯一的，接下来的两字节来自产生`ObjectId`的进程的进程标识符（PID）。

前九字节保证了同一秒钟不同机器不同进程产生的`ObjectId`是唯一的。最后三字节是一个自动增加的计数器，确保相同进程同一秒产生的`ObjectId`也是不一样的。一秒钟最多允许每个进程拥有2563个不同的`ObjectId`。

**2. 自动生成 _id**

在创建文档的时候，如果文档没有插入 `_id` 键，系统会自动创建一个。


[slide]
# 8. MongoDB操作

[slide]
# 8.1 查看数据库

```js
// 查看当前数据库
db

// 查看所有数据库
show dbs

// 查看服务器状态
db.serverStatus()

// 查看数据库统计信息
db.stats()

// 查看数据库中所有集合
show tables
show collections
```

[slide]
# 8.2 创建数据库
```js
// 创建数据库
// 如果数据库不存在，则创建数据库，否则切换到指定数据库。
use DATABASE_NAME
```

[slide]
# 8.3 删除数据库
```js
// 删除数据库
db.dropDatabase()

// 清空集合, 删除里面的文档，但集合还在
db.col_name.remove({})

// 删除集合
db.collection.drop()
```

[slide]
# 8.4 查询数据
- `find()` 方法，它返回集合中所有文档。
- `findOne()` 方法，它只返回一个文档。

```bash
# query ：可选，使用查询操作符指定查询条件
# projection ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。
db.col_name.find(query, projection)

# 格式化输出
db.col_name.find().pretty()

# 查看集合中文档的个数
db.col_name.find().count()

# 跳过指定数量的数据
db.col_name.find().skip()

# 读取指定记录的条数
db.col_name.find().limit()

# 排序sort()方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1是用于降序排列。
db.col_name.find().sort({key:1})
```
[slide]
# 8.5 更新数据
MongoDB 使用 `update()` 和 `save()` 方法来更新集合中的文档

**1. `update()` 方法用于更新已存在的文档**
```js
db.col_name.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```
- query : update 的查询条件，类似sql update查询内where后面的。
- update : update的对象和一些更新的操作符（如`$`,`$inc`...）等，也可以理解为sql update查询内set后面的
- upsert : 可选，这个参数的意思是，如果不存在 update 的记录，是否插入记录，`true` 为插入，默认是 `false`，不插入。
- multi : 可选，mongodb 默认是 `false` ,只更新找到的第一条记录，如果这个参数为 `true` ,就把按条件查出来多条记录全部更新。
- writeConcern :可选，抛出异常的级别。
通过 `update()` 方法来更新 `col_1` 集合中的 `title`


```js
// $set 操作符为部分更新操作符，只更新  $set 之后的数据，而不是覆盖之前的数据
// 只会修改第一条发现的文档
db.col_1.update({ 'title': 'MongoDB 教程' }, { $set: { 'title': 'MongoDB' } })

// 要修改多条相同的文档，则需要设置 multi 参数为 true
db.col_1.update({ 'title': 'MongoDB 教程' }, { $set: { 'title': 'MongoDB' } }, { multi: true })
```

**2.  ``save()`` 方法通过传入的文档来替换已有文档**
```js
db.col_name.save(
   <document>,
   {
     writeConcern: <document>
   }
)
```


以下实例中我们替换了 `col_1` 的文档数据：
```js
document = ({
    "_id": "1",
    "title": "MongoDB save",
    "description": "MongoDB 是一个 Nosql 数据库",
    "by": "菜鸟",
    "url": "http://www.runoob.com",
    "tags": ["mongodb", "database", "NoSQL"],
});

db.col_1.save(document)
```



[slide]
# 8.6 删除数据
`remove()` 函数是用来删除集合中的数据。在执行 `remove()` 函数前先执行 `find()` 命令来判断执行的条件是否正确，这是一个比较好的习惯。
```js
db.col_name.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```

- query :（可选）删除的文档的条件。
- justOne : （可选）如果设为 true 或 1，则只删除一个文档。
- writeConcern :（可选）抛出异常的级别。

```js
// 删除集合中所有文档
db.col.remove({})

// 移除 col_1 集合中 title 为 save 的文档，只删除第一条找到的记录
db.col_1.remove({'title':'save'}, 1)
```

[slide]
# 8.7 插入数据
MongoDB 使用 `insert()` 或 `save()` 方法向集合中插入文档。如果该集合不在该数据库中， MongoDB 会自动创建该集合并插入文档。

`insert()` 或 `save()` 方法都可以向 `collection` 里插入数据，两者区别：

- 如果不指定 `_id` 字段，`save()` 方法类似于 `insert()` 方法。如果指定 `_id` 字段，则会更新该 `_id` 的数据。
- 使用 `save` 函数，如果原来的对象不存在，那他们都可以向 `collection` 里插入数据，如果已经存在，`save` 会调用 `update` 更新里面的记录，而 `insert` 则会忽略操作
- `insert` 可以一次性插入一个列表，而不用遍历，效率高， `save` 则需要遍历列表，一个个插入。

```js
db.col_name.insert(document)
db.col_name.save(document)

// 插入一个文档到 col 集合中：
db.col_1.insert({
    title: 'MongoDB 教程',
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})

// 也可以将文档数据定义为一个变量，如下所示：
document = ({
    title: 'MongoDB 教程',
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
});
db.col_2.insert(document)
```

[slide]
# 8.8 条件操作符

| 条件操作符 | 中文 |
|------------|----------|
| $gt | 大于 |
| $gte | 大于等于 |
| $lt | 小于 |
| $lte | 小于等于 |
| $ne | 不等于 |

```js
// 获取 col 集合中 "likes" 大于100，小于 200 的数据
db.col.find({likes : {$lt :200, $gt : 100}})
// 类似于SQL语句：
Select * from col where likes>100 AND  likes<200;

// AND 条件
db.col_name.find({key1:value1, key2:value2}).pretty()
// 类似于 SQL and 语句：
SELECT * FROM col_name WHERE key1='value1' AND key2=value2

//AND 和 OR 联合使用
db.col_name.find({
    "likes": {
        $gt: 50
    },
    $or: [{
        "by": "菜鸟教程"
    }, {
        "title": "MongoDB 教程"
    }]
}).pretty()
// 类似常规 SQL 语句：
SELECT * FROM col_name where likes>50 AND (by = '菜鸟教程' OR title = 'MongoDB 教程')
```

[slide]
# 9 MongoDB索引
索引通常能够极大的==提高查询的效率==，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。

这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。

索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构

[slide]
# 9.1 索引常用命令
```js
// getIndexes 查看集合索引情况
db.col_name.getIndexes()

// hint 强制使用索引
db.col_name.find({age:{$lt:30}}).hint({name:1, age:1}).explain()

// 删除索引(不会删除 _id 索引)
db.col_name.dropIndexes()
db.col_name.dropIndex({firstname: 1})

// 创建索引
//key 为你要创建的索引字段，1为按升序创建索引，-1为按降序创建索引。也可以设置使用多个字段创建索引（关系型数据库中称作复合索引）
db.col_name.createIndex({key:1})
```


[slide]
# 9.2 _id 索引
对于每个插入的数据，都会自动生成一条唯一的 _id 字段，_id 索引是绝大多数集合默认建立的索引
```js
> db.col_1.insert({x:10})
WriteResult({ "nInserted" : 1 })

> db.col_1.find()
{ "_id" : ObjectId("59658e56aaf42d1c98dd95a2"), "x" : 10 }

> db.col_1.getIndexes()
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "runoob.col_1"
        }
]
```

> - v 表示 version，在 Mongo3.2 之前的版本中，会存在 {v:0}（版本锁为0）的情况。在3.2之后的版本中，{v:0} 不再允许使用，这部分可以不去关注，因为 v 由系统自动管理
- key 表示作为索引的键。1 或 -1表示排序模式，1为升序，1为降序
- name 表示索引的名字，默认生成名称的规则是作为索引的字段_排序模式
- ns 表示 namespace 命名空间，由数据库名称.集合名称组成

[slide]
# 9.3 单键索引
最普通的索引，不会自动创建
```js
// 对 x 字段创建升序索引
> db.col_1.createIndex( { x : 1 } )
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}

> db.col_1.find()
{ "_id" : ObjectId("59658e56aaf42d1c98dd95a2"), "x" : 10 }

> db.col_1.getIndexes()
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "runoob.col_1"
        },
        {
                "v" : 2,
                "key" : {
                        "x" : 1
                },
                "name" : "x_1",
                "ns" : "runoob.col_1"
        }
]
```

[slide]
# 9.4 多键索引
单键索引的值为一个单一的值，多键索引的值有多个数据（如数组）
如果mongoDB中插入数组类型的多键数据，索引是自动建立的，无需刻意指定
```js
> db.col_1.insert({z:[1,2,3,4,5]})
WriteResult({ "nInserted" : 1 })

> db.col_1.find()
{ "_id" : ObjectId("59658e56aaf42d1c98dd95a2"), "x" : 10 }
{ "_id" : ObjectId("5965923eaaf42d1c98dd95a3"), "y" : 20 }
{ "_id" : ObjectId("59659828aaf42d1c98dd95a4"), "z" : [ 1, 2, 3, 4, 5 ] }

> db.col_1.find({z:3})
{ "_id" : ObjectId("59659828aaf42d1c98dd95a4"), "z" : [ 1, 2, 3, 4, 5 ] }
```

[slide]
# 9.5 复合索引
同时对多个字段创建索引
```js
> db.col_2.insert({x:10,y:20,z:30})
WriteResult({ "nInserted" : 1 })

> db.col_2.find()
{ "_id" : ObjectId("59659a57aaf42d1c98dd95a5"), "x" : 10, "y" : 20, "z" : 30 }

> db.col_2.createIndex({x:1,y:1})
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}

> db.col_2.getIndexes()
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "runoob.col_2"
        },
        {
                "v" : 2,
                "key" : {
                        "x" : 1,
                        "y" : 1
                },
                "name" : "x_1_y_1",
                "ns" : "runoob.col_2"
        }
]
```
[slide]
# 9.6 过期索引
TTL（Time To Live，生存时间）索引，即在一段时间后会过期的索引（如登录信息、日志等）。过期后的索引会连同文档一起删除。 `expireAfterSeconds` 指定一个以秒为单位的数值，设定集合的生存时间。

- 存储在过期索引字段的值必须是指定的时间类型（必须是 ISODate 或 ISODate 数组，不能使用时间戳，否则不能被自动删除）
- 如果指定了 ISODate 数组，则按照最小的时间进行删除
- 过期索引不能是复合索引（不能指定两个过期时间）
- 删除时间存在些许误差（1 分钟左右）

```js
> db.col_3.insert({x:new Date()})
WriteResult({ "nInserted" : 1 })

> db.col_3.find()
{ "_id" : ObjectId("59659f3baaf42d1c98dd95a7"), "x" : ISODate("2017-07-12T04:02:03.835Z") }

> db.col_3.createIndex({x:1},{expireAfterSeconds:10})
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}

> db.col_3.getIndexes()
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "runoob.col_3"
        },
        {
                "v" : 2,
                "key" : {
                        "x" : 1
                },
                "name" : "x_1",
                "ns" : "runoob.col_3",
                "expireAfterSeconds" : 10
        }
]

> db.col_3.find()
// 无返回
```
[slide]
# 9.7 全文索引
全文索引用于全网站关键词搜索，`key-value` 中，`key` 此时为 `$**`（也可以是具体某 key），`value` 此时为一个固定的字符串（如 text）。全文索引相似度，与 `sort` 函数一起使用效果更好
```js
db.col_7.find({ $text: { $search: "aa bb" } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } })
```


> 注意：
> 
- 每个集合只能创建一个全文索引
- MongoDB 从 2.4 版本开始支持全文检索，从 3.2 版本开始支持中文
（好像）只能对整个单词查询，不能对单词的截取部分查询
- 关键词之间的空格表示或
- 关键词之前的 - 表示非
- 关键词加引号表示与 （需用 \ 转义）

```js
> db.col_7.find()
{ "_id" : ObjectId("5965aa84aaf42d1c98dd95b0"), "title" : "aa bb cc", "author" : "白小明", "article" : "这是白小明的一篇文章，标题《aa bb cc》" }
{ "_id" : ObjectId("5965aa8faaf42d1c98dd95b1"), "title" : "abc def", "author" : "白小明", "article" : "这是白小明的一篇文章，标题《aa bb cc》" }
{ "_id" : ObjectId("5965aedfaaf42d1c98dd95b2"), "title" : "aa bb", "author" : "白小明", "article" : "这是白小明的一篇文章，标题《aa bb cc》" }

> db.col_7.createIndex({"title": "text"})

> db.col_7.find({$text:{$search:"aa"}})
{ "_id" : ObjectId("5965aa84aaf42d1c98dd95b0"), "title" : "aa bb cc", "author" : "白小明", "article" : "这是白小明的一篇文章，标题《aa bb cc》" }
{ "_id" : ObjectId("5965aedfaaf42d1c98dd95b2"), "title" : "aa bb", "author" : "白小明", "article" : "这是白小明的一篇文章，标题《aa bb cc》" }

> db.col_7.find({$text:{$search:"aa cc"}})
{ "_id" : ObjectId("5965aa84aaf42d1c98dd95b0"), "title" : "aa bb cc", "author" : "白小明", "article" : "这是白小明的一篇文章，标题《aa bb cc》" }
{ "_id" : ObjectId("5965aedfaaf42d1c98dd95b2"), "title" : "aa bb", "author" : "白小明", "article" : "这是白小明的一篇文章，标题《aa bb cc》" }

> db.col_7.find({$text:{$search:"\"aa\" \"cc\""}})
{ "_id" : ObjectId("5965aa84aaf42d1c98dd95b0"), "title" : "aa bb cc", "author" : "白小明", "article" : "这是白小明的一篇文章，标题《aa bb cc》" }

> db.col_7.find({$text:{$search:"aa bb"}},{score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}})
{ "_id" : ObjectId("5965aedfaaf42d1c98dd95b2"), "title" : "aa bb", "author" : "白小明", "article" : "这是白小明的一篇文章，标题《aa bb cc》", "score" : 1.5 }
{ "_id" : ObjectId("5965aa84aaf42d1c98dd95b0"), "title" : "aa bb cc", "author" : "白小明", "article" : "这是白小明的一篇文章，标题《aa bb cc》", "score" : 1.3333333333333333 }


> db.col_7.dropIndexes()

> db.col_7.createIndex({"author": "text"}))

> db.col_7.find({$text:{$search:"小明"}})})
>

> db.col_7.find({$text:{$search:"白小明"}})
{ "_id" : ObjectId("5965aa84aaf42d1c98dd95b0"), "title" : "aa bb cc", "author" : "白小明", "article" : "这是白小明的一篇文章，标题《aa bb cc》" }
{ "_id" : ObjectId("5965aa8faaf42d1c98dd95b1"), "title" : "abc def", "author" : "白小明", "article" : "这是白小明的一篇文章，标题《aa bb cc》" }
{ "_id" : ObjectId("5965aedfaaf42d1c98dd95b2"), "title" : "aa bb", "author" : "白小明", "article" : "这是白
```

[slide]
# 10. MongoDB聚合

[slide]
# 11. MongoDB 复制
MongoDB 复制（副本集）是将数据同步在多个服务器的过程。复制提供了数据的冗余备份，并在多个服务器上存储数据副本，提高了数据的可用性， 并可以保证数据的安全性。

[slide]
# 11.1 复制原理
mongodb 的复制至少需要两个节点。

- 其中一个是主节点，负责处理客户端请求，
- 其余的都是从节点，负责复制主节点上的数据

mongodb各个节点常见的搭配方式为：一主一从、一主多从。主节点记录在其上的所有操作oplog，从节点定期轮询主节点获取这些操作，然后对自己的数据副本执行这些操作，从而保证从节点的数据与主节点一致。

<img src="img/cloud/cloud/mongo03.png" alt="">

[slide]
# 11.2 复制设置
关闭正在运行的MongoDB服务器。
```bash
# 指定 --replSet 选项来启动mongoDB
mongod --port "PORT" --dbpath "YOUR_DB_DATA_PATH" --replSet "REPLICA_SET_INSTANCE_NAME"

# 在Mongo客户端使用命令rs.initiate()来启动一个新的副本集。可以使用rs.conf()来查看副本集的配置；查看副本集状态使用 rs.status() 命令
mongod --port 27017 --dbpath "D:\set up\mongodb\data" --replSet rs0
```

[slide]
# 11.3 副本集添加成员
添加副本集的成员，我们需要使用多条服务器来启动mongo服务。MongoDB的副本集与我们常见的主从有所不同，主从在主机宕机后所有服务将停止，而副本集在主机宕机后，副本会接管主节点成为主节点，不会出现宕机的情况。
```bash
# 进入Mongo客户端，并使用rs.add()方法来添加副本集的成员。
rs.add(HOST_NAME:PORT)

# 假设你已经启动了一个名为 mongod1.net，端口号为27017的Mongo服务。
# 在客户端命令窗口使用rs.add() 命令将其添加到副本集中，命令如下所示：
rs.add("mongod1.net:27017")

# MongoDB 中你只能通过主节点将Mongo服务添加到副本集中， 判断当前运行的Mongo服务是否为主节点可以使用命令
db.isMaster()
```

[slide]
# 12. MongoDB 分片
当MongoDB存储海量的数据时，==一台机器可能不足以存储数据==，也可能不足以提供可接受的读写吞吐量。这时，我们就可以通过在多台机器上分割数据，使得数据库系统能存储和处理更多的数据。

为什么使用分片？

- 复制所有的写入操作到主节点
- 延迟的敏感数据会在主节点查询
- 单个副本集限制在12个节点
- 当请求量巨大时会出现内存不足。
- 本地磁盘不足
- 垂直扩展价格昂贵
- 分片集群结构

<img src="img/cloud/cloud/mongo04.png" alt="">

三个主要组件：

- Shard: 用于存储实际的数据块，实际生产环境中一个shard server角色可由几台机器组个一个replica set承担，防止主机单点故障
- Config Server: mongod实例，存储了整个 ClusterMetadata，其中包括 chunk信息。
- Query Routers: 前端路由，客户端由此接入，且让整个集群看上去像单一数据库，前端应用可以透明使用。

[slide]
# 13. MongoDB 监控
- mongostat: 它会间隔固定时间获取 mongodb 的当前运行状态，并输出。
- mongotop: mongotop用来跟踪MongoDB的实例，提供每个集合的统计数据。默认情况下，mongotop每一秒刷新一次。


[slide]
# 14. MongoDB 备份与恢复
mongodump 命令可以导出所有数据到指定目录中。
```bash
# -h：MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017  
# -d：需要备份的数据库实例，例如：test  
# -o：备份的数据存放位置，例如：c:\data\dump，当然该目录需要提前建立，在备份完成后，系统自动在dump目录下建立一个test目录，这个目录里面存放该数据库实例的备份数据。
mongodump -h dbhost -d dbname -o dbdirectory

# 备份 mongodb_study 数据库中的所有集合到 E:\MongoDB\dump
mongodump -h 127.0.0.1 -d mongodb_study -o E:\MongoDB\dump

# 备份指定主机
mongodump --host HOST_NAME --port PORT_NUMBER
mongodump --host w3cschool.cc --port 27017

// 备份指定数据库的集合
mongodump --collection COLLECTION_NAME --db DB_NAME
mongodump --collection mycol --db test
```

mongorestore 命令来恢复MongoDB数据。
```bash
# --host <:port>, -h <:port>：MongoDB所在服务器地址，默认为： localhost:27017
# --db , -d ：需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2
# --drop：恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用哦！
# <path>：mongorestore 最后的一个参数，设置备份数据所在位置，例如：c:\data\dump\test。你不能同时指定 <path> 和 --dir 选项，--dir也可以设置备份目录。
# --dir：指定备份的目录，你不能同时指定 <path> 和 --dir 选项。
mongorestore -h <hostname><:port> -d dbname <path>


# 恢复存放在 E:\MongoDB\dump 中的数据库 mongodb_study，恢复前后的数据库名不必相同
mongorestore -h localhost /db mongodb_study /dir E:\MongoDB\dump\mongodb_study
```
