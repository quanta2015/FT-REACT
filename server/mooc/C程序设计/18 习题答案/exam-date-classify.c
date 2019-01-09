#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LIST_LEN       5
#define YEAR_LEN       4
#define MONTHDAY_LEN   5
#define DATE_LEN       11

char ** classify(char *s[], int *count) {
  //init result data set
  char ** ret = (char**)malloc(sizeof(char));
  //init current year
  char * curYear = (char*)malloc(sizeof(char)*YEAR_LEN);
  //count of result lines
  *count=0;
  //length of one result line
  int len;
  //buffer to put date 
  char * buf;

  for(int i=0;i<LIST_LEN;i++) {
    //caluate string and length of year and monthday 
    int lenOfYear = strchr(s[i],'-')-s[i];
    int lenOfMD   = strlen(s[i])-lenOfYear;
    char *year    = (char*)malloc(sizeof(char)*lenOfYear);
    char *md      = (char*)malloc(sizeof(char)*lenOfMD); 
    memcpy(year,s[i],lenOfYear);
    memcpy(md  ,s[i]+lenOfYear+1,lenOfMD);

    //first time, put date into buf with format yyyy|mm-dd
    if (i==0) {
      buf = (char*)malloc(sizeof(char)*(DATE_LEN));
      sprintf(buf,"%s|%s",year,md);
      len = DATE_LEN;
    }else{
      //next time, if new year == current year, 
      //concat the month and day to last date string
      // data = yyyy|mm-dd + mm-dd
      if(strcmp(curYear,year) == 0) {
        len = DATE_LEN + MONTHDAY_LEN;
        buf = (char*)realloc(buf,sizeof(char)*len);
        sprintf(buf,"%s|%s",buf,md);
      }else{
        // next time, if new year != current year,
        // 1. put buffer address into result 
        // 2. init new buffer and put new year into it
        *(ret + *count) = buf;
        (*count)++;
        buf = (char*)malloc(sizeof(char)*(DATE_LEN));
        sprintf(buf,"%s|%s",year,md);
      }
    }
    // copy new year into current year
    sprintf(curYear,"%s",year);
  }

  //record the last date and add the counter
  *(ret + *count) = buf;
  (*count)++;

  return ret;
}

int main(void) {
  char *dateList[] =  { "2016-01-12", "2016-08-08", "2017-02-14", "2018-07-20", "2018-10-08" };
  int count;
  char **sRet = classify(dateList,&count);

  //print the result
  for(int i =0;i<count;i++) {
    printf("%s\n", *(sRet + i) );
  }
}

