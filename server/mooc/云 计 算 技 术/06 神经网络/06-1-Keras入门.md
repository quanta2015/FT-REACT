title: Keras入门
theme: light

[slide]
# Keras入门

[slide]
# Keras: 基于 Python 的深度学习库

<img src='https://s3.amazonaws.com/keras.io/img/keras-logo-2018-large-1200.png', style='max-width: 600px;'>

[slide]
# 你恰好发现了 Keras。

Keras 是一个用 Python 编写的高级神经网络 API，它能够以 [TensorFlow](https://github.com/tensorflow/tensorflow), [CNTK](https://github.com/Microsoft/cntk), 或者 [Theano](https://github.com/Theano/Theano) 作为后端运行。Keras 的开发重点是支持快速的实验。*能够以最小的时延把你的想法转换为实验结果，是做好研究的关键。*

如果你在以下情况下需要深度学习库，请使用 Keras：

- 允许简单而快速的原型设计（由于用户友好，高度模块化，可扩展性）。
- 同时支持卷积神经网络和循环神经网络，以及两者的组合。
- 在 CPU 和 GPU 上无缝运行。


[slide]
# 特点

- __用户友好。__ Keras 是为人类而不是为机器设计的 API。它把用户体验放在首要和中心位置。Keras 遵循减少认知困难的最佳实践：它提供一致且简单的 API，将常见用例所需的用户操作数量降至最低，并且在用户错误时提供清晰和可操作的反馈。

- __模块化。__ 模型被理解为由独立的、完全可配置的模块构成的序列或图。这些模块可以以尽可能少的限制组装在一起。特别是神经网络层、损失函数、优化器、初始化方法、激活函数、正则化方法，它们都是可以结合起来构建新模型的模块。

- __易扩展性。__ 新的模块是很容易添加的（作为新的类和函数），现有的模块已经提供了充足的示例。由于能够轻松地创建可以提高表现力的新模块，Keras 更加适合高级研究。

- __基于 Python 实现。__ Keras 没有特定格式的单独配置文件。模型定义在 Python 代码中，这些代码紧凑，易于调试，并且易于扩展。


[slide] 
## Keras 优先考虑开发人员的经验

- Keras 是为人类而非机器设计的 API: `Keras 遵循减少认知困难的最佳实践`: 它提供一致且简单的 API，它将常见用例所需的用户操作数量降至最低，并且在用户错误时提供清晰和可操作的反馈。

- Keras 易于学习和使用: 作为 Keras 用户，你的工作效率更高，能够比竞争对手更快地尝试更多创意，从而帮助你赢得机器学习竞赛。

- 易用性并不以降低灵活性为代价: 因为 Keras 与底层深度学习语言（特别是 TensorFlow）集成在一起，所以它可以让你实现任何你可以用基础语言编写的东西。特别是，`tf.keras` 作为 Keras API 可以与 TensorFlow 工作流无缝集成。


[slide] 
# Keras 被工业界和学术界广泛采用

<img src='https://s3.amazonaws.com/keras.io/img/dl_frameworks_power_scores.png' style='width:500px; display: block; margin: 0 auto;'/>

<p style='font-style: italic; font-size: 10pt; text-align: center;'>
    Deep learning 框架排名，由 Jeff Hale 基于 7 个分类的 11 个数据源计算得出
</i>
</p>

截至 2018 年中期，Keras 拥有超过 250,000 名个人用户。与其他任何深度学习框架相比，Keras 在行业和研究领域的应用率更高（除 TensorFlow 之外，且 Keras API 是 TensorFlow 的官方前端，通过 `tf.keras` 模块使用）。


[slide] 
# Keras 可以轻松将模型转化为产品

与任何其他深度学习框架相比，你的 Keras 模型可以在更广泛的平台上轻松部署：

- 在 iOS 上，通过 [Apple’s CoreML](https://developer.apple.com/documentation/coreml)（苹果为 Keras 提供官方支持）。这里有一个[教程](https://www.pyimagesearch.com/2018/04/23/running-keras-models-on-ios-with-coreml/)。
- 在 Android 上，通过 TensorFlow Android runtime，例如：[Not Hotdog app](https://medium.com/@timanglade/how-hbos-silicon-valley-built-not-hotdog-with-mobile-tensorflow-keras-react-native-ef03260747f3)。
- 在浏览器中，通过 GPU 加速的 JavaScript 运行时，例如：[Keras.js](https://transcranial.github.io/keras-js/#/) 和 [WebDNN](https://mil-tokyo.github.io/webdnn/)。
- 在 Google Cloud 上，通过 [TensorFlow-Serving](https://www.tensorflow.org/serving/)。
- [在 Python webapp 后端（比如 Flask app）中](https://blog.keras.io/building-a-simple-keras-deep-learning-rest-api.html)。
- 在 JVM 上，通过 [SkyMind 提供的 DL4J 模型导入](https://deeplearning4j.org/model-import-keras)。
- 在 Raspberry Pi 树莓派上。


[slide] 
# Keras 支持多个后端引擎，不会将你锁定到一个生态系统中

你的 Keras 模型可以基于不同的深度学习后端开发。重要的是，任何仅利用内置层构建的 Keras 模型，都可以在所有这些后端中移植：你可以用一种后端训练模型，再将它载入另一种后端中（例如为了发布的需要）。支持的后端有：
 
 - 谷歌的 TensorFlow 后端
 - 微软的 CNTK 后端
 - Theano 后端


[slide]  
# 快速上手 Keras

Keras 的核心数据结构是 __model__，一种组织网络层的方式。最简单的模型是 `Sequential` 顺序模型 ，它由多个网络层线性堆叠。


[slide]  
`Sequential` 模型如下所示：

```python
from keras.models import Sequential
model = Sequential()
```


[slide]  
可以简单地使用 `.add()` 来堆叠模型：

```python
from keras.layers import Dense
model.add(Dense(units=64, activation='relu', input_dim=100))
model.add(Dense(units=10, activation='softmax'))
```


[slide]  
在完成了模型的构建后, 可以使用 `.compile()` 来配置学习过程：

```python
model.compile(loss='categorical_crossentropy',
              optimizer='sgd',
              metrics=['accuracy'])
```


[slide]  
如果需要，你还可以进一步地配置你的优化器。Keras 的核心原则是使事情变得相当简单，同时又允许用户在需要的时候能够进行完全的控制（终极的控制是源代码的易扩展性）。

```python
model.compile(loss=keras.losses.categorical_crossentropy,
              optimizer=keras.optimizers.SGD(lr=0.01, momentum=0.9, nesterov=True))
```


[slide]  
批量地在训练数据上迭代
```python
# x_train 和 y_train 是 Numpy 数组 -- 就像在 Scikit-Learn API 中一样。
model.fit(x_train, y_train, epochs=5, batch_size=32)
```


[slide]  
或者，你可以手动地将批次的数据提供给模型：

```python
model.train_on_batch(x_batch, y_batch)
```


[slide]
评估模型性能

```python
loss_and_metrics = model.evaluate(x_test, y_test, batch_size=128)
```


[slide]
对新的数据生成预测

```python
classes = model.predict(x_test, batch_size=128)
```


[slide]
# 使用Resnet50库预测图像
我们可以使用很多Keras已经发布的库来预测数据，就像调用C语言的函数库一样，下面的范例就是使用resnet50库来分析一张图片的内容是什么。
```python
import numpy as np
from keras.preprocessing import image
from keras.applications import resnet50
# 加载ResNet50分类库
model = resnet50.ResNet50()
# 读取图像数据
img = image.load_img("bay.jpg", target_size=(224, 224))
x = image.img_to_array(img)
# 增加序号纬度
x = np.expand_dims(x, axis=0)
# 预处理
x = resnet50.preprocess_input(x)
# 预测数据
predictions = model.predict(x)
# 查询类的名称
predicted_classes = resnet50.decode_predictions(predictions, top=9)
print("This is an image of:")
for imagenet_id, name, likelihood in predicted_classes[0]:
    print(" - {}: {:2f} likelihood".format(name, likelihood))

# This is an image of:
# - seashore: 0.482729 likelihood
# - lakeside: 0.329962 likelihood
# - dock: 0.105207 likelihood
# - breakwater: 0.051779 likelihood
# - promontory: 0.009503 likelihood
# - catamaran: 0.004744 likelihood
# - sandbar: 0.002375 likelihood
# - trimaran: 0.001249 likelihood
# - pier: 0.001172 likelihood
```

[slide]  
生成训练日志
```python
RUN_NAME = "RUN 1 with 5 nodes"
logger = keras.callbacks.TensorBoard(
    log_dir='logs/{}'.format(RUN_NAME),
    write_graph=True,
    histogram_freq=0
)
model.fit(x_train,y_train,epochs=5,callbacks=[logger])
```

[slide]  
日志图型化分析工具
```bash
tensorboard --logdir logs
```

<img src="../../img/cloud/deep/keras01.png"  class="m-cnn">

[slide]  
<img src="../../img/cloud/deep/keras02.png"  class="m-cnn">

# 安装指引
有两种方法安装 Keras：

- **使用 PyPI 安装 Keras (推荐)：**

```sh
sudo pip install keras

#如果你使用 virtualenv 虚拟环境, 你可以避免使用 sudo
pip install keras
```

- **或者：使用 GitHub 源码安装 Keras：**

```sh
git clone https://github.com/keras-team/keras.git
cd keras
sudo python setup.py install
```










# to_categorical
to_categorical就是将类别向量转换为二进制（只有0和1）的矩阵类型表示。其表现为将原有的类别向量转换为独热编码的形式。

```python
from keras.utils.np_utils import *
data = [0,1,2,3,4,5,6,7,8]
data = to_categorical(b, 9)
print(data)

# 执行结果如下
[[1. 0. 0. 0. 0. 0. 0. 0. 0.]
 [0. 1. 0. 0. 0. 0. 0. 0. 0.]
 [0. 0. 1. 0. 0. 0. 0. 0. 0.]
 [0. 0. 0. 1. 0. 0. 0. 0. 0.]
 [0. 0. 0. 0. 1. 0. 0. 0. 0.]
 [0. 0. 0. 0. 0. 1. 0. 0. 0.]
 [0. 0. 0. 0. 0. 0. 1. 0. 0.]
 [0. 0. 0. 0. 0. 0. 0. 1. 0.]
 [0. 0. 0. 0. 0. 0. 0. 0. 1.]]
```






