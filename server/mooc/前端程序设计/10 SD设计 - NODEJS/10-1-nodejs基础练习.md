title: Express 详解
theme: light

[slide] 
# TASK.10 NODEJS练习文件读写



[slide] 
# **P1 缓存 Buffer**
1. 创建缓存
```js
var buf = new Buffer(10);

var buf = new Buffer([10, 20, 30, 40, 50]);

//支持"ascii", "utf8", "utf16le", "ucs2", "base64" or "hex"
var buf = new Buffer("Simply Easy Learning", "utf-8");
```


[slide] 
# 2. 写缓存 `buf.write(string[, offset][, length][, encoding])`
- string：待写入缓存的数据
- offset：写入缓存的偏移量
- length：写入数据的数量
- encoding：编码模式，默认为utf8


[slide] 
```js
buf = new Buffer(256);
len = buf.write("Simply Easy Learning");

console.log("Octets written : "+  len);
When the above program is executed, it produces the following result −

Octets written : 20
```


[slide] 
# 3. 读缓存 `buf.toString([encoding][, start][, end])`
- encoding：编码模式，默认为utf8
- start：开始读取的位置
- end：结束读取的位置


[slide] 
```js
buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}
console.log( buf.toString('ascii'));       // outputs: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // outputs: abcde
console.log( buf.toString('utf8',0,5));    // outputs: abcde
console.log( buf.toString(undefined,0,5)); // encoding defaults to 'utf8', outputs abcde

//运行输出
abcdefghijklmnopqrstuvwxyz
abcde
abcde
abcde
```


[slide] 
# 4. 转换成JSON `buf.toJSON()`
- encoding：编码模式，默认为utf8
- start：开始读取的位置
- end：结束读取的位置


[slide] 
```js
var buf = new Buffer('Simply Easy Learning');
var json = buf.toJSON(buf);
console.log(json);

//运行输出
[ 83, 105, 109, 112, 108, 121, 32, 69, 97, 115, 121, 32, 76, 101, 97, 114, 110, 105, 110,
   103 ]
```


[slide] 
# 5. 合并缓存 `Buffer.concat(list[, totalLength])`
- list：缓存的数组
- totalLength：合并缓冲的总长度


[slide] 
```js
var buffer1 = new Buffer('TutorialsPoint ');
var buffer2 = new Buffer('Simply Easy Learning');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 content: " + buffer3.toString());

//运行输出
buffer3 content: TutorialsPoint Simply Easy Learning
```


[slide] 
# 6. 比较缓存 `buf.compare(otherBuffer);`

```js
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 +" comes before " + buffer2);
}else if(result == 0){
   console.log(buffer1 +" is same as " + buffer2);
}else {
   console.log(buffer1 +" comes after " + buffer2);
}

//运行输出
ABC comes before ABCD
```


[slide] 
# 7. 拷贝缓存 `buf.copy(targetBuffer[, targetStart][, sourceStart][, sourceEnd])`
- targetBuffer：目标缓存
- targetStart：目标的起始位置
- sourceStart： 源的起始位置
- sourceEnd：源的结束位置


[slide] 
```js
var buffer1 = new Buffer('ABC');

//copy a buffer
var buffer2 = new Buffer(3);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());

//运行输出
buffer2 content: ABC
```


[slide] 
# 8. 分割缓存 `buf.slice([start][, end])`
- start：开始位置
- end：结束位置

```js
var buffer1 = new Buffer('TutorialsPoint');
//slicing a buffer
var buffer2 = buffer1.slice(0,9);
console.log("buffer2 content: " + buffer2.toString());));

//运行输出
buffer2 content: Tutorials
```


[slide] 
# 9. 缓存长度 `buf.length;`
- start：开始位置
- end：结束位置

```js
var buffer = new Buffer('TutorialsPoint');
//length of the buffer
console.log("buffer length: " + buffer.length);

//运行输出
buffer length: 14
```


[slide] 
# **P2 文件系统 FileSystem**

# 1. 同步读取 `readFileSync`
```js
//没有声明encoding时返回二进制数据
var fs = require('fs');
var data = fs.readFileSync('input.txt');
console.log("Synchronous read: " + data.toString());

//声明encoding时返回字符串
var fs = require('fs');
var data = fs.readFileSync('input.txt',  { encoding: 'utf-8' });
console.log("Synchronous read: " + data.toString());

//使用try..catch处理异常
try{
    var err = fs.readFileSync('noneExist.txt');
}catch(err){
    console.log(err.message);  // 输出no such file or directory 'noneExist.txt'
}
```


[slide] 
# 2. 异步读取 `readFile`
```js
//没有声明encoding时返回二进制数据
fs.readFile('input.txt', function(err, data){
    if (err) {
      return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
});

//声明encoding时返回字符串
fs.readFile('input.txt', {encoding: 'utf-8'}, function(err, data){
    if (err) {
      return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
});
```


