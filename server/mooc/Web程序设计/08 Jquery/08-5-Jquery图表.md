title: jpPlot图表

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: 01-web-jquery-chart.html

  <script src="lib/jquery.js"></script>
  <script src="lib/jquery.jqplot.js"></script>
  <script src="lib/plugins/jqplot.barRenderer.js"></script>
  <script src="lib/plugins/jqplot.pieRenderer.js"></script>
  <script src="lib/plugins/jqplot.categoryAxisRenderer.js"></script>
  <script src="lib/plugins/jqplot.pointLabels.js"></script>
  <script src="lib/plugins/jqplot.donutRenderer.js"></script>
  <script src="lib/plugins/jqplot.logAxisRenderer.js"></script>
  <script src="lib/plugins/jqplot.canvasTextRenderer.js"></script>
  <script src="lib/plugins/jqplot.canvasAxisLabelRenderer.js"></script>
  <script src="lib/plugins/jqplot.canvasAxisTickRenderer.js"></script>
  <script src="lib/plugins/jqplot.dateAxisRenderer.js"></script>
  <script src="lib/chart.js"></script>




--
# jpPlot图表
## 使用JS绘制图表

--
### jpPlot 简介
* 如果你已经在使用jQuery，不想为HighCharts付费，而且情况很简单，不需要D3那样复杂的库，那么jqPlot是很好的选择。


--
### 普通柱状图
<div id="chart1" style="width: 400px; height: 300px;"></div>
> HTML
```HTML
    <link rel="stylesheet" href="lib/jquery.jqplot.css" />
    <script src="lib/jquery.js"></script>
    <script src="lib/jquery.jqplot.js"></script>
    <script src="lib/plugins/jqplot.barRenderer.js"></script>
    <script src="lib/plugins/jqplot.pieRenderer.js"></script>
    <script src="lib/plugins/jqplot.categoryAxisRenderer.js"></script>
    <script src="lib/plugins/jqplot.pointLabels.js"></script>
    <script src="lib/plugins/jqplot.donutRenderer.js"></script>
    <script src="lib/plugins/jqplot.logAxisRenderer.js"></script>
    <script src="lib/plugins/jqplot.canvasTextRenderer.js"></script>
    <script src="lib/plugins/jqplot.canvasAxisLabelRenderer.js"></script>
    <script src="lib/plugins/jqplot.canvasAxisTickRenderer.js"></script>
    <script src="lib/plugins/jqplot.dateAxisRenderer.js"></script>
```
> JAVASCRIPT
```js
    var line1 = [['Nissan', 4],['Porche', 6],['Acura', 2],['Aston ', 5],['Rolls ', 6]];
    $('#chart1').jqplot([line1], {
        title:'Default Bar Chart',
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer
        },
        axes:{
            xaxis:{
                renderer: $.jqplot.CategoryAxisRenderer
            }
        }
    });
```

--
### 自定义色彩柱状图
<div id="chart2" style="width: 400px; height: 300px;"></div>
```JAVASCRIPT
$(document).ready(function(){
    var line1 = [['Nissan', 4],['Porche', 6],['Acura', 2],['Aston Martin', 5],['Rolls Royce', 6]];
 
    $('#chart2').jqplot([line1], {
        title:'Bar Chart with Custom Colors',
        //自定义色彩
        seriesColors:['#85802b', '#00749F', '#73C774', '#C7754C', '#17BDB8'],
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {
                varyBarColor: true
            }
        },
        axes:{
            xaxis:{
                renderer: $.jqplot.CategoryAxisRenderer
            }
        }
    });
});
```

--
### 多输入柱状图
<div id="chart3" style="width: 400px; height: 300px;"></div>
```js
  var s1 = [2, 6, 7, 10];
    var s2 = [7, 5, 3, 2];
    var ticks = ['a', 'b', 'c', 'd'];
    plot2 = $.jqplot('chart3', [s1, s2], {
        seriesDefaults: {
            renderer:$.jqplot.BarRenderer,
            pointLabels: { show: true }
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: ticks
            }
        }
    });
```

