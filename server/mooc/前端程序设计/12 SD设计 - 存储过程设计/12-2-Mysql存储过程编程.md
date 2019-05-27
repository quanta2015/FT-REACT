title: Mysql存储过程编程
theme: light

[slide]  
# 简介
存储过程（Stored Procedure）是一种在数据库中存储复杂程序，以便外部程序调用的一种数据库对象。存储过程是为了完成特定功能的SQL语句集，经编译创建并保存在数据库中，用户可通过指定存储过程的名字并给定参数(需要时)来调用执行。存储过程思想上很简单，就是数据库 SQL 语言层面的代码封装与重用。

[slide]  
# 优点

- 存储过程可封装，并隐藏复杂的商业逻辑。
- 存储过程可以回传值，并可以接受参数。
- 存储过程无法使用 SELECT 指令来运行，因为它是子程序，与查看表，数据表或用户定义函数不同。
- 存储过程可以用在数据检验，强制实行商业逻辑等。


[slide]  
# 缺点

- 存储过程，往往定制化于特定的数据库上，因为支持的编程语言不同。当切换到其他厂商的数据库系统时，需要重写原有的存储过程。
- 存储过程的性能调校与撰写，受限于各种数据库系统。

[slide]  
# 存储过程和函数的区别

- 函数往往作为公式使用，存储过程作为完成某种功能使用。
- 函数分为表值函数跟标量函数。表值函数是经过一些sql语句方法最后返回一张表，标量函数是经过一些sql语句方法最后返回一个值。
- 函数可以在select语句中直接使用，而过程不能。


















[slide]  
# 创建存储过程
```sql
CREATE
    [DEFINER = { user | CURRENT_USER }]
　PROCEDURE sp_name ([proc_parameter[,...]])
    [characteristic ...] routine_body
 
proc_parameter:
    [ IN | OUT | INOUT ] param_name type
 
characteristic:
    COMMENT 'string'
  | LANGUAGE SQL
  | [NOT] DETERMINISTIC
  | { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
  | SQL SECURITY { DEFINER | INVOKER }
 
routine_body:
　　Valid SQL routine statement
 
[begin_label:] BEGIN
　　[statement_list]
　　　　……
END [end_label]
```


[slide]  
# MYSQL 存储过程中的关键语法

- 声明语句结束符，可以自定义: `DELIMITER $$` 或 `DELIMITER //`
- 声明存储过程: `CREATE PROCEDURE demo_in_parameter(IN p_in int) `   
- 存储过程开始和结束符号: `BEGIN .... END  ` 
- 变量赋值: `SET @p_in=1`  
- 变量定义: `DECLARE l_int int unsigned default 4000000; `
- 创建mysql存储过程、存储函数: `create procedure 存储过程名(参数)`
- 存储过程体: `create function 存储函数名(参数)`

[slide]  
# 实例
创建数据库，备份数据表用于示例操作：
```bash
mysql> create database db1;
mysql> use db1;    
mysql> create table PLAYERS as select * from TENNIS.PLAYERS;
mysql> create table MATCHES  as select * from TENNIS.MATCHES;
```


[slide]  
下面是存储过程的例子，删除给定球员参加的所有比赛：
```bash
mysql> delimiter $$　　#将语句的结束符号从分号;临时改为两个$$(可以是自定义)
mysql> CREATE PROCEDURE delete_matches(IN p_playerno INTEGER)
    -> BEGIN
    -> 　　DELETE FROM MATCHES
    ->    WHERE playerno = p_playerno;
    -> END$$
Query OK, 0 rows affected (0.01 sec)
 
mysql> delimiter;　　#将语句的结束符号恢复为分号
```


[slide]  
解析：默认情况下，存储过程和默认数据库相关联，如果想指定存储过程创建在某个特定的数据库下，那么在过程名前面加数据库名做前缀。 在定义过程时，使用 DELIMITER $$ 命令将语句的结束符号从分号 ; 临时改为两个 $$，使得过程体中使用的分号被直接传递到服务器，而不会被客户端（如mysql）解释。


[slide]  
调用存储过程： `call sp_name[(传参)];`

