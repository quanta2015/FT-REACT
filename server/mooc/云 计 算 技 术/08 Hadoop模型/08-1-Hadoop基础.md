title: HADOOP
theme: light

[slide]
# 大数据处理构建HADOOP


[slide]
# HADOOP简介
Apache Hadoop是一款支持数据密集型分布式应用程序并以Apache 2.0许可协议发布的开源软件框架。它支持在商品硬件构建的大型集群上运行的应用程序。Hadoop是根据谷歌公司发表的MapReduce和Google文件系统的论文自行实现而成。所有的Hadoop模块都有一个基本假设，即硬件故障是常见情况，应该由框架自动处理。

Hadoop框架透明地为应用提供可靠性和数据移动。它实现了名为MapReduce的编程范式：应用程序被分区成许多小部分，而每个部分都能在集群中的任意节点上运行或重新运行。此外，Hadoop还提供了分布式文件系统，用以存储所有计算节点的数据，这为整个集群带来了非常高的带宽。MapReduce和分布式文件系统的设计，使得整个框架能够自动处理节点故障。它使应用程序与成千上万的独立计算的电脑和PB级的数据。

Hadoop包括：
- Hadoop内核
- MapReduce
- HDFS分布式文件系统
- Apache Hive
- Apache HBase

[slide]
# Hadoop特性
hadoop是一个能够对大量数据进行分布式处理的软件框架，是一种可靠、高效、可伸缩的方式进行处理的，具有下面特性：

- 高可靠些：采用冗余数据存储方式
- 高效性：采用分布式存储和分布式处理技术，可以高效处理PB数据；
- 高可扩展性：可以高效稳定的运行在廉价的计算机集群上，可以扩展数千计算机节点；
- 高容错性：采用冗余数据存储方式，自动保存数据的多个副本，并且能够自动将失败的任务重新分配；
- 成本低：采用廉价的计算机集群，成本低；
- 运行在Linux平台
- 支持多种编程语言

[slide]
# hadoop应用现状
- 2007年雅虎的M45
- Fackbook社交网站
- 百度淘宝网易华为

[slide]
# hadoop项目结构
Hadoop除了核心的HDPF和MapReduce外，还包括Common、Avro、Zookeeper、HBase、Hive、Chukwa、Pig等子项目，它们提供了互补性服务或在核心层提供了更高层的服务。

**1 . Common**

Common为Hadoop其他子项目提供支持的常用工具，主要包括文件系统、RPC和串行化库，提供基本服务以及API。

**2 . Avro**

Avro是一个用于数据序列化的系统，提供了丰富的数据结构类型、快速可压缩的二进制数据格式、存储持久性数据的文件集、远程调用的功能和简单的动态语言集成功能、Avro可以将数据结构或对象转化成便于存储和传输的格式，节约数据存储空间和网络传输带宽，Hadoop的其他子项目的客户端与服务端之间的数据传输都采用了AVro。

**3 . HDFS**

Hadoop分布式文件系统是Hadoop项目的两大核心之一，它是针对谷歌文件系统的开源实现。HDFS具有处理超大数据、流式处理、可以运行在廉价商用服务器上等优点。考虑运行与廉价服务器集群，在设计上把硬件故障作为一种常态考虑，保证在部分硬件发生故障的情况下，仍然能够保证文件系统的整体可用性和可靠性。HDFS放宽了POSIX约束，从而实现以流的形式访问文件系统中的数据。HDFS在访问应用程序数据时，可以具有很高的吞吐率。因此，对于超大数据集的应用程序而言，选择HDFS作为底层数据存储是较好的选择。

**4 . HBase**

HBase是一个提供高可靠些、高性能、可伸缩、实时读写、分布式的列式数据库，一般采用HDFS作为其底层数据存储。HBase是针对谷歌的BigTable的开源实现，两者都采用了相同的数据模型，具有强大的非结构化数据存储能力。HBase与传统关系数据库的一个重要区别是，前者采用基于列的存储，而后者采用基于行的存储。HBase具有良好的横向扩展能力，可以通过不断增加廉价的商用服务器来增加存储能力。

**5 . MapReduce**

MapReduce是一种编程模型，用于大规模数据集的并行运算，将复杂运行于大规模集群上的并行计算过程高度的抽象到两个函数Map和Reduce，并且允许用户在不了解分布式系统底层细节的情况下开发并行应用程序，并将其运行于廉价计算机集群上，完成海量数据的处理。其核心思想就是分而治之，把输入的数据集切分为若干独立的数据块，分发给一个主节点管理下的各个分节点来共同并行完成；最后通过整个各个节点的中间结果，得到最终结果。

**6 . Zookeeper**

Zookeeper是搞笑和可靠的协同工作系统，提供分布式锁之类的基本服务，用于构建分布式应用，减轻分布式应用程序所承担的协调任务。Zookeeper使用Java编程，使用了一个和文件树结构相似的数据模型，也可以通过Stream来使用其他语言编程接入。


