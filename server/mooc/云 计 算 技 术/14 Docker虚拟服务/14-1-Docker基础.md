title: Docker基础
theme: light

[slide]
# Docker

[slide]
1. Docker与虚拟机
1.1 什么是 容器 和 虚拟机 ？
容器和虚拟机的目标是一致的：通过一个独立单元将应用与其依赖隔离，这个独立单元可以在任何地方运行。更进一步，容器和虚拟机消除了对物理硬件的依赖，因此可以在权衡能源消耗和成本效益的前提下，更加有效地利用计算资源。

容器和虚拟机最主要的区别在于它们的架构，让我们深入了解一下。

1.2 虚拟机（VM）
虚拟机基本用于模拟真实机器并像真实机器一样地运行程序。虚拟机通过虚拟机管理程序在物理机器之上运行。而虚拟机管理程序运行在主机或硬件上。

虚拟机管理程序 是供虚拟机运行的一段软件、固件或硬件。虚拟机管理程序 运行于实体电脑上，主机为虚拟机提供包括 RAM 以及 CPU 在内的资源，这些资源在虚拟机之间隔离，并且可以按你认为合适的方式分配。所以如果一个虚拟机正在运行一个很占资源的大应用时，那么相较于同一主机上的其他虚拟机，你应该为它分配更多的资源。

综上所述，一个客户机既可以在托管管理程序（hosted hypervisor） 上运行，也可以在 硬件管理程序（bare-metal hypervisor） 上运行。它们之间有几条很重要的差异：

托管管理程序运行于主机的操作系统之上。例如，OSX系统可以安装一个虚拟机 (VirtualBox 或 VMware Workstation)，虚拟机没有直接访问硬件的权限，必须通过操作系统去访问。

托管管理程序对下层硬件没有强依赖。硬件驱动工作由主机操作系统而不是管理程序完成，因此它拥有更高的 硬件兼容性。另一方面，托管管理程序和这硬件之间的这一层增加了额外的资源开销，因此降低了虚拟机的性能。

硬件管理程序 直接安装并运行在主机的硬件上，具有更好的更好的性能、可扩展性和稳定性，但是缺点是硬件兼容性差。因为它直接与下层硬件对接，所以不依赖操作系统。

由于虚拟机本身有一个虚拟操作系统，因此这个管理程序为虚拟机提供了一个管理和运行这个操作系统的平台。基于这个平台，主机可以在这个平台之上运行的虚拟机之间共享资源。虚拟机囊括了虚拟硬件、内核（即操作系统）及用户空间。



1.3 容器（Container）
与提供硬件虚拟的虚拟机不同，容器通过抽象 用户空间 提供了一个操作系统级别的虚拟。容器的意图和目标与虚拟机完全相同。例如，它们都拥有 process 所需的私有空间，都可以以 root 的身份运行命令，拥有私有的网络接口和 IP 地址，提供自定义路由和 iptable 规则，都可以挂载文件系统等等。

容器和虚拟机最大的区别在于容器与其他容器共享系统内核。 容器只包含了用户空间，而没有像虚拟机那样还包括了内核和虚拟硬件。每一个容器有自己独立的用户空间以保证多个容器可以同时运行在同一主机上，所有的操作系统级的架构都被容器共享，真正需要创建的部分只有 bins 和 libs，因此容器相当轻量。

1.4 Docker 是哪儿来的？
Docker 是一个基于 Linux 容器的开源项目。它使用了 Linux 内核的特性如命名空间（namespaces）和控制单元（control groups）来在操作系统上创建容器。

容器早就不是什么新概念了 —— Google 早在多年前就开始使用他们自己的容器技术。其他的 Linux 容器技术包括 Solaris Zones，BSD jails 和 LXC 也都出现很多年了。

为什么 Docker 突然获得了如此高的人气？

易用： Docker对所有用户提供了最便捷的方式去快速搭建和测试应用，可以打包一个应用程序，让其在任何公共云、私有云甚至硬件上无需任何修改地运行，即 一处构建，多端运行 。

速度： Docker 容器非常轻量和迅捷，因为容器只是内核之上的沙盒环境，因此占用更少的资源。运行一个 Docker 容器只要几秒，而虚拟机至少需要更多的时间。

