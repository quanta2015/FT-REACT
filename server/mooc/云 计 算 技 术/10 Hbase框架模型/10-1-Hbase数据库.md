title: HBase
theme: light

[slide]
# HBase


[slide]
# HBase简介
Hbase是Hadoop Database的简称 ，Hbase项目是由Powerset公司的Chad Walters和Jim Kelleman在2006年末发起，根据Google的Chang等人发表的论文 `Bigtable：A Distributed Storage System for Strctured Data` 来设计的。2007年10月发布了第一个版本。2010年5月，Hbase从Hadoop子项目升级成Apache顶级项目。

Hbase是是一个高可靠、高性能、面向列、可伸缩的分布式存储系统。HDFS为Hbase提供可靠的底层数据存储服务，MapReduce为Hbase提供高性能的计算能力，Zookeeper为Hbase提供稳定服务和Failover机制，因此我们说Hbase是一个通过大量廉价的机器解决海量数据的高速存储和读取的分布式数据库解决方案。

[slide]
# Hbase特点

<img src="img/cloud/cloud/hbase01.png" alt="">

[slide]
# 海量存储

Hbase适合存储PB级别的海量数据，在PB级别的数据以及采用廉价PC存储的情况下，能在几十到百毫秒内返回数据。这与Hbase的极易扩展性息息相关。正式因为Hbase良好的扩展性，才为海量数据的存储提供了便利。

[slide]
# 列式存储

这里的列式存储其实说的是列族存储，Hbase是根据列族来存储数据的。列族下面可以有非常多的列，列族在创建表的时候就必须指定。为了加深对Hbase列族的理解，下面是一个简单的关系型数据库的表和Hbase数据库的表：

**传统数据库的表结构**

| primary key | 列1 | 列2 |
|-------------|-----|-----|
| 记录1 | xxx | xxx |
| 记录2 | xxx | xxx |
| 记录3 | xxx | xxx |

**Hbase的表**

| row key | cf1 | cf2 |
|---------|-----------|-----------|
| 记录1 | 列1...列n | 列1列2列3 |
| 记录2 | 列1列2 | xxx |
| 记录3 | 列1...列4 | 列1 |

**Hbase和关系型数据库的比较**

| Diff | Hbase | RDBMS |
|----------|--------------|----------------|
| 数据类型 | 字符串 | 丰富的数据类型 |
| 数据操作 | 简单增删改查 | 丰富SQL支持 |
| 存储模式 | 列存储 | 行存储 |
| 数据保护 | 保留 | 替换 |
| 可伸缩性 | 好 | 差 |

[slide]
# 极易扩展

Hbase的扩展性主要体现在两个方面，一个是基于上层处理能力（RegionServer）的扩展，一个是基于存储的扩展（HDFS）。

- 通过横向添加RegionSever的机器，进行水平扩展，提升Hbase上层的处理能力，提升Hbsae服务更多Region的能力。
- 通过横向添加Datanode的机器，进行存储层扩容，提升Hbase的数据存储能力和提升后端存储的读写能力。

[slide]
# 高并发

由于目前大部分使用Hbase的架构，都是采用的廉价PC，因此单个IO的延迟其实并不小，一般在几十到上百ms之间。这里说的高并发，主要是在并发的情况下，Hbase的单个IO延迟下降并不多。能获得高并发、低延迟的服务。

[slide]
# 稀疏

稀疏主要是针对Hbase列的灵活性，在列族中，你可以指定任意多的列，在列数据为空的情况下，是不会占用存储空间的。


[slide]
# Hbase的基本概念



[slide]
# Column Family

`Column Family`又叫列族，Hbase通过列族划分数据的存储，列族下面可以包含任意多的列，实现灵活的数据存取。类似于家族的概念，一个家族是由于很多个的家庭组成的。列族也类似，列族是由一个一个的列组成（任意多）。

- Hbase表的创建的时候就必须指定列族。就像关系型数据库创建的时候必须指定具体的列是一样的。
- Hbase的列族不是越多越好，官方推荐的是列族最好小于或者等于3。我们使用的场景一般是1个列族。

