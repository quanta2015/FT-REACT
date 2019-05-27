title: Linux基础
theme: light

[slide]
# Linux基础

[slide]
# ubuntu操作系统
Ubuntu是世界最受欢迎操作系统之一，是一款完全开源，由国际软件商家Canonical作为坚实后盾的操作系统。因为它对不同硬件的支持和易用，以及它至核心的安全机制，目前在全世界有众多商业，政府及教育机构已经采用Ubuntu操作系统。

[slide]
# 系统管理
Ubuntu所有系统相关的任务均需使用Sudo指令是它的一大特色，这种方式比传统的以系统管理员账号进行管理工作的方式更为安全，此为Linux、Unix系统的基本思维之一。

Ubuntu也相当注重系统的易用性，标准安装完成后就可以立即投入使用。Ubuntu的开发者与Debian和GNOME开源社区合作密切，其各个正式版本的桌面环境均采用GNOME的最新版本，通常会紧随GNOME项目的进展而及时更新。Ubuntu与Debian使用相同的deb 软件包格式，可以安装绝大多数为Debian编译的软件包，虽然不能保证完全兼容，但大多数情况是通用的。

[slide]
# 开发理念
Ubuntu强调易用性和国际化，以便能为尽可能多的人所用。在发布5.04版时，Ubuntu就已经把万国码（UTF-8 Unicode）作为系统默认编码，用以应对各国各地区不同的语言文字，试图给用户提供一个无乱码的交流平台。它在语言支持方面，算是Linux发行版中相当好的。

Ubuntu的所有发行版本都可以免费获取。Ubuntu社区推荐用户自行下载光盘映像档刻录成光盘安装外，也推荐使用U盘进行安装。此外，Ubuntu计划强调要尽量使用自由软件，以便为各个版本的用户提供便捷的升级途径。

[slide]
# 软件维护
Ubuntu软件支持计划，让用户可以在不更新包库的情况下，获得和使用各类新版的应用软件。安装软件时可以通过运行`apt-get`命令，或使用图形接口的`Synaptic`工具或`软件中心`来完成。与Windows不同，Ubuntu的用户通常不必四处搜索、逐一下载或购买相应的安装程序。Ubuntu能够使用的软件大多存放在被称为“软件源”的服务器中，用户只要运行相应的`apt-get`指令，系统就会自动查找、下载和安装软件了。

[slide]
# 新软件发布
Ubuntu的软件仓库（repository）及其镜像网站所支持的各软件版本一般不是很新。例如，15.04版支持的gcc仅为4.8.2。对此，可以指定ppa来解决：
```
~$ sudo add-apt-repository ppa:ubuntu-toolchain-r/test
~$ sudo apt-get update
~$ sudo apt-get install gcc-4.9  g++-4.9 cpp-4.9
~$ sudo apt-get dist-upgrade --auto-remove
```

[slide]
# 基本环境配置
学习本课程需要安装下面软件：

- JDK：java运行的编译器
- SSH：远程登录协议
- NODEJS：javascript的V8编程语言
- SUBLINE TEXT3：文档编辑器
- GIT：版本管理
- OHMYZSH：高级bash运行环境
- TMUX：多窗口支持

[slide]
# JDK安装方法
```bash
~$ sudo apt-get install default-jdk

java -version
```

[slide]
# SSH安装方法
```bash
~$ sudo apt-get install ssh

# 验证安装路径
~$ which ssh
/usr/bin/ssh

~$ which sshd
/usr/bin/sshd

# 生成秘钥
~$ ssh-keygen -t rsa -P ""
cat $HOME/.ssh/id_rsa.pub >> $HOME/.ssh/authorized_keys
```

[slide]
# Nodejs安装方法
```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install nodejs
```

[slide]
# Sublime text3安装方法
```bash
~$ sudo apt-get install apt-transport-https

~$ echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
~$ sudo apt-get update
~$ sudo apt-get install sublime-text
```

[slide]
# GIT安装方法
```bash
~$ sudo apt-get install git
```

[slide]
# Oh-My-Zsh安装方法
1 . 安装Oh-My-Zsh
```bash
~$ sudo apt install curl
~$ sudo apt install zsh
~$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
~$ tar xvf VMwareTools-10.0.6-3595377.tar.gz 
~$ sudo ./vmware-install.pl
~$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
~$ sudo apt-get install nodejs
```

2 . 安装Powerlevel9k
```
$ git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

打开`~/.zshrc`文件,修改主题
```
ZSH_THEME="powerlevel9k/powerlevel9k"
```

3 . 安装字体
```bash
# clone
git clone https://github.com/powerline/fonts.git --depth=1
# install
cd fonts
./install.sh
# clean-up a bit
cd ..
rm -rf fonts
```

4 . 配置插件
打开`~/.zshrc`文件,添加插件
```
plugins=(git extract z sublime tmux zsh-syntax-highlighting colored-man-pages sudo)
```

- git：oh-my-zsh 默认开启的插件，提供了大量 git 的alias。详细列表请参见：https://github.com/robbyrussell/oh-my-zsh/wiki/Plugin:git。
- extract：功能强大的解压插件，所有类型的文件解压一个命令x全搞定，再也不需要去记tar后面到底是哪几个参数了。
- z：强大的目录自动跳转命令，会记忆你曾经进入过的目录，用模糊匹配快速进入你想要的目录。
- sublime：平时使用sublime比较多，该插件可以使用命令行打开sublime。
- zsh-syntax-highlighting：指令高亮效果作用是当用户输入正确命令时指令会绿色高亮，错误时命令红色高亮
- colored-man-pages：用多种颜色显示man帮助
- sudo：快捷切换sudo模式
- tmux：增加了tmux操作的alias


[slide]
# Tmux安装方法
```bash
~$ sudo apt install tmux
```