```bash
mysql> select * from MATCHES;
+---------+--------+----------+-----+------+
| MATCHNO | TEAMNO | PLAYERNO | WON | LOST |
+---------+--------+----------+-----+------+
|       1 |      1 |        6 |   3 |    1 |
|       7 |      1 |       57 |   3 |    0 |
|       8 |      1 |        8 |   0 |    3 |
|       9 |      2 |       27 |   3 |    2 |
|      11 |      2 |      112 |   2 |    3 |
+---------+--------+----------+-----+------+
5 rows in set (0.00 sec)
 
mysql> call delete_matches(57);
Query OK, 1 row affected (0.03 sec)
 
mysql> select * from MATCHES;
+---------+--------+----------+-----+------+
| MATCHNO | TEAMNO | PLAYERNO | WON | LOST |
+---------+--------+----------+-----+------+
|       1 |      1 |        6 |   3 |    1 |
|       8 |      1 |        8 |   0 |    3 |
|       9 |      2 |       27 |   3 |    2 |
|      11 |      2 |      112 |   2 |    3 |
+---------+--------+----------+-----+------+
4 rows in set (0.00 sec)
```

> 解析：在存储过程中设置了需要传参的变量p_playerno，调用存储过程的时候，通过传参将57赋值给p_playerno，然后进行存储过程里的SQL操作。


[slide]  
# 存储过程体

- 存储过程体包含了在过程调用时必须执行的语句，例如：dml、ddl语句，if-then-else和while-do语句、声明变量的declare语句等
- 过程体格式：以begin开始，以end结束(可嵌套)


[slide]  
```
BEGIN
　　BEGIN
　　　　BEGIN
　　　　　　statements; 
　　　　END
　　END
END
```

注意：每个嵌套块及其中的每条语句，必须以分号结束，表示过程体结束的begin-end块(又叫做复合语句compound statement)，则不需要分号。


[slide]  
# 为语句块贴标签
```sql
[begin_label:] BEGIN
　　[statement_list]
END [end_label]
```


[slide]  
# 例如
```sql
label1: BEGIN
　　label2: BEGIN
　　　　label3: BEGIN
　　　　　　statements; 
　　　　END label3 ;
　　END label2;
END label1
```


[slide]  
# 标签有两个作用：

- 1、增强代码的可读性
- 2、在某些语句(例如:leave和iterate语句)，需要用到标签


[slide]  
# 存储过程的参数

MySQL存储过程的参数用在存储过程的定义，共有三种参数类型,IN,OUT,INOUT,形式如：
```sql
CREATEPROCEDURE 存储过程名([[IN |OUT |INOUT ] 参数名 数据类形...])
```


- IN 输入参数：表示调用者向过程传入值（传入值可以是字面量或变量）
- OUT 输出参数：表示过程向调用者传出值(可以返回多个值)（传出值只能是变量）
- INOUT 输入输出参数：既表示调用者向过程传入值，又表示过程向调用者传出值（值只能是变量）


[slide]  
# in 输入参数
```bash
mysql> delimiter $$
mysql> create procedure in_param(in p_in int)
    -> begin
    -> 　　select p_in;
    -> 　　set p_in=2;
    ->    select P_in;
    -> end$$
mysql> delimiter ;
mysql> set @p_in=1;
mysql> call in_param(@p_in);
+------+
| p_in |
+------+
|    1 |
+------+
 
+------+
| P_in |
+------+
|    2 |
+------+
 
mysql> select @p_in;
+-------+
| @p_in |
+-------+
|     1 |
+-------+
```

> 以上可以看出，p_in 在存储过程中被修改，但并不影响 @p_id 的值，因为前者为局部变量、后者为全局变量。


[slide]  
# out输出参数
```sql
mysql> delimiter //
mysql> create procedure out_param(out p_out int)
    ->   begin
    ->     select p_out;
    ->     set p_out=2;
    ->     select p_out;
    ->   end
    -> //
mysql> delimiter ;
mysql> set @p_out=1;
mysql> call out_param(@p_out);
+-------+
| p_out |
+-------+
|  NULL |
+-------+
　　#因为out是向调用者输出参数，不接收输入的参数，所以存储过程里的p_out为null
+-------+
| p_out |
+-------+
|     2 |
+-------+
 
mysql> select @p_out;
+--------+
| @p_out |
+--------+
|      2 |
+--------+
　　#调用了out_param存储过程，输出参数，改变了p_out变量的值
```