<img src="img/cloud/cloud/hbase04.png" alt="">

[slide]
# Rowkey

`Rowkey`的概念和mysql中的主键是完全一样的，Hbase使用`Rowkey`来唯一的区分某一行的数据。由于Hbase只支持3中查询方式：

- 基于Rowkey的单行查询
- 基于Rowkey的范围扫描
- 全表扫描

因此，`Rowkey`对Hbase的性能影响非常大，`Rowkey`的设计就显得尤为的重要。设计的时候要兼顾基于`Rowkey`的单行查询也要键入`Rowkey`的范围扫描。


[slide]
# Region

`Region`的概念和关系型数据库的分区或者分片差不多。Hbase会将一个大表的数据基于`Rowkey`的不同范围分配到不通的`Region`中，每个`Region`负责一定范围的数据访问和存储。这样即使是一张巨大的表，由于被切割到不通的`region`，访问起来的时延也很低。

[slide]
# TimeStamp

`TimeStamp`对Hbase来说至关重要，因为它是实现Hbase多版本的关键。在Hbase中使用不同的`TimeStamp`来标识相同`rowkey`行对应的不通版本的数据。

 - 在写入数据的时候，如果用户没有指定对应的`timestamp`，Hbase会自动添加一个`timestamp`，`timestamp`和服务器时间保持一致。
- 在Hbase中，相同`rowkey`的数据按照`timestamp`倒序排列。默认查询的是最新的版本，用户可同指定`timestamp`的值来读取旧版本的数据。

[slide]
# Hbase的架构

Hbase的架构图如下图所示

<img src="img/cloud/cloud/hbase03.png" alt="">


从图中可以看出Hbase是由Client、Zookeeper、Master、HRegionServer、HDFS等几个组建组成，下面来介绍一下几个组建的相关功能：

[slide]
# Client

Client包含了访问Hbase的接口，另外Client还维护了对应的cache来加速Hbase的访问，比如cache的`.META`元数据的信息。

[slide]
# Zookeeper

Hbase通过Zookeeper来做master的高可用、RegionServer的监控、元数据的入口以及集群配置的维护等工作。具体工作如下：

- 通过Zoopkeeper来保证集群中只有1个master在运行，如果master异常，会通过竞争机制产生新的master提供服务
- 通过Zoopkeeper来监控RegionServer的状态，当RegionSevrer有异常的时候，通过回调的形式通知Master RegionServer上下限的信息
- 通过Zoopkeeper存储元数据的统一入口地址

[slide]
# Hmaster

master节点的主要职责如下：

- 为RegionServer分配Region
- 维护整个集群的负载均衡
- 维护集群的元数据信息
- 发现失效的Region，并将失效的Region分配到正常的RegionServer上
- 当RegionSever失效的时候，协调对应Hlog的拆分

[slide]
# HregionServer

HregionServer直接对接用户的读写请求，是真正的“干活”的节点。它的功能概括如下：

- 管理master为其分配的Region
- 处理来自客户端的读写请求
- 负责和底层HDFS的交互，存储数据到HDFS
- 负责Region变大以后的拆分
- 负责Storefile的合并工作

[slide]
# HDFS

HDFS为Hbase提供最终的底层数据存储服务，同时为Hbase提供高可用（Hlog存储在HDFS）的支持，具体功能概括如下：

- 提供元数据和表数据的底层分布式存储服务
- 数据多副本，保证的高可靠和高可用性


[slide]
# Hbase的使用场景

Hbase是一个通过廉价PC机器集群来存储海量数据的分布式数据库解决方案。它比较适合的场景概括如下：

- 数据量大（T、PB级别）
- 查询简单（基于rowkey或者rowkey范围查询）
- 不涉及到复杂的关联
- 适合Hbase存储的典型场景：海量订单流水数据（长久保存）、交易记录、数据库历史数据


[slide]
#  Region详解

