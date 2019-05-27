# 实验4. Hadoop服务安装配置


## hadoop

### 1. add user and group
```
sudo addgroup hadoop
sudo adduser --ingroup hadoop hduser
```

```
$ groups hduser
hduser : hadoop
```

### 2. install ssh
```
sudo apt-get install ssh
```


```
~$ which ssh
/usr/bin/ssh

~$ which sshd
/usr/bin/sshd

```

```
ssh-keygen -t rsa -P ""
cat $HOME/.ssh/id_rsa.pub >> $HOME/.ssh/authorized_keys
```

### 3. install hadoop
```
wget http://mirrors.sonic.net/apache/hadoop/common/hadoop-2.6.5/hadoop-2.6.5.tar.gz

tar xvzf hadoop-2.6.5.tar.gz

sudo mv hadoop-2.6.5/ /usr/local/hadoop

sudo chown -R hduser:hadoop /usr/local/hadoop

```

### 4. setup configureion files

- ~/.bashrc
- /usr/local/hadoop/etc/hadoop/hadoop-env.sh
- /usr/local/hadoop/etc/hadoop/core-site.xml
- /usr/local/hadoop/etc/hadoop/mapred-site.xml.template
- /usr/local/hadoop/etc/hadoop/hdfs-site.xml

#### ~/.bashrc
```
~$ update-alternatives --config java

There is only one alternative in link group java (providing /usr/bin/java): /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
Nothing to configure.


~$ vi ~/.bashrc

#HADOOP VARIABLES START
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export HADOOP_INSTALL=/usr/local/hadoop
export PATH=$PATH:$HADOOP_INSTALL/bin
export PATH=$PATH:$HADOOP_INSTALL/sbin
export HADOOP_MAPRED_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_HOME=$HADOOP_INSTALL
export HADOOP_HDFS_HOME=$HADOOP_INSTALL
export YARN_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_INSTALL/lib/native
export HADOOP_OPTS="-Djava.library.path=$HADOOP_INSTALL/lib"
#HADOOP VARIABLES END


~$ source ~/.bashrc

```


test JAVA_HOME as
```
~$ javac -version
javac 1.8.0_111

~$ which javac
/usr/bin/javac

~$ readlink -f /usr/bin/javac
/usr/lib/jvm/java-8-openjdk-amd64/bin/javac
```


#### /usr/local/hadoop/etc/hadoop/hadoop-env.sh
```
~$ vi /usr/local/hadoop/etc/hadoop/hadoop-env.sh

export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
```


#### /usr/local/hadoop/etc/hadoop/core-site.xml:
```
//create tmp folder
~$ sudo mkdir -p /app/hadoop/tmp

~$ sudo chown hduser:hadoop /app/hadoop/tmp

~$ vi /usr/local/hadoop/etc/hadoop/core-site.xml

<configuration>
 <property>
  <name>hadoop.tmp.dir</name>
  <value>/app/hadoop/tmp</value>
  <description>A base for other temporary directories.</description>
 </property>

 <property>
  <name>fs.default.name</name>
  <value>hdfs://localhost:54310</value>
  <description>The name of the default file system.  A URI whose
  scheme and authority determine the FileSystem implementation.  The
  uri's scheme determines the config property (fs.SCHEME.impl) naming
  the FileSystem implementation class.  The uri's authority is used to
  determine the host, port, etc. for a filesystem.</description>
 </property>
</configuration>
```


#### /usr/local/hadoop/etc/hadoop/mapred-site.xml
```
~$ cp /usr/local/hadoop/etc/hadoop/mapred-site.xml.template /usr/local/hadoop/etc/hadoop/mapred-site.xml

~$ vi /usr/local/hadoop/etc/hadoop/mapred-site.xml

<configuration>
 <property>
  <name>mapred.job.tracker</name>
  <value>localhost:54311</value>
  <description>The host and port that the MapReduce job tracker runs
  at.  If "local", then jobs are run in-process as a single map
  and reduce task.
  </description>
 </property>
</configuration>
```

