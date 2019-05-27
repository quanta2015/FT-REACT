title: 高级事件绑定
author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: T21-web-action-bind.html


--
# 高级事件绑定
## How to bind click function to dynantic element


--
### HTML5 新属性data api

HTML5的data-* API可以定义新的属性

```html
  <a href="#" data-action="xx-action" data-id="1">Link</a>
```

定义之后的取值方法
```js
  $("a").on('click',function(){
    var $id = $(this).data("id");
    var $action = $(this).data("action");
  })
```


--
### 静态数据显示
通过data元素可以将静态数据绑定到页面元素进行显示，最常用的是删除数据的确认逻辑过程。

**html**
```html
<a href="/deleteSomething" class="btn btn-primary" data-toggle="confirm" data-message="确认要删除此文章吗">删除</a>
```

**JS**
```js
$('[data-toggle="confirm"]').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var msg = $this.data('message');
    if (confirm(msg)) {
        location.href = $this.attr('href');
    }
});
```


--
### 动态事件绑定
假定动态添加到页面元素为
```html
  <a href="#" data-action="xx-action">Link</a>
  <a href="#" data-action="yy-action">Link</a>
```

1. 定义不同元素的`事件数组`，每个元素为函数指针，指向触发的事件；
2. 在元素的点击事件中取出 `data-action` 属性，并且以此为下标从`事件数组`中取出函数指针，判断如果是函数则调用
```js
var actionList = {
    'xx-action': function () {
        //do your action
    },
    'yy-action': function () {
        //do your action
    }
}

$(init);

function init() {
  $(document.body).on('click', '[data-action]', function () {
      var actionName = $(this).data("action");  //取html5自定义data的action数值
      var action = actionList[actionName];      //取数组中的函数指针
      if ($.isFunction(action)) action();       //判断是否为函数，并执行函数
  })

  $(document.body).append('<a href="#" data-action="xx-action">Link</a><a href="#" data-action="yy-action">Link</a>')
}
```


-- 
### 通用的事件侦听器函数
```js
 markyun.Event = {
        // 页面加载完成后
        readyEvent : function(fn) {
            if (fn==null) {
                fn=document;
            }
            var oldonload = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = fn;
            } else {
                window.onload = function() {
                    oldonload();
                    fn();
                };
            }
        },
        // 视能力分别使用dom0||dom2||IE方式 来绑定事件
        // 参数： 操作的元素,事件名称 ,事件处理程序
        addEvent : function(element, type, handler) {
            if (element.addEventListener) {
                //事件类型、需要执行的函数、是否捕捉
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, function() {
                    handler.call(element);
                });
            } else {
                element['on' + type] = handler;
            }
        },
        // 移除事件
        removeEvent : function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.datachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        },
        // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
        stopPropagation : function(ev) {
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },
        // 取消事件的默认行为
        preventDefault : function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        // 获取事件目标
        getTarget : function(event) {
            return event.target || event.srcElement;
        },
        // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
        getEvent : function(e) {
            var ev = e || window.event;
            if (!ev) {
                var c = this.getEvent.caller;
                while (c) {
                    ev = c.arguments[0];
                    if (ev && Event == ev.constructor) {
                        break;
                    }
                    c = c.caller;
                }
            }
            return ev;
        }
    };

```

--
### 拷贝剪贴板函数
```js
   function copyTextToClipboard(text) {
      var textArea = document.createElement("textarea");
      //首先创建一个textarea

      textArea.style.position = 'fixed'; 
      textArea.style.top = 0;
      textArea.style.left = 0;
    
     //把它隐藏起来
      textArea.style.width = '2em';
      textArea.style.height = '2em';

      //同时需要把padding给去掉
      textArea.style.padding = 0;

      // 去除Border
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';

      // 防止闪现白色盒子
      textArea.style.background = 'transparent';

        //把传过来的内容赋值给textarea
      textArea.value = text;
        //将其添加到页面
      document.body.appendChild(textArea);
        //选中所有文本
      textArea.select();

      try {
        //这句最关键，将内容赋值给copy操作
        var successful = document.execCommand('copy');
        
        var msg = successful ? 'successful' : 'unsuccessful';
       // console.log('Copying text command was ' + msg);
      } catch (err) {
      //  console.log('Oops, unable to copy');
      }
        //用完就删
      document.body.removeChild(textArea);
    }
```