前面已经介绍了Region类似于数据库的分片和分区的概念，每个Region负责一小部分Rowkey范围的数据的读写和维护，Region包含了对应的起始行到结束行的所有信息。master将对应的region分配给不同的`RergionServer`，由`RegionSever`来提供Region的读写服务和相关的管理工作。这部分主要介绍`Region实例`以及`Rgeion寻找路径`：

[slide]
#  region实例

<img src="img/cloud/cloud/hbase05.png" alt="">

- Userinfo表中有7条记录；
- 其中0001和0002被分配到Region1，0003和0004被分配到Region2，而rowkey为0005、0006和0007被分配到Region3；
- region1和region2被master分配给了RegionServer1（RS1），Region3被master配分给了RegionServer2（RS2）；

> 备注：这里只是为了更容易的说明拆分的规则，其实真实的场景并不会几条记录拆分到不通的Region上，而是到一定的数据量才会拆分，具体的在Region的拆分那部分再具体的介绍。

[slide]
# Region的寻址

既然读写都在RegionServer上发生，每个RegionSever为一定数量的region服务，那么client要对某一行数据做读写的时候如何能知道具体要去访问哪个RegionServer呢？


**1 . 老的Region寻址方式**

在Hbase 0.96版本以前，Hbase有两个特殊的表，分别是 `ROOT表`和`.META表`，其中 `ROOT表`的位置存储在ZooKeeper中，`ROOT表`本身存储了`.META表`的RegionInfo信息，并且`ROOT表`不会分裂，只有一个region。而`.META表`可以被切分成多个region。读取的流程如下图所示：

<img src="img/cloud/cloud/hbase06.png" alt="">


- 第1步：client请求ZK获得`ROOT表`所在的RegionServer地址
- 第2步：client请求`ROOT表`所在的RS地址，获取`.META表`的地址，client会将`ROOT表`的相关信息cache下来，以便下一次快速访问
- 第3步：client请求`.META表`的RS地址，获取访问数据所在RegionServer的地址，client会将`.META表`的相关信息cache下来，以便下一次快速访问
- 第4步：client请求访问数据所在RegionServer的地址，获取对应的数据

> 从上面的路径我们可以看出，用户需要3次请求才能直到用户Table真正的位置，性能下降严重。在0.96之前使用3层设计的主要原因是考虑到元数据可能需要很大。但是真正集群运行，元数据的大小其实很容易计算出来。在BigTable的论文中，每行METADATA数据存储大小为1KB左右，如果按照一个Region为128M的计算，3层设计可以支持的Region个数为2^34个，采用2层设计可以支持2^17（131072）。那么2层设计的情况下一个集群可以存储4P的数据。这仅仅是一个Region只有128M的情况下。如果是10G呢? 因此，通过计算，其实2层设计就可以满足集群的需求。因此在0.96版本以后就去掉了`ROOT表`了。

**2 . 新的Region寻址方式**

如上面的计算，2层结构其实完全能满足业务的需求，因此0.96版本以后将`ROOT表`去掉了。如下图所示：

<img src="img/cloud/cloud/hbase07.png" alt="">

访问路径变成了3步：

- 第1步：Client请求ZK获取`.META表`所在的RegionServer的地址。
- 第2步：Client请求`.META表`所在的RegionServer获取访问数据所在的RegionServer地址，client会将`.META表`的相关信息cache下来，以便下一次快速访问。
- 第3步：Client请求数据所在的RegionServer，获取所需要的数据。

**去掉`ROOT表`的原因：**

- 提高性能
- 2层结构已经足以满足集群的需求

> 这里还有一个问题需要说明，那就是Client会缓存`.META表`的数据，用来加快访问，既然有缓存，那它什么时候更新？如果`.META表`更新了，比如Region1不在RerverServer2上了，被转移到了RerverServer3上。client的缓存没有更新会有什么情况？

> 其实，Client的元数据缓存不更新，当`.META表`的数据发生更新。如上面的例子，由于Region1的位置发生了变化，Client再次根据缓存去访问的时候，会出现错误，当出现异常达到重试次数后就会去`.META表`所在的RegionServer获取最新的数据，如果`.META表`所在的RegionServer也变了，Client就会去ZK上获取`.META表`所在的RegionServer的最新地址。



