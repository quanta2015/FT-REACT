title: Mapreduce
theme: light

[slide]
# Mapreduce


[slide]
# 1. Mapreduce 概述
MapReduce最早是由Google公司研究提出的一种面向大规模数据处理的并行计算模型和方法。Google公司设计MapReduce的初衷主要是为了解决其搜索引擎中大规模网页数据的并行化处理。Google公司发明了MapReduce之后首先用其重新改写了其搜索引擎中的Web文档索引处理系统。但由于MapReduce可以普遍应用于很多大规模数据的计算问题，因此自发明MapReduce以后，Google公司内部进一步将其广泛应用于很多大规模数据处理问题。

[slide]
2003年和2004年，Google公司在国际会议上分别发表了两篇关于Google分布式文件系统和MapReduce的论文，公布了Google的GFS和MapReduce的基本原理和主要设计思想。

[slide]
Hadoop的思想来源于Google的几篇论文，灵感来源于函数式语言中的内置函数map和reduce。简单来说，在函数式语言里，map表示对一个列表 List 中的每个元素做计算，reduce表示对一个列表中的每个元素做迭代计算。它们具体的计算是通过传入的函数来实现的，map和reduce提供的是计算的框架。

[slide]
Map处理的是原始数据，自然是杂乱无章的，每条数据之间互相没有关系；到了Reduce阶段，数据是以key后面跟着若干个value来组织的，这些value有相关性，至少它们都在一个key下面，于是就符合函数式语言里map和reduce的基本思想了。

[slide]
可以把MapReduce理解为，把一堆杂乱无章的数据按照某种特征归纳起来，然后处理并得到最后的结果。Map面对的是杂乱无章的互不相关的数据，它解析每个数据，从中提取出 key 和 value ，也就是提取了数据的特征。经过MapReduce的Shuffle阶段之后，在Reduce阶段看到的都是已经归纳好的数据了，在此基础上我们可以做进一步的处理以便得到结果。这就回到了最初，终于知道MapReduce为何要这样设计。

[slide]
2004年，Doug Cutting模仿Google MapReduce，基于Java设计开发了一个称为 Hadoop 的开源MapReduce并行计算框架和系统。自此， Hadoop 成为Apache开源组织下最重要的项目，自其推出后很快得到了全球学术界和工业界的普遍关注，并得到推广和普及应用。

[slide]
MapReduce的推出给大数据并行处理带来了巨大的革命性影响，使其已经成为事实上的大数据处理的工业标准。MapReduce是到目前为止最为成功、最广为接受和最易于使用的大数据并行处理技术。MapReduce改变了组织大规模计算的方式，它代表了第一个有别于冯·诺依曼结构的计算模型，是在集群规模而非单个机器上组织大规模计算的新的抽象模型上的第一个重大突破，是到目前为止所见到的最为成功的基于大规模计算资源的计算模型。

[slide]
# 2. MAP 和 REDUCE 函数
map函数和reduce函数都是以 `<key,value>` 作为输入，按一定的映射规则转化成另一个或一批 `<key,value>` 进行输入。

| 函数 | 输入 | 输出 | 说明 |
|--------|------|-------|------|
| Map | <k1,v1> | List(<k2,v2>) | 1. 将小数据集进一步解析成一批<key,value>对，输入Map函数中进行处理； 2. 每一个输入的<k1,v1>会输出一批<k2,v2>。 <k2,v2>是计算的中间结果。 |
| Reduce | <k2,List(v2)> | <k3,v3> | 输入的中间结果 <k2,List(v2)> 总的 List(v2) 表示是一批属于同一个 k2 的value |


[slide]
# 3. MapReduce工作流程
MapReduce的核心思想是分而治之，也就是把一个大的作业拆分成多个Map任务在多台机器上并行执行，每个Map任务通常运行在数据存储的节点上。当Map任务结束后，会生成以 `<key,value>` 形式表示的许多中间结果，然后被分发到多个 Reduce 任务在多台机器上并行执行。具有相同 key 的 `<key,value>` 会被发送到同一个 Reduce 任务哪里， Reduce任务会对中间结果进行汇总计算得到最后结果，并输出到分布式文件系统中。


