# 实验5. Hadoop原生Java编程


### Running a Mapreduce job `JAVA`
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



