title: Docker优化
theme: light

[slide]
# Docker优化
Docker Adv
1. Docker Problem
1.1 Dockerfile 的问题
虽然 Dockerfile 简化了镜像构建的过程，并且把这个过程可以进行版本控制，但是不正当的 Dockerfile 使用也会导致很多问题：

docker 镜像太大：如果你经常使用镜像或者构建镜像，一定会遇到那种很大的镜像，甚至有些能达到 2G 以上

docker 镜像的构建时间过长：每个 build 都会耗费很长时间，对于需要经常构建镜像（比如单元测试）的地方这可能是个大问题

重复劳动：多次镜像构建之间大部分内容都是完全一样而且重复的，但是每次都要做一遍，浪费时间和资源

1.2 Dockerfile 和镜像构建
Dockerfile 是由一个个指令组成的，每个指令都对应着最终镜像的一层。每行的第一个单词就是命令，后面所有的字符串是这个命令的参数，关于 Dockerfile 支持的命令以及它们的用法，可以参考 官方文档 ，这里不再赘述。

当运行 docker build 命令的时候，整个的构建过程是这样的：

读取 Dockerfile 文件发送到 docker daemon

读取当前目录的所有文件（context），发送到 docker daemon

对 Dockerfile 进行解析，处理成命令加上对应参数的结构

按照顺序循环遍历所有的命令，对每个命令调用对应的处理函数进行处理

每个命令（除了 FROM）都会在一个容器执行，执行的结果会生成一个新的镜像

为最后生成的镜像打上标签

4.3 使用统一的 base 镜像
有些文章讲优化镜像会提倡使用尽量小的基础镜像，比如 busybox 或者 alpine 等。我更推荐使用统一的大家比较熟悉的基础镜像，比如 ubuntu，centos 等，因为基础镜像只需要下载一次可以共享，并不会造成太多的存储空间浪费。它的好处是这些镜像的生态比较完整，方便我们安装软件，除了问题进行调试。

1.4 动静分离
经常变化的内容和基本不会变化的内容要分开，把不怎么变化的内容放在下层，创建出来不同基础镜像供上层使用。比如可以创建各种语言的基础镜像，python2.7、python3.4、go1.7、java7等等，这些镜像包含了最基本的语言库，每个组可以在上面继续构建应用级别的镜像。

1.5 最小原则：只安装必需的东西
为了降低复杂性、减少依赖、减小文件大小、节约构建时间，你应该避免安装任何不必要的包，不要仅仅为了“锦上添花”而安装某个包。因为镜像的扩展很容易，而且运行容器的时候也很方便地对其进行修改。这样可以保证镜像尽可能小，构建的时候尽可能快，也保证未来的更快传输、更省网络资源。例如，不要在数据库镜像中包含一个文本编辑器。

1.6 一个原则：每个镜像只有一个功能
不要在容器里运行多个不同功能的进程，每个镜像中只安装一个应用的软件包和文件，需要交互的程序通过 pod（kubernetes 提供的特性） 或者容器之间的网络进行交流。这样可以保证模块化，不同的应用可以分开维护和升级，也能减小单个镜像的大小。

1.7 使用更少的层
虽然看起来把不同的命令尽量分开来，写在多个命令中容易阅读和理解。但是这样会导致出现太多的镜像层，而不好管理和分析镜像，而且镜像的层是有限的。尽量把相关的内容放到同一个层，使用换行符进行分割，这样可以进一步减小镜像大小，并且方便查看镜像历史。

1.8 减少每层的内容
尽管只安装必须的内容，在这个过程中也可能会产生额外的内容或者临时文件，我们要尽量让每层安装的东西保持最小。

比如使用 --no-install-recommends 参数告诉 apt-get 不要安装推荐的软件包

安装完软件包，清楚 /var/lib/apt/list/ 缓存

删除中间文件：比如下载的压缩包

删除临时文件：如果命令产生了临时文件，也要及时删除

使用 .dockerignore 文件：创建一个 .dockerignore 文件来指定要忽略的文件和目录。.dockerignore 文件的排除模式语法和 Git 的 .gitignore 文件类似。