Docker Hub： 拥有数万个公开镜像可使用，搜索所需镜像下载后只需做很少的修改甚至不用修改就可以使用；

模块化和可扩展性： 可以将应用按照功能划分到多个独立的容器中。比如，一个容器中运行 Postgres 数据库，另一个上运行 Redis 服务器，在另一个上搭载 Node.js 应用，然后把这些容器连接起来创建应用，而且以后可以容易地单独扩展和更新这些组件。

1.5 Docker 元素
1. Docker 引擎（Docker Engine）
Docker所运行的层，它是一个轻量的管理容器、镜像、构建等的运行环境和工具，在 Linux 系统本地运行，由以下部分组成：

一个跑在主机上的 Docker 守护进程。

一个 Docker 客户端用于与 Docker 守护进程沟通以执行命令。

一个 REST API 用于与 Docker 守护进程远程交互。

2. Docker 客户端（Docker Client）
作为终端用户与Docker交互的地方。当执行docker命令时，Docker 客户端将指令传给 Docker守护进程。

3. Docker 守护进程（Docker Deamon）
执行发送到Docker 客户端的指令的地方，这些指令包括构建、运行以及分发你的容器。Docker 守护进程运行在主机上，但是作为用户，我们永远无法直接与守护进程交互。Docker 客户端也可以运行在主机上，但不强制，你可以把它放在另一台与 Docker 所在的主机相连接的机器上。

4. Dockerfile
Dockerfile 是你写指令的地方，用于构建 Docker 镜像。

5. Docker 镜像（Docker Image）
镜像是从 Dockerfile 中的指令构建出来的只读模板。镜像定义了你想让你的应用包及其依赖长什么样子以及当它启动后你想运行的进程，Dockerfile 中的每一个指令都为镜像创建了一个新的层，用这些层表示镜像文件系统的一部分，它们可以添加或替换它们之下的层。Docker 使用了一种联合文件系统来实现层的功能。

6. 联合文件系统（Union File Systems）
Docker 使用联合文件系统来创建一个镜像，联合文件系统类似可堆叠的文件系统，即文件和单独文件系统的文件夹都可以被无感地覆盖来形成单个文件系统。

覆盖的分支中拥有相同路径的文件夹的内容都会被看做是一个合并文件夹，这样避免了将每一层都拷贝一次。相反，它们都会被赋予指向相同资源的指针；当某层需要变更时，它将创建一份拷贝并在本地的拷贝上修改，而原始的层并不会被改变。这就是为什么文件系统看起来可写实则不允许写入。

分层系统有两个主要优势：

可自由复制： 每当你使用一个镜像去创建并运行一个新的容器时，层有助于避免每次都要复制一组完整的文件。这让 Docker 容器的实例化又快又轻。

层隔离: 做出改变要快得多 —— 当你改变一个镜像时，Docker 只需将变更应用到你改变了的层上即可。

7. 卷（Volumes）
卷是一个容器的“数据”部分，在创建容器时被初始化。数据卷独立于默认的联合文件系统，并以常规目录和文件的存在于主机文件系统中。所以，即使你销毁、更新或重新构建了一个容器，数据卷都保持不变。如果你想更新一个数据卷，你需要直接去修改它。

8. Docker 容器（Docker Containers）
Docker 容器将应用程序及其所需的资源封装到一起，包括操作系统、应用源码、运行环境、系统工具、系统库等等。

2. docker基本概念
2.1 Image Definition
镜像 Image 就是一堆只读层 read-only layer 的统一视角。对于某个镜像 Image 实例，可能由多个只读层构成，它们重叠在一起。除了最下面一层，其它层都会有一个指针指向下一层。这些层都能够在主机的文件系统上访问到。Docker使用的文件系统为统一文件系统 union file system，该技术能够将不同的层整合成一个文件系统，为这些层提供了一个统一的视角，这样就隐藏了多层的存在，在用户的角度看来，只存在一个文件即 Image 实例，如右图视角的形式。

在linux系统中，镜像文件存在于 /var/lib/docker/aufs 目录下。但是在一个运行中的容器内部，这些层是不可见的。

001.png

$ sudo tree -L 1 /var/lib/docker/

