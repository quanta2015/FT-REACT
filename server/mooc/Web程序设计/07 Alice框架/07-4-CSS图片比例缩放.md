title: 纯CSS实现对象按比例缩放
author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: T17-web-img-ratio-by-css.html

--
# 纯CSS实现对象按比例缩放
## keep img ratio by css3

--
### 对象按比例缩放
####命题
> 页面中有若干个 item，其中每个 item 都向左浮动，并包含在自适应浏览器窗口宽度的父元素中。  
```html
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
}
```
####问题
> 在保持 item 元素宽高比恒定（如高是宽的 1.618 倍）的情况下，使得 item 元素可以和父元素同比缩放。   
####分析
> 如果当 item 元素是图片，同时需要保持的宽高比恰好为图片本身的宽高比时，可以设置 item 的 height 为 auto 即可轻松实现这个需求。然而当 item 元素不是图片或者要保持的宽高比和图片本身的宽高比不同时，这个需求显得很难直接用 CSS 实现。

#### 解决方案
**idea1:** 一个元素的 `padding` ，如果值是一个百分比，那这个百分比是相对于其父元素的宽度而言的，即使对于 `padding-bottom` 和 `padding-top` 也是如此。  
**idea2:** 在计算 `Overflow` 时，是将元素的内容区域（即 `width / height` 对应的区域）和 `Padding` 区域一起计算的。换句话说，即使将元素的 `overflow` 设置为 `hidden`，“溢出”到 `Padding` 区域的内容也会照常显示。

**解决方法**  
使用 `padding-bottom` 来代替 `height` 来实现高度与宽度成比例的效果。因为 `item` 元素的宽度是其父元素宽度的 21%，所以我们将 `padding-bottom` 设置为它的 1.618 倍，即 33.98%。同时将其 `height` 设置为 0 以使元素的“高度”等于 `padding-bottom` 的值，从而实现需要的效果。

```css
.item {
  float: left;
  margin: 10px 2%;
  padding-bottom: 33.98%;
  width: 21%;
  height: 0;
} 
```
<div class="cont">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div> 
    <div class="item"></div>
    <div class="item"></div>
</div>
<style type="text/css">
    .cont {
        width: 100%;
    }
    .item {
        float: left;
        margin: 10px 2%;
        padding-bottom: 33.98%;
        width: 21%;
        height: 0;
        background: #666;
}
</style>