1.9 不要在 Dockerfile 中修改文件的权限
因为 docker 镜像是分层的，任何修改都会新增一个层，修改文件或者目录权限也是如此。如果修改大文件或者目录的权限，会把这些文件复制一份，这样很容易导致镜像很大。

解决方案也很简单，要么在添加到 Dockerfile 之前就把文件的权限和用户设置好，要么在容器启动脚本（entrypoint）做这些修改。

1.10 利用 cache 来加快构建速度
在镜像的构建过程中，Docker 会遍历 Dockerfile 文件中的指令，然后按顺序执行。在执行每条指令之前，Docker 都会在缓存中查找是否已经存在可重用的镜像，如果有就使用现存的镜像，不再重复创建。如果你不想在构建过程中使用缓存，你可以在 docker build 命令中使用--no-cache=true选项。

不过从 1.10 版本开始，Content Addressable Storage 的引入导致缓存功能的失效，目前引入了 --cache-from 参数可以手动指定一个镜像来使用它的缓存。

但是，如果你想在构建的过程中使用缓存，你得明白什么时候会，什么时候不会找到匹配的镜像。Docker 遵循的基本规则如下：

从一个基础镜像开始（FROM 指令指定），下一条指令将和该基础镜像的所有子镜像进行匹配，检查这些子镜像被创建时使用的指令是否和被检查的指令完全一样。如果不是，则缓存失效。

在大多数情况下，只需要简单地对比 Dockerfile 中的指令和子镜像。然而，有些指令需要更多的检查和解释。

对于 ADD 和 COPY 指令，镜像中对应文件的内容也会被检查，每个文件都会计算出一个校验和。文件的最后修改时间和最后访问时间不会纳入校验。在缓存的查找过程中，会将这些校验和和已存在镜像中的文件校验和进行对比。如果文件有任何改变，比如内容和元数据，缓存失效。

除了 ADD 和 COPY 指令，缓存匹配过程不会查看临时容器中的文件来决定缓存是否匹配。例如，当执行完 RUN apt-get -y update指令后，容器中一些文件被更新，但 Docker 不会检查这些文件。这种情况下，只有指令字符串本身被用来匹配缓存。 一旦缓存失效，所有后续的 Dockerfile 指令都将产生新的镜像，缓存不会被使用。

1.11 版本控制和自动构建
最好把 Dockerfile 和对应的应用代码一起放到版本控制中，然后能够自动构建镜像。这样的好处是可以追踪各个版本镜像的内容，方便了解不同镜像有什么区别，对于调试和回滚都有好处。

另外，如果运行镜像的参数或者环境变量很多，也要有对应的文档给予说明，并且文档要随着 Dockerfile 变化而更新，这样任何人都能参考着文档很容易地使用镜像，而不是下载了镜像不知道怎么用。

1.12 一个容器只运行一个进程
在大多数情况下，你应该保证在一个容器中只运行一个进程。将多个应用解耦到不同容器中，可以保证应用的横向扩展性和重用容器。如果你一个服务依赖于另一个服务，可以利用容器链接（link）。

1.13 将多行参数排序
将多行参数按字母顺序排序（比如要安装多个包时）。这可以帮助你避免重复包含同一个包，更新包列表时也更容易。也便于 PRs 阅读和省察。建议在反斜杠符号\之前添加一个空格，以增加可读性。

下面来自buildpack-deps镜像的例子：

RUN apt-get update && apt-get install -y \
  bzr \
  cvs \
  git \
  mercurial \
  subversion
1.14 不要在 Dockerfile 定义公共端口
如果在 Dockerfile 中定义了公共端口，你就只能运行一个实例。一般来说都是自定义私有端口，然后在运行时使用 -p 参数指定公共端口。

# private and public mapping
EXPOSE 80:8080

# private only
EXPOSE 80
1.15 在定义 CMD 和 ENTRYPOINT 时使用数组
定义定义 CMD 和 ENTRYPOINT 时可以使用下面2种方法。但是如果使用方法1的时候，docker 会在前面自动加上 /bin/sh -c ,这样就会导致某个非预期的结果。因此尽量使用方法2也就是数组方式。

CMD /bin/echo
# or
CMD ["/bin/echo"]
2. Dockerfile 指令
下面针对 Dockerfile 中各种指令的最佳编写方式给出建议。