**7 . Hive**

Hive是一个基于Hadoop的数据仓库工具，可以用于对Hadoop文件中的数据集进行数据整理、特殊查询和分析存储。Hive提供了类似于关系数据库SQL语言的查询语句HiveQL，可以快速实现简单的MapReduce统计，Hive可以将HiveQL语句转换为MapReduce任务进行运行，而不必开发专门的MapReduce应用，因而适合数据仓库的统计分析。

**8 . Pig**

Pig是一种数据流语言和运行环境，适合于使用hadoop和MapReduce平台来查询大型半结构化数据集。Pig创建了更简单的过程语言抽象，为Hadoop应用程序提供了SQL接口。

**9 . Sqoop**

Sqoop 用于在Hadoop和关系数据库之间的交互数据。通过Sqoop可以从Mysql、oracle、opstgreSql等关系数据库中导入数据。Sqoop主要通过JDBC和关系数据库进行交互。Sqoop是专门为大数据集设计的，支持增量更新，可以将新纪录添加到最近一次导出的数据源上，或者指定上次修改的时间戳。

**10 . Chukwa**

Chukwa是一个开源的、用于监控大兴分布式系统的数据收集系统，可以将各种类型的数据收集成适合Hadoop处理的文件，并保存在HDFS中供Hadoop进行各种MapReduce操作。


[slide]
# HDFS优缺点
[slide]
## 优点
- 高容错性：可以由数百或数千个服务器机器组成，每个服务器机器存储文件系统数据的一部分；数据自动保存多个副本；副本丢失后检测故障快速，自动恢复。
- 适合批处理：移动计算而非数据；数据位置暴露给计算框架；数据访问的高吞吐量；运行的应用程序对其数据集进行流式访问。
- 适合大数据处理：典型文件大小为千兆字节到太字节；支持单个实例中的数千万个文件；10K+节点。
- 可构建在廉价的机器上：通过多副本提高可靠性；提供了容错与恢复机制。
- 跨异构硬件和软件平台的可移植性强：轻松地从一个平台移植到另一个平台。
- 简单一致性模型：应用程序需要一次写入多次读取文件的访问模型；除了追加和截断之外，不需要更改已创建，写入和关闭的文件；简化了数据一致性问题，并实现了高吞吐量数据访问；高度可配置，具有非常适合于许多安装的默认配置。大多数时候，只需要为非常大的集群调整配置。

[slide]
## 缺点
- 不适合低延迟的数据访问：HDFS设计更多的是批处理，而不是用户交互使用。重点在于数据访问的高吞吐量，而不是数据访问的低延迟。
- 不适合小文件存取：占用NameNode大量内存；寻道时间超过读取时间。
- 无法并发写入、文件随即修改：一个文件只能有一个写者；仅支持追加和截断。

[slide]
# Namenode
**接受客户端的读写服务**

执行文件系统命名空间操作，如打开，关闭和重命名文件和目录。

**管理文件系统命名空间**

记录对文件系统命名空间或其属性的任何更改。

**metadata组成**

`Metadata` 是存储在 `Namenode` 上的元数据信息，它存储到磁盘的文件名为： `fsimage` 。并且有个叫 `edits` 的文件记录对 `metadata` 的操作日志。总体来说，`fsimage` 与 `edits` 文件记录了 `Metadata` 中的权限信息和文件系统目录树、文件包含哪些块、确定块到 `DataNode` 的映射、 Block 存放在哪些 `DataNode` 上。

`NameNode` 将这些信息加载到内存并进行拼装，就成为了一个完整的元数据信息。


**文件系统命名空间**

HDFS支持传统的分层文件组织。用户或应用程序可以在这些目录中创建目录和存储文件。文件系统命名空间层次结构与大多数其他现有文件系统类似：可以创建和删除文件，将文件从一个目录移动到另一个目录，或重命名文件。HDFS支持用户配额和访问权限。但不支持硬链接或软链接。

NameNode维护文件系统命名空间。对文件系统命名空间或其属性的任何更改由NameNode记录。应用程序可以指定应由HDFS维护的文件的副本数。文件的副本数称为该文件的复制因子。此信息由NameNode存储。

**文件系统元数据的持久性**

NameNode的metadata信息在启动后会加载到内存，由于加载到内存的数据很不安全，断电后就没有了，因此必须对内存中存放的信息做持久化处理。

Namenode上保存着HDFS的命名空间。对于任何对文件系统元数据产生修改的操作，Namenode都会使用一种称为Edits的事务日志记录下来。例如，在HDFS中创建一个文件，Namenode就会在Edits中插入一条记录来表示；同样地，修改文件的副本系数也将往Edits插入一条记录。Namenode在本地操作系统的文件系统中存储这个Edits。整个文件系统的命名空间，包括数据块到文件的映射、文件的属性等，都存储在一个称为FsImage的文件中，这个文件也是放在Namenode所在的本地文件系统上。