/var/lib/docker/
├── aufs
├── containers
├── graph
├── init
├── linkgraph.db
├── repositories-aufs
├── tmp
├── trust
└── volumes
7 directories, 2 files
2.2. Container Definition
容器 container 的定义和镜像 image 几乎一模一样，也是一堆层的统一视角，唯一区别在于容器的最上面那一层是可读可写的。

容器的定义并没有提及容器是否在运行，没错，这是故意的。

要点： 容器 = 镜像 + 可读层 。并且容器的定义并没有提及是否要运行容器。下面，我们将会讨论运行态容器。

002.png

2.3. Running Container Definition
一个运行态容器 running container 被定义为一个可读写的统一文件系统加上隔离的进程空间和包含其中的进程。

003.png

文件系统隔离技术使得Docker成为了一个前途无量的技术。一个容器中的进程可能会对文件进行修改、删除、创建，这些改变都将作用于可读写层（read-write layer）。

004.png

我们可以通过运行以下命令来验证我们上面所说的：

docker run ubuntu touch happiness.txt
即便是这个ubuntu容器不再运行，我们依旧能够在主机的文件系统上找到这个新文件。

find / -name happiness.txt

/var/lib/docker/aufs/diff/860a7b...889/happiness.txt
2.4. Image Layer Definition
为了将零星的数据整合起来，我们提出了镜像层 image layer 这个概念。下面的这张图描述了一个镜像层，通过图片我们能够发现一个层并不仅仅包含文件系统的改变，它还能包含了其他重要信息。

005.png

元数据 metadata 就是关于这个层的额外信息，它不仅能够让Docker获取运行和构建时的信息，还包括父层的层次信息。需要注意，只读层和读写层都包含元数据。

image.png

除此之外，每一层都包括了一个指向父层的指针。如果一个层没有这个指针，说明它处于最底层。

image.png

Metadata Location: 我发现在我自己的主机上，镜像层（image layer）的元数据被保存在名为”json”的文件中，比如说： /var/lib/docker/graph/e809f156dc985.../json

e809f156dc985...就是这层的id

一个容器的元数据好像是被分成了很多文件，但或多或少能够在 /var/lib/docker/containers/<id> 目录下找到，<id> 就是一个可读层的id。这个目录下的文件大多是运行时的数据，比如说网络，日志等等。

2.5. docker create <image-id>
image.png

docker create 命令为指定的镜像 image 添加了一个可读层，构成了一个新的容器。注意，这个容器并没有运行。

image.png

2.6. docker start <container-id>
image.png

Docker start命令为容器文件系统创建了一个进程隔离空间。注意，每一个容器只能够有一个进程隔离空间。

2.7. docker run <image-id>
image.png

看到这个命令，读者通常会有一个疑问：docker start和 docker run命令有什么区别。

image.png

从图片可以看出， docker run 命令先是利用镜像创建了一个容器，然后运行这个容器。这个命令非常的方便，并且隐藏了两个命令的细节，但从另一方面来看，这容易让用户产生误解。

题外话：继续我们之前有关于Git的话题， docker run 命令类似于 git pull 命令。git pull 命令就是 git fetch 和 git merge两个命令的组合，同样的， docker run 就是 docker create 和 docker start 两个命令的组合。

2.8. docker ps
image.png

docker ps 命令会列出所有运行中的容器。这隐藏了非运行态容器的存在，如果想要找出这些容器，我们需要使用下面这个命令。

docker ps –a
image.png

docker ps –a命令会列出所有的容器，不管是运行的，还是停止的。

2.9. docker images
image.png

docker images 命令会列出了所有顶层 top-level 镜像。实际上，在这里我们没有办法区分一个镜像和一个只读层，所以我们提出了 top-level 镜像。只有创建容器时使用的镜像或者是直接pull下来的镜像能被称为顶层 top-level 镜像，并且每一个顶层镜像下面都隐藏了多个镜像层。

docker images –a


image.png

docker images –a 命令列出了所有的镜像，也可以说是列出了所有的可读层。如果你想要查看某一个image-id下的所有层，可以使用 docker history 来查看。

2.10. docker stop <container-id>
image.png

docker stop 命令会向运行中的容器发送一个 SIGTERM 的信号，然后停止所有的进程。

2.11. docker kill <container-id>
image.png

docker kill 命令向所有运行在容器中的进程发送了一个不友好的 SIGKILL 信号。

2.12. docker pause <container-id>
image.png

