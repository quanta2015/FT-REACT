title: Tmux基本命令
theme: light

[slide]
# Tmux基本命令


[slide]
# 简介
tmux是一款优秀的终端复用软件，它比Screen更加强大，主要得益于以下三处功能：

- 丝滑分屏（split）：tmux窗口中，新开的pane，默认进入到之前的路径，如果是ssh连接，登录状态也依旧保持着，如此一来，我就可以随意的增删pane，这种灵活性，好处不言而喻。
- 保护现场（attach），即使命令行的工作只进行到一半，关闭终端后还可以重新进入到操作现场，继续工作。对于ssh远程连接而言，即使网络不稳定也没有关系，掉线后重新连接，可以直奔现场，之前运行中的任务，依旧在跑，就好像从来没有离开过一样；特别是在远程服务器上运行耗时的任务，tmux可以帮你一直保持住会话。如此一来，你就可以随时随地放心地进行移动办公，只要你附近的计算机装有tmux（没有你也可以花几分钟装一个），你就能继续刚才的工作。
- 会话共享（适用于结对编程或远程教学），将 tmux 会话的地址分享给他人，这样他们就可以通过 SSH 接入该会话。如果你要给同事演示远程服务器的操作，他不必直勾勾地盯着你的屏幕，借助tmux，他完全可以进入到你的会话，然后静静地看着他桌面上你风骚的键盘走位，只要他愿意，甚至还可以录个屏。

[slide]
# 安装
```bash
~$ sudo apt-get install tmux
```

[slide]
# 基本概念

开始之前，我们先了解下基本概念：
tmux采用C/S模型构建，输入tmux命令就相当于开启了一个服务器，此时默认将新建一个会话，然后会话中默认新建一个窗口，窗口中默认新建一个面板。会话、窗口、面板之间的联系如下：

- 一个tmux session（会话）可以包含多个window（窗口），窗口默认充满会话界面，因此这些窗口中可以运行相关性不大的任务。
- 一个window又可以包含多个pane（面板），窗口下的面板，都处于同一界面下，这些面板适合运行相关性高的任务，以便同时观察到它们的运行情况。
<img src="img/cloud/tmux01.png">

[slide]
# 新建会话
新建一个tmux session非常简单，语法为tmux new -s session-name，也可以简写为tmux，为了方便管理，建议指定会话名称，如下。
```
tmux # 新建一个无名称的会话
tmux new -s demo # 新建一个名称为demo的会话
```

[slide]
# 断开当前会话
会话中操作了一段时间，我希望断开会话同时下次还能接着用，怎么做？此时可以使用detach命令。
```
tmux detach # 断开当前会话，会话在后台运行
```
> 也许你觉得这个太麻烦了，是的，tmux的会话中，我们已经可以使用tmux快捷键了。使用快捷键组合Ctrl+b + d，三次按键就可以断开当前会话。

[slide]
# 进入之前的会话
断开会话后，想要接着上次留下的现场继续工作，就要使用到tmux的attach命令了，语法为tmux attach-session -t session-name，可简写为tmux a -t session-name 或 tmux a。通常我们使用如下两种方式之一即可：
```
tmux a # 默认进入第一个会话
tmux a -t demo # 进入到名称为demo的会话
```

[slide]
# 关闭会话
会话的使命完成后，一定是要关闭的。我们可以使用tmux的kill命令，kill命令有kill-pane、kill-server、kill-session 和 kill-window共四种，其中kill-session的语法为tmux kill-session -t session-name。如下：
```
tmux kill-session -t demo # 关闭demo会话
tmux kill-server # 关闭服务器，所有的会话都将关闭
```


[slide]
# 查看所有的会话
管理会话的第一步就是要查看所有的会话，我们可以使用如下命令：
```
tmux list-session # 查看所有会话
tmux ls # 查看所有会话，提倡使用简写形式
```
> 如果刚好处于会话中怎么办？别担心，我们可以使用对应的tmux快捷键Ctrl+b + s，此时tmux将打开一个会话列表，按上下键(⬆︎⬇︎)或者鼠标滚轮，可选中目标会话，按左右键（⬅︎➜）可收起或展开会话的窗口，选中目标会话或窗口后，按回车键即可完成切换。
<img src="img/cloud/tmux02.png">