[slide]  
# inout输入参数
```bash
mysql> delimiter $$
mysql> create procedure inout_param(inout p_inout int)
    ->   begin
    ->     select p_inout;
    ->     set p_inout=2;
    ->     select p_inout;
    ->   end
    -> $$
mysql> delimiter ;
mysql> set @p_inout=1;
mysql> call inout_param(@p_inout);
+---------+
| p_inout |
+---------+
|       1 |
+---------+
 
+---------+
| p_inout |
+---------+
|       2 |
+---------+
 
mysql> select @p_inout;
+----------+
| @p_inout |
+----------+
|        2 |
+----------+
#调用了inout_param存储过程，接受了输入的参数，也输出参数，改变了变量
```

[slide]  
> 注意：  
1、如果过程没有参数，也必须在过程名后面写上小括号例：
`CREATE PROCEDURE sp_name ([proc_parameter[,...]])` ……  
2、确保参数的名字不等于列的名字，否则在过程体中，参数名被当做列名来处理


[slide]  
# 建议

- 输入值使用in参数。
- 返回值使用out参数。
- inout参数就尽量的少用。


[slide]  
# 变量


[slide]  
# 变量定义
局部变量声明一定要放在存储过程体的开始：
```sql
DECLAREvariable_name [,variable_name...] datatype [DEFAULT value];
其中，datatype 为 MySQL 的数据类型，如: int, float, date,varchar(length)
```


[slide]  
# 例如
```sql
DECLARE l_int int unsigned default 4000000;  
DECLARE l_numeric number(8,2) DEFAULT 9.95;  
DECLARE l_date date DEFAULT '1999-12-31';  
DECLARE l_datetime datetime DEFAULT '1999-12-31 23:59:59';  
DECLARE l_varchar varchar(255) DEFAULT 'This will not be padded';
```


[slide]  
# 变量赋值
`SET 变量名 = 表达式值 [,variable_name = expression ...]`


[slide]  
# 用户变量
在MySQL客户端使用用户变量:
```bash
mysql > SELECT 'Hello World' into @x;  
mysql > SELECT @x;  
+-------------+  
|   @x        |  
+-------------+  
| Hello World |  
+-------------+  
mysql > SET @y='Goodbye Cruel World';  
mysql > SELECT @y;  
+---------------------+  
|     @y              |  
+---------------------+  
| Goodbye Cruel World |  
+---------------------+  
 
mysql > SET @z=1+2+3;  
mysql > SELECT @z;  
+------+  
| @z   |  
+------+  
|  6   |  
+------+
在存储过程中使用用户变量

mysql > CREATE PROCEDURE GreetWorld( ) SELECT CONCAT(@greeting,' World');  
mysql > SET @greeting='Hello';  
mysql > CALL GreetWorld( );  
+----------------------------+  
| CONCAT(@greeting,' World') |  
+----------------------------+  
|  Hello World               |  
+----------------------------+
在存储过程间传递全局范围的用户变量

mysql> CREATE PROCEDURE p1()   SET @last_procedure='p1';  
mysql> CREATE PROCEDURE p2() SELECT CONCAT('Last procedure was ',@last_procedure);  
mysql> CALL p1( );  
mysql> CALL p2( );  
+-----------------------------------------------+  
| CONCAT('Last procedure was ',@last_proc       |  
+-----------------------------------------------+  
| Last procedure was p1                         |  
 +-----------------------------------------------+
```

> 注意:  
1、用户变量名一般以@开头
2、滥用用户变量会导致程序难以理解及管理



[slide]  
# 注释
MySQL 存储过程可使用两种风格的注释

- 两个横杆--：该风格一般用于单行注释。
- c 风格： 一般用于多行注释。



[slide]  
# 例如
```bash
mysql > DELIMITER //  
mysql > CREATE PROCEDURE proc1 --name存储过程名  
     -> (IN parameter1 INTEGER)   
     -> BEGIN   
     -> DECLARE variable1 CHAR(10);   
     -> IF parameter1 = 17 THEN   
     -> SET variable1 = 'birds';   
     -> ELSE 
     -> SET variable1 = 'beasts';   
    -> END IF;   
    -> INSERT INTO table1 VALUES (variable1);  
    -> END   
    -> //  
mysql > DELIMITER ;
```



