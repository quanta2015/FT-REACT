# 实验13. MYSQL Index 基础练习

## Part1. Mysql配置

### 开启慢查询日志
1 . 在配置文件my.cnf或my.ini中添加配置参数

```
slow_query_log = 'ON';
log_queries_not_using_indexes = 'OFF';
slow_query_log_file ='c:\\mysql\\log\\slow-query.log';
long_query_time = '5';
```


2 . 查看日志启动状态

```sql
mysql> show variables like "slow%";
+---------------------+---------------------------------+
| Variable_name       | Value                           |
+---------------------+---------------------------------+
| slow_launch_time    | 2                               |
| slow_query_log      | ON                              |
| slow_query_log_file | d:\dev\mysql\log\slow-query.log |
+---------------------+---------------------------------+
3 rows in set (0.00 sec)
```

3 . 设置慢日志开启

```bash
set global slow_query_log = ON;
```


### explain 查询分析
使用 EXPLAIN 关键字可以模拟优化器执行SQL查询语句，从而知道MySQL是如何处理你的SQL语句的。这可以帮你分析你的查询语句或是表结构的性能瓶颈。通过explain命令可以得到:

- 表的读取顺序
- 数据读取操作的操作类型
- 哪些索引可以使用
- 哪些索引被实际使用
- 表之间的引用
- 每张表有多少行被优化器查询


| id | select_type | table | type | possible_keys | key | key_len | ref | rows | Extra |
|----|-------------|-------|-------|--------------------------|---------|---------|-------|------|-------|
| 1 | SIMPLE | info | const | PRIMARY,idx_uid,idx_date | PRIMARY | 4 | const | 1 |  |


**1）Table**  
显示这一行的数据是关于哪张表的

**2）possible_keys**  
显示可能应用在这张表中的索引。如果为空，没有可能的索引。可以为相关的域从WHERE语句中选择一个合适的语句。

指出MySQL能使用哪个索引在表中找到记录，查询涉及到的字段上若存在索引，则该索引将被列出，但不一定被查询使用，因为MySQL内部优化器有自己的抉择。该列完全独立于EXPLAIN输出所示的表的次序。这意味着在possible_keys中的某些键实际上不能按生成的表次序使用。

如果该列是NULL，则没有相关的索引。在这种情况下，可以通过检查WHERE子句看是否它引用某些列或适合索引的列来提高你的查询性能。如果是这样，创造一个适当的索引并且再次用EXPLAIN检查查询

**3）key**  
实际使用的索引。如果为 NULL，则没有使用索引。MYSQL很少会选择优化不足的索引，此时可以在SELECT语句中使用 USE INDEX（index） 来强制使用一个索引或者用 IGNORE INDEX（index） 来强制忽略索引

**4）key_len**  
使用的索引的长度。在不损失精确性的情况下，长度越短越好。表示索引中使用的字节数，可通过该列计算查询中使用的索引的长度（ key_len 显示的值为索引字段的最大可能长度，并非实际使用长度，即 key_len 是根据表定义计算而得，不是通过表内检索出的）；不损失精确性的情况下，长度越短越好

**5）ref**  
显示索引的哪一列被使用了，如果可能的话，是一个常数。表示上述表的连接匹配条件，即哪些列或常量被用于查找索引列上的值

**6）rows**  
MySQL认为必须检索的用来返回请求数据的行数；表示MySQL根据表统计信息及索引选用情况，估算的找到所需的记录所需要读取的行数

**7）select_type**  
查询中每个select子句的类型


| 序号 | 类型 | 说明 |
|------|----------------------|------------------------------------------------------------|
| 1 | SIMPLE | 简单SELECT,不使用UNION或子查询等 |
| 2 | PRIMARY | 查询中若包含任何复杂的子部分,最外层的select被标记为PRIMARY |
| 3 | UNION | UNION中的第二个或后面的SELECT语句 |
| 4 | DEPENDENT UNION | N ON中的第二个或后面的SELECT语句，取决于外面的查询 |
| 5 | UNION RESULT | UNION的结果 |
| 6 | SUBQUERY | 子查询中的第一个SELECT |
| 7 | DEPENDENT SUBQUERY | 子查询中的第一个SELECT，取决于外面的查询 |
| 8 | DERIVED | 派生表的SELECT, FROM子句的子查询 |
| 9 | UNCACHEABLE SUBQUERY | 一个子查询的结果不能被缓存，必须重新评估外链接的第一行 |