Namenode在内存中保存着整个文件系统的命名空间和文件数据块映射(Blockmap)的映像。这个关键的元数据结构设计得很紧凑，因而一个有4G内存的Namenode足够支撑大量的文件和目录。当Namenode启动时，它从硬盘中读取Edits和FsImage，将所有Edits中的事务作用在内存中的FsImage上，并将这个新版本的FsImage从内存中保存到本地磁盘上，然后删除旧的Edits，因为这个旧的Edits的事务都已经作用在FsImage上了。这个过程称为一个检查点(checkpoint)。

Datanode将HDFS数据以文件的形式存储在本地的文件系统中，它并不知道有关HDFS文件的信息。它把每个HDFS数据块存储在本地文件系统的一个单独的文件中。Datanode并不在同一个目录创建所有的文件，实际上，它用试探的方法来确定每个目录的最佳文件数目，并且在适当的时候创建子目录。在同一个目录中创建所有的本地文件并不是最优的选择，这是因为本地文件系统可能无法高效地在单个目录中支持大量的文件。当一个Datanode启动时，它会扫描本地文件系统，产生一个这些本地文件对应的所有HDFS数据块的列表，然后作为报告发送到Namenode，这个报告就是块状态报告。

[slide]
# SecondaryNameNode
它不是NameNode的备份，但可以作为NameNode的备份，当因为断电或服务器损坏的情况，可以用SecondNameNode中已合并的fsimage文件作为备份文件恢复到NameNode上，但是很有可能丢失掉在合并过程中新生成的edits信息。因此不是完全的备份。

由于NameNode仅在启动期间合并fsimage和edits文件，因此在繁忙的群集上，edits日志文件可能会随时间变得非常大。较大编辑文件的另一个副作用是下一次重新启动NameNode需要更长时间。SecondNameNode的主要功能是帮助NameNode合并edits和fsimage文件，从而减少NameNode启动时间。

[slide]
## 1. SNN执行合并时机
根据配置文件配置的时间间隔`fs.checkpoint.period`默认1小时；`dfs.namenode.checkpoint.txns`，默认设置为1百万，也就是Edits中的事务条数达到1百万就会触发一次合并，即使未达到检查点期间。

[slide]
## 2. SNN合并流程
<img src="img/cloud/hadoop01.png">

- 首先生成一个名叫edits.new的文件用于记录合并过程中产生的日志信息；
- 当触发到某一时机时（时间间隔达到1小时或Edits中的事务条数达到1百万）时SecondaryNamenode将edits文件、与fsimage文件从NameNode上读取到SecondNamenode上；
- 将edits文件与fsimage进行合并操作，合并成一个fsimage.ckpt文件；
- 将生成的合并后的文件fsimage.ckpt文件转换到NameNode上；
- 将fsimage.ckpt在NameNode上变成fsimage文件替换NameNode上原有的fsimage文件，并将edits.new文件上变成edits文件替换NameNode上原有的edits文件。

[slide]
# 2.3 DataNode

管理附加到它们运行的节点的存储，并允许用户数据存储在文件中；

在内部，文件被分割成一个或多个块（Block），并且这些块被存储在一组DataNode中；

负责提供来自文件系统客户端的读取和写入请求；

执行块创建，删除；

启动DN进程的时候会向NN汇报Block信息；

通过向NN发送心跳保持与其联系（3秒一次），如果NN10分钟没有收到DN的心跳，则认为DN已经丢失，并且复制其上的Block到其他的DN上。

[slide]
## HDFS存储单元（block）
- 文件被切分成固定大小的数据块：默认数据块大小为64MB（hadoop1.x）、128MB（hadoop2.x）、256MB(hadoop3.x)，可配置；
- 一个文件存储方式：按大小被切分成不同的block，存储到不同的节点上；默认情况下，每个block都有3个副本；block大小与副本数通过client端上传文件时设置，文件上传成功后副本数可以变更，block size不可变更。
- 设计思想：将大文件拆分成256MB的block块，每个block块分别随机存放在不同的节点上，从而避免了数据倾斜的问题，但是在开发过程中，如果算法、程序写的不好，同样也会出现数据倾斜的问题。

[slide]
## 数据复制
HDFS被设计成能够在一个大集群中跨机器可靠地存储超大文件。它将每个文件存储成一系列的数据块，除了最后一个，所有的数据块都是同样大小的。为了容错，文件的所有数据块都会有副本。每个文件的数据块大小和副本系数都是可配置的。应用程序可以指定某个文件的副本数目。副本系数可以在文件创建的时候指定，也可以在之后改变。HDFS中的文件都是一次性写入的，并且严格要求在任何时候只能有一个写入者。

<img src="img/cloud/hadoop02.png">

Namenode全权管理数据块的复制，它周期性地从集群中的每个Datanode接收心跳信号和块状态报告(Blockreport)。接收到心跳信号意味着该Datanode节点工作正常。块状态报告包含了一个该Datanode上所有数据块的列表。