2.1 FROM
只要有可能，请使用当前官方仓库作为构建你镜像的基础。我们推荐使用 Debian image ，因为它被严格控制并保持最小尺寸（当前小于 150 mb），但仍然是一个完整的发行版。

2.2 LABEL
你可以给镜像添加标签来帮助组织镜像、记录许可信息、辅助自动化构建，或者因为其他的原因。每个标签一行，由 LABEL 开头加上一个或多个标签对。下面的示例展示了各种不同的可能格式。注释内容是解释。

注意：如果你的字符串中包含空格，将字符串放入引号中或者对空格使用转义。如果字符串内容本身就包含引号，必须对引号使用转义。

# Set one or more individual labels
LABEL com.example.version="0.0.1-beta"
LABEL vendor="ACME Incorporated"
LABEL com.example.release-date="2015-02-12"
LABEL com.example.version.is-production=""

# Set multiple labels on one line
LABEL com.example.version="0.0.1-beta" com.example.release-date="2015-02-12"

# Set multiple labels at once, using line-continuation characters to break long lines
LABEL vendor=ACME\ Incorporated \
      com.example.is-beta= \
      com.example.is-production="" \
      com.example.version="0.0.1-beta" \
      com.example.release-date="2015-02-12"
2.3 RUN
一如往常，保持你的 Dockerfile 文件更具可读性，可理解性，以及可维护性，将长的或复杂的RUN声明用反斜杠分割成多行。

2.4 apt-get
也许 RUN 指令最常见的用例是安装包用的 apt-get 。因为 RUN apt-get 指令会安装包，所以有几个问题需要注意。

不要使用RUN apt-get upgrade或dist-upgrade，因为许多基础镜像中的“必须”包不会在一个非特权容器中升级。如果基础镜像中的某个包过时了，你应该联系它的维护者。如果你确定某个特定的包，比如 foo ，需要升级，使用apt-get install -y foo就行，该指令会自动升级 foo 包。

永远将RUN apt-get update和apt-get install组合成一条RUN声明，例如：

RUN apt-get update && apt-get install -y \
        package-bar \
        package-baz \
        package-foo
将apt-get update放在一条单独的RUN声明中会导致缓存问题以及后续的apt-get install失败。比如，假设你有一个 Dockerfile 文件：

FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install -y curl
构建镜像后，所有的层都在 Docker 的缓存中。假设你后来又修改了其中的apt-get install，添加了一个包：

FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install -y curl nginx
Docker 发现修改后的RUN apt-get update指令和之前的完全一样。所以，apt-get update不会执行，而是使用之前的缓存镜像。因为apt-get update没有运行，后面的apt-get install可能安装的是过时的curl和nginx版本。

使用RUN apt-get update && apt-get install -y可以确保你的 Dockerfiles 每次安装的都是包的最新的版本，而且这个过程不需要进一步的编码或额外干预。这项技术叫作 cache busting 。你也可以显示指定一个包的版本号来达到 cache-busting。这就是所谓的固定版本，例如：

RUN apt-get update && apt-get install -y \
    package-bar \
    package-baz \
    package-foo=1.3.*
固定版本会迫使构建过程检索特定的版本，而不管缓存中有什么。这项技术也可以减少因所需包中未预料到的变化而导致的失败。

下面是一个RUN指令的示例模板，展示了所有关于apt-get的建议。