[slide]  
# MySQL存储过程的调用
用call和你过程名以及一个括号，括号里面根据需要，加入参数，参数包括输入参数、输出参数、输入输出参数。具体的调用方法可以参看上面的例子。


[slide]  
# MySQL存储过程的查询
我们像知道一个数据库下面有那些表，我们一般采用 showtables; 进行查看。那么我们要查看某个数据库下面的存储过程，是否也可以采用呢？答案是，我们可以查看某个数据库下面的存储过程，但是是另一钟方式。


[slide]  
我们可以用以下语句进行查询：
```sql
selectname from mysql.proc where db='数据库名';
或
selectroutine_name from information_schema.routines where routine_schema='数据库名';
或
showprocedure status where db='数据库名';
```


[slide]  
如果我们想知道，某个存储过程的详细，那我们又该怎么做呢？是不是也可以像操作表一样用describe 表名进行查看呢？

答案是：我们可以查看存储过程的详细，但是需要用另一种方法：
```
SHOWCREATE PROCEDURE 数据库.存储过程名;
```
就可以查看当前存储过程的详细。


[slide]  
# MySQL存储过程的修改
```
ALTER PROCEDURE
```

[slide]  
# MySQL存储过程的删除
删除一个存储过程比较简单，和删除表一样：
```
DROPPROCEDURE
```


[slide]  
# MySQL存储过程的控制语句



[slide]  
# 变量作用域

内部的变量在其作用域范围内享有更高的优先权，当执行到 end。变量时，内部变量消失，此时已经在其作用域外，变量不再可见了，应为在存储过程外再也不能找到这个申明的变量，但是你可以通过 out 参数或者将其值指派给会话变量来保存其值。
```bash
mysql > DELIMITER //  
mysql > CREATE PROCEDURE proc3()  
     -> begin 
     -> declare x1 varchar(5) default 'outer';  
     -> begin 
     -> declare x1 varchar(5) default 'inner';  
      -> select x1;  
      -> end;  
       -> select x1;  
     -> end;  
     -> //  
mysql > DELIMITER ;
```


[slide]  
# 条件语句


[slide]  
# if-then-else 语句
```bash
mysql > DELIMITER //  
mysql > CREATE PROCEDURE proc2(IN parameter int)  
     -> begin 
     -> declare var int;  
     -> set var=parameter+1;  
     -> if var=0 then 
     -> insert into t values(17);  
     -> end if;  
     -> if parameter=0 then 
     -> update t set s1=s1+1;  
     -> else 
     -> update t set s1=s1+2;  
     -> end if;  
     -> end;  
     -> //  
mysql > DELIMITER ;
```


[slide]  
# case语句
```bash
mysql > DELIMITER //  
mysql > CREATE PROCEDURE proc3 (in parameter int)  
     -> begin 
     -> declare var int;  
     -> set var=parameter+1;  
     -> case var  
     -> when 0 then   
     -> insert into t values(17);  
     -> when 1 then   
     -> insert into t values(18);  
     -> else   
     -> insert into t values(19);  
     -> end case;  
     -> end;  
     -> //  
mysql > DELIMITER ; 
case
    when var=0 then
        insert into t values(30);
    when var>0 then
    when var<0 then
    else
end case
```


[slide]  
# 循环语句


[slide]  
# while ···· end while
```bash
mysql > DELIMITER //  
mysql > CREATE PROCEDURE proc4()  
     -> begin 
     -> declare var int;  
     -> set var=0;  
     -> while var<6 do  
     -> insert into t values(var);  
     -> set var=var+1;  
     -> end while;  
     -> end;  
     -> //  
mysql > DELIMITER ;
```

```
while 条件 do
    --循环体
end while
```


[slide]  
# repeat···· end repea

它在执行操作后检查结果，而 while 则是执行前进行检查。
```bash
mysql > DELIMITER //  
mysql > CREATE PROCEDURE proc5 ()  
     -> begin   
     -> declare v int;  
     -> set v=0;  
     -> repeat  
     -> insert into t values(v);  
     -> set v=v+1;  
     -> until v>=5  
     -> end repeat;  
     -> end;  
     -> //  
mysql > DELIMITER ;
```

```
repeat
    --循环体
until 循环条件  
end repeat;
```

[slide]  
# loop ·····endloop