**8）type**  
这是最重要的字段之一，显示查询使用了何种类型。从最好到最差的连接类型为NULL、system、const、eq_ref、ref、range、index和ALL

| 类型 | 说明 |
|----------|---------|
| NULL | MySQL在优化过程中分解语句，执行时甚至不用访问表或索引，例如从一个索引列里选取最小值可以通过单独索引查找完成。 |
| system / const | 可以将查询的变量转为常量. 如id=1; id为 主键或唯一键。当MySQL对查询某部分进行优化，并转换为一个常量时，使用这些类型访问。如将主键置于where列表中，MySQL就能将该查询转换为一个常量,system是const类型的特例，当查询的表只有一行的情况下，使用system |
| eq_ref | 访问索引,返回某单一行的数据.(通常在联接时出现，查询使用的索引为主键或惟一键)。类似ref，区别就在使用的索引是唯一索引，对于每个索引键值，表中只有一条记录匹配，简单来说，就是多表连接中使用primary key或者 unique key作为关联条件 |
| ref | 访问索引,返回某个值的数据.(可以返回多行) 通常使用=时发生。表示上述表的连接匹配条件，即哪些列或常量被用于查找索引列上的值 |
| range | 这个连接类型使用索引返回一个范围中的行，比如使用>或<查找东西，并且该字段上建有索引时发生的情况(注:不一定好于index)。只检索给定范围的行，使用一个索引来选择行。 |
| index | 以索引的顺序进行全表扫描，优点是不用排序,缺点是还要全表扫描。index与ALL区别为index类型只遍历索引树 |
| ALL | 全表扫描，应该尽量避免。 MySQL将遍历全表以找到匹配的行。 |


**9）Extra**  
关于MYSQL如何解析查询的额外信息，主要有以下几种

| using index | 只用到索引,可以避免访问表.。表示查询在索引树中就可查找所需数据, 不用扫描表数据文件, 往往说明性能不错 |
|--------------|---------------|
| using where | 使用到where来过虑数据. 不是所有的where clause都要显示using where. 如以=方式访问索引. |
| using tmporary | 查询有使用临时表, 一般出现于排序, 分组和多表 join 的情况, 查询效率不高, 建议优化. |
| using filesort | 用到额外的排序. (当使用order by v1,而没用到索引时,就会使用额外的排序)。MySQL中无法利用索引完成的排序操作称为 文件排序 |
| range checked for eache record(index map:N) | 没有好的索引. |
| Using join buffer | 改值强调了在获取连接条件时没有使用索引，并且需要连接缓冲区来存储中间结果。如果出现了这个值，那应该注意，根据查询的具体情况可能需要添加索引来改进能。 |
| Impossible where | 这个值强调了where语句会导致没有符合条件的行 |



### profiling查询分析
通过慢日志查询可以知道哪些SQL语句执行效率低下，通过explain我们可以得知SQL语句的具体执行情况，索引使用等，还可以结合show命令查看执行状态。如果觉得explain的信息不够详细，可以同通过profiling命令得到更准确的SQL执行消耗系统资源的信息。

profiling默认是关闭的。可以通过以下语句查看 `select @@profiling`
```bash
# 打开profiling查询分析
set profiling = 1;

# 查看分析信息，可以得到被执行的SQL语句的时间和ID
show profiles\G

# 得到对应SQL语句执行的详细信息
show profile for query 1; 

# 测试完毕以后 ，关闭参数
set profiling=0
```


## Part2 编程性实验
1 . 导入数据  
将toxcast数据库导入mysql
https://pan.baidu.com/s/1_4kJmFDKAA6kqbENv_NBRQ

2 . Index实验  

- 编写sql语句，将assay表的全部记录id加1
- 要求从mc4导出100万条记录，启动10个线程，并行将数据插入到一张新表mc4_new中，每插入1000条记录后，执行commit；

