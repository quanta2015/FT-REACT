##实验2 使用JS编写简单应用
> 现有下面html代码,其中有一个3行2列的表格,要求编写table.js完成下面功能:
> > 1. 点击单元格11,使表格的背景颜色变成红色;
> > 2. 点击单元格12,将单元格的内容变成当前的日期,其格式为(yyyy-mm-dd);
> > 3. 点击单元格21,将在现有单元格后面插入一行;
> > 4. 点击单元格22,将删除表格的第2行;
> > 5. 点击单元格31,显示当前的鼠标坐标;
> > 6. 点击单元格32,打开一个新窗口,里面显示淘宝主页;

```
<html>

	<head>  
		<script src="js/table.js"></script>
		<link href="css/table.css" rel="stylesheet">
	</head>
	<body>
		<table id="tbl">
			<tr>
				<td>11</td>
				<td>12</td>
			</tr>
			<tr>
				<td>21</td>
				<td>22</td>
			</tr>
			<tr>
				<td>31</td>
				<td>32</td>
			</tr>
		</table>
	</body>
</html>
```