[slide]
# Hbase写逻辑

Hbase的写逻辑涉及到写内存、写log、刷盘等操作，看起来简单，其实里面又有很多的逻辑，下面就来做详细的介绍

[slide]
# Hbase写入逻辑

Hbase的写入流程如下图所示：

<img src="img/cloud/cloud/hbase08.png" alt="">

- 第1步：Client获取数据写入的Region所在的RegionServer
- 第2步：请求写Hlog
- 第3步：请求写MemStore

> 备注：只有当写Hlog和写MemStore都成功了才算请求写入完成。MemStore后续会逐渐刷到HDFS中。Hlog存储在HDFS，当RegionServer出现异常，需要使用Hlog来恢复数据。

[slide]
# MemStore刷盘

为了提高Hbase的写入性能，当写请求写入MemStore后，不会立即刷盘。而是会等到一定的时候进行刷盘的操作。具体是哪些场景会触发刷盘的操作呢？总结成如下的几个场景：

**1 . 全局内存控制**

这个全局的参数是控制内存整体的使用情况，当所有memstore占整个heap的最大比例的时候，会触发刷盘的操作。这个参数是`hbase.regionserver.global.memstore.upperLimit`，默认为整个heap内存的`40%`。但这并不意味着全局内存触发的刷盘操作会将所有的MemStore都进行输盘，而是通过另外一个参数`hbase.regionserver.global.memstore.lowerLimit`来控制，默认是整个heap内存的35%。当flush到所有memstore占整个heap内存的比率为`35%`的时候，就停止刷盘。这么做主要是为了减少刷盘对业务带来的影响，实现平滑系统负载的目的。

**2 . MemStore达到上限**

当MemStore的大小达到`hbase.hregion.memstore.flush.size`大小的时候会触发刷盘，默认128M大小

**3 . RegionServer的Hlog数量达到上限**

前面说到Hlog为了保证Hbase数据的一致性，那么如果Hlog太多的话，会导致故障恢复的时间太长，因此Hbase会对Hlog的最大个数做限制。当达到Hlog的最大个数的时候，会强制刷盘。这个参数是`hase.regionserver.max.logs`，默认是32个。

**4 . 手工触发**

可以通过hbase shell或者java api手工触发flush的操作。

**5 . 关闭RegionServer触发**

在正常关闭RegionServer会触发刷盘的操作，全部数据刷盘后就不需要再使用Hlog恢复数据。

**6 . Region使用HLOG恢复完数据后触发**

当RegionServer出现故障的时候，其上面的Region会迁移到其他正常的RegionServer上，在恢复完Region的数据后，会触发刷盘，当刷盘完成后才会提供给业务访问。

[slide]
# Hlog

**1 . Hlog简介**

Hlog是Hbase实现WAL（Write ahead log）方式产生的日志信息，内部是一个简单的顺序日志。每个RegionServer对应1个Hlog，所有对于该RegionServer的写入都被记录到Hlog中。Hlog实现的功能就是我们前面讲到的保证数据安全。当RegionServer出现问题的时候，能跟进Hlog来做数据恢复。此外为了保证恢复的效率，Hbase会限制最大保存的Hlog数量，如果达到Hlog的最大个数`hase.regionserver.max.logs`的时候，就会触发强制刷盘操作。对于已经刷盘的数据，其对应的Hlog会有一个过期的概念，Hlog过期后，会被监控线程移动到`.oldlogs`，然后会被自动删除掉。

Hbase是如何判断Hlog过期的呢？要找到这个答案，我们就必须了解Hlog的详细结构。

**2 . Hlog结构**

下图是Hlog的详细结构：

<img src="img/cloud/cloud/hbase09.png" alt="">

- 多个Region共享一个Hlog文件，单个Region在Hlog中是按照时间顺序存储的，但是多个Region可能并不是完全按照时间顺序。
- 每个Hlog最小单元由`Hlogkey`和`WALEdit`两部分组成。`Hlogky`由sequenceid、timestamp、cluster ids、regionname以及tablename等组成，`WALEdit`是由一系列的KeyValue组成，对一行上所有列（即所有KeyValue）的更新操作，都包含在同一个WALEdit对象中，这主要是为了实现写入一行多个列时的原子性。