[slide]
# Tmux快捷指令

TABLE.1 系统指令

| 前缀 | 指令 | 描述 
|--------|--------|----------------------------------------|
| Ctrl+b | ? | 显示快捷键帮助文档 |
| Ctrl+b | d | 断开当前会话 |
| Ctrl+b | D | 选择要断开的会话 |
| Ctrl+b | Ctrl+z | 挂起当前会话 |
| Ctrl+b | r | 强制重载当前会话 |
| Ctrl+b | s | 显示会话列表用于选择并切换 |
| Ctrl+b | : | 进入命令行模式，此时可直接输入ls等命令 |
| Ctrl+b | [ | 进入复制模式，按q退出 |
| Ctrl+b | ] | 粘贴复制模式中复制的文本 |
| Ctrl+b | ~ | 列出提示信息缓存 |


TABLE.2 窗口（window）指令

| 前缀 | 指令 | 描述 |
|--------|-----|------------------------------------------|
| Ctrl+b | c | 新建窗口 |
| Ctrl+b | & | 关闭当前窗口（关闭前需输入y or n确认） |
| Ctrl+b | 0~9 | 切换到指定窗口 |
| Ctrl+b | p | 切换到上一窗口 |
| Ctrl+b | n | 切换到下一窗口 |
| Ctrl+b | w | 打开窗口列表，用于且切换窗口 |
| Ctrl+b | , | 重命名当前窗口 |
| Ctrl+b | . | 修改当前窗口编号（适用于窗口重新排序） |
| Ctrl+b | f | 快速定位到窗口（输入关键字匹配窗口名称） |


TABLE.3 面板（pane）指令

| 前缀 | 指令 | 描述 |
|--------|-------------|----------------------------------------------------------------|
| Ctrl+b | " | 当前面板上下一分为二，下侧新建面板 |
| Ctrl+b | % | 当前面板左右一分为二，右侧新建面板 |
| Ctrl+b | x | 关闭当前面板（关闭前需输入y or n确认） |
| Ctrl+b | z | 最大化当前面板，再重复一次按键后恢复正常（v1.8版本新增） |
| Ctrl+b | ! | 将当前面板移动到新的窗口打开（原窗口中存在两个及以上面板有效） |
| Ctrl+b | ; | 切换到最后一次使用的面板 |
| Ctrl+b | q | 显示面板编号，在编号消失前输入对应的数字可切换到相应的面板 |
| Ctrl+b | { | 向前置换当前面板 |
| Ctrl+b | } | 向后置换当前面板 |
| Ctrl+b | Ctrl+o | 顺时针旋转当前窗口中的所有面板 |
| Ctrl+b | 方向键 | 移动光标切换面板 |
| Ctrl+b | o | 选择下一面板 |
| Ctrl+b | 空格键 | 在自带的面板布局中循环切换 |
| Ctrl+b | Alt+方向键 | 以5个单元格为单位调整当前面板边缘 |
| Ctrl+b | Ctrl+方向键 | 以1个单元格为单位调整当前面板边缘（Mac下被系统快捷键覆盖） |
| Ctrl+b | t | 显示时钟 |

[slide]
# 灵活的配置性
除了快捷指令外，tmux还提供了类似vim的配置性功能。可配置性是软件的一项进阶级功能，只有具备了可配置性，软件才有了鲜活的个性，用户才能体会到操作的快感。

[slide]
# 修改指令前缀
相信只要你用过几次tmux，就会发现Ctrl+b指令前缀，着实不太方便。这两个键相距太远，按键成本太高了。因此我们首先需要将它更换为距离更近的Ctrl+a组合键，或者不常用的 ` 键（当然其他键也是可以的）。

tmux的用户级配置文件为~/.tmux.conf（没有的话就创建一个），修改快捷指令，只需要增加如下三行即可。
```
set -g prefix C-a #
unbind C-b # C-b即Ctrl+b键，unbind意味着解除绑定
bind C-a send-prefix # 绑定Ctrl+a为新的指令前缀