#### /usr/local/hadoop/etc/hadoop/hdfs-site.xml
```
//create two directories which will contain the namenode and the datanode for this Hadoop installation.

:~$ sudo mkdir -p /usr/local/hadoop_store/hdfs/namenode

~$ sudo mkdir -p /usr/local/hadoop_store/hdfs/datanode

~$ sudo chown -R hduser:hadoop /usr/local/hadoop_store

~$ vi /usr/local/hadoop/etc/hadoop/hdfs-site.xml

<configuration>
 <property>
  <name>dfs.replication</name>
  <value>1</value>
  <description>Default block replication.
  The actual number of replications can be specified when the file is created.
  The default is used if replication is not specified in create time.
  </description>
 </property>
 <property>
   <name>dfs.namenode.name.dir</name>
   <value>file:/usr/local/hadoop_store/hdfs/namenode</value>
 </property>
 <property>
   <name>dfs.datanode.data.dir</name>
   <value>file:/usr/local/hadoop_store/hdfs/datanode</value>
 </property>
</configuration>
```


### 5. Format the NEW HADOOP filesystem
hadoop namenode -format command should be executed once before we start using Hadoop. 
If this command is executed again after Hadoop has been used, it'll destroy all the data on the Hadoop file system.
```
~$ hadoop namenode -format
```

### 6. Starting Hadoop 
use start-all.sh or (start-dfs.sh and start-yarn.sh)
```
~$ cd /usr/local/hadoop/sbin

~$ start-dfs.sh
~$ start-yarn.sh
~$ jps
14306 DataNode
14660 ResourceManager
14505 SecondaryNameNode
14205 NameNode
14765 NodeManager
15166 Jps

~$ netstat -plten | grep java

(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
tcp   0  0 127.0.0.1:54310 0.0.0.0:*  LISTEN  1001  682747  14205/java
tcp   0  0 0.0.0.0:50090   0.0.0.0:*  LISTEN  1001  684425  14505/java
tcp   0  0 0.0.0.0:50070   0.0.0.0:*  LISTEN  1001  681708  14205/java
tcp   0  0 0.0.0.0:50010   0.0.0.0:*  LISTEN  1001  682751  14306/java
tcp   0  0 0.0.0.0:50075   0.0.0.0:*  LISTEN  1001  682989  14306/java
tcp   0  0 0.0.0.0:50020   0.0.0.0:*  LISTEN  1001  681774  14306/java
tcp6  0  0 :::8040         :::*       LISTEN  1001  686741  14765/java
tcp6  0  0 :::8042         :::*       LISTEN  1001  687454  14765/java
tcp6  0  0 :::35094        :::*       LISTEN  1001  687439  14765/java
tcp6  0  0 :::8088         :::*       LISTEN  1001  687453  14660/java
tcp6  0  0 :::8030         :::*       LISTEN  1001  684963  14660/java
tcp6  0  0 :::8031         :::*       LISTEN  1001  684959  14660/java
tcp6  0  0 :::8032         :::*       LISTEN  1001  687435  14660/java
tcp6  0  0 :::8033         :::*       LISTEN  1001  687460  14660/java
```

web interface is available at 
```
http://localhost:50070/
```


### 7. stop hadoop
run stop-all.sh or (stop-dfs.sh and stop-yarn.sh) 
```
~$ stop-dfs.sh
16/11/10 15:23:20 WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
Stopping namenodes on [localhost]
localhost: stopping namenode
localhost: stopping datanode
Stopping secondary namenodes [0.0.0.0]
0.0.0.0: stopping secondarynamenode
16/11/10 15:23:52 WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable


~$ stop-yarn.sh
stopping yarn daemons
stopping resourcemanager
localhost: stopping nodemanager
no proxyserver to stop
```


### 8. File system of Hadoop
```
//Check the root directory
hadoop fs -ls /

//Create test folder in HDFS
hadoop fs -mkdir /test

//Check file permission on local filesystem:
ls -l /home/hduser/TestEmp.txt

//If the file is not owned by hadoop user, change its ownership:
sudo chown hduser:hduser /home/hduser/TestEmp.txt
sudo chmod 777 /home/hduser/TestEmp.txt

//Copy file into HDFS:
hadoop fs -copyFromLocal /home/hduser/TestEmp.txt  /test/

//or use put command:
hadoop fs -put /home/hduser/TestEmp.txt  /test/

```


### 9. Running a Mapreduce job `JAVA`
1. doWnload example data as `Plain Text UTF-8` and copy them to HDFS