[slide]
## Block的副本放置策略
副本的存放是HDFS可靠性和性能的关键。优化的副本存放策略是HDFS区分于其他大部分分布式文件系统的重要特性。这种特性需要做大量的调优，并需要经验的积累。HDFS采用一种称为机架感知(rack-aware)的策略来改进数据的可靠性、可用性和网络带宽的利用率。目前实现的副本存放策略只是在这个方向上的第一步。实现这个策略的短期目标是验证它在生产环境下的有效性，观察它的行为，为实现更先进的策略打下测试和研究的基础。

大型HDFS实例一般运行在跨越多个机架的计算机组成的集群上，不同机架上的两台机器之间的通讯需要经过交换机。在大多数情况下，同一个机架内的两台机器间的带宽会比不同机架的两台机器间的带宽大。

通过一个机架感知的过程，Namenode可以确定每个Datanode所属的机架id。一个简单但没有优化的策略就是将副本存放在不同的机架上。这样可以有效防止当整个机架失效时数据的丢失，并且允许读数据的时候充分利用多个机架的带宽。这种策略设置可以将副本均匀分布在集群中，有利于当组件失效情况下的负载均衡。但是，因为这种策略的一个写操作需要传输数据块到多个机架，这增加了写的代价。

在大多数情况下，副本系数是3，HDFS的存放策略是将一个副本存放在本地机架的节点上，一个副本放在同一机架的另一个节点上，最后一个副本放在不同机架的节点上。这种策略减少了机架间的数据传输，这就提高了写操作的效率。机架的错误远远比节点的错误少，所以这个策略不会影响到数据的可靠性和可用性。于此同时，因为数据块只放在两个（不是三个）不同的机架上，所以此策略减少了读取数据时需要的网络传输总带宽。在这种策略下，副本并不是均匀分布在不同的机架上。三分之一的副本在一个节点上，三分之二的副本在一个机架上，其他副本均匀分布在剩下的机架中，这一策略在不损害数据可靠性和读取性能的情况下改进了写的性能。

[slide]
## 副本选择
为了降低整体的带宽消耗和读取延时，HDFS会尽量让读取程序读取离它最近的副本。如果在读取程序的同一个机架上有一个副本，那么就读取该副本。如果一个HDFS集群跨越多个数据中心，那么客户端也将首先读本地数据中心的副本。

[slide]
## 安全模式
NameNode在启动的时候会进入一个称为安全模式的特殊状态，它首先将映像文件（fsimage）载入内存，并执行编辑日志（edits）中的各项操作；

一旦在内存中成功建立文件系统元数据映射，则创建一个新的fsimage文件（这个操作不需要SecondNameNode来做）与一个空的编辑日志；

此刻namenode运行在安全模式，即namenode的文件系统对于客户端来说是只读的，显示目录、显示文件内容等，写、删除、重命名都会失败；

在此阶段namenode搜集各个datanode的报告，当数据块达到最小副本数以上时，会被认为是“安全”的，在一定比例的数据块被认为是安全的以后（可设置），再过若干时间，安全模式结束；

当检测到副本数不足数据块时，该块会被复制，直到达到最小副本数，系统中数据块的位置并不是由namenode维护的，而是以块列表形式存储在datanode中。

[slide]
# 数据组织

[slide]
## 数据块
HDFS被设计成支持大文件，适用HDFS的是那些需要处理大规模的数据集的应用。这些应用都是只写入数据一次，但却读取一次或多次，并且读取速度应能满足流式读取的需要。HDFS支持文件的“一次写入多次读取”语义。一个典型的数据块大小是256MB。因而，HDFS中的文件总是按照256M被切分成不同的块，每个块尽可能地存储于不同的Datanode中。

[slide]
## 分段
客户端创建文件的请求其实并没有立即发送给Namenode，事实上，在刚开始阶段HDFS客户端会先将文件数据缓存到本地的一个临时文件。应用程序的写操作被透明地重定向到这个临时文件。当这个临时文件累积的数据量超过一个数据块的大小，客户端才会联系Namenode。Namenode将文件名插入文件系统的层次结构中，并且分配一个数据块给它。然后返回Datanode的标识符和目标数据块给客户端。接着客户端将这块数据从本地临时文件上传到指定的Datanode上。当文件关闭时，在临时文件中剩余的没有上传的数据也会传输到指定的Datanode上。然后客户端告诉Namenode文件已经关闭。此时Namenode才将文件创建操作提交到日志里进行存储。如果Namenode在文件关闭前宕机了，则该文件将丢失。

[slide]
## 管道复制

当客户端向HDFS文件写入数据的时候，一开始是写到本地临时文件中。假设该文件的副本系数设置为3，当本地临时文件累积到一个数据块的大小时，客户端会从Namenode获取一个Datanode列表用于存放副本。然后客户端开始向第一个Datanode传输数据，第一个Datanode一小部分一小部分(4 KB)地接收数据，将每一部分写入本地仓库，并同时传输该部分到列表中第二个Datanode节点。第二个Datanode也是这样，一小部分一小部分地接收数据，写入本地仓库，并同时传给第三个Datanode。最后，第三个Datanode接收数据并存储在本地。因此，Datanode能流水线式地从前一个节点接收数据，并在同时转发给下一个节点，数据以流水线的方式从前一个Datanode复制到下一个。