docker stop 和 docker kill 命令会发送UNIX的信号给运行中的进程，docker pause 命令则不一样，它利用了cgroups的特性将运行中的进程空间暂停，但是这种方式的不足之处在于发送一个 SIGTSTP 信号对于进程来说不够简单易懂，以至于不能够让所有进程暂停。

2.13. docker rm <container-id>
image.png

docker rm 命令会移除构成容器的可读写层。注意，这个命令只能对非运行态容器执行。

docker rmi <image-id>
image.png

docker rmi 命令会移除构成镜像的一个只读层。你只能够使用 docker rmi 来移除最顶层 top level layer （也可以说是镜像），你也可以使用-f参数来强制删除中间的只读层。

2.14. docker commit <container-id>
image.png

docker commit 命令将容器的可读写层转换为一个只读层，这样就把一个容器转换成了不可变的镜像。

image.png

2.15. docker build
image.png

docker build 命令非常有趣，它会反复的执行多个命令。

image.png

我们从上图可以看到，build 命令根据 Dockerfile 文件中的 FROM 指令获取到镜像，然后重复执行:

1）run（create和start）

2）修改

3）commit

在循环中的每一步都会生成一个新的层，因此许多新的层会被创建。

2.16. docker exec <running-container-id>
image.png

docker exec 命令会在运行中的容器执行一个新进程。

2.17 docker inspect <container-id> or <image-id>
image.png

docker inspect 命令会提取出容器或者镜像最顶层的元数据。

2.18 docker save <image-id>
image.png

docker save 命令会创建一个镜像的压缩文件，这个文件能够在另外一个主机的 Docker 上使用。和 export 命令不同，这个命令为每一个层都保存了它们的元数据。这个命令只能对镜像生效。

2.19 docker export <container-id>
image.png

docker export 命令创建一个 tar 文件，并且移除了元数据和不必要的层，将多个层整合成了一个层，只保存了当前统一视角看到的内容（译者注：expoxt后的容器再import到Docker中，通过docker images –tree命令只能看到一个镜像；而save后的镜像则不同，它能够看到这个镜像的历史镜像）。

2.20 docker history <image-id>
image.png

docker history 命令递归地输出指定镜像的历史镜像。

2.21 删除所有终止的容器
docker rm $(docker ps -a -q)
3. docker 实践
3.1 创建容器
docker create: 创建容器，处于停止状态。

docker run: 创建并启动容器。

$ docker create alpine
3.2 运行容器
交互性容器： 运行在前台，容器中使用exit命令或者调用docker stop、docker kill命令，容器停止。

后台型容器：运行在后台，创建后与终端无关，只有调用docker stop、docker kill命令才能使容器停止。

# i:打开容器的标准输入。
# t:告诉docker为容器建立一个命令行终端。
# name:指定容器名称，可以不填(随机)，建议根据具体使用功能命名，便于管理。
# /bin/sh 告诉docker要在容器里面执行此命令
$ docker run -it --name=docker_alpine alpine /bin/sh 

# d:使用-d参数，使容器在后台运行。
$ docker run --name=docker_alpine -d alpine /bin/sh "while true; do echo hello world; sleep 1; done"
3.3 查看容器
docker ps: 查看当前运行的容器

docker ps -a:查看所有容器，包括停止的。

# CONTAINER ID:容器的唯一表示ID。
# IMAGE:创建容器时使用的镜像。
# COMMAND:容器最后运行的命令。
# CREATED:创建容器的时间。
# STATUS:容器状态。
# PORTS:对外开放的端口。
# NAMES:容器名。可以和容器ID一样唯一标识容器，同一台宿主机上不允许有同名容器存在，否则会冲突。

$ docker ps                                           
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS              PORTS               NAMES
c4f617e110e5        a4e                 "node /src/index.js"   8 seconds ago       Up 7 seconds        8080/tcp            nodeapp
3.4 查看镜像
通过 docker images命令可以查看所有镜像。

$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mysql               5.7.22              0d16d0a97dd1        2 weeks ago         372MB
alpine              latest              3fd9065eaf02        4 months ago        4.15MB
3.5 启动容器
通过docker start来启动之前已经停止的docker镜像，可以指定容器名或者ID。

docker start [NAME]/[CONTAINER ID]