> 注意：sequenceid 是一个store级别的自增序列号，非常重要，region的数据恢复和Hlog过期清除都要依赖sequenceid。
> 
> **sequenceid的相关逻辑**
> 
> Memstore在达到一定的条件会触发刷盘的操作，刷盘的时候会获取刷新到最新的一个sequenceid的下一个sequenceid，并将新的sequenceid赋给oldestUnflushedSequenceId，并刷到Ffile中。有点绕，举个例子来说明：比如对于某一个store，开始的时候oldestUnflushedSequenceId为NULL，此时，如果触发flush的操作，假设初始刷盘到sequenceid为10，那么hbase会在10的基础上append一个空的Entry到HLog，最新的sequenceid为11，然后将sequenceid为11的号赋给oldestUnflushedSequenceId，并将oldestUnflushedSequenceId的值刷到Hfile文件中进行持久化。
> 
> Hlog文件对应所有Region的store中最大的sequenceid如果已经刷盘，就认为Hlog文件已经过期，就会移动到.oldlogs，等待被移除。
> 
> 当RegionServer出现故障的时候，需要对Hlog进行回放来恢复数据。回放的时候会读取Hfile的oldestUnflushedSequenceId中的sequenceid和Hlog中的sequenceid进行比较，小于sequenceid的就直接忽略，但与或者等于的就进行重做。回放完成后，就完成了数据的恢复工作。

**3 . Hlog的生命周期**

Hlog从产生到最后删除需要经历如下几个过程：

- 产生：所有涉及到数据的变更都会先写Hlog，除非是你关闭了Hlog
- 滚动：Hlog的大小通过参数`hbase.regionserver.logroll.period`控制，默认是1个小时，时间达到`hbase.regionserver.logroll.period` 设置的时间，Hbase会创建一个新的Hlog文件。这就实现了Hlog滚动的目的。Hbase通过`hbase.regionserver.maxlogs`控制Hlog的个数。滚动的目的，为了控制单个Hlog文件过大的情况，方便后续的过期和删除。
- 过期：Hlog的过期依赖于对sequenceid的判断。Hbase会将Hlog的sequenceid和Hfile最大的sequenceid（刷新到的最新位置）进行比较，如果该Hlog文件中的sequenceid比刷新的最新位置的sequenceid都要小，那么这个Hlog就过期了，过期了以后，对应Hlog会被移动到`.oldlogs`目录。
- 删除：如果Hbase开启了replication，当replication执行完一个Hlog的时候，会删除Zoopkeeper上的对应Hlog节点。在Hlog被移动到.oldlogs目录后，Hbase每隔`hbase.master.cleaner.interval`（默认60秒）时间会去检查`.oldlogs`目录下的所有Hlog，确认对应的Zookeeper的Hlog节点是否被删除，如果Zookeeper 上不存在对应的Hlog节点，那么就直接删除对应的Hlog。`hbase.master.logcleaner.ttl`（默认10分钟）这个参数设置Hlog在.oldlogs目录保留的最长时间。

> 备注：这里有个问题，为什么要将过期的Hlog移动到.oldlogs目录，而不是直接删除呢？是因为Hbase还有一个主从同步的功能，这个依赖Hlog来同步Hbase的变更，有一种情况不能删除Hlog，那就是Hlog虽然过期，但是对应的Hlog并没有同步完成，因此比较好的做好是移动到别的目录。再增加对应的检查和保留时间。

[slide]
# RegionServer的故障恢复

RegionServer的相关信息保存在ZK中，在RegionServer启动的时候，会在Zookeeper中创建对应的临时节点。RegionServer通过Socket和Zookeeper建立session会话，RegionServer会周期性地向Zookeeper发送ping消息包，以此说明自己还处于存活状态。而Zookeeper收到ping包后，则会更新对应session的超时时间。