[The outlink of Science](http://www.gutenberg.org/ebooks/20417)
[The Notebooks of Leonardo Da Vinci](http://www.gutenberg.org/ebooks/5000)
[Ulysses by James Joyce](http://www.gutenberg.org/ebooks/4300)

```
~$ ls -l /tmp/book/
total 3604
-rw-r--r-- 1 hduser hadoop  674566 Feb  3 10:17 pg20417.txt
-rw-r--r-- 1 hduser hadoop 1573112 Feb  3 10:18 pg4300.txt
-rw-r--r-- 1 hduser hadoop 1423801 Feb  3 10:18 pg5000.txt


~$ hadoop dfs -copyFromLocal /tmp/book/*.txt /test/
~$ hadoop dfs -ls /user/hduser
Found 3 items
-rw-r--r--   3 hduser supergroup     674566 2011-03-10 11:38 /user/hduser/gutenberg/pg20417.txt
-rw-r--r--   3 hduser supergroup    1573112 2011-03-10 11:38 /user/hduser/gutenberg/pg4300.txt
-rw-r--r--   3 hduser supergroup    1423801 2011-03-10 11:38 /user/hduser/gutenberg/pg5000.txt
```

2. make the wordcount script
```java
//workcount

package org.myorg;
         
 import java.io.IOException;
 import java.util.*;
         
 import org.apache.hadoop.fs.Path;
 import org.apache.hadoop.conf.*;
 import org.apache.hadoop.io.*;
 import org.apache.hadoop.mapreduce.*;
 import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
 import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
 import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
 import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
         
 public class WordCount {
         
  public static class Map extends Mapper<LongWritable, Text, Text, IntWritable> {
       private final static IntWritable one = new IntWritable(1);
      private Text word = new Text();
          
      public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
          String line = value.toString();
          StringTokenizer tokenizer = new StringTokenizer(line);
          while (tokenizer.hasMoreTokens()) {
              word.set(tokenizer.nextToken());
              context.write(word, one);
          }
      }
   } 
          
   public static class Reduce extends Reducer<Text, IntWritable, Text, IntWritable> {
  
      public void reduce(Text key, Iterable<IntWritable> values, Context context) 
        throws IOException, InterruptedException {
          int sum = 0;
          for (IntWritable val : values) {
              sum += val.get();
          }
          context.write(key, new IntWritable(sum));
      }
   }
          
   public static void main(String[] args) throws Exception {
      Configuration conf = new Configuration();
          
      Job job = new Job(conf, "wordcount");
      
      job.setOutputKeyClass(Text.class);
      job.setOutputValueClass(IntWritable.class);
          
      job.setMapperClass(Map.class);
      job.setReducerClass(Reduce.class);
          
      job.setInputFormatClass(TextInputFormat.class);
      job.setOutputFormatClass(TextOutputFormat.class);
          
      FileInputFormat.addInputPath(job, new Path(args[0]));
      FileOutputFormat.setOutputPath(job, new Path(args[1]));
          
      job.waitForCompletion(true);
   }
          
  }
```

3. Run the MapReduce job
```
~$ hadoop jar /usr/local/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.6.5.jar  wordcount /test  /out

//check the output data 
~$ hadoop fs -ls /out
17/11/09 08:37:02 WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
Found 2 items
-rw-r--r--   1 hduser supergroup          0 2017-11-09 08:36 /out/_SUCCESS
-rw-r--r--   1 hduser supergroup     878931 2017-11-09 08:36 /out/part-r-00000
```



### 10. Running a Mapreduce job `NODEJS` 
1. make `mapper.js` nodejs script
```
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
```
~$ which node
/usr/bin/node

```


make it executable execute
```
~$ chmod +x ./mapper.js

```

To test out the script run
```
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




2. make `reducer.js` nodejs script
```
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
```
~$ which node
/usr/bin/node

```


make it executable execute
```
~$ chmod +x ./reducer.js

```

To test out the script run
```
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


3. run hadoop
```
hadoop jar /usr/local/hadoop/share/hadoop/tools/lib/hadoop-streaming-2.6.5.jar \
-Dmapreduce.job.maps=10 \
-Dmapreduce.job.reduces=10 \
-files ./mapper.js,./reducer.js \
-mapper ./mapper.js  \
-reducer ./reducer.js \
-input /test/*.txt \
-output ./out
```








