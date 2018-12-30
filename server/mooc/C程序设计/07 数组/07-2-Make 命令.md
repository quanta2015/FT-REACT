Make 命令教程
Make Tutorial
--

Make
Make是最常用的构建工具，诞生于1977年，主要用于C语言的项目。但是实际上 ，任何只要某个文件有变化，就要重新构建的项目，都可以用Make构建。

--

Make的概念
Make这个词，英语的意思是"制作"。Make命令直接用了这个意思，就是要做出某个文件。比如，要做出文件a.txt，就可以执行下面的命令。

$ make a.txt
但是如果你真的输入这条命令，它并不会起作用。因为Make命令本身并不知道，如何做出a.txt，需要有人告诉它，如何调用其他命令完成这个目标。

比如，假设文件 a.txt 依赖于 b.txt 和 c.txt，是后面两个文件连接（cat命令）的产物。那么，make 需要知道下面的规则。

a.txt: b.txt c.txt
    cat b.txt c.txt > a.txt
也就是说，make a.txt 这条命令的背后，实际上分成两步：第一步，确认 b.txt 和 c.txt 必须已经存在，第二步使用 cat 命令 将这个两个文件合并，输出为新文件。 像这样的规则，都写在一个叫做Makefile的文件中，Make命令依赖这个文件进行构建。Makefile文件也可以写为makefile， 或者用命令行参数指定为其他文件名。

$ make -f rules.txt
# 或者
$ make --file=rules.txt
上面代码指定make命令依据rules.txt文件中的规则，进行构建。 总之，make只是一个根据指定的Shell命令进行构建的工具。它的规则很简单，你规定要构建哪个文件、它依赖哪些源文件，当那些文件有变动时，如何重新构建它。

Makefile格式
make命令的构建规则都写在Makefile文件里面，要学会如何Make命令，就必须学会如何编写Makefile文件。

Makefile基本规则
Makefile文件由一系列规则（rules）构成。每条规则的形式如下。

<target> : <prerequisites> 
[tab]  <commands>
上面第一行冒号前面的部分，叫做"目标"（target），冒号后面的部分叫做"前置条件"（prerequisites）；第二行必须由一个tab键起首，后面跟着"命令"（commands）。

"目标"是必需的，不可省略；"前置条件"和"命令"都是可选的，但是两者之中必须至少存在一个。 每条规则就明确两件事：构建目标的前置条件是什么，以及如何构建。下面就详细讲解，每条规则的这三个组成部分。

目标（target）
1 . 一个目标（target）就构成一条规则。
目标通常是文件名，指明Make命令所要构建的对象，比如上文的 a.txt 。目标可以是一个文件名，也可以是多个文件名，之间用空格分隔。

2 . 除了文件名，目标还可以是某个操作的名字，这称为"伪目标"（phony target）。

clean:
      rm *.o
上面代码的目标是clean，它不是文件名，而是一个操作的名字，属于"伪目标 "，作用是删除对象文件。

$ make  clean
3 . 声明伪目标
但是，如果当前目录中，正好有一个文件叫做clean，那么这个命令不会执行。因为Make发现clean文件已经存在，就认为没有必要重新构建了，就不会执行指定的rm命令。为了避免这种情况，可以明确声明clean是"伪目标"，写法如下。

.PHONY: clean
clean:
        rm *.o temp
声明clean是"伪目标"之后，make就不会去检查是否存在一个叫做clean的文件，而是每次运行都执行对应的命令。

4 . 如果Make命令运行时没有指定目标，默认会执行Makefile文件的第一个目标。

$ make
上面代码执行Makefile文件的第一个目标。

前置条件（prerequisites）
前置条件通常是一组文件名，之间用空格分隔。它指定了"目标"是否重新构建的判断标准：只要有一个前置文件不存在，或者有过更新（前置文件的last-modification时间戳比目标的时间戳新），"目标"就需要重新构建。

1 . 下列代码中，构建 result.txt 的前置条件是 source.txt 。如果当前目录中，source.txt 已经存在，那么make result.txt可以正常运行，否则必须再写一条规则，来生成 source.txt 。

result.txt: source.txt
    cp source.txt result.txt
2 . 下列代码中，source.txt后面没有前置条件，就意味着它跟其他文件都无关，只要这个文件还不存在，每次调用make source.txt，它都会生成。

source.txt:
    echo "this is the source" > source.txt
3 . 下列命令连续执行两次make result.txt。第一次执行会先新建 source.txt，然后再新建 result.txt。第二次执行，Make发现 source.txt 没有变动（时间戳晚于 result.txt），就不会执行任何操作，result.txt 也不会重新生成。

$ make result.txt
$ make result.txt
4 . 如果需要生成多个文件，往往采用下面的写法。

source: file1 file2 file3
上面代码中，source 是一个伪目标，只有三个前置文件，没有任何对应的命令。

$ make source
执行make source命令后，就会一次性生成 file1，file2，file3 三个文件。这比下面的写法要方便很多。

$ make file1
$ make file2
$ make file3
命令
命令（commands）表示如何更新目标文件，由一行或多行的Shell命令组成。它是构建"目标"的具体指令，它的运行结果通常就是生成目标文件。每行命令之前必须有一个tab键。

all:
> echo Hello, world
注释
井号（#）在Makefile中表示注释。

# 这是注释
result.txt: source.txt
    # 这是注释
    cp source.txt result.txt # 这也是注释
通配符
通配符用来指定一组符合条件的文件名。Makefile 的通配符与 Bash 一致，主要有星号（）、问号（？）和 [...] 。比如， .o 表示所有后缀名为o的文件。

clean:
        rm -f *.o
模式匹配
Make命令允许对文件名，进行类似正则运算的匹配，主要用到的匹配符是%。比如，假定当前目录下有 f1.c 和 f2.c 两个源码文件，需要将它们编译为对应的对象文件。

%.o: %.c
等同于下面的写法。

f1.o: f1.c
f2.o: f2.c
makefile范例
假设工程有main.c和common.c这两个文件，现在需要编译项目。

1 . 静态编译
直接将所有编译命令按顺序输入

build:
   gcc -c main.c -std=c99
   gcc -c common.c -std=c99
   gcc main.o common.o -o main

clean:
   rm main *.o
2. 动态编译 
根据文件的依赖关系编写

main: main.o common.o
   gcc main.o common.o -o main

06.o:main.c
   gcc -c main.c -std=c99

common.o:common.c
   gcc -c common.c -std=c99

clean:
   rm main *.o