[slide]
# 4. MapReduce 各个执行阶段
1. 使用 InputFormat 模块做Map前的预处理，将输入文件切分为逻辑上的多个 InputSplit；
2. 通过RecordReader根据 InputSplit 中的信息来处理具体记录，加载数据并转化为适合Map任务读取的键值对，输入给Map任务；
3. Map任务根据用户自定义的音色规则，输出一系列的 `<key,value>` 作为中间结果；
4. 对Map输出进行一定的分区、排序、合并和归并等操作，得到 `<key,value-list>` 形式的中间结果，再交给对应的Reduce处理，这个过程称为 Shuffle；
5. Reduce以一系列 `<key,value-list>` 中间结果作为输入，执行用户定义的逻辑，输出结果给 OutputFormat 模块；
6. OutputFormat 模块会验证输出目录是否已经存在以及输出结果类型是否符合配置文件中的匹配类型，如果满足就输出 Reduce结果到分布式文件系统。


[slide]
# 5. WordCount 实例分析

[slide]
# 6. MapReduce具体应用
6.1 关系代数运算
- 关系的选择运算
- 关系的投影运算
- 关系的并交差运算
- 关系的自然连接

6.2 分组与聚合运算
6.3 矩阵-向量乘法
6.4 矩阵乘法

[slide]
# 7. MapReduce 常见算法
7.1 单词统计

[slide]
**mapper.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();

stdin.setEncoding('utf8');

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = replaceAll('\t',' ',chunk);
    chunk = replaceAll('\n',' ',chunk);
    chunk = chunk.trim();
    var words = chunk.split(' ');
    for(word in words){
      console.log(words[word]+'\t'+1);
    }
  }
});
```


[slide]
**reducer.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8')
var current_word='';
var current_count=0;

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim();
    var arr = chunk.split('\n')
    for(word in arr){

      var tuple = arr[word].split('\t');
      var word = tuple[0];
      var count = parseInt(tuple[1]);

      if(current_word == word){
          current_count+= count;
      }else{
        if(current_word)
          console.log(current_word +'\t'+ current_count);
          current_word = word;
          current_count = count;
      }
    }
    if(current_word == word)
      console.log(current_word +'\t'+ current_count);
  }
});
```

[slide]
# 7.2 数据去重
数据去重主要是为了掌握和利用并行化思想来对数据进行有意义的筛选。统计大数据集上的数据种类个数、从网站日志中计算访问地等这些看似庞杂的任务都会涉及数据去重。 


[slide]
设计思路：数据去重的最终目标是让原始数据中出现次数超过一次的数据在输出文件中只出现一次。因此将同一个数据的所有记录都交给一台reduce机器，无论这个数据出现多少次，只要在最终结果中输出一次就可以了。map以数据作为 key ，而对 value-list 置空；当reduce接收到一个 `<key，value-list> `时就直接将 key 复制到输出的 key 中，并将 value 设置成空值。


[slide]
```bash
# log1.txt
2012-3-1 a
2012-3-2 b
2012-3-3 c #
2012-3-4 d #
2012-3-5 a #
2012-3-6 b
2012-3-7 c
2012-3-3 c #

# log2.txt
2012-3-1 b
2012-3-2 a
2012-3-3 b
2012-3-4 d #
2012-3-5 a #
2012-3-6 c
2012-3-7 d
2012-3-3 c #
```

[slide]
**mapper.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();

stdin.setEncoding('utf8');

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim();
    var logs = chunk.split('\n');
    for(log in logs){
      var fields = logs[log].split(' ');
      console.log(fields[0].trim()+' '+fields[1].trim());
    }
  }
});
```

[slide]
**reducer.js**
```js
var stdin = process.openStdin();
stdin.setEncoding('utf8')
ret={};

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim();
    var arr = chunk.split('\n')
    for(line in arr){
      var key = arr[line].trim();
      if (!ret[key]) {
        ret[key] = 0;
      }
    }
    for(item in ret) {
      console.log(item)
    }
  }
});
```

[slide]
# 7.3 排序：按某个Key进行升序或降序排列
数据排序是许多实际任务执行时要完成的第一项工作，比如学生成绩评比、数据建立索引等。

设计思路： 在MapReduce过程中就有排序，可以利用这个默认的排序（默认排序规则是按照key值进行排序）。


[slide]
****
```bash
# log1.txt
2
32
654
32
15
756
65223

