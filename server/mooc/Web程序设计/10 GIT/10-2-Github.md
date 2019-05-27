title: GITHUB 

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: T05-web-github.html

--
#  GITHUB
## Github详解

-- 
### Github的规范流程
* 团队开发中，遵循一个合理、清晰的Git使用流程，是非常重要的。
* 否则，每个人都提交一堆杂乱无章的commit，项目很快就会变得难以协调和维护。
<p><img src="img/web/webgithub01.png" width="600" ></p>
<p><img src="img/web/webgithub02.png" width="750" ></p>

-- 
### 第一步：新建分支
* 首先，每次开发新功能，都应该新建一个单独的分支
```js
# 获取主干最新代码
$ git checkout master
$ git pull

# 新建一个开发分支myfeature
$ git checkout -b myfeature
```

-- 
### 第二步：提交分支commit
* 分支修改后，就可以提交commit了
```js
//git add 命令的all参数, 表示保存所有变化, 也可以用 git add . 代替
$ git add --all
//git status 命令，用来查看发生变动的文件。
$ git status
//git commit 命令的verbose参数，会列出 diff 的结果
$ git commit --verbose
```

-- 
### 第三步：撰写提交信息
* 提交commit时，必须给出完整扼要的提交信息，下面是一个范本。
```js
Present-tense summary under 50 characters

* More information about commit (under 72 characters).
* More information about commit (under 72 characters).

http://project.management-system.com/
```

-- 
### 第四步：与主干同步
* 分支的开发过程中，要经常与主干保持同步。
```js
$ git fetch origin
$ git rebase origin/master
```

-- 
### 第五步：合并commit
* 分支开发完成后，很可能有一堆commit，但是合并到主干的时候，往往希望只有一个（或最多两三个）commit，这样不仅清晰，也容易管理。
* 那么，怎样才能将多个commit合并呢？这就要用到 git rebase 命令。
```js
$ git reset HEAD~5
$ git add .
$ git commit -am "Here's the bug fix that closes #28"
$ git push --force
```


-- 
### 第六步：推送到远程仓库
* 合并commit后，就可以推送当前分支到远程仓库了。
```js
//git push命令要加上force参数，因为rebase以后，分支历史改变了，跟远程分支不一定兼容，有可能要强行推送。
$ git push --force origin myfeature
```


-- 
### 第七步：发出Pull Request
* 提交到远程仓库以后，就可以发出 Pull Request 到master分支，然后请求别人进行代码review，确认可以合并到master。


--
#  Git远程操作
## GIT主要命令介绍

-- 
### git clone
* 远程操作的第一步，通常是从远程主机克隆一个版本库，这时就要用到`git clone`命令。
* 该命令会在本地主机生成一个目录，与远程主机的版本库同名。
```js
$ git clone <版本库的网址>
```
比如克隆jQuery的版本库。
```js
$ git clone https://github.com/jquery/jquery.git
```
如果要指定不同的目录名，可以将目录名作为git clone命令的第二个参数。
```js
$ git clone <版本库的网址> <本地目录名>
```

--
### git remote
* 为了便于管理，Git要求每个远程主机都必须指定一个主机名。git remote命令就用于管理主机名。
* 不带选项的时候，git remote命令列出所有远程主机。
```js
$ git remote
origin
```
使用-v选项，可以参看远程主机的网址。
```js
$ git remote -v
origin  git@github.com:jquery/jquery.git (fetch)
origin  git@github.com:jquery/jquery.git (push)
```
git remote add命令用于添加远程主机。
```js
$ git remote -v
$ git remote add <主机名> <网址>
```
git remote rm命令用于删除远程主机。
```js
$ git remote rm <主机名>
```

--
### git fetch
1 . 一旦远程主机的版本库有了更新（Git术语叫做`commit`），需要将这些更新取回本地，这时就要用到`git fetch`命令。
```js
// git fetch命令通常用来查看其他人的进程，因为它取回的代码对你本地的开发代码没有影响。
$ git fetch <远程主机名>
```
2 . 默认情况下，`git fetch`取回所有分支（branch）的更新。如果只想取回特定分支的更新，可以指定分支名。
```js
$ git fetch <远程主机名> <分支名>

//比如，取回origin主机的master分支。
$ git fetch origin master
```
3 . 所取回的更新，在本地主机上要用"远程主机名/分支名"的形式读取。比如`origin`主机的`master`，就要用`origin/master`读取。
`git branch`命令的`-r`选项，可以用来查看远程分支，`-a`选项查看所有分支  

```js
//本地主机的当前分支是master，远程分支是origin/master。

$ git branch -r
origin/master

$ git branch -a
* master
  remotes/origin/master
```

4 . 取回远程主机的更新以后，可以在它的基础上，使用`git checkout`命令创建一个新的分支。
```js
// 在origin/master的基础上，创建一个新分支。
$ git checkout -b newBrach origin/master
```
5 . 可以使用git merge命令或者git rebase命令，在本地分支上合并远程分支。
```js
// 在当前分支上，合并origin/master。
$ git merge origin/master
# 或者
$ git rebase origin/master
```


--
### git pull
1 . git pull命令的作用是，取回远程主机某个分支的更新，再与本地的指定分支合并。它的完整格式稍稍有点复杂。
```js
$ git pull <远程主机名> <远程分支名>:<本地分支名>

// 取回origin主机的next分支，与本地的master分支合并。
$ git pull origin next:master
```

