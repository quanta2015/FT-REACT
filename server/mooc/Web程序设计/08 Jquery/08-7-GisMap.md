title: 百度地图应用开发

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: 24-web-map.html

--
# Baidu Map Application Development
## 百度地图应用开发

--
## 百度地图介绍
百度地图API是为开发者免费提供的一套基于百度地图服务的应用接口，包括JavaScript API、Web服务API、Android SDK、iOS SDK、定位SDK、车联网API、LBS云等多种开发工具与服务，提供基本地图展现、搜索、定位、逆/地理编码、路线规划、LBS云存储与检索等功能，适用于PC端、移动端、服务器等多种设备，多种操作系统下的地图应用开发。
<p><img src="img/web/webmap01.png" width="700" ></p>

--
### 百度地图Api分类
百度地图服务主要分为三类：

- Android接口Api
- IOS接口Api
- Web服务接口Api
<p><img src="img/web/webmap02.png" width="599" ></p>

--
### 密钥申请
为了统一平台服务的配额管理，JavaScript API在新版本引入Key机制。 
JavaScript API v1.4 及以前版本无须申请密钥`key`,自 v1.5 版本开始需要先申请密钥`key`才可使用。
<p><img src="img/web/webmap03.png" width="600" ></p>

--
### 获取 Javascript API服务方法 
```js
<script src="http://api.map.baidu.com/api?v=2.0&ak=yourAppKey" type="text/javascript"></script>
//其中参数v 为API 当前的版本号，目前最新版本为2.0。
```
<p><img src="img/web/webmap04.png" width="538" ></p>

--
### 创建百度地图模板
在编写百度地图应用之前，首先用`div`元素创建地图容器元素`myMap` 。
```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Hello, World</title>
    <script src="http://api.map.baidu.com/api?v=2.0&ak=yourAppKey"></script>
  </head>
  <body>
    <div id="myMap"></div>
  </body>
</html>
```

--
### 创建地图实例
位于 `BMap` 命名空间下的 `Map` 类表示地图，通过 `new` 操作符可以创建一个地图实例。其参数可以是元素`id`也可以是元素对象。 
```js
var map = new BMap.Map("myMap"); 
//注意在调用此构造函数时应确保容器元素myMap已经添加到地图上。
``` 

--
### 创建点坐标
使用 `BMap` 命名空间下的 `Point` 类来创建一个坐标点。`Point` 类描述了一个地理坐标点，其中`116.404`表示经度，`39.915`表示纬度。
```HTML
  var point = new BMap.Point(116.404, 39.915);
``` 

--
### 地图初始化
 在创建地图实例后，需要对其进行初始化，`BMap.Map.centerAndZoom()`方法要求设置中心点坐标和地图级别。 
```js
map.centerAndZoom(point, 15);   
//地图必须经过初始化才可以执行其他操作。
```
<p><img src="img/web/webmap05.png" width="577" ></p>

--
### 地图配置与操作 
地图被实例化并完成初始化以后，就可以与其进行交互了。支持鼠标拖拽、滚轮缩放、双击放大等交互功能。如果希望在地图中使用鼠标滚轮控制缩放，则可以调用 `map.enableScrollWheelZoom` 方法来开启。`Map` 类提供了若干修改地图状态的方法。 例如： `setCenter()`、`panTo()`、`zoomTo()`等等。 
```js
//下例显示一个地图,两秒钟后会移动到新中心点; 
//panTo()方法将让地图平移至新中心点,如果移动距离超过了当前地图区域大小，则地图会直跳到该点。
var map = new BMap.Map("container");
var point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point, 15);
window.setTimeout(function() {
  map.panTo(new BMap.Point(116.409, 39.918));
}, 2000);
```