[slide]
# 读写流程

[slide]
## HDFS读流程
1. 首先HDFS客户端通过DistributedFileSystem对NameNode发起请求，同时将用户信息及文件名的信息等发送给NameNode，并返回给DistributedFileSystem该文件包含的block所在的DataNode位置；
2. 然后HDFS客户端通过FSDataInputStream按顺序去读取DataNode中的block信息（它会选择负载最低的或离客户端最近的一台DataNode去读block）；
3. FSDataInputStream按顺序一个一个的读，直到所有的block都读取完毕；
4. 当读取完毕后会将FSDataInputStream关闭。

<img src="img/cloud/hadoop03.png">

[slide]
## HDFS写流程
1. 首先HDFS的客户端通过Distributed FileSystem发送请求给NameNode，包括文件保存的位置、文件名、操作的用户名等信息；
2. NameNode会给客户端返回了一个FSDataOutputStream，同时也会返回文件要写入哪些DataNode上；
3. 通过FSDataOutputStream进行写操作，在写之前就做文件的拆分，将文件拆分成多个Block，第一个写操作写在负载比较低的DataNode上，并将这个block复制到其他的DataNode上；
4. 当所有的block副本复制完成后会反馈给FSDataOutputStream；
5. 当所有的block副本全都复制完成，就可以将FSDataOutputStream流关闭；
6. 通过Distributed FileSystem更新NameNode中的源数据信息。

<img src="img/cloud/hadoop04.png">


[slide]
# 架构

[slide]
## NameNode和DataNode
HDFS采用master/worker架构。

- HDFS集群：一个HDFS集群是由一个Namenode和一定数目的Datanodes组成。Namenode是中心服务器，负责文件系统的命名空间以及客户端对文件的访问。Datanode是一个节点一个，负责管理所在节点上的存储。HDFS文件其实被分成一个或多个数据块，这些块存储在一组Datanode上。
- Namenode：执行文件系统的命名空间操作（如打开、关闭、重命名文件或目录），以及数据块到具体Datanode节点的映射。
- Datanode：处理文件系统客户端的读写请求，进行数据块的创建、删除和复制。
 
<img src="img/cloud/hadoop05.png" alt="">

> 集群中单一Namenode的结构大大简化了系统的架构。Namenode是所有HDFS元数据的管理者，用户数据永远不会流过Namenode。

[slide]
## 通信协议
HDFS通讯协议建立在TCP/IP协议之上，客户端通过一个可配置的TCP端口连接到Namenode，通过ClientProtocol协议与Namenode交互；而Datanode使用DatanodeProtocol协议与Namenode交互；

[slide]
## 基础架构
HDFS被设计成适合运行在通用硬件上的分布式文件系统，它和现有的分布式文件系统有很多共同点。但同时，它和其他的分布式文件系统的区别也是很明显的。HDFS是一个高度容错性的系统，适合部署在廉价的机器上。HDFS能提供高吞吐量的数据访问，非常适合大规模数据集上的应用。

<img src="img/cloud/hadoop06.png" alt="">

- 客户端的请求全部落到了NameNode上；
- 元数据信息存在NameNode；
- 集群中有且只有一个处于Active状态的NameNode；
- SecondaryNameNode不是NameNode的备份节点或从节点
- NameNode与DataNode之间有心跳机制，从NameNode可以知道DataNode的运行情况与负载情况。

[slide]
## 健壮性
HDFS的主要目标就是即使在出错的情况下也要保证数据存储的可靠性。常见的三种出错情况是：Namenode出错, Datanode出错和网络分区。

[slide]
## 磁盘数据错误，心跳检测和重新复制
每个Datanode节点周期性地向Namenode发送心跳信号。网络原因有可能导致一部分Datanode跟Namenode失去联系。Namenode通过心跳信号的缺失来检测这一情况，并将这些近期不再发送心跳信号的Datanode标记为宕机，不会再将新的IO请求发给它们。任何存储在宕机Datanode上的数据将不再有效。Datanode的宕机可能会引起一些数据块的副本系数低于指定值，Namenode不断地检测这些需要复制的数据块，一旦发现就启动复制操作。在下列情况下，可能需要重新复制：某个Datanode节点失效、某个副本遭到损坏、Datanode上的硬盘错误或者文件的副本系数增大。

[slide]
## 浏览器界面

典型的HDFS安装配置Web服务器以通过可配置的TCP端口公开HDFS命名空间。这允许用户使用web浏览器导航HDFS命名空间并查看其文件的内容。

NameNode和DataNode每个都运行内部Web服务器，以显示有关集群当前状态的基本信息。如果使用默认配置，NameNode 首页位于http://namenode-name:9870。它列出集群中的DataNode和集群的基本统计信息。