loop 循环不需要初始条件，这点和 while 循环相似，同时和 repeat 循环一样不需要结束条件, leave 语句的意义是离开循环。
```bash
mysql > DELIMITER //  
mysql > CREATE PROCEDURE proc6 ()  
     -> begin 
     -> declare v int;  
     -> set v=0;  
     -> LOOP_LABLE:loop  
     -> insert into t values(v);  
     -> set v=v+1;  
     -> if v >=5 then 
     -> leave LOOP_LABLE;  
     -> end if;  
     -> end loop;  
     -> end;  
     -> //  
mysql > DELIMITER ;
```


[slide]  
# LABLES 标号：

标号可以用在 begin repeat while 或者 loop 语句前，语句标号只能在合法的语句前面使用。可以跳出循环，使运行指令达到复合语句的最后一步。


[slide]  
# ITERATE迭代
ITERATE 通过引用复合语句的标号,来从新开始复合语句

```bash
mysql > DELIMITER //  
mysql > CREATE PROCEDURE proc10 ()  
     -> begin 
     -> declare v int;  
     -> set v=0;  
     -> LOOP_LABLE:loop  
     -> if v=3 then   
     -> set v=v+1;  
     -> ITERATE LOOP_LABLE;  
     -> end if;  
     -> insert into t values(v);  
     -> set v=v+1;  
     -> if v>=5 then 
     -> leave LOOP_LABLE;  
     -> end if;  
     -> end loop;  
     -> end;  
     -> //  
mysql > DELIMITER ;
```


[slide]  
# 字符串类基本函数
```
CHARSET(str) //返回字串字符集
CONCAT (string2 [,... ]) //连接字串
INSTR (string ,substring ) //返回substring首次在string中出现的位置,不存在返回0
LCASE (string2 ) //转换成小写
LEFT (string2 ,length ) //从string2中的左边起取length个字符
LENGTH (string ) //string长度
LOAD_FILE (file_name ) //从文件读取内容
LOCATE (substring , string [,start_position ] ) 同INSTR,但可指定开始位置
LPAD (string2 ,length ,pad ) //重复用pad加在string开头,直到字串长度为length
LTRIM (string2 ) //去除前端空格
REPEAT (string2 ,count ) //重复count次
REPLACE (str ,search_str ,replace_str ) //在str中用replace_str替换search_str
RPAD (string2 ,length ,pad) //在str后用pad补充,直到长度为length
RTRIM (string2 ) //去除后端空格
STRCMP (string1 ,string2 ) //逐字符比较两字串大小,
SUBSTRING (str , position [,length ]) //从str的position开始,取length个字符,
TRIM([[BOTH|LEADING|TRAILING][padding] FROM]string2) //去除指定位置的指定字符
UCASE (string2 ) //转换成大写
RIGHT(string2,length) //取string2最后length个字符
SPACE(count) //生成count个空格
```


[slide]  
# 数学类基本函数
```
ABS (number2 ) //绝对值
BIN (decimal_number ) //十进制转二进制
CEILING (number2 ) //向上取整
CONV(number2,from_base,to_base) //进制转换
FLOOR (number2 ) //向下取整
FORMAT (number,decimal_places ) //保留小数位数
HEX (DecimalNumber ) //转十六进制
注：HEX()中可传入字符串，则返回其ASC-11码，如HEX('DEF')返回4142143
也可以传入十进制整数，返回其十六进制编码，如HEX(25)返回19
LEAST (number , number2 [,..]) //求最小值
MOD (numerator ,denominator ) //求余
POWER (number ,power ) //求指数
RAND([seed]) //随机数
ROUND (number [,decimals ]) //四舍五入,decimals为小数位数]
```