--
### 地图控件概述
百度地图上负责与地图交互的`UI元素`称为控件。而且可以通过`Control`类来实现自定义控件。地图API中提供的控件有：
- `Control`：控件的抽象基类，所有控件均继承此类的方法、属性。通过此类您可实现自定义控件。  
- `NavigationControl`：地图平移缩放控件，PC端默认位于地图左上方，它包含控制地图的平移和缩放的功能。移动端提供缩放控件，默认位于地图右下方。  
- `OverviewMapControl`：缩略地图控件，默认位于地图右下方，是一个可折叠的缩略地图。  
- `ScaleControl`：比例尺控件，默认位于地图左下方，显示地图的比例关系。  
- `MapTypeControl`：地图类型控件，默认位于地图右上方。  
- `CopyrightControl`：版权控件，默认位于地图左下方。  
- `GeolocationControl`：定位控件，针对移动端开发，默认位于地图左下方。  

--
### 向地图添加控件
可以使用`Map.addControl()`方法向地图添加控件。在此之前地图需要进行初始化。
```js
//向地图添加标准地图控件、平移缩放控件、比例尺控件和缩略图控件。
var map = new BMap.Map("map");    
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);    
map.addControl(new BMap.NavigationControl());   
map.addControl(new BMap.ScaleControl());    
map.addControl(new BMap.OverviewMapControl());    
map.addControl(new BMap.MapTypeControl());    
map.setCurrentCity("北京"); 
```
<p><img src="img/web/webmap06.png" width="580" ></p>

--
### 地图覆盖物概述
所有叠加或覆盖到地图的内容，我们统称为`地图覆盖物`。如`标注`、`矢量图形元素`(包括：`折线`和`多边形`和`圆`)、`信息窗口`等。覆盖物拥有自己的地理坐标，当您拖动或缩放地图时，它们会相应的移动。
> 地图API提供了如下几种覆盖物：

- `Overlay`：覆盖物的抽象基类，所有的覆盖物均继承此类的方法。  
- `Marker`：标注表示地图上的点，可自定义标注的图标。  
- `Label`：表示地图上的文本标注，您可以自定义标注的文本内容。  
- `Polyline`：表示地图上的折线。  
- `Polygon`：表示地图上的多边形。多边形类似于闭合的折线，另外您也可以为其添加填充颜色。  
- `Circle`: 表示地图上的圆。  
- `InfoWindow`：信息窗口也是一种特殊的覆盖物，它可以展示更为丰富的文字和多媒体信息。注意：同一时刻只能有一个信息窗口在地图上打开。  
```html
可以使用map.addOverlay方法向地图添加覆盖物，使用map.removeOverlay方法移除覆盖物，注意此方法不适用于InfoWindow。
```

--
### 标注
标注表示地图上的点。API提供了默认图标样式，您也可以通过`Icon类`来指定自定义图标。`Marker`的构造函数的参数为`Point`和`MarkerOptions`（可选）。
> 注意：自定义图标时，标注的坐标点将位于标注所用图标的中心位置，您可通过`Icon`的`offset`属性修改标定位置。
```js
var map = new BMap.Map("container");    
var point = new BMap.Point(116.404, 39.915);    
map.centerAndZoom(point, 15);    
var marker = new BMap.Marker(point);// 创建标注    
map.addOverlay(marker);

//自定义图标
var map = new BMap.Map("map"); 
var point = new BMap.Point(116.404, 39.915);    
map.centerAndZoom(point, 15);  // 编写自定义函数，创建标注   
var myIcon = new BMap.Icon("marker.png", new BMap.Size(20, 34));       
var marker = new BMap.Marker(point,{icon: myIcon});    
map.addOverlay(marker);      
```
<p><img src="img/web/webmap07.png" width="580" ></p>


--
### 监听标注事件
事件方法与`Map`事件机制相同
```js
marker.addEventListener("click", function(){    
 alert("您点击了标注");    
});
```

--
### 可托拽的标注
marker的`enableDragging`和`disableDragging`方法可用来开启和关闭标注的拖拽功能。默认情况下标注不支持拖拽，您需要调用`marker.enableDragging()`方法来开启拖拽功能。在标注开启拖拽功能后，您可以监听标注的`dragend`事件来捕获拖拽后标注的最新位置。
```js
marker.enableDragging();    
marker.addEventListener("dragend", function(e){    
 alert("当前位置：" + e.point.lng + ", " + e.point.lat);    
})
```

--
### 内存释放
如果您需要在地图中反复添加大量的标注，这可能会占用较多的内存资源。如果您的标注在移除后不再使用，可调用`Overlay.dispose()`方法来释放内存。
```js
map.removeOverlay(marker);
```