# log2.txt
5956
22
650
92
26
54
6
```

[slide]
**mapper.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8');

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim();
    var nums = chunk.split('\n');
    for(num in nums){
      console.log(parseInt(nums[num].trim())+'\t'+0);
    }
  }
});
```

[slide]
**reducer.js**
```
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8')
ret={};

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim();
    var arr = chunk.split('\n')
    for(line in arr){
      var items = arr[line].split('\t');
      var key = items[0].trim(); 
      ret[key] = 0;
    }
    for(item in ret) {
      console.log(item)
    }
  }
});
```

[slide]
# 7.4 平均成绩
平均成绩主要目的还是在重温经典 WordCount例子，可以说是在基础上的微变化版，该实例主要就是实现一个计算学生平均成绩的例子。

设计思路：Map处理的是一个纯文本文件，文件中存放的数据时每一行表示一个学生的姓名和他相应一科成绩。Mapper处理的数据是由InputFormat分解过的数据集，其中InputFormat的作用是将数据集切割成小数据集InputSplit，每一个InputSlit将由一个Mapper负责处理。此外，InputFormat中还提供了一个RecordReader的实现，并将一个InputSplit解析成对提供给了map函数。InputFormat的默认值是TextInputFormat，它针对文本文件，按行将文本切割成InputSlit，并用LineRecordReader将InputSplit解析成对，key是行在文本中的位置，value是文件中的一行。


[slide]
```bash
# log1.txt
张三    78
李四    89
王五    96
赵六    67

# log2.txt
张三    88
李四    99
王五    66
赵六    77

# log3.txt
张三    80
李四    82
王五    84
赵六    86
```

[slide]
**mapper.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8');
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}
stdin.on('data',function(chunk) {
  // console.log(chunk)
  if (chunk !== null) {
    chunk = chunk.trim()
    var arr = chunk.split('\n');
    for(line in arr){
      var items = arr[line].replace(/\s+/g,' ').split(' ');
      var name = items[0];
      var grade = items[1];
      console.log(name+'\t'+grade);
    }
  }
});
```

[slide]
**reducer.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8')
ret={};
cnt={}

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim();
    var arr = chunk.split('\n')
    for(line in arr){
      var items = arr[line].trim().split('\t');
      var key = items[0].trim()
      var grade = parseInt(items[1].trim())
      if (!ret[key]) {
        ret[key] = { "grade":grade,"count":1};  
      }else{
        val = ret[key].grade + grade;
        cnt = ret[key].count + 1;
        ret[key] = { "grade":val,"count":cnt};
      }
    }
    for(item in ret) {
      console.log(item+ '\t' + ret[item].grade/ret[item].count)
    }
  }
});
```

[slide]
# 7.5 单表关联
单表关联要求从给出的数据中寻找所关心的数据，它是对原始数据所包含信息的挖掘。

设计思路：单表连接，连接的是左表的 `parent` 列和右表的 `child` 列，且左表和右表是同一个表。首先考虑如何实现表的自连接，其次就是连接列的设置，最后是结果的整理。

在map阶段，将数据分割成左表 `key=parent`, `value=child` 和右表 `key=child`, `value= parent` 。为了区分输出的左右表，需要在输出中再加上左右表的信息，比如用1表示左表2表示右表。reduce接收数据后，取出每个`key`的`value-list`进行解析，将左表中的 `child` 放入一个数组，右表中的 `parent` 放入一个数组，然后对两个数组求笛卡尔积就是最后的结果了。

[slide]
```bash
# log1.txt
Tom Lucy
Tom Jack
Jone Lucy
Jone Jack
Lucy Mary
Lucy Ben
Jack Alice
Jack Jesse
Terry Alice
Terry Jesse
Philip Terry
Philip Alma
Mark Terry
Mark Alma
```

[slide]
**mapper.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8');
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

