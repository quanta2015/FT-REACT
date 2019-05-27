title: Linux基本命令
theme: light

[slide]
# Linux基本命令

[slide]
# 1. tar
```bash
# 创建一个新的tar文件
$ tar cvf archive_name.tar dirname/

# 解压tar文件
$ tar xvf archive_name.tar

#查看tar文件
$ tar tvf archive_name.tar
```

[slide]
# 2. grep
```bash
# 在文件中查找字符串(不区分大小写)
$ grep -i "the" demo_file

#输出成功匹配的行，以及该行之后的三行
$ grep -A 3 -i "example" demo_text

# 在一个文件夹中递归查询包含指定字符串的文件
$ grep -r "ramesh" *
```

[slide]
# 3. find
```bash
# 查找指定文件名的文件(不区分大小写)
$ find -iname "MyProgram.c"

# 对找到的文件执行某个命令
$ find -iname "MyProgram.c" -exec md5sum {} \;

# 查找home目录下的所有空文件
$ find ~ -empty
```

[slide]
# 4. ssh
```bash
# 登录到远程主机
$ ssh -l jsmith remotehost.example.com

# 调试ssh客户端
$ ssh -v -l jsmith remotehost.example.com

# 显示ssh客户端版本
$ ssh -V
```

[slide]
# 5. sed
```bash
# 当你将Dos系统中的文件复制到Unix/Linux后，这个文件每行都会以\r\n结尾，sed可以轻易将其转换为Unix格式的文件，使用\n结尾的文件
$ sed 's/.$//' filename

# 反转文件内容并输出
$ sed -n '1!G; h; p' filename

# 为非空行添加行号
$ sed '/./=' thegeekstuff.txt | sed 'N; s/\n/ /'
```

[slide]
# 6. awk
```bash
# 删除重复行
$ awk '!($0 in array) { array[$0]; print}' temp

# 打印/etc/passwd中所有包含同样的uid和gid的行
$ awk -F ':' '$3=$4' /etc/passwd

# 打印文件中的指定部分的字段
$ awk '{print $2,$5;}' employee.txt
```

[slide]
# 7. vim
```bash
# 打开文件并跳到第10行
$ vim +10 filename.txt

# 打开文件跳到第一个匹配的行
$ vim +/search-term filename.txt

# 以只读模式打开文件
$ vim -R /etc/passwd
```

[slide]
# 8. diff
```bash
# 比较的时候忽略空白符
$ diff -w name_list.txt name_list_new.txt
```

[slide]
# 9. sort
```bash
# 以升序对文件内容排序
$ sort names.txt

# 以降序对文件内容排序
$ sort -r names.txt
```

[slide]
# 10. export
```bash
# 输出跟字符串oracle匹配的环境变量
$ export | grep ORCALE
declare -x ORACLE_BASE="/u01/app/oracle"
declare -x ORACLE_HOME="/u01/app/oracle/product/10.2.0"
declare -x ORACLE_SID="med"
declare -x ORACLE_TERM="xterm"

# 设置全局环境变量
$ export ORACLE_HOME=/u01/app/oracle/product/10.2.0
```


[slide]
# 11. ls
```bash
# 以易读的方式显示文件大小(显示为MB,GB...)
$ ls -lh
-rw-r----- 1 ramesh team-dev 8.9M Jun 12 15:27 arch-linux.txt.gz

# 以最后修改时间升序列出文件
$ ls -ltr

# 在文件名后面显示文件类型
$ ls -F
```

[slide]
# 12. pwd
```bash
# 输出当前工作目录
$ pwd
```

[slide]
# 13. cd
```bash
# cd -可以在最近工作的两个目录间切换
```

[slide]
# 14. service
service命令用于运行System V init脚本，这些脚本一般位于/etc/init.d文件下，这个命令可以直接运行这个文件夹里面的脚本，而不用加上路径
```bash
# 查看服务状态
$ service ssh status

# 查看所有服务状态
$ service --status-all

# 重启服务
$ service ssh restart
```

[slide]
# 15. ps
ps命令用于显示正在运行中的进程的信息，ps命令有很多选项，这里只列出了几个

```bash
# 查看当前正在运行的所有进程
$ ps -ef | more

# 以树状结构显示当前正在运行的进程，H选项表示显示进程的层次结构
$ ps -efH | more
```


[slide]
# 16. kill
kill用于终止一个进程。一般我们会先用`ps -ef`查找某个进程得到它的进程号，然后再使用`kill -9 `进程号终止该进程。
```bash
$ ps -ef | grep vim
ramesh    7243  7222  9 22:43 pts/2    00:00:00 vim

$ kill -9 7243
```