[slide]
# HDFS高可用性（QJM）
在Hadoop 2.0.0之前，每个集群都有一个NameNode，如果该机器或进程不可用，则作为整体的集群将不可用，直到NameNode被重新启动或在单独的机器上启动。

HDFS集群的不可用性：

- 在计划外事件的情况下，如计算机崩溃
- 计划的维护事件，如NameNode计算机上的软件或硬件升级

HDFS高可用性是通过在具有热备份的主/从配置中提供在同一集群中运行两个冗余NameNode的选项来解决上述问题。这允许在机器崩溃的情况下快速故障切换到新的NameNode，或者出于计划维护的目的，由管理员主动发起故障切换。

[slide]
## 原理
Clouera提出了QJM/Qurom Journal Manager，这是一个基于Paxos算法实现的HDFS HA方案。

<img src="img/cloud/hadoop07.png">

- 在典型的HA群集中，将两个或多个单独的计算机配置为NameNode。在任何时间点，只有一个NameNode处于活动状态，而其他的处于待机状态。活动NameNode负责集群中的所有客户端操作，而Standby只维护足够的状态以在必要时提供快速故障转移。
- 为了使备用节点保持其与活动节点同步的状态，两个节点都与一组称为 `日志节点`（JN）的独立守护进程通信。当活动节点执行任何命名空间修改时，它持久地将修改的记录记录到这些JN中的大多数。备用节点能够从JN读取编辑。
- 基本原理就是用2N+1台 JN 存储Edits，每次写数据操作有大多数（>=N+1）返回成功时即认为该次写成功。当然这个算法所能容忍的是最多有N台机器挂掉，如果多于N台挂掉，这个算法就失效了。
- 在HA架构里面SecondaryNameNode这个角色已经不存在了，为了保持`standby NN`与主`Active NN`的元数据保持一致，他们之间交互通过一系列守护的轻量级进程JN
- 所有修改操作在 `Active NN`上执行时，JN进程同时也会记录修改log到至少半数以上的JN中，这时` Standby NN `监测到JN 里面的同步log发生变化了会读取 JN 里面的修改log，然后同步到自己的的目录镜像树里面，如下图：
- 当发生故障时，`Active NN `挂掉后，`Standby NN` 会在它成为`Active NN` 前，读取所有的JN里面的修改日志，这样就能高可靠的保证与挂掉的NN的目录镜像树一致，然后无缝的接替它的职责，维护来自客户端请求，从而达到一个高可用的目的。

<img src="img/cloud/hadoop08.png">


[slide]
## 只有一个NN能命令DN
- 每个NN改变状态的时候，向DN发送自己的状态和一个序列号；
- DN在运行过程中维护此序列号，当failover时，新的NN在返回DN心跳时会返回自己的active状态和一个更大的序列号。DN接收到这个返回则认为该NN为新的active；
- 如果这时原来的`active NN`恢复，返回给DN的心跳信息包含active状态和原来的序列号，这时DN就会拒绝这个NN的命令。

[slide]
## 只有一个NN响应客户端
- 访问`standby NN`的客户端直接失败。在RPC层封装了一层，通过FailoverProxyProvider以重试的方式连接NN。通过若干次连接一个NN失败后尝试连接新的NN，对客户端的影响是重试的时候增加一定的延迟。客户端可以设置重试次数和时间。
- Hadoop提供了ZKFailoverController角色，部署在每个NameNode的节点上，作为一个deamon进程, 简称zkfc，示例图如下：

<img src="img/cloud/hadoop10.png" alt="">

[slide]
## FailoverController组成

- HealthMonitor：监控NameNode是否处于unavailable或unhealthy状态。当前通过RPC调用NN相应的方法完成；
- ActiveStandbyElector：管理和监控自己在ZK中的状态；
- ZKFailoverController：它订阅HealthMonitor 和ActiveStandbyElector 的事件，并管理NameNode的状态。

[slide]
## ZKFailoverController职责

- 健康监测：周期性的向它监控的NN发送健康探测命令，从而来确定某个NameNode是否处于健康状态，如果机器宕机，心跳失败，那么zkfc就会标记它处于一个不健康的状态；
- 会话管理：如果NN是健康的，zkfc就会在zookeeper中保持一个打开的会话，如果NameNode同时还是Active状态的，那么zkfc还会在Zookeeper中占有一个类型为短暂类型的znode，当这个NN挂掉时，这个znode将会被删除，然后备用的NN，将会得到这把锁，升级为主NN，同时标记状态为Active；当宕机的NN新启动时，它会再次注册zookeper，发现已经有znode锁了，便会自动变为Standby状态，如此往复循环，保证高可靠，目前可以支持两个以上NN；
- master选举：如上所述，通过在zookeeper中维持一个短暂类型的znode，来实现抢占式的锁机制，从而判断哪个NameNode为Active状态。