[slide]  
# 日期时间类基本函数
```
ADDTIME (date2 ,time_interval )//将time_interval加到date2
CONVERT_TZ (datetime2 ,fromTZ ,toTZ ) //转换时区
CURRENT_DATE ( ) //当前日期
CURRENT_TIME ( ) //当前时间
CURRENT_TIMESTAMP ( ) //当前时间戳
DATE (datetime ) //返回datetime的日期部分
DATE_ADD (date2 , INTERVAL d_value d_type ) //在date2中加上日期或时间
DATE_FORMAT (datetime ,FormatCodes ) //使用formatcodes格式显示datetime
DATE_SUB (date2 , INTERVAL d_value d_type ) //在date2上减去一个时间
DATEDIFF (date1 ,date2 ) //两个日期差
DAY (date ) //返回日期的天
DAYNAME (date ) //英文星期
DAYOFWEEK (date ) //星期(1-7) ,1为星期天
DAYOFYEAR (date ) //一年中的第几天
EXTRACT (interval_name FROM date ) //从date中提取日期的指定部分
MAKEDATE (year ,day ) //给出年及年中的第几天,生成日期串
MAKETIME (hour ,minute ,second ) //生成时间串
MONTHNAME (date ) //英文月份名
NOW ( ) //当前时间
SEC_TO_TIME (seconds ) //秒数转成时间
STR_TO_DATE (string ,format ) //字串转成时间,以format格式显示
TIMEDIFF (datetime1 ,datetime2 ) //两个时间差
TIME_TO_SEC (time ) //时间转秒数]
WEEK (date_time [,start_of_week ]) //第几周
YEAR (datetime ) //年份
DAYOFMONTH(datetime) //月的第几天
HOUR(datetime) //小时
LAST_DAY(date) //date的月的最后日期
MICROSECOND(datetime) //微秒
MONTH(datetime) //月
MINUTE(datetime) //分返回符号,正负或0
SQRT(number2) //开平方
```


# 总结

# 创建　　
```
DROP PROCEDURE IF EXISTS pro2; 
DELIMITER // # $或/
CREATE PROCEDURE pro2(OUT s INT)
BEGIN 
  SELECT COUNT(*) INTO s FROM navi_issuer;
END $$
```

> `DELIMITER //` 语句的作用是将MYSQL的结束符设置为`//`，因为MYSQL默认的语句结束符为`分号`;为了避免与存储过程中SQL语句结束符相冲突，需要使用`DELIMITER` 改变存储过程的结束符，并以 `END//` 结束存储过程。存储过程定义完毕之后再使用`DELIMITER ;`恢复默认结束符。当使用DELIMITER命令时，应该避免使用反斜杠（\）字符，因为反斜杠是MYSQL的转义字符。


# 调用

```
CALL pro1(@s);
SELECT @s;
```

# 变量定义和赋值
```sql
DECLARE MYPARAM INT DEFAULT 100;
declare v int(2) default 1;DECLARE var1,var2,var3 INT;
SET var1=10,var2=20;
SET var3=var1+var2;

# 还可以通过SELECT...INTO为一个或多个变量赋值
DECLARE NAME CHAR(50);
DECLARE id DECIMAL(8,2); 
SELECT id,NAME INTO id ,NAME FROM t3 WHERE id=2;　　
```


# 游标 cursor
```sql
# DROP 这里 绝对不能用 单引号，必须 用 [`]
DROP PROCEDURE IF EXISTS `test_cursor`;

DELIMITER //
CREATE PROCEDURE test_cursor(OUT outVal INT(10))
BEGIN
    DECLARE cunter INT(2) DEFAULT 1;
    DECLARE num INT(4) DEFAULT 4;
    #定义游标 表示将从table1表中选取col1列的内容放到游标curl中，即每次游标遍历的结果都放在curl中，要注意游标只能向前遍历，而不能向后，并且注意，游标不能更新，最后关闭游标。
    DECLARE  cur CURSOR FOR SELECT id FROM  navi_issuer;

    #定义 当 CURSOR 没有数据返回的 时候的 操作；它的含义是：若没有数据返回,程序继续,并将变量 cunter 设置值，这种情况是出现在select XX into XXX from tablename的时候发生的
    DECLARE  CONTINUE HANDLER FOR NOT FOUND SET cunter = -1;
    
    #打开游标
    OPEN cur;

    #select cur;

    # 变量使用前初始化的问题--如果直接使用  CALL test_cursor(@count); 的话，得到的结果 是null，也就是说 输入的参数 是 null的话，相加多少 都是null; SELECT NULL + 1 + 1 +1; 怎么都是 null
    IF outVal IS NULL THEN
        SET outVal = 0;
    END IF;

    #select outVal;
    WHILE cunter >0 DO
        FETCH cur INTO num;
        #select num;
        IF num >0 THEN
          #select num;
          SET outVal = outVal + num; 
        END IF;
        SELECT outVal;
    END WHILE;

    #关闭游标
    CLOSE cur;
END //
```





　　