--
### 普通饼状图
<div id="chart4" style="width: 400px; height: 300px;"></div>
```js
var data = [
    ['Heavy Industry', 12],
    ['Retail', 9],
    ['Light Industry', 14],
    ['Out of home', 16],
    ['Commuting', 7],
    ['Orientation', 9]
  ];
  var plot1 = jQuery.jqplot('chart4', [data], {
    seriesDefaults: {
      // 定义饼状图
      renderer: jQuery.jqplot.PieRenderer,
      rendererOptions: {
        showDataLabels: true
      }
    },
    legend: {
      show: true,
      location: 'e'
    }
  });
```

--
### 空心饼状图
<div id="chart5" style="width: 400px; height: 300px;"></div>
```js
  var s1 = [['a',6], ['b',8], ['c',14], ['d',20]];
  var plot3 = $.jqplot('chart5', [s1], {
    seriesDefaults: {
      // make this a donut chart.
      renderer:$.jqplot.DonutRenderer,
      rendererOptions:{
        // 环间距
        sliceMargin: 3,
        // 开始角度
        startAngle: 0,
        showDataLabels: true,
        // 'value'：表示数值  or  'label'：表示标签
        dataLabels: 'value'
      }
    }
  });
```

--
### 普通折线图
<div id="chart6" style="width: 400px; height: 300px;"></div>
```js
$('#chart6').jqplot([[3,7,9,1,5,3,8,2,5]]);
```

--
### 自定义坐标轴折线图
<div id="chart7" style="width: 600px; height: 300px;"></div>
```js
var line1 = [6.5, 9.2, 14, 19.65, 26.4, 35, 51];
 
    var plot1 = $.jqplot('chart7', [line1], {
        legend: {show:false},
        axes:{
          xaxis:{
          tickOptions:{ 
            angle: -30
          },
          tickRenderer:$.jqplot.CanvasAxisTickRenderer,
            label:'', 
          labelOptions:{
            fontFamily:'Helvetica',
            fontSize: '14pt'
          },
          labelRenderer: $.jqplot.CanvasAxisLabelRenderer
          }, 
          yaxis:{
            renderer:$.jqplot.LogAxisRenderer,
            tickOptions:{
                labelPosition: 'middle', 
                angle:-30
            },
            tickRenderer:$.jqplot.CanvasAxisTickRenderer,
            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
            labelOptions:{
                fontFamily:'Helvetica',
                fontSize: '14pt'
            },
            label:'Core Motor Voltage'
          }
        }
    });
```
--
### 多图比较
<div id="chart8" style="width: 600px; height: 500px;"></div>
```js
var line = [['Cup Holder Pinion Bob', 7], ['Generic Fog Lamp', 9], ['HDTV Receiver', 15], 
    ['8 Track Control Module', 12], [' Sludge Pump Fourier Modulator', 3], 
    ['Transcender/Spice Rack', 6], ['Hair Spray Danger Indicator', 18]];
 
    var line2 = [['Nickle', 28], ['Aluminum', 13], ['Xenon', 54], ['Silver', 47], 
    ['Sulfer', 16], ['Silicon', 14], ['Vanadium', 23]];
 
    var plot4 = $.jqplot('chart8', [line, line2], {
        title: 'Concern vs. Occurrance',
        series:[{renderer:$.jqplot.BarRenderer}, {xaxis:'x2axis', yaxis:'y2axis'}],
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                label: 'Warranty Concern',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                tickOptions: {
                    angle: 30
                }
            },
            x2axis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                label: 'Metal',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                tickOptions: {
                    angle: 30
                }
            },
            yaxis: {
                autoscale:true,
                label: 'Occurance',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                tickOptions: {
                    angle: 30
                }
            },
            y2axis: {
                autoscale:true,
                label: 'Number',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                tickOptions: {
                    angle: 30
                }
            }
        }
    });
```