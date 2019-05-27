实验14. 安装Docker
part A. 安装repository
1 . 更新apt数据

$ sudo apt-get update
2 . 配置HTTPS

$ sudo apt-get install \
apt-transport-https \
ca-certificates \
curl \
software-properties-common
3 . 添加官方的GPG 密钥

$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 查看密钥是否正确
$ sudo apt-key fingerprint 0EBFCD88

pub 4096R/0EBFCD88 2017-02-22
Key fingerprint = 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88
uid Docker Release (CE deb) <docker@docker.com>
sub 4096R/F273FCD8 2017-02-22
4 . 设置稳定的数据源

$ sudo add-apt-repository \
"deb [arch=amd64] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) \
stable"
part B. 安装 Docker-CE
1 . 更新apt索引

$ sudo apt-get update
2 . 安装最新版本的docker-ce，安装成功后Docker daemon会自动启动。

$ sudo apt-get install docker-ce
3 . 验证docker是否安装成功

$ sudo docker run hello-world
4 . 将当前用户添加到 docker 组

$ sudo docker run hello-world


part C.  安装mysql镜像，并且启动服务
part D. 安装nodejs镜像，编写express服务器，启动docker服务，并通过浏览器访问