# 从tmux v1.6版起，支持设置第二个指令前缀
set-option -g prefix2 ` # 设置一个不常用的`键作为指令前缀，按键更快些
```

修改的~/.tmux.conf配置文件有如下两种方式可以令其生效：

- restart tmux。
- 在tmux窗口中，先按下Ctrl+b指令前缀，然后按下系统指令:，进入到命令模式后输入source-file ~/.tmux.conf，回车后生效。

既然快捷指令如此方便，更为优雅的做法是新增一个加载配置文件的快捷指令 ，这样就可以随时随地load新的配置了，如下所示。
```
# 绑定快捷键为r
bind r source-file ~/.tmux.conf \; display-message "Config reloaded.."
```
> 请特别注意，在已经创建的窗口中，即使加载了新的配置，旧的配置依然有效（只要你新加的功能没有覆盖旧的配置，因此如果你第一次绑定快捷指令为x键，然后又改为绑定y键，那么x和y都将有效），新建会话不受此影响，将直接采用新的配置。


[slide]
# 新增面板

tmux中，使用最多的功能之一就是新增一个面板。水平方向新增面板的指令是 prefix + " ，垂直方向是 prefix + %，" 和 %需要两个键同时按下才能完成，加上指令前缀至少需要3~4次按键才能组成一个完整的指令，同时这个两个键也不够醒目和方便，因此我们可以绑定两个更常用的指令 -、|，如下所示：
```
unbind '"'
bind - splitw -v -c '#{pane_current_path}' # 垂直方向新增面板，默认进入当前目录
unbind %
bind | splitw -h -c '#{pane_current_path}' # 水平方向新增面板，默认进入当前目录
```


[slide]
# 开启鼠标支持

默认情况下，tmux的多窗口之间的切换以及面板大小调整，需要输入指令才能完成，这一过程，涉及到的指令较多，而且操作麻烦，特别是面板大小调整，指令难以一步到位，这个时候开启鼠标支持就完美了。

对于tmux v2.1(2015.10.28)之前的版本，需加入如下配置：
```
setw -g mode-mouse on # 支持鼠标选取文本等
setw -g mouse-resize-pane on # 支持鼠标拖动调整面板的大小(通过拖动面板间的分割线)
setw -g mouse-select-pane on # 支持鼠标选中并切换面板
setw -g mouse-select-window on # 支持鼠标选中并切换窗口(通过点击状态栏窗口名称)
```

对于tmux v2.1及以上的版本，仅需加入如下配置：
```
set-option -g mouse on # 等同于以上4个指令的效果
```

[slide]
# 快速面板切换

鼠标支持确实能带来很大的便捷性，特别是对于习惯了鼠标操作的tmux新手，但对于键盘爱好者而言，这不是什么好消息，对他们而言，双手不离键盘是基本素质。

虽然指令前缀加方向键可以切换面板，但方向键太远，不够快，不够Geek。没关系，我们可以将面板切换升级为熟悉的h、j、k、l键位。
```
# 绑定hjkl键为面板切换的上下左右键
bind -r k select-pane -U # 绑定k为↑
bind -r j select-pane -D # 绑定j为↓
bind -r h select-pane -L # 绑定h为←
bind -r l select-pane -R # 绑定l为→
```
> -r表示可重复按键，大概500ms之内，重复的h、j、k、l按键都将有效，完美支持了快速切换的Geek需求。

除了上下左右外， 还有几个快捷指令可以设置。
```
bind -r e lastp # 选择最后一个面板
bind -r ^e last # 选择最后一个窗口