--
### 信息窗口
信息窗口在地图上方的浮动显示`HTML`内容。信息窗口可直接在地图上的任意位置打开，也可以在标注对象上打开（此时信息窗口的坐标与标注的坐标一致）。 您可以使用`InfoWindow`来创建一个信息窗实例，注意`同一时刻地图上只能有一个信息窗口处于打开状态`。
```js
var opts = {
  width: 250, // 信息窗口宽度    
  height: 100, // 信息窗口高度    
  title: "Hello" // 信息窗口标题   
}
var infoWindow = new BMap.InfoWindow("World", opts); // 创建信息窗口对象    
map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口
```
<p><img src="img/web/webmap08.png" width="574" ></p>

--
### 折线
`Polyline`表示地图上的折线覆盖物。
- 折线包含一组点，并将这些点连接起来形成折线。
- 可以自定义这些线段的颜色、粗细和透明度。
- 颜色可以是十六进制数字形式（比如：`#ff0000`）或者是颜色关键字（比如：`red`）。
```HTML
//在两点之间创建6像素宽的蓝色折线
var polyline = new BMap.Polyline([
  new BMap.Point(116.399, 39.910),
  new BMap.Point(116.405, 39.920)
], {
  strokeColor: "blue",
  strokeWeight: 6,
  strokeOpacity: 0.5
});
map.addOverlay(polyline);
```
<p><img src="img/web/webmap09.png" width="575" ></p>

--
### 事件监听
百度地图API中的大部分对象都含有`addEventListener`方法，可以通过该方法来监听对象事件。`addEventListener`方法有两个参数：监听的事件名称和事件触发时调用的函数。
```js
//每当用户点击地图时，会弹出一个警告框。
var map = new BMap.Map("container");    
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);    
map.addEventListener("click", function(){    
 alert("您点击了地图。");    
});
```

--
### 事件参数和this
 百度地图API的事件模型与此类似，在事件监听函数中传递事件对象e，每个`e`参数至少包含事件类型`type`和触发该事件的对象`target`。 API还保证函数内的`this`指向触发（同时也是绑定）事件的API对象。

```HTML
//通过参数e得到点击的经纬度坐标
var map = new BMap.Map("container");    
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);    
map.addEventListener("click", function(e){    
 alert(e.point.lng + ", " + e.point.lat);    
});

//通过this得到地图缩放后的级别。
var map = new BMap.Map("container");    
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);    
map.addEventListener("zoomend", function(){    
 alert("地图缩放至：" + this.getZoom() + "级");    
});
```

--
### 移除监听事件
不再希望监听事件时，可以将事件监听进行移除。每个API对象提供了removeEventListener用来移除事件监听函数。
```js
//用户第一次点击地图会触发事件监听函数，在函数内部对事件监听进行了移除，因此后续的点击操作则不会触发监听函数。
var map = new BMap.Map("map");
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
function showInfo(e) {
  alert(e.point.lng + ", " + e.point.lat);
  map.removeEventListener("click", showInfo);
}
map.addEventListener("click", showInfo);
```

--
### 地图服务概述
地图服务是指那些提供数据信息的接口，比如本地搜索、路线规划等等。百度地图API提供的服务有：

- `LocalSearch`：本地搜索，提供某一特定地区的位置搜索服务，比如在北京市搜索“公园”。  
- `TransitRoute`：公交导航，提供某一特定地区的公交出行方案的搜索服务。  
- `DrivingRoute`：驾车导航，提供驾车出行方案的搜索服务。  
- `WalkingRoute`：步行导航，提供步行出行方案的搜索服务。  
- `Geocoder`：地址解析，提供将地址信息转换为坐标点信息的服务。  
- `LocalCity`：本地城市，提供自动判断您所在城市的服务。  
- `TrafficControl`：实时路况控件，提供实时和历史路况信息服务。  

--
### 本地搜索
`BMap.LocalSearch`提供本地搜索服务，在使用本地搜索时需要为其设置一个检索区域，检索区域可以是`BMap.Map`对象、`BMap.Point`对象或者是省市名称（比如："北京市"）的字符串。