> 注意，在HA群集中，Standby NameNode还执行命名空间状态的检查点，因此不需要在HA群集中运行Secondary NameNode，CheckpointNode或BackupNode。

4.4 NFS模式
NFS的方式的HA的配置与启动，和QJM方式基本上是一样，唯一不同的地方就是`active namenode`和`standby namenode`共享edits文件的方式。QJM方式是采用JN来共享edits文件，而NFS方式则是采用NFS远程共享目录来共享edits文件。

NFS允许用户像访问本地文件系统一样访问远程文件系统，而将NFS引入HDFS后，用户可像读写本地文件一样读写HDFS上的文件，大大简化了HDFS使用，这是通过引入一个NFS gateway服务实现的，该服务能将NFS协议转换为HDFS访问协议，具体如下图所示。

<img src="img/cloud/hadoop11.png">

[slide]
## HDFS Federation


- 命名空间：由目录，文件和块组成；它支持所有与命名空间相关的文件系统操作，如创建，删除，修改和列出文件和目录。
- 块存储服务：包括块管理和块存储两部分；前者负责通过处理注册和定期心跳提供Datanode集群成员身份、处理并维护块的位置、支持块相关操作、管理副本放置，低复制块的块复制，以及删除超过复制的块；后者由Datanodes通过在本地文件系统上存储块并允许读/写访问来提供

单Active NN的架构使得HDFS在集群扩展性和性能上都有潜在的问题，当集群大到一定程度后，NN进程使用的内存可能会达到上百G，NN成为了性能的瓶颈。

常用的估算公式为1G对应1百万个块，按缺省块大小计算的话，大概是64T (这个估算比例是有比较大的富裕的，其实，即使是每个文件只有一个块，所有元数据信息也不会有1KB/block)。

为了水平扩展名称服务，Federration使用多个独立的Namenodes/命名空间。Namenodes之间管理的数据是共享的，但同时也是独立的，不需要彼此协调。Datanodes被所有Namenode用作块的公共存储。每个Datanode注册集群中的所有Namenode。Datanodes发送定期心跳和块报告。它们还处理来自Namenode的命令。

为了解决这个问题,Hadoop 2.x、Hadoop 3.x提供了HDFS Federation, 示意图如下：

<img src="img/cloud/hadoop10.png">

- 多个NN共用一个集群里的存储资源，每个NN都可以单独对外提供服务。
- 每个NN都会定义一个存储池，有单独的id，每个DN都为所有存储池提供存储。
- DN会按照存储池id向其对应的NN汇报块信息，同时，DN会向所有NN汇报本地存储可用资源情况。
- 如果需要在客户端方便的访问若干个NN上的资源，可以使用客户端挂载表，把不同的目录映射到不同的NN，但NN上必须存在相应的目录。



[slide]
# HDFS常用命令
HDFS命令基本格式如下
```bash
~$ hadoop fs -cmd <args>
```

[slide]
## 1 . ls
```bash
# 列出hdfs文件系统根目录下的目录和文件
~$ hadoop fs -ls /

#列出hdfs文件系统所有的目录和文件
~$ hadoop fs -ls -R /
```

[slide]
## 2 . put
上传本地文件到HDFS中
```bash
# hdfs file的父目录一定要存在，否则命令不会执行
~$ hadoop fs -put < local file > < hdfs file >

# hdfs dir 一定要存在，否则命令不会执行
~$ hadoop fs -put < local file or dir >...< hdfs dir >

# 从键盘读取输入到hdfs file中，按Ctrl+D结束输入，hdfs file不能存在，否则命令不会执行
hadoop fs -put - < hdsf file >
```

[slide]
## 3. moveFromLocal
```bash
# 与put相类似，命令执行后源文件 local src 被删除，也可以从从键盘读取输入到hdfs file中
~$ hadoop fs -moveFromLocal < local src > ... < hdfs dst >
```

[slide]
## 4. copyFromLocal
```bash
# 与put相类似，也可以从从键盘读取输入到hdfs file中
~$ hadoop fs -copyFromLocal < local src > ... < hdfs dst >
```

[slide]
## 5. get
```bash
# local file不能和 hdfs file名字不能相同，否则会提示文件已存在，没有重名的文件会复制到本地
~$ hadoop fs -get < hdfs file > < local file or dir>

# 拷贝多个文件或目录到本地时，本地要为文件夹路径注意：如果用户不是root， local 路径要为用户文件夹下的路径，否则会出现权限问题，
~$ hadoop fs -get < hdfs file or dir > ... < local dir >
```

[slide]
## 6. copyToLocal
```bash
~$ hadoop fs -copyToLocal < local src > ... < hdfs dst >
```

[slide]
## 7. rm
```bash
# 每次可以删除多个文件或目录
~$ hadoop fs -rm < hdfs file > ...hadoop fs -rm -r < hdfs dir>...
```

[slide]
## 8. mkdir
```bash
# 只能一级一级的建目录，父目录不存在的话使用这个命令会报错
~$ hadoop fs -mkdir < hdfs path>

# 所创建的目录如果父目录不存在就创建该父目录
~$ hadoop fs -mkdir -p < hdfs path>
```