[slide] 
# 3. 打开文件 `fs.open(path, flags[, mode], callback)` 

| Flag | Description |
|------|-----|
| r | Open file for reading. An exception occurs if the file does not exist. |
| r+ | Open file for reading and writing. An exception occurs if the file does not exist. |
| rs | Open file for reading in synchronous mode. |
| rs+ | Open file for reading and writing, asking the OS to open it synchronously. See notes for 'rs' about using this with caution. |
| w | Open file for writing. The file is created (if it does not exist) or truncated (if it exists). |
| wx | Like 'w' but fails if the path exists. |
| w+ | Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists). |
| wx+ | Like 'w+' but fails if path exists. |
| a | Open file for appending. The file is created if it does not exist. |
| ax | Like 'a' but fails if the path exists. |
| a+ | Open file for reading and appending. The file is created if it does not exist. |
| ax+ | Like 'a+' but fails if the the path exists. |


[slide] 
```js
// 异步打开文件
var fs = require("fs");
console.log("Going to open file!");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
      return console.error(err);
   }
  console.log("File opened successfully!");     
});
```


[slide] 
# 4. 取文件信息 `fs.stat(path, callback)` 

| Method | Description |
|----------|--------|
| stats.isFile() | Returns true if file type of a simple file. |
| stats.isDirectory() | Returns true if file type of a directory. |
| stats.isBlockDevice() | Returns true if file type of a block device. |
| stats.isCharacterDevice() | Returns true if file type of a character device. |
| stats.isSymbolicLink() | Returns true if file type of a symbolic link. |
| stats.isFIFO() | Returns true if file type of a FIFO. |
| stats.isSocket() | Returns true if file type of asocket. |


[slide] 
```js
var fs = require("fs");
console.log("Going to get file info!");
fs.stat('input.txt', function (err, stats) {
   if (err) {
       return console.error(err);
   }
   console.log(stats);
   console.log("Got file info successfully!");

   // Check file type
   console.log("isFile ? " + stats.isFile());
   console.log("isDirectory ? " + stats.isDirectory());    
});
```

[slide] 
运行程序后输出
```js
Going to get file info!
{ 
   dev: 1792,
   mode: 33188,
   nlink: 1,
   uid: 48,
   gid: 48,
   rdev: 0,
   blksize: 4096,
   ino: 4318127,
   size: 97,
   blocks: 8,
   atime: Sun Mar 22 2015 13:40:00 GMT-0500 (CDT),
   mtime: Sun Mar 22 2015 13:40:57 GMT-0500 (CDT),
   ctime: Sun Mar 22 2015 13:40:57 GMT-0500 (CDT) 
}
Got file info successfully!
isFile ? true
isDirectory ? false
```

[slide] 
# 5. 写文件 `fs.writeFile(filename, data[, options], callback)` 

- path：文件名称（包括路径）
- data：字符串（String）或者数据缓存（Buffer）
- options：可选项，可以设置 `encoding` , `mode`, `flag`； 默认encoding是 `utf8`, mode是八进制 `0666`，flag是 `w`
- callback：包括一个错误返回参数的回调函数


[slide] 
```js
var fs = require("fs");

console.log("Going to write into existing file");
fs.writeFile('input.txt', 'Simply Easy Learning!',  function(err) {
   if (err) {
      return console.error(err);
   }
   
   console.log("Data written successfully!");
   console.log("Read newly written data");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("Asynchronous read: " + data.toString());
   });
});

//运行后输出
Going to write into existing file
Data written successfully!
Read newly written data
Asynchronous read: Simply Easy Learning!
```


[slide] 
# 6. 读文件 `fs.read(fd, buffer, offset, length, position, callback)` 
- fd：读取成功后返回的文件句柄
- buffer：读取后的数据会写入到该缓冲区
- offset：写入缓冲区的偏移地址
- length：读取的数据数量
- position：读取的位置，如果为 `null`,则从当前位置读取
- callback：回调函数


[slide] 
```js
var fs = require("fs");
var buf = new Buffer(1024);

console.log("Going to open an existing file");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
      return console.error(err);
   }
   console.log("File opened successfully!");
   console.log("Going to read the file");
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }
      console.log(bytes + " bytes read");
      
      // Print only read bytes to avoid junk.
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }
   });
});

//运行后输出
Going to open an existing file
File opened successfully!
Going to read the file
97 bytes read
Tutorials Point is giving self learning content
to teach the world in simple and easy way!!!!!
```


[slide] 
# 7. 关闭文件 `fs.close(fd, callback)` 
- fd：读取成功后返回的文件句柄
- callback：回调函数

