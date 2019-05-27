# Tensorflow TextCNN 文本分类器实现

## 开发依赖

- Python（开发语言）

- Keras（使用`Tensorflow`作为底层依赖。）

完整源码地址：[Github：trainTextCNN.py](https://github.com/HZNU-FT/Interview-AI/blob/master/tensorflow/scripts/trainTextCNN.py)

## 代码结构说明

代码分为以下三部分：

1. 读取训练文本
2. 训练文本的预处理
3. 模型的训练与评估

个人感觉比较重要的是第二和第三部分。

### 读取训练文本

此部分对某一文件夹下的各个txt文本文件分别进行读取，并将文本文件内的问题按照文件名进行分类并标注。

源码部分对应：

```python
import os
import re
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

path_input_train = '../data/input_total/question/'
path_input_test = '../data/input_total/question/'

# 去除换行符
def rm(text):

	rm = re.compile(r'\n')
	return rm.sub('', text)

# 读文件
def readFile(path):

	all_texts = []
	all_labels = []
	file_list = []

	for file in os.listdir(path):
		file_list.append(path + file)

	counter_file = 0
	for file_name in file_list:
		with open(file_name, encoding='utf-8') as f:
			while 1:
				line = f.readline()
				if not line:
					counter_file += 1
					break
				all_texts.append(rm("".join(line)))
				all_labels.append(counter_file)

	return all_texts, all_labels

# 读取
train_texts, train_lables = readFile(path_input_train)
test_texts, test_labels = readFile(path_input_test)
```

此部分得到的结果是两个集合：
1. 包含所有问题文本的集合
2. 保存着这些问题对应的分类标签的集合

> 这一部分基本就是`python`对文件的批处理操作，不是重点

### 训练文本的预处理

由于Keras的`Model`模型需要基于经过处理的训练数据（0-200范围的整数集合）进行训练，此时需要根据一项指标对原始文本进行处理，这项指标就是任意一个单词在所有问题中出现的频率。

首先需要统计出现在原始数据中的所有词汇，并将它们存在一个字典中，按照出现的次序进行增序标号。相当于每个词在这个字典中都是一个索引，而需要用这个索引对应的数字来替换它们，并用若干个数字组成的一个数组来表示原来的一句英文问题。

源码部分对应：

```python
import numpy as np
import joblib as jl

from collections import defaultdict
from keras.preprocessing.text import Tokenizer
from keras.utils.np_utils import to_categorical

# 预处理相关
maxLen = 50
stoplist = set(''.split())

path_stoplist = './modules/stoplist'
path_frequency = './modules/frequency'
path_tokenizer = './modules/tokenizer'

# 预处理
def stringProcessing(documents):

	frequency = defaultdict(int)

	# 遍历所有的词句，把不在忽略列表中的单词加入texts
	texts = [[word for word in document.lower().split() if word not in stoplist]
			for document in documents]

	# 记录词出现频率
	for text in texts:
		for token in text:
			frequency[token] += 1

	# 将出现次数大于一的保留
	texts = [[token for token in text if frequency[token] > 1]
			 for text in texts]

	texts_concate = []
	for sentence in texts:
		texts_concate.append(" ".join(sentence))

	# 储存停词二进制文件以便进行自定义评估
	with open(path_stoplist, "wb") as handler:
		jl.dump(stoplist, handler)

	# 储存词频二进制文件以便进行自定义评估
	with open(path_frequency, "wb") as handler:
		jl.dump(frequency, handler)

	return texts_concate

def preprocessing(train_texts, train_labels, test_texts, test_labels):

	# 生成字典并初始化
	tokenizer = Tokenizer(num_words=200)
	tokenizer.fit_on_texts(train_texts)
	# 整数化
	x_train_seq = tokenizer.texts_to_sequences(train_texts)
	x_test_seq = tokenizer.texts_to_sequences(test_texts)
	# 统一长度
	x_train = sequence.pad_sequences(x_train_seq, maxlen=maxLen)
	x_test = sequence.pad_sequences(x_test_seq, maxlen=maxLen)
	# 将标签集合统一成np的array形式
	y_train = np.array(train_labels)
	y_test = np.array(test_labels)

	# 储存字典二进制文件以便进行自定义评估
	with open(path_tokenizer, "wb") as handler:
		jl.dump(tokenizer, handler)

	return x_train, y_train, x_test, y_test

# 预处理
train_texts = stringProcessing(train_texts)
test_texts = stringProcessing(test_texts)
x_train, y_train, x_test, y_test = preprocessing(train_texts, train_lables, test_texts, test_labels)
# 将标签统一成只有一位是1，其他位是0的数组，以便训练
y_train = to_categorical(y_train)
y_test = to_categorical(y_test)
```

此部分得到的结果是：
1. 训练、评估文本的数组形式
2. 训练、评估标签的数组形式

> `stoplist`为空是由于暂时没有用到去停词功能。这一部分出现的二进制文件保存操作是为了进行用户自定义评估而做的，在训练代码中并不必要。

### 模型的训练与评估

完成了原始文本的数据预处理，就可以使用Keras进行模型的构建了，在这里用到的是`Model`类的模型。

对于模型搭建，需要经过以下几步：
1. Embedding：将所有代表一个词的数字转化为词向量

2. 卷积层：使用与词向量维度相同宽度的卷积核对句子中的词进行卷积操作

3. 池化层：使用`MaxPooling1D`从卷积结果中提取特征值，将它认为是这句话的特征。

4. 全连接层：将各个特征连接成分类数目的输出，方便选取最大值进行分类

源码部分对应：

```python
from keras.models import Model
from keras.models import Sequential
from keras.preprocessing import sequence
from keras.layers.embeddings import Embedding
from keras.layers import Dense, Flatten, Conv1D, MaxPooling1D, Dropout, Input, concatenate

maxLen = 50

# 分类数量
genre = 9
# 训练次数
epochs = 200

path_model = './models/textCNN_model.h5'

# 建立模型
def text_cnn(maxlen=maxLen, max_features=200, embed_size=32):

	comment_seq = Input(shape=[maxlen], name='x_seq')
	# Embedding
	emb_comment = Embedding(max_features, embed_size)(comment_seq)

	convs = []
	filter_sizes = [2, 3, 4, 5]

	# 卷积与池化
	for fsz in filter_sizes:
		l_conv = Conv1D(filters=100, kernel_size=fsz, activation='relu')(emb_comment)
		l_pool = MaxPooling1D(maxlen - fsz + 1)(l_conv)
		l_pool = Flatten()(l_pool)
		convs.append(l_pool)
	merge = concatenate(convs, axis=1)

	# 全连接
	out = Dropout(0.5)(merge)
	output = Dense(32, activation='relu')(out)
	output = Dense(units=genre, activation='softmax')(output)
	
	model = Model([comment_seq], output)
	model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

	return model

# 训练
model = text_cnn()
model.fit(x_train, y_train,
			validation_split=0.1,
			batch_size=128,
			epochs=epochs,
			shuffle=True)

# 评估
scores = model.evaluate(x_train, y_train)
print(scores)

# 保存模型
# model.save(path_model)
```

此部分得到的结果：
- 训练成功率与评估成功率

> 如果有需要的话，可以使用`model.save(path_model)`对训练完毕的模型进行保存。

## 参考内容

[Keras使用教程](https://morvanzhou.github.io/tutorials/machine-learning/keras/)

[Text CNN](http://www.tensorflownews.com/2018/04/06/%E4%BD%BF%E7%94%A8keras%E8%BF%9B%E8%A1%8C%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%EF%BC%9A%EF%BC%88%E4%B8%89%EF%BC%89%E4%BD%BF%E7%94%A8text-cnn%E5%A4%84%E7%90%86%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80/)

[Gensim入门教程](http://www.cnblogs.com/iloveai/p/gensim_tutorial.html)