[slide]
## 9. getmerge
```bash
# 将hdfs指定目录下所有文件排序后合并到local指定的文件中，文件不存在时会自动创建，文件存在时会覆盖里面的内容
~$ hadoop fs -getmerge < hdfs dir > < local file >

# 加上nl后，合并到local file中的hdfs文件之间会空出一行
~$ hadoop fs -getmerge -nl < hdfs dir > < local file >
```

[slide]
## 10. cp
```bash
# 目标文件不能存在，否则命令不能执行，相当于给文件重命名并保存，源文件还存在
~$ hadoop fs -cp < hdfs file > < hdfs file >

# 目标文件夹要存在，否则命令不能执行
~$ hadoop fs -cp < hdfs file or dir >... < hdfs dir >
```

[slide]
## 11. mv
```bash
# 目标文件不能存在，否则命令不能执行，相当于给文件重命名并保存，源文件不存在
~$ hadoop fs -mv < hdfs file > < hdfs file >

# 源路径有多个时，目标路径必须为目录，且必须存在。注意：跨文件系统的移动（local到hdfs或者反过来）都是不允许的
~$ hadoop fs -mv < hdfs file or dir >... < hdfs dir >
```

[slide]
## 12. count
```bash
# 统计hdfs对应路径下的目录个数，文件个数，文件总计大小显示为目录个数，文件个数，文件总计大小，输入路径
~$ hadoop fs -count < hdfs path >
```

[slide]
## 13. du
```bash
# 显示hdfs对应路径下每个文件夹和文件的大小
~$ hadoop fs -du < hdsf path>

# 显示hdfs对应路径下所有文件和的大小
~$ hadoop fs -du -s < hdsf path>

# 显示hdfs对应路径下每个文件夹和文件的大小,文件的大小用方便阅读的形式表示，例如用64M代替67108864
~$ hadoop fs -du - h < hdsf path>
```

[slide]
## 14. text
```bash
# 将文本文件或某些格式的非文本文件通过文本格式输出
~$ hadoop fs -text < hdsf file>
```

[slide]
## 15. setrep
```bash
# 改变一个文件在hdfs中的副本个数，上述命令中数字3为所设置的副本个数，-R选项可以对一个人目录下的所有目录+文件递归执行改变副本个数的操作
~$ hadoop fs -setrep -R 3 < hdfs path >
```

[slide]
## 16. stat
```bash
# 返回对应路径的状态信息[format]可选参数有：%b（文件大小），%o（Block大小），%n（文件名），%r（副本个数），%y（最后一次修改日期和时间）
~$ hdoop fs -stat [format] < hdfs path >

# 可以这样书写hadoop fs -stat %b%o%n < hdfs path >，不过不建议，这样每个字符输出的结果不是太容易分清楚
```

[slide]
## 17. tail
```bash
# 在标准输出中显示文件末尾的1KB数据
~$ hadoop fs -tail < hdfs file >
```

[slide]
## 18. archive
```bash
~$ hadoop archive -archiveName name.har -p < hdfs parent dir > < src >* < hdfs dst >

name：压缩文件名，自己任意取；
< hdfs parent dir > ：压缩文件所在的父目录；
< src >：要压缩的文件名；
< hdfs dst >：压缩文件存放路径

# 将hdfs中/user目录下的文件1.txt，2.txt压缩成一个名叫hadoop.har的文件存放在hdfs中/des目录下； 如果1.txt，2.txt不写就是将/user目录下所有的目录和文件
~$ hadoop archive -archiveName hadoop.har -p /user 1.txt 2.txt /des*

# 压缩成一个名叫hadoop.har的文件存放在hdfs中/des目录下显示har的内容可以用如下命令：
~$ hadoop fs -ls /des/hadoop.jar

# 显示har压缩的是那些文件
# 注意：har文件不能进行二次压缩。如果想给.har加文件，只能找到原来的文件，重新创建一个。har文件中原来文件的数据并没有变化，har文件真正的作用是减少NameNode和DataNode过多的空间浪费。
~$ hadoop fs -ls -R har:///des/hadoop.har
```

[slide]
## 19. balancer
```bash
# 如果管理员发现某些DataNode保存数据过多，某些DataNode保存数据相对较少，可以使用上述命令手动启动内部的均衡过程
~$ hdfs balancer
```

[slide]
## 20. dfsadmin
```bash
# 管理员可以通过dfsadmin管理HDFS，用法可以通过上述命令查看
~$ hdfs dfsadmin -help

# 显示文件系统的基本数据
~$ hdfs dfsadmin -report

# enter：进入安全模式；
# leave：离开安全模式；
# get：获知是否开启安全模式；
# wait：等待离开安全模式
~$ hdfs dfsadmin -safemode < enter | leave | get | wait >
```

[slide]
## 21. distcp
用来在两个HDFS之间拷贝数据