2 . 如果远程分支是与当前分支合并，则冒号后面的部分可以省略。
```js
// 取回origin/next分支，再与当前分支合并。
$ git pull origin next

//实质上，这等同于先做git fetch，再做git merge。
$ git fetch origin
$ git merge origin/next
```
3. 如果远程主机删除了某个分支，默认情况下，`git pull` 不会在拉取远程分支的时候，删除对应的本地分支。这是为了防止，由于其他人操作了远程主机，导致`git pull`不知不觉删除了本地分支。
```js
// 加上参数 `-p `就会在本地删除远程已经删除的分支。
$ git pull -p

//等同于下面的命令
$ git fetch --prune origin 
$ git fetch -p
```

--
### git push
1 . `git push`命令用于将本地分支的更新，推送到远程主机。它的格式与`git pull`命令相仿。
```js
$ git push <远程主机名> <本地分支名>:<远程分支名>
```
2 . 分支推送顺序的写法是`<来源地>:<目的地>`，所以`git pull`是<`远程分支>:<本地分支>`，而git push是`<本地分支>:<远程分支>`。

3 . 如果省略远程分支名，则表示将本地分支推送与之存在"追踪关系"的远程分支（通常两者同名），如果该远程分支不存在，则会被新建。
```js
//将本地的master分支推送到origin主机的master分支。如果后者不存在，则会被新建。
$ git push origin master
```

4 . 如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支。
```js
//删除origin主机的master分支。
$ git push origin :master

# 等同于
$ git push origin --delete master
```

5 . 如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略。
```js
//将当前分支推送到origin主机的对应分支。
$ git push origin
```

6 . 如果当前分支只有一个追踪分支，那么主机名都可以省略。
```js
$ git push
```

7 . 如果当前分支与多个主机存在追踪关系，则可以使用`-u`选项指定一个默认主机，这样后面就可以不加任何参数使用`git push`。
```js
// 将本地的master分支推送到origin主机，同时指定origin为默认主机，后面就可以不加任何参数使用git push了。
$ git push -u origin master
```

8 . 还有一种情况，就是不管是否存在对应的远程分支，将本地的所有分支都推送到远程主机，这时需要使用`--all`选项。
```js
// 将所有本地分支都推送到origin主机。
$ git push --all origin
```

9 . 如果远程主机的版本比本地版本更新，推送时`Git`会报错，要求先在本地做`git pull`合并差异，然后再推送到远程主机。这时，如果你一定要推送，可以使用`--force`选项。
```js
// 使用--force选项，结果导致远程主机上更新的版本被覆盖。除非你很确定要这样做，否则应该尽量避免使用--force选项。
$ git push --force origin 
```




--
#  常用 Git 命令清单
## Workspace：工作区
## Index / Stage：暂存区
## Repository：仓库区（或本地仓库）
## Remote：远程仓库


--
### 新建代码库
```js
# 在当前目录新建一个Git代码库
$ git init

# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]

# 下载一个项目和它的整个代码历史
$ git clone [url]
```

--
### 配置
`Git`的设置文件为`.gitconfig`，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。
```js
# 显示当前的Git配置
$ git config --list

# 编辑Git配置文件
$ git config -e [--global]

# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"
```

--
### 增加/删除文件
```js
# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加当前目录的所有文件到暂存区
$ git add .

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]
```

--
### 代码提交
```js
# 提交暂存区到仓库区
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```

--
### 分支
```js
# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

# 新建一个分支，并切换到该分支
$ git checkout -b [branch]

# 新建一个分支，指向指定commit
$ git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```

--
### 标签
```js
# 列出所有tag
$ git tag

# 新建一个tag在当前commit
$ git tag [tag]

# 新建一个tag在指定commit
$ git tag [tag] [commit]

# 删除本地tag
$ git tag -d [tag]

# 删除远程tag
$ git push origin :refs/tags/[tagName]

# 查看tag信息
$ git show [tag]

# 提交指定tag
$ git push [remote] [tag]

# 提交所有tag
$ git push [remote] --tags

# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]
```

--
### 查看信息
```js
# 显示有变更的文件
$ git status

# 显示当前分支的版本历史
$ git log

# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 搜索提交历史，根据关键词
$ git log -S [keyword]

# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示指定文件相关的每一次diff
$ git log -p [file]

# 显示过去5次提交
$ git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame [file]

# 显示暂存区和工作区的差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

# 显示某次提交的元数据和内容变化
$ git show [commit]

# 显示某次提交发生变化的文件
$ git show --name-only [commit]

# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]

# 显示当前分支的最近几次提交
$ git reflog
```

--
### 远程同步
```js
# 下载远程仓库的所有变动
$ git fetch [remote]

# 显示所有远程仓库
$ git remote -v

# 显示某个远程仓库的信息
$ git remote show [remote]

# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]

# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]

# 上传本地指定分支到远程仓库
$ git push [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force

# 推送所有分支到远程仓库
$ git push [remote] --all
```

--
### 撤销
```js
# 恢复暂存区的指定文件到工作区
$ git checkout [file]

# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]

# 恢复暂存区的所有文件到工作区
$ git checkout .

# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]

# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]

# 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash pop
```

--
### 其他
```js
# 生成一个可供发布的压缩包
$ git archive
```