[slide]
# 17. rm
```bash
# 删除文件前先确认
$ rm -i filename.txt

# 在文件名中使用shell的元字符会非常有用。删除文件前先打印文件名并进行确认
$ rm -i file*

# 递归删除文件夹下所有文件，并删除该文件夹
$ rm -r example
```

[slide]
# 18. cp
```bash
# 拷贝文件1到文件2，并保持文件的权限、属主和时间戳
$ cp -p file1 file2

# 拷贝file1到file2，如果file2存在会提示是否覆盖
$ cp -i file1 file2
```

[slide]
# 19. mv
```bash
# 将文件名file1重命名为file2，如果file2存在则提示是否覆盖
$ mv -i file1 file2

# 注意如果使用-f选项则不会进行提示
# -v会输出重命名的过程，当文件名中包含通配符时，这个选项会非常方便
$ mv -v file1 file2
```

[slide]
# 20. cat
```bash
# 你可以一次查看多个文件的内容，下面的命令会先打印file1的内容，然后打印file2的内容
$ cat file1 file2

# -n命令可以在每行的前面加上行号
$ cat -n /etc/logrotate.conf
/var/log/btmp {
missingok
3       monthly
4       create 0660 root utmp
5       rotate 1
6 }
```


[slide]
# 21. chmod
chmod用于改变文件和目录的权限
```bash
# 给指定文件的属主和属组所有权限(包括读、写、执行)
$ chmod ug+rwx file.txt

# 删除指定文件的属组的所有权限
$ chmod g-rwx file.txt

# 修改目录的权限，以及递归修改目录下面所有文件和子目录的权限
$ chmod -R ug+rwx file.txt
```

[slide]
# 22. chown
chown用于改变文件属主和属组
```bash
# 同时将某个文件的属主改为oracle，属组改为db
$ chown oracle:dba dbora.sh

# 使用-R选项对目录和目录下的文件进行递归修改
$ chown -R oracle:dba /home/oracle
```

[slide]
# 23. passwd
```bash
# passwd用于在命令行修改密码，使用这个命令会要求你先输入旧密码，然后输入新密码
$ passwd

# 超级用户可以用这个命令修改其他用户的密码，这个时候不需要输入用户的密码
passwd USERNAME

# passwd还可以删除某个用户的密码，这个命令只有root用户才能操作，删除密码后，这个用户不需要输入密码就可以登录到系统
passwd -d USERNAME
```

[slide]
# 24. mkdir
```bash
# 在home目录下创建一个名为temp的目录
$ mkdir ~/temp

# 使用-p选项可以创建一个路径上所有不存在的目录
$ mkdir -p dir1/dir2/dir3/dir4/
```

[slide]
# 25. ifconfig
ifconfig用于查看和配置Linux系统的网络接口
```bash
# 查看所有网络接口及其状态
$ ifconfig -a

# 使用up和down命令启动或停止某个接口
$ ifconfig eth0 up
$ ifconfig eth0 down
```

[slide]
# 26. man
```bash
# 显示某个命令的man页面
$ man crontab
```

[slide]
# 27. tail
```bash
# tail命令默认显示文件最后的10行文本
$ tail filename.txt

# 你可以使用-n选项指定要显示的行数
$ tail -n N filename.txt

# 你也可以使用-f选项进行实时查看，这个命令执行后会等待，如果有新行添加到文件尾部，它会继续输出新的行，在查看日志时这个选项会非常有用。你可以通过CTRL-C终止命令的执行
$ tail -f log-file
```

[slide]
# 28. less
```bash
# 这个命名可以在不加载整个文件的前提下显示文件内容，在查看大型日志文件的时候这个命令会非常有用
$ less huge-log-file.log

# 当你用less命令打开某个文件时，下面两个按键会给你带来很多帮助，他们用于向前和向后滚屏
CTRL+F – forward one window
CTRL+B – backward one window
```

[slide]
# 29. su
```bash
# su命令用于切换用户账号，超级用户使用这个命令可以切换到任何其他用户而不用输入密码
$ su - USERNAME

# 用另外一个用户名执行一个命令下面的示例中用户john使用raj用户名执行ls命令，执行完后返回john的账号
[john@dev-server]$ su - raj -c 'ls'
[john@dev-server]$

# 用指定用户登录，并且使用指定的shell程序，而不用默认的
$ su -s 'SHELLNAME' USERNAME
```

[slide]
# 30. yum
```bash
# 使用yum安装apache
$ yum install httpd

# 更新apache
$ yum update httpd

# 卸载/删除apache
$ yum remove httpd
```


[slide]
# 31. rpm
```bash
# 使用rpm安装apache
rpm -ivh httpd-2.2.3-22.0.1.el5.i386.rpm

# 更新apache
rpm -uvh httpd-2.2.3-22.0.1.el5.i386.rpm

# 卸载/删除apache
rpm -ev httpd
```