bind -r ^u swapp -U # 与前一个面板交换位置
bind -r ^d swapp -D # 与后一个面板交换位置
```


[slide]
# 面板大小调整

习惯了全键盘操作后，命令的便捷性不言而喻。既然面板切换的指令都可以升级，面板大小调整的指令自然也不能落后。如下配置就可以升级你的操作：
```
# 绑定Ctrl+hjkl键为面板上下左右调整边缘的快捷指令
bind -r ^k resizep -U 10 # 绑定Ctrl+k为往↑调整面板边缘10个单元格
bind -r ^j resizep -D 10 # 绑定Ctrl+j为往↓调整面板边缘10个单元格
bind -r ^h resizep -L 10 # 绑定Ctrl+h为往←调整面板边缘10个单元格
bind -r ^l resizep -R 10 # 绑定Ctrl+l为往→调整面板边缘10个单元格
```
> 以上，resizep即resize-pane的别名。

[slide]
# 面板最大化

当窗口中面板的数量逐渐增多时，每个面板的空间就会逐渐减少。为了保证有足够的空间显示内容，tmux从v1.8版本起，提供了面板的最大化功能，输入tmux-prefix+z，就可以最大化当前面板至窗口大小，只要再重复输入一次，便恢复正常。那么tmux v1.8以下的版本，怎么办呢？别急，有大神提供了如下的解决方案。

首先编写一个zoom脚本，该脚本通过新建一个窗口，交换当前面板与新的窗口默认面板位置，来模拟最大的功能；通过重复一次按键，还原面板位置，并关闭新建的窗口，来模拟还原功能，如下所示：
```
#!/bin/bash -f
currentwindow=`tmux list-window | tr '\t' ' ' | sed -n -e '/(active)/s/^[^:]*: *\([^ ]*\) .*/\1/gp'`;
currentpane=`tmux list-panes | sed -n -e '/(active)/s/^\([^:]*\):.*/\1/gp'`;
panecount=`tmux list-panes | wc | sed -e 's/^ *//g' -e 's/ .*$//g'`;
inzoom=`echo $currentwindow | sed -n -e '/^zoom/p'`;
if [ $panecount -ne 1 ]; then
    inzoom="";
fi
if [ $inzoom ]; then
    lastpane=`echo $currentwindow | rev | cut -f 1 -d '@' | rev`;
    lastwindow=`echo $currentwindow | cut -f 2- -d '@' | rev | cut -f 2- -d '@' | rev`;
    tmux select-window -t $lastwindow;
    tmux select-pane -t $lastpane;
    tmux swap-pane -s $currentwindow;
    tmux kill-window -t $currentwindow;
else
    newwindowname=zoom@$currentwindow@$currentpane;
    tmux new-window -d -n $newwindowname;
    tmux swap-pane -s $newwindowname;
    tmux select-window -t $newwindowname;
