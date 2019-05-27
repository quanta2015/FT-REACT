# 在nodejs环境中调用python程序

在本系统中，我们调用python文件来对比面试者回答和标准回答的相似度来作为评分。spacy的相似度对比是机遇一般语义的相似度对比，其已经内置了训练好的模型，而gensim对比的是该句子相比较于整个语料库的相对相似度，其比较过程会将目标句子将与整个语料库中的句子进行对比，其最原本的用途可以认为是找出语料库中与其最相似的句子。

```
var   exec 		 = require('child_process').exec;
```
exec可以在node中执行子进程

```
Score=(ans,std)=>{
    var re;
	var str=`python ../Similaritie/spacySim.py "${ans}" "${std}"`;
	exec(str,function(error,stdout,stderr){
		if(stdout.length>1){
			return parseFloat(stdout);
		}else {
	        console.log('you don\'t offer args');
	    }
	    if(error) {
	        console.info('stderr : '+stderr);
	    }
	})
}
```

str是将要被执行的命令，开头是python意味着要调用python文件，第二个参数是python文件的位置，这里要注意路由的问题，路径要从调用python的位置开始。之后的每个参数都会被传入到python文件内，被sys类捕获，因此在node中调用的python文件要稍作修改，以便接受外部传入的参数。

## 原py文件
```
import spacy
nlp = spacy.load('en_core_web_sm')

doc1 = nlp(u"I am a graduate of a technical university and have been employed as a technician for approximately 10 years.")
doc2 = nlp(u"I")
similarity = doc1.similarity(doc2)
print(similarity)
```

## 修改过的文件
```
import sys
import spacy
nlp = spacy.load('en_core_web_sm')

doc1 = nlp(sys.argv[1])
doc2 = nlp(sys.argv[2])
similarity = doc1.similarity(doc2)
print(similarity)
```

可以看到sys会捕获所有调用该文件的参数，sys.argv即为参数列表。

 - 第一个参数是调用的路径
 - 第二个参数是面试者的回答
 - 第三个参数是标准回答

## 获得结果

```
exec(str,function(error,stdout,stderr){
		if(stdout.length>1){
			return parseFloat(stdout);
		}else {
	        console.log('you don\'t offer args');
	    }
	    if(error) {
	        console.info('stderr : '+stderr);
	    }
	})
```

exec的回调函数接受三个参数，在文件中使用print函数输出的信息都会保存在stdout中。



