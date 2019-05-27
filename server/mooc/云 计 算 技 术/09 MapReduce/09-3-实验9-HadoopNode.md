# 实验6. hadoop-streaming接口编程


### Running a Mapreduce job `NODEJS` 
**1. make `mapper.js` nodejs script**  

```bash
#!/usr/bin/node

var stdin = process.openStdin();

stdin.setEncoding('utf8');

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

stdin.on('data',function(chunk) {
  // console.log(chunk)
  if (chunk !== null) {
    chunk = replaceAll('\t',' ',chunk);
    chunk = replaceAll('\n',' ',chunk);
    chunk = chunk.trim();
    var words = chunk.split(' ');
    for(word in words){
      console.log(words[word]+'\t'+1);
    }
  }
});
```

replace the nodejs location in `mapper.js`
```bash
~$ which node
/usr/bin/node

```


make it executable execute
```bash
~$ chmod +x ./mapper.js

```

To test out the script run
```bash
~$ echo "The big brown fox ran up the stairs, the big brown bear walked down." | ./mapper.js

The 1
big 1
brown   1
fox 1
ran 1
up  1
the 1
stairs, 1
the 1
big 1
brown   1
bear    1
walked  1
down.   1
```


**2. make `reducer.js` nodejs script**

```bash
#!/usr/bin/node

var stdin = process.openStdin();

stdin.setEncoding('utf8')
var current_word='';
var current_count=0;

stdin.on('data',function(chunk) {
  
  if (chunk !== null) {
    chunk = chunk.trim();
    var arr = chunk.split('\n')
    for(word in arr){

      var tuple = arr[word].split('\t');
      var word = tuple[0];
      var count = parseInt(tuple[1]);

      if(current_word==word){
          current_count+= count;
      }else{
        if(current_word)
          console.log(current_word +'\t'+ current_count);
          current_word = word;
          current_count = count;
        }
    }
    if(current_word == word)
      console.log(current_word +'\t'+ current_count);
  }

});
```

replace the nodejs location in `reducer.js`
```bash
~$ which node
/usr/bin/node

```


make it executable execute
```bash
~$ chmod +x ./reducer.js

```

To test out the script run
```bash
~$ echo "The big brown fox ran up the stairs, the big brown bear walked down." | ./mapper.js | sort -k1,1 | ./reducer.js

The 1
bear    1
big 2
brown   2
down.   1
fox 1
ran 1
stairs, 1
the 2
up  1
walked  1
```


**3. run hadoop**

```bash
hadoop jar /usr/local/hadoop/share/hadoop/tools/lib/hadoop-streaming-2.6.5.jar \
-Dmapreduce.job.maps=10 \
-Dmapreduce.job.reduces=10 \
-files ./mapper.js,./reducer.js \
-mapper ./mapper.js  \
-reducer ./reducer.js \
-input /test/*.txt \
-output ./out
```