fi
```

不妨将该脚本存放在~/.tmux目录中（没有则新建目录），接下来只需要绑定一个快捷指令就行，如下。
```
unbind z
bind z run ". ~/.tmux/zoom"
```


[slide]
# 窗口变为面板

通过上面的zoom脚本，面板可以轻松地最大化为一个新的窗口。那么反过来，窗口是不是可以最小化为一个面板呢？

试想这样一个场景：当你打开多个窗口后，然后想将其中几个窗口合并到当前窗口中，以便对比观察输出。

实际上，你的要求就是将其它窗口变成面板，然后合并到当前窗口中。对于这种操作，我们可以在当前窗口，按下prefix + :，打开命令行，然后输入如下命令：
```
join-pane -s window01 # 合并名称为window01的窗口的默认（第一个）面板到当前窗口中
join-pane -s window01.1 # .1显式指定了第一个面板，.2就是第二个面板(我本地将面板编号起始值设置为1，默认是0)
```

每次执行join-pane命令都会合并一个面板，并且指定的窗口会减少一个面板，直到面板数量为0，窗口关闭。

除了在当前会话中操作外，join-pane命令甚至可以从其它指定会话中合并面板，格式为join-pane -s [session_name]:[window].[pane]，如join-pane -s 2:1.1 即合并第二个会话的第一个窗口的第一个面板到当前窗口，当目标会话的窗口和面板数量为0时，会话便会关闭。


[slide]
# 复制模式

tmux中操作文本，自然离不开复制模式，通常使用复制模式的步骤如下：

1. 输入 `+[ 进入复制模式
2. 按下 空格键 开始复制，移动光标选择复制区域
3. 按下 回车键 复制选中文本并退出复制模式
4. 按下 `+] 粘贴文本

查看复制模式默认的快捷键风格：
```
tmux show-window-options -g mode-keys # mode-keys emacs
```
> 默认情况下，快捷键为emacs风格。

为了让复制模式更加方便，我们可以将快捷键设置为熟悉的vi风格，如下：
```
setw -g mode-keys vi # 开启vi风格后，支持vi的C-d、C-u、hjkl等快捷键
```

自定义复制和选择快捷键

除了快捷键外，复制模式的启用、选择、复制、粘贴等按键也可以向vi风格靠拢。
```
bind Escape copy-mode # 绑定esc键为进入复制模式
bind -t vi-copy v begin-selection # 绑定v键为开始选择文本
bind -t vi-copy y copy-selection # 绑定y键为复制选中文本
bind p pasteb # 绑定p键为粘贴文本（p键默认用于进入上一个窗口，不建议覆盖）
```

以上，绑定 v、y两键的设置只在tmux v2.4版本以下才有效，对于v2.4及以上的版本，绑定快捷键需要使用 -T 选项，发送指令需要使用 -X 选项，请参考如下设置：
```
bind -T copy-mode-vi v send-keys -X begin-selection
bind -T copy-mode-vi y send-keys -X copy-selection-and-cancel
```



## Tmux优化
[slide]
# 设置窗口面板起始序号
```
set -g base-index 1 # 设置窗口的起始下标为1
set -g pane-base-index 1 # 设置面板的起始下标为1
```

[slide]
# 自定义状态栏
```
set -g status-utf8 on # 状态栏支持utf8
set -g status-interval 1 # 状态栏刷新时间
set -g status-justify left # 状态栏列表左对齐
setw -g monitor-activity on # 非当前窗口有内容更新时在状态栏通知

set -g status-bg black # 设置状态栏背景黑色
set -g status-fg yellow # 设置状态栏前景黄色
set -g status-style "bg=black, fg=yellow" # 状态栏前景背景色

set -g status-left "#[bg=#FF661D] ❐ #S " # 状态栏左侧内容
set -g status-right 'Continuum status: #{continuum_status}' # 状态栏右侧内容
set -g status-left-length 300 # 状态栏左边长度300
set -g status-right-length 500 # 状态栏左边长度500

set -wg window-status-format " #I #W " # 状态栏窗口名称格式
set -wg window-status-current-format " #I:#W#F " # 状态栏当前窗口名称格式(#I：序号，#w：窗口名称，#F：间隔符)
set -wg window-status-separator "" # 状态栏窗口名称之间的间隔
set -wg window-status-current-style "bg=red" # 状态栏当前窗口名称的样式
set -wg window-status-last-style "fg=red" # 状态栏最后一个窗口名称的样式

set -g message-style "bg=#202529, fg=#91A8BA" # 指定消息通知的前景、后景色
```


[slide]
# 开启256 colors支持

默认情况下，tmux中使用vim编辑器，文本内容的配色和直接使用vim时有些差距，此时需要开启256 colors的支持，配置如下。
```
set -g default-terminal "screen-256color"
或者：

set -g default-terminal "tmux-256color"
或者启动tmux时增加参数-2：

alias tmux='tmux -2' # Force tmux to assume the terminal supports 256 colours
```


[slide]
# 关闭默认的rename机制

tmux默认会自动重命名窗口，频繁的命令行操作，将频繁触发重命名，比较浪费CPU性能，性能差的计算机上，问题可能更为明显。建议添加如下配置关闭rename机制。
```
setw -g automatic-rename off
setw -g allow-rename off
```