```js
var fs = require("fs");
var buf = new Buffer(1024);

console.log("Going to open an existing file");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
      return console.error(err);
   }
   console.log("File opened successfully!");
   console.log("Going to read the file");
   
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }

      // Print only read bytes to avoid junk.
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }

      // Close the opened file.
      fs.close(fd, function(err){
         if (err){
            console.log(err);
         } 
         console.log("File closed successfully.");
      });
   });
});

//运行后输出
Going to open an existing file
File opened successfully!
Going to read the file
Tutorials Point is giving self learning content
to teach the world in simple and easy way!!!!!

File closed successfully.
```


[slide] 
# 8. 删除文件 `fs.unlink(path, callback)` 
- path：文件名称（包括路径）
- callback：回调函数

```js
var fs = require("fs");

console.log("Going to delete an existing file");
fs.unlink('input.txt', function(err) {
   if (err) {
      return console.error(err);
   }
   console.log("File deleted successfully!");
});
```


[slide] 
# 9. 建立目录 `fs.mkdir(path[, mode], callback)` 
- path：文件名称（包括路径）
- mode：目录权限，默认值 `0777`
- callback：回调函数


[slide] 
```js
var fs = require("fs");

console.log("Going to create directory /tmp/test");
fs.mkdir('/tmp/test',function(err){
   if (err) {
      return console.error(err);
   }
   console.log("Directory created successfully!");
});
```


[slide] 
# 10. 读取目录 `fs.readdir(path, callback)` 
- path：文件名称（包括路径）
- callback：回调函数


[slide] 
```js
var fs = require("fs");

console.log("Going to read directory /tmp");
fs.readdir("/tmp/",function(err, files){
   if (err) {
      return console.error(err);
   }
   files.forEach( function (file){
      console.log( file );
   });
});
```


[slide] 
# 11. 删除目录 `fs.rmdir(path, callback)` 
- path：文件名称（包括路径）
- callback：回调函数


[slide] 
```js
var fs = require("fs");

console.log("Going to delete directory /tmp/test");
fs.rmdir("/tmp/test",function(err){
   if (err) {
      return console.error(err);
   }
   console.log("Going to read directory /tmp");
   
   fs.readdir("/tmp/",function(err, files){
      if (err) {
         return console.error(err);
      }
      files.forEach( function (file){
         console.log( file );
      });
   });
});
```


[slide] 
# **P3 数据流 Streams**
流是 unix 管道，可以从数据源读取数据，然后流向另一个目的地。nodejs有4种数据流：
- Readable：可读流
- Writable：可写流 − Stream which is used for write operation.
- Duplex：读写流
- Transform：转换流，输出数据根据输入数据计算


[slide] 
# 1. 读取流
假设有文本  `input.txt`，内容如下：
```
Tutorials Point is giving self learning content
to teach the world in simple and easy way!!!!!
```


[slide] 
编写main.js如下：
```js
var fs = require("fs");
var data = '';

//readableStream.setEncoding('utf8'); 可以设置编码，回调函数中的 chunk 就会是字符串

// Create a readable stream
var readerStream = fs.createReadStream('input.txt');

// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});
console.log("Program Ended");

//运行输出
Program Ended
Tutorials Point is giving self learning content
to teach the world in simple and easy way!!!!!
```

[slide] 
# 2. 改写流
```js
var fs = require("fs");
var data = 'Simply Easy Learning';

// 创建可写流
var writerStream = fs.createWriteStream('output.txt');

// 以utf8的编码写入数据
writerStream.write(data,'UTF8');

// 标记文件结束
// 当 end() 被调用时，所有数据会被写入，然后流会触发一个 finish 事件。
// 调用 end() 之后就不能再往可写流中写入数据
writerStream.end();

// 处理结束事件和错误事件
writerStream.on('finish', function() {
    console.log("Write completed.");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("Program Ended"); and easy way!!!!!
```
运行结束后`output.txt`的内容为 `Simply Easy Learning`


[slide] 
# 3. 管道 `Piping`
管道是一个很棒的机制，你不需要自己管理流的状态就可以从数据源中读取数据，然后写入到目的地中。

> 将input.txt的数据写入到output.txt


[slide] 
```js
var fs = require("fs");
var readerStream = fs.createReadStream('input.txt');
var writerStream = fs.createWriteStream('output.txt');
readerStream.pipe(writerStream);
console.log("Program Ended");
```


[slide] 
# 4. 管道 `Chaining`
链接可以将输出流作为下一个函数的输入

> 将压缩文件input.txt.gz解压后的内容放到新文件output.txt

```js
var fs = require('fs');
var zlib = require('zlib');

fs.createReadStream('input.txt.gz')
 .pipe(zlib.createGunzip())
 .pipe(fs.createWriteStream('output.txt'));

 console.log("File Compressed.");
```