stdin.on('data',function(chunk) {
  // console.log(chunk)
  if (chunk !== null) {
    chunk = chunk.trim()
    var arr = chunk.split('\n');
    for(line in arr){
      var items = arr[line].split(' ');
      var child = items[0];
      var parent = items[1];
      console.log(parent + '\t' + child  + '\t' + 1);
      console.log(child  + '\t' + parent + '\t' + 2);
    }
  }
});
```

[slide]
**reducer.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8')
childList = [];
parentList = [];
stdin.on('data',function(chunk) {

  if (chunk !== null) {
    chunk = chunk.trim();
    var arr = chunk.split('\n')
    for(line in arr){
      var items = arr[line].trim().split('\t');
      var key = items[0].trim()
      var val = items[1].trim()
      var type = parseInt(items[2].trim())
      if (type === 1) {
        childList.push({"key":key, "val":val})
      }else{
        parentList.push({"key":key, "val":val})
      }
    }
    for(child in childList) {
      for(parent in parentList) {
        if (childList[child].key === parentList[parent].key) {
          console.log(childList[child].val + '\t' + parentList[parent].val)
        }
      }
    }
  }
});
```

[slide]
# 7.6 多表连接
多表关联和单表关联类似，它也是通过对原始数据进行一定的处理，从其中挖掘出关心的信息。 

设计思路：多表关联和单表关联相似，都类似于数据库中的自然连接。相比单表关联，多表关联的左右表和连接列更加清楚。所以可以采用和单表关联的相同的处理方式，map识别出输入的行属于哪个表之后，对其进行分割，将连接的列值保存在key中，另一列和左右表标识保存在value中，然后输出。reduce拿到连接结果之后，解析value内容，根据标志将左右表内容分开存放，然后求笛卡尔积，最后直接输出。


[slide]
```bash
# log1.txt
Beijing Red Star    1
Shenzhen Thunder    3
Guangzhou Honda 2
Beijing Rising  1
Guangzhou Development Bank  2
Tencent 3
Back of Beijing 1

# log2.txt
1   Beijing
2   Guangzhou
3   Shenzhen
4   Xian
```

[slide]
**mapper.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8');
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim()
    var arr = chunk.split('\n');
    for(line in arr){
      var items = arr[line].split('\t');
      var key = items[0];
      var val = items[1];
      if (isNaN(key)) {
        console.log(val + '\t' + key  + '\t' + 1);
      }else{
        console.log(key + '\t' + val  + '\t' + 2);
      }
    }
  }
});
```

[slide]
**reducer.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8')
childList = [];
parentList = [];

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim();
    var arr = chunk.split('\n')
    for(line in arr){
      var items = arr[line].trim().split('\t');
      var key = items[0].trim()
      var val = items[1].trim()
      var type = parseInt(items[2].trim())
      if (type === 1) {
        childList.push({"key":key, "val":val})
      }else{
        parentList.push({"key":key, "val":val})
      }
    }
    for(child in childList) {
      for(parent in parentList) {
        if (childList[child].key === parentList[parent].key) {
          console.log(childList[child].val + '\t' + parentList[parent].val)
        }
      }
    }
  }
});
```

[slide]
# 7.7 分组：Group By XXXX
在MapReduce中，分组类似于分区操作，以处理商品订单为例。

```bash
#log1.txt
order001    g01 200
order001    g05 25
order002    g04 320
order002    g03 122
order003    g01 200
order003    g06 50
```

[slide]
**mapper.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8');
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim()
    var arr = chunk.split('\n');
    for(line in arr){
      var items = arr[line].split('\t');
      var orderid = items[0];
      var gid = items[1];
      var val = items[2];
      console.log(orderid + '\t' + gid  + '\t' + val);
    }
  }
});
```

[slide]
**reducer.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8')
ret = {};

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim();
    var arr = chunk.split('\n')
    for(line in arr){
      var items = arr[line].trim().split('\t');
      var orderid = items[0].trim()
      var gid = items[1].trim()
      var val = parseInt(items[2].trim())
      if (!ret[orderid]) {
        ret[orderid] = { "gid":gid,"val":val};
      }else{
        (val > ret[orderid].val)? ret[orderid] = val:'';
      }
    }
    for(item in ret) {
      console.log(item + '\t' + ret[item].gid + '\t' + ret[item].val)
    }
  }
});
```