[slide]
# 32. ping
```bash
# ping一个远程主机，只发5个数据包
$ ping -c 5 gmail.com
```


[slide]
# 33. wget
```bash
# 使用wget从网上下载软件、音乐、视频
$ wget http://prdownloads.sourceforge.net/sourceforge/nagios/nagios-3.2.1.tar.gz

# 下载文件并以指定的文件名保存文件
$ wget -O taglist.zip http://www.vim.org/scripts/download_script.php?src_id=7701
```


[slide]
# sed高级范例
1 . 显示文件部分内容
```bash
# 选项 n  抑制输出所有文件的内容，而命令  p 会只输出22行到20行的内容
~$ sed -n 22,29p testfile.txt
```

[slide]
2 . 显示除了指定行的所有内容
```bash
# 命令 d 会将指定行从输出中删除
~$ sed 22,29d testfile.txt
```

[slide]
3 . 从第N行开始，每3行显示一行内容
```bash
# 要从第2行开始，显示每3行的内容，使用下面命令
~$ sed -n '2-3p' file.txt
```

[slide]
4 . 删除行
```bash
# N 表示行号，d 表示删除指定行
~$ sed Nd testfile.txt
    
# 删除最后一行
~$ sed '$'d testfile.txt

# 删除连续的几行
~$ sed '29-34d' testfile.txt

# 只保留指定范围的内容 符号 ! 表示非
~$ sed '29-34!d' testfile.txt
```

[slide]
5 . 增加空行/空格

```bash
# 在每个非空行后添加一个空行, 使用选项 G 
~$ sed G testfile.txt
```

[slide]
6 .  搜索并替换字符串
```bash
# 命令 s 会搜索每行中第一个单词 danger 然后将之替换为 safety 
~$ sed 's/danger/safety/' testfile.txt
    
# 全文搜索并替换字符串，将命令  g 与 s 连用
~$ sed 's/danger/safety/g' testfile.txt

# 替换第n次出现的字符串模式
# 将第二次出现的 safety 替换为 danger 
~$ sed 's/danger/safety/2' testfile.txt
    
# 将每行中的第二次出现的 'danger '替换掉
~$ sed 's/danger/safety/2g' testfile.txt

# 只替换指定行上的字符串, 只会在第四行上做替换.
~$ sed '4 s/danger/safety/' testfile.txt

# 只替换指定行上的字符串, 只会在第4-9行上做替换.  
[linuxtechi@localhost ~]$  sed '4-9 s/danger/safety/' testfile.txt
```

[slide]
7 . 在匹配搜索的后面/前面添加一行
```bash
# 在匹配位置的后面添加一行内容, 使用命令 a 
~$ sed '/danger/a "This is new line with text after match"' testfile.txt
    
# 在匹配位置的前面添加一行内容, 使用命令 i
~$ sed '/danger/i "This is new line with text before match" ' testfile.txt
```

[slide]
8 . 修改匹配行的整个内容
```bash
# 修改匹配行的整个内容使用命令 c
# 若某行中包含 'danger', 则整行内容都会改变
~$ sed '/danger/c "This will be the new line" ' testfile.txt
```

[slide]
9 . 运行多条sed命令
```bash
# 若要运行多条sed表达式, 使用命令 e 来将多个sed命令串起来,
~$  sed -e 's/danger/safety/g' -e 's/hate/love/' testfile.txt
```

[slide]
10 . 修改文件前做个备份
```bash
# 使用选项 '-i.bak' 来在修改文件前创建备份,
# 创建一个以 .bak 为后缀的备份文件.
~$ sed -i.bak -e 's/danger/safety/g'  testfile.txt
```

[slide]
11 . 删除以指定模式开头并且以指定模式结尾的行
```bash
# 删除以指定模式开头并且以指定模式结尾的行,使用以下命令
# 删除以 'danger' 开头且以 'stops' 结尾的行， '.*' 表示中间可以有任意多个单词.
~$ sed -e 's/danger.*stops//g' testfile.txt
```

[slide]
12 . 在行中添加内容
```bash
# 使用sed和正则表达式在每行前面添加内容
# 在每一行前面都加上 'testing sed'
~$ sed -e 's/.*/testing sed &/' testfile.txt
```

[slide]
13 . 删除所有注释行以及空行
```bash
# 删除所有注释的行(以#开头的行)以及空行,
~$ sed -e 's/#.*//;/^$/d' testfile.txt
    
#只删除注释行的话
~$ sed -e 's/#.*//' testfile.txt
```

[slide]
14 . 从 /etc/passwd 中抽取出所有的用户名列表
```bash
# 从 /etc/passwd 中抽取出所有的用户名列表
~$  sed 's/\([^:]*\).*/\1/' /etc/passwd
```
