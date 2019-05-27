title: C Typedef
theme: light

[slide]
# C Typedef
## Typedef


[slide]
# C typedef

C 语言提供了 `typedef` 关键字，您可以使用它来为类型取一个新的名字。下面的实例为单字节数字定义了一个术语 BYTE：
```c
typedef unsigned char BYTE;
```
在这个类型定义之后，标识符 `BYTE` 可作为类型 `unsigned char` 的缩写，例如：
```c
BYTE  b1, b2;
```

[slide]
# 书写规则
按照惯例，定义时会大写字母，以便提醒用户类型名称是一个象征性的缩写，但也可以使用小写字母，如下：
```c
typedef unsigned char byte;
```

[slide]
一般我们使用 `typedef` 来为用户自定义的数据类型取一个新的名字。例如，对结构体使用 `typedef` 来定义一个新的数据类型，然后使用这个新的数据类型来直接定义结构变量，如下：
```c
#include <stdio.h>
#include <string.h>
typedef struct {
  int   id;
  char  title[20];
  char  author[20];
} Book;

int main( ) {
  Book sBook;
  sBook.id = 1209814;
  strcpy( sBook.title, "C Programming");
  strcpy( sBook.author, "Nuha Ali");
  printf( "Book id : %d\n", sBook.id);
  printf( "Book title :   %s\n", sBook.title);
  printf( "Book author :  %s\n", sBook.author);
  return 0;
}
//它会产生下列结果
Book  id : 1209814
Book  title : C Programming
Book  author : Nuha Ali
```


[slide]
# typedef vs #define

`#define` 是 C 指令，用于为各种数据类型定义别名，与 `typedef` 类似，但是它们有以下几点不同：

* `typedef` 仅限于为类型定义符号名称，`#define` 不仅可以为类型定义别名，也能为数值定义别名，比如您可以定义 1 为ONE。
* `typedef` 是由编译器执行解释的，`#define` 语句是由预编译器进行处理的。


[slide]
下面是 `#define` 的最简单的用法：

```c
#include <stdio.h>
#define TRUE  1
#define FALSE 0
int main( ) {
   printf( "Value of TRUE : %d\n", TRUE);
   printf( "Value of FALSE : %d\n", FALSE);
   return 0;
}

//它会产生下列结果：
Value of TRUE : 1
Value of FALSE : 0
```
