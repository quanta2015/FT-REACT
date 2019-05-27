title: Excel读写

author:
  name: LI YANG
  url: http://mooc1.chaoxing.com/course/87155873.html
output: 13-web-excel.html

--
# Excel读写
## 使用JS操作Excel文件

--
### js-xlsx 简介
XLSX.js 是一个用来转换 BASE64 编码的 XLSX 文件数据为 JavaScript 对象，也支持 JavaScript 对象到 XLSX 数据的转换。目前支持的格式为：

- Excel 2007+ XML Formats (XLSX/XLSM)
- Excel 2007+ Binary Format (XLSB)
- Excel 2003-2004 XML Format (XML "SpreadsheetML")
- Excel 97-2004 (XLS BIFF8)
- Excel 5.0/95 (XLS BIFF5)
- OpenDocument Spreadsheet (ODS)

--
### js-xlsx 安装方法
```js
//With npm:
npm install xlsx

//In the browser:
<script lang="javascript" src="dist/xlsx.core.min.js"></script>
```

--
### Workbooks解析方式  
#### 1. AJAX
```JS
/* set up XMLHttpRequest */
var url = "test_files/formula_stress_test_ajax.xlsx";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");
  var workbook = XLSX.read(bstr, {type:"binary"});

  /* DO SOMETHING WITH workbook HERE */
}

oReq.send();
```

--
### Workbooks解析方式  
#### 2. HTML5下拉框 [readAsBinaryString]:
```JS
/* set up drag-and-drop event */
function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();
  var files = e.dataTransfer.files;
  var i,f;
  for (i = 0, f = files[i]; i != files.length; ++i) {
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {type: 'binary'});

      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsBinaryString(f);
  }
}
drop_dom_element.addEventListener('drop', handleDrop, false);
```

--
### Workbooks解析方式  
#### 3. HTML5  input file对象:
```JS
function handleFile(e) {
  var files = e.target.files;
  var i,f;
  for (i = 0, f = files[i]; i != files.length; ++i) {
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
      var data = e.target.result;

      var workbook = XLSX.read(data, {type: 'binary'});

      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsBinaryString(f);
  }
}
input_dom_element.addEventListener('change', handleFile, false);
```

--
### Workbook 读取操作

```js
var first_sheet_name = workbook.SheetNames[0];
var address_of_cell = 'A1';

/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];

/* Find desired cell */
var desired_cell = worksheet[address_of_cell];

/* Get the value */
var desired_value = desired_cell.v;
```
> 遍历所有表单元素的范例
```js
var sheet_name_list = workbook.SheetNames;
sheet_name_list.forEach(function(y) { /* iterate through sheets */
  var worksheet = workbook.Sheets[y];
  for (z in worksheet) {
    /* all keys that do not begin with "!" correspond to cell addresses */
    if(z[0] === '!') continue;
    console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
  }
});
```

--
### Workbook 写操作
```js
/* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
var wbout = XLSX.write(workbook,wopts);
function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
//保存到本地文件
saveAs(new Blob([s2ab(wbout)],{type:""}), "test.xlsx")
```

--
### 接口函数
> 1 . 解析函数
```js
XLSX.read(data, read_opts) attempts to parse data.
XLSX.readFile(filename, read_opts) attempts to read filename and parse.
```

> 2 . 修改函数
```js
XLSX.write(wb, write_opts) attempts to write the workbook wb
XLSX.writeFile(wb, filename, write_opts) attempts to write wb to filename
```
> 3 . 其他工具函数
```js
工具类 XLSX.utils:
sheet_to_json 见表单 [workbook] 转换成 [JSON] 对象.
sheet_to_csv 转换成csv对象
sheet_to_formulae 转换成公式

单元格操作函数:
format_cell 取单元格的文本数据
{en,de}code_{row,col} 返回从0开始的单元格行和列
{en,de}code_cell 转换单元格的地址
{en,de}code_range 转换单元格的距离
```

> 4 . 单元格对象的属性

`v` : raw value (see Data Types section for more info)  
`w` : formatted text (if applicable)  
`t` : cell type: b Boolean, n Number, e error, s String, d Date  
`f` : cell formula (if applicable)  
`r` : rich text encoding (if applicable)  
`h` : HTML rendering of the rich text (if applicable)  
`c` : comments associated with the cell **  
`z` : number format string associated with the cell (if requested)  
`l` : cell hyperlink object (.Target holds link, .tooltip is tooltip)  
`s` :the style/theme of the cell (if applicable)  

> 5 . [js-xlsx的官方网站](https://github.com/SheetJS/js-xlsx)