当Zookeeper超过session超时时间还未收到RegionServer的ping包，则Zookeeper会认为该RegionServer出现故障，ZK会将该RegionServer对应的临时节点删除，并通知Master，Master收到RegionServer挂掉的信息后就会启动数据恢复的流程。

Master启动数据恢复流程后，其实主要的流程如下：

`RegionServer宕机` --> `ZK检测到RegionServer异常` --> `Master启动数据恢复` --> `Hlog切分` --> `Region重新分配` --> `Hlog重放` --> `恢复完成并提供服务`

故障恢复有3种模式

- LogSplitting模式
- Distributed Log Splitting模式
- Distributed Log Replay模式

[slide]
# LogSplitting模式

在最开始的恢复流程中，Hlog的整个切分过程都由于Master来执行，如下图所示：

<img src="img/cloud/cloud/hbase10.png" alt="">

- 将待切分的日志文件夹进行重命名，防止RegionServer未真的宕机而持续写入Hlog
- Master启动读取线程读取Hlog的数据，并将不同RegionServer的日志写入到不通的内存buffer中
- 针对每个buffer，Master会启动对应的写线程将不同Region的buffer数据写入到HDFS中，对应的路径为/hbase/table_name/region/recoverd.edits/.tmp。
- Master重新将宕机的RegionServer中的Rgion分配到正常的RegionServer中，对应的RegionServer读取Region的数据，会发现该region目录下的recoverd.edits目录以及相关的日志，然后RegionServer重放对应的Hlog日志，从而实现对应Region数据的恢复。

> 从上面的步骤中，可以看出Hlog的切分一直都是master在干活，效率比较低。设想，如果集群中有多台RegionServer在同一时间宕机，会是什么情况？串行修复，肯定异常慢，因为只有master一个人在干Hlog切分的活。因此，为了提高效率，开发了Distributed Log Splitting架构。

2、Distributed Log Splitting

Distributed Log Splitting是LogSplitting的分布式实现，分布式就不是master一个人在干活了，而是充分使用各个RegionServer上的资源，利用多个RegionServer来并行切分Hlog，提高切分的效率。如下图所示：

<img src="img/cloud/cloud/hbase11.png" alt="">

- Master将要切分的日志发布到Zookeeper节点上`/hbase/splitWAL`，每个Hlog日志一个任务，任务的初始状态为TASK_UNASSIGNED
- 在Master发布Hlog任务后，RegionServer会采用竞争方式认领对应的任务（先查看任务的状态，如果是TASK_UNASSIGNED，就将该任务状态修改为TASK_OWNED）
- RegionServer取得任务后会让对应的HLogSplitter线程处理Hlog的切分，切分的时候读取出Hlog的对，然后写入不通的Region buffer的内存中。
- RegionServer启动对应写线程，将Region buffer的数据写入到HDFS中，路径为`/hbase/table/region/seqenceid.temp`，seqenceid是一个日志中该Region对应的最大sequenceid，如果日志切分成功，而RegionServer会将对应的ZK节点的任务修改为TASK_DONE，如果切分失败，则会将任务修改为TASK_ERR。
- 如果任务是TASK_ERR状态，则Master会重新发布该任务，继续由RegionServer竞争任务，并做切分处理。
- Master重新将宕机的RegionServer中的Rgion分配到正常的RegionServer中，对应的RegionServer读取Region的数据，将该region目录下的一系列的`seqenceid.temp`进行从小到大进行重放，从而实现对应Region数据的恢复。

> 从上面的步骤中，我们可以看出Distributed Log Splitting采用分布式的方式，使用多台RegionServer做Hlog的切分工作，确实能提高效率。正常故障恢复可以降低到分钟级别。但是这种方式有个弊端是会产生很多小文件（切分的Hlog数 * 宕机的RegionServer上的Region数）。比如一个RegionServer有20个Region，有50个Hlog，那么产生的小文件数量为20*50=1000个。如果集群中有多台RegionServer宕机的情况，小文件更是会成倍增加，恢复的过程还是会比较慢。由次诞生了Distributed Log Replay模式。

