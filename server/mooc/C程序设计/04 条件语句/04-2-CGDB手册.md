title: 如何使用CGDB调试代码
theme: light

[slide]
# 如何使用CGDB调试代码
## How to debug c program by using cgdb


[slide]
# 1. 安装依赖包
```bash
$ sudo apt-get install libncurses5-dev libncursesw5-dev
$ sudo apt-get install autoconf automake
$ sudo apt-get install texinfo 
$ sudo apt-get install libreadline6 libreadline6-dev
```


[slide]
# 2. 预编译处理
```bash
$ git clone git://github.com/cgdb/cgdb.git
$ cd cgdb
$ ./autogen.sh
3. 安装
$ ./configure --prefix=/usr/local
$ make
$ sudo make install
CXXFLAGS='-std=c++11' ./configure --prefix=/usr/local
```


[slide]
# 4. 使用说明
- cgdb分为上下两栏，上方类似`vi`窗口显示代码，下方gdb窗口进行调试操作，上下窗口- 连动，也就是说vi窗口里显示的代码会跟随gdb窗口里调试的位置同步进退；
- 按`esc键`可让输入焦点进入到`vi`窗口，再按`i键`- 回到gdb窗口。按其它键也可以进入到`vi`窗口;
- vi窗口可进行的操作包括: 上下左右翻动，按`冒号:`开始进行设置，比如设置上面窗口全屏显示，按`斜杆/`为在当前文件内搜索，按`o键`可以显示`当前程序关联的文件列表`，按`空格`则在当前位置`设置/取消断点`。


[slide]
# 5. 基本命令

**cgdb窗口命令**

> 
- 让用户进入gdb模式：i
- 让用户进入TTY模式： I


[slide]
**代码窗口**

> 
- 向上翻一页：ctrl b
- 向上翻半页：ctrl u
- 向下翻一页：ctrl f
- 向下翻半页：ctrl d
- 移动到文件顶部：gg
- 移动到文件底部：G
- 从当前光标向下搜索：/
- 从当前光标向上搜索：？
- 打开文件对话框窗口（用户查找）：o


[slide]
**cgdb命令窗口的调整**

> 
- 缓慢缩小：-
- 缓慢增大：=
- 快速缩小：shift -
- 快速增大：shift +