[slide]
# 7.8 公共集合
比较复杂的计算，需要经过多次的MapReduce多次进行集合运算，比如查找共同好友的例子，下面是用户的好友关系列表，每一行代表一个用户和他的好友列表。要求计算出用户间的共同好友。


[slide]
设计思路： 使用2个MapReduce来实现
1）第1个MapReduce
```bash
# map
找出每个用户都是谁的好友，例如：
根据第一行 A:B,C,D,F,E,O 输出<B,A> <C,A> <D,A> <F,A> <E,A> <O,A>
根据第二行B:A,C,E,K 输出<A,B> <C,B> <E,B> <K,B>

# reduce
key相同的分到一组，例如：
<C,A><C,B><C,E><C,F><C,G>......
Key:C
value: [ A, B, E, F, G ]
意义是：C是这些用户的好友。
```

[slide]
遍历value就可以得到：
```
A B 有共同好友C
A E 有共同好友C
...
B E有共同好友 C
B F有共同好友 C
```

[slide]
输出：
<A-B,C>
<A-E,C>
<A-F,C>
<A-G,C>
<B-E,C>
<B-F,C>
.....

[slide]
2）第2个MapReduce对上一步的输出结果进行计算。
```bash
# map
读出上一步的结果数据，组织成key value直接输出
例如：
读入一行<A-B,C>
直接输出<A-B,C>

# reduce
读入数据，key相同的在一组
<A-B,C><A-B,F><A-B,G>......
输出：
A-B C,F,G,.....
这样就得出了两个用户间的共同好友列表
```


[slide]
```bash
# log1.txt
A: B,C,D,F,E,O
B: A,C,E,K
C: F,A,D,I
D: A,E,F,L
E: B,C,D,M,L
F: A,B,C,D,E,O,M
G: A,C,D,E,F
H: A,C,D,E,O
I: A,O
J: B,O
K: A,C,D
L: D,E,F
M: E,F,G
O: A,H,I,J
```

[slide]
**mapper.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8');
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim()
    var arr = chunk.split('\n');
    for(line in arr){
      var items = arr[line].split(':');
      var pid = items[0];
      var clist = items[1].trim().split(',');
      for(cid in clist) {
        console.log(clist[cid] + '\t' + pid);
      }
    }
  }
});
```

[slide]
**reducer.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8')

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim();
    var arr = chunk.split('\n')
    ret = {};
    for(line in arr){
      var items = arr[line].trim().split('\t');
      var id = items[0].trim()
      var val = items[1].trim()
      if (!ret[id]) {
        var list = []
        list.push(val)
        ret[id] = { "id":id,"list":list};
      }else{
        var list = ret[id].list
        list.push(val)
        ret[id] = { "id":id,"list":list};
      }
    }

    for(i in ret) {
      id = ret[i].id
      list = ret[i].list
      for(var j=0;j<list.length;j++) {
        for(var k = j+1; k<list.length; k++) {
          console.log(list[j] + '-' + list[k] + '\t' + id)
        }
      }
    }
  }
});
```

[slide]
**mapper2.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8');
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim()
    var arr = chunk.split('\n');
    for(line in arr){
      var items = arr[line].split('\t');
      var pid = items[0];
      var val = items[1];
      console.log(pid + '\t' + val);
    }
  }
});
```

[slide]
**reducer2.js**
```js
#!/usr/bin/node
var stdin = process.openStdin();
stdin.setEncoding('utf8')

stdin.on('data',function(chunk) {
  if (chunk !== null) {
    chunk = chunk.trim();
    var arr = chunk.split('\n')
    ret = {};
    for(line in arr){
      var items = arr[line].trim().split('\t');
      var id = items[0].trim()
      var val = items[1].trim()
      if (!ret[id]) {
        var list = []
        list.push(val)
        ret[id] = { "id":id,"list":list};
      }else{
        var list = ret[id].list
        list.push(val)
        ret[id] = { "id":id,"list":list};
      }
    }

    for(i in ret) {
      id = ret[i].id
      list = ret[i].list
      console.log(id + '\t' + list)  
    }
  }
});
```