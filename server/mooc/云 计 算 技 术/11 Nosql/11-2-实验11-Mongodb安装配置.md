实验11. Mongodb数据库安装配置

# 1. Windows 安装
```bash
# 1 .  从官方下载最新版本的 `MongoDB .msi` 文件，运行后选择安装目录（默认为` C:\Program Files\MongoDB\Server\3.6\`.），然后并且安装。

# 2 . 设置MongoDB运行环境; MongoDB需要一个目录放置数据文件，其默认的路径是安装目录下的  `\data\db` ，可以通过命令行创建。
# 如果数据文件不是放在安装目录下，比如放在 `d:\data\db`，可以在启动时通过 `--dbpath` 参数说明。
$ mongod.exe --dbpath d:\data

# 3 . 启动 MongoDB
$ mongod.exe
[initandlisten] waiting for connections on port 27017

# 4 . 连接 MongoDB
$ mongo
MongoDB shell version: 3.2.7
connecting to: test
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
        http://docs.mongodb.org/
Questions? Try the support group
        http://groups.google.com/group/mongodb-user
```


# 2. Windows 配置系统服务
```bash
# 1 . 创建日志目录
$ mkdir d:\data\log

# 2 . 创建配置文件; 在安装目录下创建 `mongod.cfg` 文件，内容如下：
systemLog:
    destination: file
    path: d:\data\log\mongod.log
storage:
    dbPath: d:\data\db

# 3 . 安装 MongoDB 服务；以 `Administrative` 的运行下面命令,其中PATH为`mongod.cfg`的路径； 
$ mongod.exe --config "PATH\mongod.cfg" --install

# 4 . 启动 MongoDB 服务
$ net start MongoDB
```


# 3. Linux 安装
```bash
# 1 . 导入包管理的公钥
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5

# 2 . 创建MongoDB包列表
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

# 3 . 重新加载软件包
$ sudo apt-get update

# 4 . 安装 `MongoDB`
$ sudo apt-get install -y mongodb-org

# 5 . 启动 `MongoDB`
$ sudo service mongod start

# 6 . 验证 `MongoDB` 服务
$ cat /var/log/mongodb/mongod.log
> [initandlisten] waiting for connections on port 27017

# 虚拟机连接
打开 /etc/mongod.conf 修改 bind_ip 为 0.0.0.0
```


# 4. Linux 配置系统服务
```bash
$ systemctl enable mongod.service
```

# 5. 基本操作
```bash
# 显示数据库 
$ show dbs

# 创建数据库
$ use dbs_name

# 创建数据集和记录
$ db.collection_name.insert({ key1:val1, key2:val2, ... })

# 查询数据
$ db.collection_name.find()
$ db.collection_name.find().pretty()

# 条件查询
$ db.book.find({key:val})
<!-- 范例 -->
$ db.book.find({name:"tom"})

# 排序
db.book.find().sort({ key:-1 | 1 })
<!-- 范例 -->
db.book.find().sort({name:-1})
```

# Rogo
```bash
$ wget https://download.robomongo.org/1.2.1/linux/robo3t-1.2.1-linux-x86_64-3e50a65.tar.gz
$ tar xvf robo3t-1.2.1-linux-x86_64-3e50a65.tar.gz
```

# studio3t
```bash
$ wget https://download.studio3t.com/studio-3t/linux/2018.2.5/studio-3t-linux-x64.tar.gz
$ tar xvf studio-3t-linux-x64.tar.gz
```