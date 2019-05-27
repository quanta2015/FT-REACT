实验12. Mongodb数据库编程

# 安装Mongdb库
```bash
$ cnpm install mongodb
```


# 创建数据库
要在 MongoDB 中创建一个数据库，首先我们需要创建一个 MongoClient 对象，然后配置好指定的 `URL` 和 `端口号`。如果数据库不存在，MongoDB 将创建数据库并建立连接。
```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";
MongoClient.connect(url, function(err,db){
  if (err) throw err;
  console.log("database created!")
})
```


# 创建集合
```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";

MongoClient.connect(url, function(err,db){
  if (err) throw err;
  console.log("database created!")

  var dbase = db.db("test");
  dbase.createCollection('news', function (err, res) {
    if (err) throw err;
    console.log("collection created!");
    db.close();
  });
})
```

# 插入数据
```js
MongoClient.connect(url, function(err,db){
  if (err) throw err;
  console.log("database connected!")

  var dbase = db.db("test");
  var newsObj = { name:"today", title:"it is mongodb!" };
  dbase.collection("news").insertOne(newsObj, function (err, res) {
    if (err) throw err;
    console.log("doc is inserted!");
    db.close();
  });
})
```

# 插入多条数据
```js
MongoClient.connect(url, function(err,db){
  if (err) throw err;
  console.log("database connected!")

  var dbase = db.db("test");
  var newsList = [{ name:"today", title:"it is mongodb!" },
           { name:"yes", title:"hello!" },
           { name:"god", title:"good thing!" }];
  dbase.collection("news").insertMany(newsList, function (err, res) {
    if (err) throw err;
    console.log(res.insertedCount + " doc is inserted!");
    db.close();
  });
})
```

# 查询数据
```js
MongoClient.connect(url, function(err,db){
  if (err) throw err;
  console.log("database connected!")

  var dbase = db.db("test");
  dbase.collection("news").find().toArray(function (err, res) {
    if (err) throw err;
    console.log(res);
    db.close();
  });
})
```

# 指定条件查询
```js
MongoClient.connect(url, function(err,db){
  if (err) throw err;
  console.log("database connected!")

  var dbase = db.db("test");
  var where = { name:"today" };
  dbase.collection("news").find(where).toArray(function (err, res) {
    if (err) throw err;
    console.log(res);
    db.close();
  });
})
```

# 更新数据
```js
MongoClient.connect(url, function(err,db){
  if (err) throw err;
  console.log("database connected!")

  var dbase = db.db("test");
  var where = { name:"today" };
  var update = { $set: { title: "changed....."}};

  dbase.collection("news").updateOne(where, update, function (err, res) {
      if (err) throw err;
      console.log("update success!");
      db.close();
  });
})
```

# 更新多条数据
```js
MongoClient.connect(url, function(err,db){
  if (err) throw err;
  console.log("database connected!")

  var dbase = db.db("test");
  var where = { name:"today" };
  var update = { $set: { title: "changed....."}};

  dbase.collection("news").updateMany(where, update, function (err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " update success!");
    db.close();
  });
})
```

# 删除数据
- deleteOne: 与更新updateOne相同
- deleteMany： 与更新多条 updatemany相同


# 实验练习
- 创建一个名为 `blog` 的数据库
- 在 `blog` 数据库中，插入多条 `news` 文档，包括 `_id` , `title` , `content` , `author` , `content` 信息；
- 在 `news` 文档中，根据关键字在 `title` 中查询记录；
- 在 `blog` 数据库中，根据 `_id` 编号删除 `news` 文档中相关的记录