3.6 停止容器
docker stop [NAME]/[CONTAINER ID]:将容器退出。

docker kill [NAME]/[CONTAINER ID]:强制停止一个容器。

3.7 删除容器
容器终止后，在需要的时候可以重新启动，确定不需要了，可以进行删除操作。

docker rm [NAME]/[CONTAINER ID]: 不能够删除一个正在运行的容器，会报错。需要先停止容器。

删除所有容器：docker本身没有提供全部删除操作，但是可以使用bash命令实现：

# -a标志列出所有容器，-q标志只列出容器的ID，然后传递给rm命令，依次删除容器。
docker rm 'docker ps -a -q'
3.8 依附容器
依附操作attach通常用在由docker start或者docker restart启动的交互型容器中。由于docker start启动的交互型容器并没有具体终端可以依附，而容器本身是可以接收用户交互的，这时就需要通过attach命令来将终端依附到容器上。

docker start xxx：先启动 xxx 容器。

启动后 docker ps 可以看到启动的容器。

执行 docker attach xxx ，终端就已经依附到了容器上，ls显示的就是容器中的目录内容。

注意：后台型容器是无法依附终端的，因为它本身就不接受用户交互输入。

3.9 端口映射
使用 -p 参数会分配宿主机的端口映射到虚拟机。

# IP表示主机的IP地址。 
# hostPort表示宿主机的端口。 
# containerPort表示虚拟机的端口。
docker run -p ip:hostPort:containerPort image_name
支持的格式有三种：

ip:hostPort:containerPort：映射指定地址的指定端口到虚拟机的指定端口（不常用）; 如：127.0.0.1:3306:3306，映射本机的3306端口到虚拟机的3306端口。

ip::containerPort：映射指定地址的任意端口到虚拟机的指定端口。（不常用）; 如：127.0.0.1::3306，映射本机的3306端口到虚拟机的3306端口。

hostPort:containerPort：映射本机的指定端口到虚拟机的指定端口。（常用）; 如：3306:3306，映射本机的3306端口到虚拟机的3306端口。

3.10 链接机制
什么是docker的link机制？同一个宿主机上的多个docker容器之间如果想进行通信，可以通过使用容器的ip地址来通信，也可以通过宿主机的ip加上容器暴露出的端口号来通信，前者会导致ip地址的硬编码，不方便迁移，并且容器重启后ip地址会改变，除非使用固定的ip，后者的通信方式比较单一，只能依靠监听在暴露出的端口的进程来进行有限的通信。通过docker的link机制可以通过一个name来和另一个容器通信，link机制方便了容器去发现其它的容器并且可以安全的传递一些连接信息给其它的容器。

1 . 运行一个容器,通过–name指定一个便于记忆的名字,这个容器被称为source container，也就是要连接的容器

$ docker run --name db -e MYSQL_ROOT_PASSWORD=server -d mysql
上面通过传递环境变量MYSQL_ROOT_PASSWORD=server，来设置mysql服务的密码为server

2 . 运行另外一个容器，并link到上面启动的容器，这个容器被称为received container

$ sudo docker run -d --name web --link db:aliasdb nginx
上面通过 --link 连接名为db的容器，并为其设置了别名 aliasdb 完成了上面的两个步骤后，在nginx的容器中就可以使用db或者 aliasdb 作为连接地址来连接mysql服务，即使容器重启了，地址发生了变化，不会影响两个容器之间的连接。

4. docker基本命令
4.1. 查看docker信息（version、info）
# 查看docker版本  
$docker version  

# 显示docker系统的信息  
$docker info
4.2. 对image的操作（search、pull、images、rmi、history）
# 检索image  
$docker search image_name  

# 下载image  
$docker pull image_name  

# 列出镜像列表; 
# -a, --all=false Show all images; --no-trunc=false Don't truncate output; -q, --quiet=false Only show numeric IDs  
$docker images  

# 删除一个或者多个镜像; 
# -f, --force=false Force; --no-prune=false Do not delete untagged parents  
$docker rmi image_name  