- `BMap.LocalSearch`构造函数的第二个参数是可选的，您可以在其中指定结果的呈现。  
- `BMap.RenderOptions`类提供了若干控制呈现的属性，其中`map`指定了结果所展现的地图实例，`panel`指定了结果列表的容器元素。  
```js
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
var local = new BMap.LocalSearch(map, {
  renderOptions: {
    map: map
  }
});
local.search("天安门");
//BMap.LocalSearch还提包含searchNearby和searchInBounds方法，为您提供周边搜索和范围搜索服务
```
<p><img src="img/web/webmap10.png" width="576" ></p>


--
### 配置搜索 & 结果面板
`BMap.LocalSearch`提供了若干配置方法，通过它们可以自定义搜索服务的行为以满足您的需求。 
```HTML
//调整每页显示8个结果,为本地搜索对象提供一个结果列表容器，搜索结果会自动添加到容器元素中。
var map = new BMap.Map("map");

map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
var local = new BMap.LocalSearch(map, {
  pageCapacity: 8,
  renderOptions: {
    map: map,
    panel: "result"
  }
});
local.search("中关村");
```
<p><img src="img/web/webmap11.png" width="726" ></p>


--
### 周边搜索 - searchNearby
通过周边搜索服务，您可以在某个地点附近进行搜索，也可以在某一个特定结果点周围进行搜索。
```js
var map = new BMap.Map("map");
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
var local = new BMap.LocalSearch(map, {
  renderOptions: {
    map: map,
    autoViewport: true
  }
});
local.searchNearby("小吃", "前门");
```
<p><img src="img/web/webmap12.png" width="558" ></p>

--
### 公交导航
`BMap.TransitRoute`类提供公交导航搜索服务。  

- 和本地搜索类似，在搜索之前需要指定搜索区域，注意公交导航的区域范围只能是市，而不能是省。
- 如果搜索区域为`BMap.Map`对象，路线结果会自动添加到地图上。
- 如果您提供了结果容器，相应的路线描述也会展示在页面上。
```HTML
map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
var transit = new BMap.TransitRoute(map, {
  renderOptions: {
    map: map,
    panel: "results"
  }
});
transit.search("王府井", "西单");
```
<p><img src="img/web/webmap13.png" width="772" ></p>

--
### 驾车导航
`BMap.DrivingRoute`提供驾车导航服务。与公交导航不同的是，驾车导航的搜索范围可以设置为省。
```js
var map = new BMap.Map("map");    
map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
var driving = new BMap.DrivingRoute(map, {
  renderOptions: {
    map: map,
    panel: "results",
    autoViewport: true
  }
});
driving.search("中关村", "天安门");
```
<p><img src="img/web/webmap14.png" width="775" ></p>

--
### 地理编码 - 根据地址描述获得坐标
百度地图API提供`Geocoder`类进行地址解析，您可以通过`Geocoder.getPoint()`方法来将一段地址描述转换为一个坐标。
```js
//获得地址“北京市海淀区上地10街10号”的地理坐标位置，并在这个位置上添加一个标注
var map = new BMap.Map("map");
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
// 创建地址解析器实例     
var myGeo = new BMap.Geocoder();
// 将地址解析结果显示在地图上，并调整地图视野    
myGeo.getPoint("北京市海淀区上地10街10号", function(point) {
  if (point) {
    map.centerAndZoom(point, 16);
    map.addOverlay(new BMap.Marker(point));
  }
}, "北京市");
```
<p><img src="img/web/webmap15.png" width="561" ></p>

--
### 反向地理编码
反向地理编码的过程正好相反，它根据一个坐标点得到一个地址的描述。您可以通过`Geocoder.getLocation()`方法获得地址描述。当解析工作完成后，您提供的回调函数将会被触发。如果解析成功，则回调函数的参数为`GeocoderResult`对象，否则为`null`。
```js
var map = new BMap.Map("map");
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
// 创建地理编码实例      
var myGeo = new BMap.Geocoder();
// 根据坐标得到地址描述    
myGeo.getLocation(new BMap.Point(116.364, 39.993), function(result) {
  if (result) {
    alert(result.address);
  }
});
```