[slide]
# Distributed Log Replay模式

Distributed Log Replay和Distributed Log Splitting的不同是先将宕机RegionServer上的Region分配给正常的RgionServer，并将该Region标记为recovering。再使用Distributed Log Splitting类似的方式进行Hlog切分，不同的是，RegionServer将Hlog切分到对应Region buffer后，并不写HDFS，而是直接进行重放。这样可以减少将大量的文件写入HDFS中，大大减少了HDFS的IO消耗。如下图所示：

<img src="img/cloud/cloud/hbase11.png" alt="">

[slide]
# Region的拆分

[slide]
# Hbase Region的拆分策略

Hbase Region的拆分策略有比较多，比如除了3种默认过的策略，还有DelimitedKeyPrefixRegionSplitPolicy、KeyPrefixRegionSplitPolicy、DisableSplitPolicy等策略，这里只介绍3种默认的策略。分别是ConstantSizeRegionSplitPolicy策略、IncreasingToUpperBoundRegionSplitPolicy策略和SteppingSplitPolicy策略。

**1 . ConstantSizeRegionSplitPolicy**

ConstantSizeRegionSplitPolicy策略是0.94版本之前的默认拆分策略，这个策略的拆分规则是：当region大小达到`hbase.hregion.max.filesize`（默认10G）后拆分。

这种拆分策略对于小表不太友好，按照默认的设置，如果1个表的Hfile小于10G就一直不会拆分。注意10G是压缩后的大小，如果使用了压缩的话。

如果1个表一直不拆分，访问量小也不会有问题，但是如果这个表访问量比较大的话，就比较容易出现性能问题。这个时候只能手工进行拆分。还是很不方便。

**2. IncreasingToUpperBoundRegionSplitPolicy**

IncreasingToUpperBoundRegionSplitPolicy策略是Hbase的0.94~2.0版本默认的拆分策略，这个策略相较于ConstantSizeRegionSplitPolicy策略做了一些优化，该策略的算法为：min(r^2*flushSize，maxFileSize )，最大为maxFileSize 。

> 从这个算是我们可以得出flushsize为128M、maxFileSize为10G的情况下，可以计算出Region的分裂情况如下：
>
- 第一次拆分大小为：min(10G，1*1*128M)=128M
- 第二次拆分大小为：min(10G，3*3*128M)=1152M
- 第三次拆分大小为：min(10G，5*5*128M)=3200M
- 第四次拆分大小为：min(10G，7*7*128M)=6272M
- 第五次拆分大小为：min(10G，9*9*128M)=10G

>从上面的计算我们可以看到这种策略能够自适应大表和小表，但是这种策略会导致小表产生比较多的小region，对于小表还是不是很完美。

**3. SteppingSplitPolicy**

SteppingSplitPolicy是在Hbase 2.0版本后的默认策略，，拆分规则为：`If region=1 then: flush size * 2 else: MaxRegionFileSize`。

> 还是以flushsize为128M、maxFileSize为10场景为列，计算出Region的分裂情况如下：
>
- 第一次拆分大小为：2*128M=256M
- 第二次拆分大小为：10G

>从上面的计算我们可以看出，这种策略兼顾了ConstantSizeRegionSplitPolicy策略和IncreasingToUpperBoundRegionSplitPolicy策略，对于小表也肯呢个比较好的适配。

[slide]
#Hbase Region拆分流程

Hbase的详细拆分流程图如下：

<img src="img/cloud/cloud/hbase13.png" alt="">