# 显示一个镜像的历史; 
# --no-trunc=false Don't truncate output; -q, --quiet=false Only show numeric IDs  
$docker history image_name
4.3. 启动容器（run）
docker容器可以理解为在沙盒中运行的进程。这个沙盒包含了该进程运行所必须的资源，包括文件系统、系统类库、shell 环境等等。但这个沙盒默认是不会运行任何程序的。你需要在沙盒中运行一个进程来启动某一个容器。这个进程是该容器的唯一进程，所以当该进程结束的时候，容器也会完全的停止。

# 在容器中运行"echo"命令，输出"hello word"  
$docker run image_name echo "hello word"  
# 交互式进入容器中  
$docker run -i -t image_name /bin/bash  
# 在容器中安装新的程序  
$docker run image_name apt-get install -y app_name
Note： 在执行apt-get 命令的时候，要带上-y参数。如果不指定-y参数的话，apt-get命令会进入交互模式，需要用户输入命令来进行确认，但在docker环境中是无法响应这种交互的。apt-get 命令执行完毕之后，容器就会停止，但对容器的改动不会丢失。

4.4. 查看容器（ps）
# 列出当前所有正在运行的container  
$docker ps  
# 列出所有的container  
$docker ps -a  
# 列出最近一次启动的container  
$docker ps -l
4.5. 保存对容器的修改（commit）
当你对某一个容器做了修改之后（通过在容器中运行某一个命令），可以把对容器的修改保存下来，这样下次可以从保存后的最新状态运行该容器。

# 保存对容器的修改; -a, --author="" Author; -m, --message="" Commit message  
$docker commit ID new_image_name
Note：image相当于类，container相当于实例，不过可以动态给实例安装新软件，然后把这个container用commit命令固化成一个image。

4.6. 对容器的操作（rm、stop、start、kill、logs、diff、top、cp、restart、attach）
# 删除所有容器  
$docker rm `docker ps -a -q`  

# 删除单个容器; -f, --force=false; -l, --link=false Remove the specified link and not the underlying container; -v, --volumes=false Remove the volumes associated to the container  
$docker rm Name/ID  

# 停止、启动、杀死一个容器  
$docker stop Name/ID  
$docker start Name/ID  
$docker kill Name/ID  

# 从一个容器中取日志; 
# -f, --follow=false Follow log output; -t, --timestamps=false Show timestamps  
$docker logs Name/ID  

# 列出一个容器里面被改变的文件或者目录，list列表会显示出三种事件，A 增加的，D 删除的，C 被改变的  
$docker diff Name/ID  

# 显示一个运行的容器里面的进程信息  
$docker top Name/ID  

# 从容器里面拷贝文件/目录到本地一个路径  
$docker cp Name:/container_path to_path  
$docker cp ID:/container_path to_path  

# 重启一个正在运行的容器; 
# -t, --time=10 Number of seconds to try to stop for before killing the container, Default=10  
$docker restart Name/ID  

# 附加到一个运行的容器上面; 
# --no-stdin=false Do not attach stdin; --sig-proxy=true Proxify all received signal to the process  
$docker attach ID
Note： attach命令允许你查看或者影响一个运行的容器。你可以在同一时间attach同一个容器。你也可以从一个容器中脱离出来，是从CTRL-C。

4.7. 保存和加载镜像（save、load）
当需要把一台机器上的镜像迁移到另一台机器的时候，需要保存镜像与加载镜像。

# 保存镜像到一个tar包; -o, --output="" Write to an file  
$docker save image_name -o file_path  
# 加载一个tar包格式的镜像; -i, --input="" Read from a tar archive file  
$docker load -i file_path  

# 机器a  
$docker save image_name > /home/save.tar  
# 使用scp将save.tar拷到机器b上，然后：  
$docker load < /home/save.tar
4.8、 登录registry server（login）
# 登陆registry server; -e, --email="" Email; -p, --password="" Password; -u, --username="" Username  
$docker login
4.9. 发布image（push）
# 发布docker镜像  
$docker push new_image_name
4.10. 根据Dockerfile 构建出一个容器
# build  
# --no-cache=false Do not use cache when building the image  
# -q, --quiet=false Suppress the verbose output generated by the containers  
# --rm=true Remove intermediate containers after a successful build  
# -t, --tag="" Repository name (and optionally a tag) to be applied to the resulting image in case of success  
$docker build -t image_name Dockerfile_path
4.11. 修改镜像名称
docker tag server:latest myname/server:latest
or
docker tag d583c3ac45fd myname/server:latest