RUN apt-get update && apt-get install -y \
    aufs-tools \
    automake \
    build-essential \
    curl \
    dpkg-sig \
    libcap-dev \
    libsqlite3-dev \
    mercurial \
    reprepro \
    ruby1.9.1 \
    ruby1.9.1-dev \
    s3cmd=1.1.* \
 && rm -rf /var/lib/apt/lists/*
其中s3cmd指令指定了一个版本号1.1.0*。如果之前的镜像使用的是更旧的版本，指定新的版本会导致apt-get udpate缓存失效并确保安装的是新版本。

另外，清理掉 apt 缓存，删除var/lib/apt/lists可以减小镜像大小。因为RUN指令的开头为apt-get udpate，包缓存总是会在apt-get install之前刷新。

注意：官方的 Debian 和 Ubuntu 镜像会自动运行apt-get clean，所以不需要显示的调用apt-get clean。

2.5 CMD
CMD 指令用于执行目标镜像中包含的软件，可以包含参数。 CMD 大多数情况下都应该以 CMD ["executable", "param1", "param2"…]的形式使用。因此，如果创建镜像的目的是为了部署某个服务(比如 Apache、Rails…)，你可能会执行类似于CMD ["apache2","-DFOREGROUND"]形式的命令。实际上，我们建议任何服务镜像都使用这种形式的命令。

多数情况下， CMD 都需要一个交互式的 shell(bash,Python,perl,etc)，例如，CMD ["perl","-de0"],CMD ["php","-a"]。使用这种形式意味着，当你执行类似docker run -it python时，你会进入一个准备好的 shell 中。 CMD 应该在极少的情况下才能以CMD ["param","param"]的形式与 ENTRYPOINT 协同使用，除非你和你的预期用户都对 ENTRYPOINT 的工作方式十分熟悉。

2.6 EXPOSE
EXPOSE 指令用于指定容器将要监听连接的端口。因此，你应该为你的应用程序使用常见熟知的端口。例如，提供 Apache web 服务的镜像将使用 EXPOSE 80，而提供 MongoDB 服务的镜像使用 EXPOSE 27017，等等。

对于外部访问，镜像用户可以在执行docker run时使用一个标志来指示如何将指定的端口映射到所选择的端口。对于容器 链接，Docker 提供环境变量从接收容器回溯到源容器（例如，MYSQL_PORT_3306_TCP）。

2.7 ENV
为了便于新程序运行，你可以使用ENV来为容器中安装的程序更新PATH环境变量。例如，ENV PATH /usr/local/nginx/bin:$PATH将确保CMD ["nginx"]能正确运行。

ENV 指令也可用于为你想要容器化的服务提供必要的环境变量，比如 Postgres 需要的 PGDATA 。

最后， ENV 也能用于设置常见的版本号，以便维护 version bumps，参考下面的示例：

ENV PG_MAJOR 9.3
ENV PG_VERSION 9.3.4
RUN curl -SL http://example.com/postgres-$PG_VERSION.tar.xz | tar -xJC /usr/src/postgress && …
ENV PATH /usr/local/postgres-$PG_MAJOR/bin:$PATH
类似于程序中的常量（与硬编码的值相对），这种方法可以让你只需改变单条 ENV 指令来自动改变容器中的软件版本。

2.8 ADD 和 COPY
虽然ADD和COPY功能类似，但一般优先使用COPY。因为它比ADD更透明。COPY只支持简单将本地文件拷贝到容器中，而ADD有一些并不明显的功能（比如本地 tar 提取和远程 URL 支持）。因此，ADD的最佳用例是将本地 tar 文件自动提取到镜像中，例如ADD rootfs.tar.xz。

如果你的 Dockerfiles 有多个步骤需要使用上下文中不同的文件。单独COPY每个文件，而不是一次性COPY完。这将保证每个步骤的构建缓存只在特定的文件变化时失效。

例如：

COPY requirements.txt /tmp/
RUN pip install --requirement /tmp/requirements.txt
COPY . /tmp/
如果将COPY . /tmp/放置在RUN指令之前，只要.目录中任何一个文件变化，都会导致后续指令的缓存失效。

为了让镜像尽量小，最好不要使用ADD指令从远程 URL 获取包，而是使用curl和wget。这样你可以在文件提取完之后删掉不再需要的文件，可以避免在镜像中额外添加一层。（译者注：ADD指令不能和其他指令合并，所以前者ADD指令会单独产生一层镜像。而后者可以将获取、提取、安装、删除合并到同一条RUN指令中，只有一层镜像。）比如，你应该尽量避免下面这种用法：

ADD http://example.com/big.tar.xz /usr/src/things/
RUN tar -xJf /usr/src/things/big.tar.xz -C /usr/src/things
RUN make -C /usr/src/things all
而是使用下面这种：

RUN mkdir -p /usr/src/things \
    && curl -SL http://example.com/big.tar.xz \
    | tar -xJC /usr/src/things \
    && make -C /usr/src/things all
上面使用的管道操作，所以没有中间文件需要删除。

对于其他不需要ADD的自动提取（tar）功能的文件或目录，你应该坚持使用COPY。

2.9 ENTRYPOINT
ENTRYPOINT 的最佳用处是设置镜像的主命令，允许将镜像当成命令本身来运行（用CMD提供默认选项）。

例如，下面的示例镜像提供了命令行工具s3cmd:

ENTRYPOINT ["s3cmd"]
CMD ["--help"]
现在该镜像直接这么运行，显示命令帮助：

$ docker run s3cmd
或者提供正确的参数来执行某个命令：

$ docker run s3cmd ls s3://mybucket
这很有用，因为镜像名还可以当成命令行的参考。

ENTRYPOINT指令也可以结合一个辅助脚本使用，和前面命令行风格类似，即使启动工具需要不止一个步骤。

例如，Postgres 官方镜像使用下面的脚本作为 ENTRYPOINT ：

#!/bin/bash
set -e

if [ "$1" = 'postgres' ]; then
    chown -R postgres "$PGDATA"

    if [ -z "$(ls -A "$PGDATA")" ]; then
        gosu postgres initdb
    fi

    exec gosu postgres "$@"
fi

exec "$@"
注意：该脚本使用了 Bash 的内置命令 exec，所以最后运行的进程就是容器的 PID 为1的进程。这样，进程就可以接收到任何发送给容器的 Unix 信号了。 该辅助脚本被拷贝到容器，并在容器启动时通过ENTRYPOINT执行：

COPY ./docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
该脚本可以让用户用几种不同的方式和 Postgres 交互。

你可以很简单地启动 Postgres ：

$ docker run postgres
也可以执行 Postgres 并传递参数：

$ docker run postgres postgres --help
最后，你还可以启动另外一个完全不同的工具，比如 Bash ：

$ docker run --rm -it postgres bash
2.10 VOLUME
VOLUME 指令用于暴露任何数据库存储区域，配置文件，或容器创建的文件和目录。强烈建议使用 VOLUME 来管理镜像中的可变部分和镜像用户可以改变部分。

2.11 USER
如果某个服务不需要特权执行，建议使用 USER 指令切换到非 root 用户。先在 Dockerfile 中使用类似RUN groupadd -r postgres && useradd -r -g postgres 。 postgres 的指令创建用户和用户组。

注意：在镜像中，用户和用户组每次被分配的 UID/GID 都是不确定的，下次重新构建镜像时被分配到的 UID/GID 可能会不一样。如果要依赖确定的 UID/GID，你应该显示的指定一个 UID/GID。

你应该避免使用sudo，因为它不可预期的 TTY 和信号转发行为可能造成的问题比解决的还多。如果你真的需要和sudo类似的功能（例如，以 root权限初始化某个守护进程，以非 root 权限执行它），你可以使用gosu。

最后，为了减少层数和复杂度，避免频繁地使用USER来回切换用户。

2.12 WORKDIR
为了清晰性和可靠性，你应该总是在WORKDIR中使用绝对路径。另外，你应该使用WORKDIR来替代类似于RUN cd ... && do-something的指令，后者难以阅读、排错和维护。

2.13 ONBUILD
ONBUILD中的命令会在当前镜像的子镜像构建时执行。可以把ONBUILD命令当成父镜像的 Dockerfile 传递给子镜像的 Dockerfile 的指令。

在子镜像的构建过程中， Docker 会在执行 Dockerfile 中的任何指令之前，先执行父镜像通过 ONBUILD 传递的指令。

当从给定镜像构建新镜像时，ONBUILD指令很有用。例如，你可能会在一个语言栈镜像中使用ONBUILD，语言栈镜像用于在 Dockerfile 中构建用户使用相应语言编写的任意软件，正如 Ruby 的 ONBUILD 变体

使用 ONBUILD 构建的镜像应用一个单独的标签，例如：ruby:1.9-onbuild或ruby:2.0-onbuild。

在 ONBUILD 中使用ADD或 COPY 时要格外小心。如果新的构建上下文中缺少对应的资源， onbuild 镜像会灾难性地失败。添加一个单独的标签，允许 Dockerfile 的作者做出选择，将有助于缓解这种情况。

3. Docker官方经典参考范例
GO

perl

hy

ruby