- 第1步 在ZK的`/hbase/region-in-transition/region-name`下创建一个znode，并设置状态为SPLITTING
- 第2步 master通过watch节点检测到Region状态的变化，并修改内存中Region状态的变化
- 第3步 RegionServer在父Region的目录下创建一个名称为.splits的子目录
- 第4步 RegionServer关闭父Region，强制将数据刷新到磁盘，并这个Region标记为offline的状态。此时，落到这个Region的请求都会返回NotServingRegionException这个错误
- 第5步 RegionServer在.splits创建daughterA和daughterB，并在文件夹中创建对应的reference文件，指向父Region的Region文件
- 第6步 RegionServer在HDFS中创建daughterA和daughterB的Region目录，并将reference文件移动到对应的Region目录中
- 第7步 在.META.表中设置父Region为offline状态，不再提供服务，并将父Region的daughterA和daughterB的Region添加到.META.表中，已表名父Region被拆分成了daughterA和daughterB两个Region
- 第8步 RegionServer并行开启两个子Region，并正式提供对外写服务
- 第9步 RegionSever将daughterA和daughterB添加到.META.表中，这样就可以从.META.找到子Region，并可以对子Region进行访问了
- 第10步 RegionServr修改/hbase/region-in-transition/region-name的znode的状态为SPLIT

> 备注：为了减少对业务的影响，Region的拆分并不涉及到数据迁移的操作，而只是创建了对父Region的指向。只有在做大合并的时候，才会将数据进行迁移。

那么通过reference文件如何才能查找到对应的数据呢？根据文件名来判断是否是reference文件，如下图所示：

<img src="img/cloud/cloud/hbase14.png" alt="">

- 由于reference文件的命名规则为前半部分为父Region对应的File的文件名，后半部分是父Region的名称，因此读取的时候也根据前半部分和后半部分来识别
- 根据reference文件的内容来确定扫描的范围，reference的内容包含两部分，一部分是切分点splitkey，另一部分是boolean类型的变量（true或者false）。如果为true则扫描文件的上半部分，false则扫描文件的下半部分
- 接下来确定了扫描的文件，以及文件的扫描范围，那就按照正常的文件检索了

[slide]
# Region的合并

Region的合并分为小合并和大合并，下面就分别来做介绍：

[slide]
# 小合并（MinorCompaction）

由前面的刷盘部分的介绍，我们知道当MemStore达到hbase.hregion.memstore.flush.size大小的时候会将数据刷到磁盘，生产StoreFile，因此势必产生很多的小问题，对于Hbase的读取，如果要扫描大量的小文件，会导致性能很差，因此需要将这些小文件合并成大一点的文件。因此所谓的小合并，就是把多个小的StoreFile组合在一起，形成一个较大的StoreFile，通常是累积到3个Store File后执行。通过参数`hbase.hstore,compactionThreadhold`配置。小合并的大致步骤为：

- 分别读取出待合并的StoreFile文件的KeyValues，并顺序地写入到位于./tmp目录下的临时文件中
- 将临时文件移动到对应的Region目录中
- 将合并的输入文件路径和输出路径封装成KeyValues写入WAL日志，并打上compaction标记，最后强制自行sync
- 将对应region数据目录下的合并的输入文件全部删除，合并完成

> 这种小合并一般速度很快，对业务的影响也比较小。本质上，小合并就是使用短时间的IO消耗以及带宽消耗换取后续查询的低延迟。

[slide]
# 大合并（MajorCompaction）

所谓的大合并，就是将一个Region下的所有StoreFile合并成一个StoreFile文件，在大合并的过程中，之前删除的行和过期的版本都会被删除，拆分的母Region的数据也会迁移到拆分后的子Region上。大合并一般一周做一次，控制参数为`hbase.hregion.majorcompaction`。大合并的影响一般比较大，尽量避免统一时间多个Region进行合并，因此Hbase通过一些参数来进行控制，用于防止多个Region同时进行大合并。该参数为：`hbase.hregion.majorcompaction.jitter`

具体算法为：

- hbase.hregion.majorcompaction参数的值乘于一个随机分数，这个随机分数不能超过hbase.hregion.majorcompaction.jitter的值。hbase.hregion.majorcompaction.jitter的值默认为0.5。
- 通过hbase.hregion.majorcompaction参数的值加上或减去hbase.hregion.majorcompaction参数的值乘于一个随机分数的值就确定下一次大合并的时间区间。

> 用户如果想禁用major compaction，只需要将参数`hbase.hregion.majorcompaction`设为0。建议禁用。

