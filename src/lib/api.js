exports.addScroll = function(cnt) {
  
    var scrollFunc =  (e = window.event)=> {
      var offset, ITEM_HEIGHT = 20 ;
      var offsetMax =  cnt.parentNode.offsetHeight  - cnt.offsetHeight;
      if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) {
          offset = cnt.offsetTop;
          if (offset<0) {
            offset = offset + ITEM_HEIGHT;
            if (offset>0) offset = 0;
            cnt.style.top = offset + "px";
          }
        }else {
          offset = cnt.offsetTop;
          if (offset > offsetMax) {
            offset = offset - ITEM_HEIGHT;
            if (offset<offsetMax) offset= offsetMax;
            cnt.style.top = offset + "px";
          }
        }
      }else if (e.detail) {  //Firefox滑轮事件
        if (e.detail> 0) {
          offset = cnt.offsetTop;
          if (offset<0) {
            offset = offset + ITEM_HEIGHT;
            if (offset>0) offset = 0;
            cnt.style.top = offset + "px";
          }
        } else {
          offset = cnt.offsetTop;
          if (offset > offsetMax) {
            offset = offset - ITEM_HEIGHT;
            if (offset<offsetMax) offset= offsetMax;
            cnt.style.top = offset + "px";
          }
        }
      }
    };
    if (document.addEventListener) {
      document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }

    if ((typeof(cnt)==='undefined')||(cnt===null)) return;
    cnt.onmousewheel = scrollFunc;
}