建立一个toxcast_extract视图，逻辑如下：
```sql
SELECT
  B.CASN,
  B.CHNM as CHEMICAL_NAME,
  A.SPID,
  D.M5ID,
  J.AID,
  J.ASID,
  O.NCBI_TAXON_ID AS ORGANISM_TAX_ID,
  C.AEID AS MOA_ASSAY_ID,
  J.ASSAY_NAME,
  I.ASSAY_COMPONENT_NAME,
  H.ASSAY_COMPONENT_ENDPOINT_NAME,
  I.ASSAY_COMPONENT_DESC,
  H.ASSAY_FUNCTION_TYPE,
  H.KEY_POSITIVE_CONTROL,
  H.INTENDED_TARGET_TYPE,
  H.INTENDED_TARGET_TYPE_SUB,
  H.INTENDED_TARGET_FAMILY,
  H.INTENDED_TARGET_FAMILY_SUB,
  I.BIOLOGICAL_PROCESS_TARGET,
  J.CELL_SHORT_NAME,
  L.GENE_ID,
  L.ENTREZ_GENE_ID,
  L.GENE_NAME,
  L.GENE_SYMBOL,
  L.UNIPROT_ACCESSION_NUMBER,
  J.DILUTION_SOLVENT,
  J.DILUTION_SOLVENT_PERCENT_MAX,
  C.LOGC_MAX,
  C.LOGC_MIN,
  POWER( 10, C.LOGC_MAX ) / 1000000 C_MAX_M,
  POWER( 10, C.LOGC_MIN ) / 1000000 C_MIN_M,
  'mol/L' AS UNIT1,
  'AC50' AS ENDPOINT,
  I.SIGNAL_DIRECTION_TYPE,
  H.SIGNAL_DIRECTION,
  ( CASE WHEN D.MODL_GA IS NULL THEN NULL ELSE POWER(10,D.MODL_GA) END ) AS MODL_GA,
  ( CASE WHEN D.MODL_LA IS NULL THEN NULL ELSE POWER(10,D.MODL_LA) END ) AS MODL_LA,
  ( CASE WHEN D.MODL_AC10 IS NULL THEN NULL ELSE POWER(10,D.MODL_AC10) END ) AS MODL_AC10,
  'uM' AS UNIT3,
  ( CASE WHEN D.MODL_GA IS NULL THEN NULL ELSE POWER( 10, D.MODL_GA ) / 1000000 END ) AS MODL_GA_M,
  ( CASE WHEN D.MODL_LA IS NULL THEN NULL ELSE POWER(10,D.MODL_LA) / 1000000 END ) AS MODL_LA_M,
  ( CASE WHEN D.MODL_AC10 IS NULL THEN NULL ELSE POWER(10,D.MODL_AC10) / 1000000 END ) AS MODL_AC10_M,
  'mol/L' AS UNIT4,
  ( CASE WHEN D.MODL_TP IS NULL THEN NULL ELSE POWER(10,D.MODL_TP) END ) AS MODL_TP,
  D.MODL,
  ( CASE WHEN D.MODL_PROB IS NULL THEN NULL ELSE POWER(10,D.MODL_PROB) END ) AS MODL_PROB,
  D.HITC,
  D.FITC 
FROM
  TOXCAST2.SAMPLE A,
  TOXCAST2.CHEMICAL B,
  TOXCAST2.MC4 C,
  TOXCAST2.MC5 D,
  TOXCAST2.MC5_FIT_CATEGORIES F,
  TOXCAST2.ASSAY_COMPONENT_ENDPOINT H,
  TOXCAST2.ASSAY_COMPONENT I,
  TOXCAST2.ASSAY J,
  TOXCAST2.TECHNOLOGICAL_TARGET K,
  TOXCAST2.GENE L,
  TOXCAST2.ORGANISM O
WHERE
  A.SPID = C.SPID
  AND A.CHID = B.CHID
  AND C.M4ID = D.M4ID
  AND D.FITC = F.FITC
  AND D.AEID = H.AEID
  AND H.ACID = I.ACID
  AND I.AID = J.AID
  AND H.ACID = K.ACID
  AND K.TARGET_ID = L.GENE_ID
  AND J.ORGANISM_ID = O.NCBI_TAXON_ID
```

- 查询该视图的所有记录，记下所需时间；
- 删除所有表的index，再次查询记下所需时间；
- 比较两者时间，并且通过explain分析；
