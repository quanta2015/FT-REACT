#include <stdio.h>
#include <ctype.h>
#include <stdarg.h>
#include <string.h>
#include <stdlib.h>

#define BUF_SIZE  80

int _level = 0;
char mem[50000];
int _pos;
char *keyWord[] = {"if","for"};
char ret[BUF_SIZE];

void moveData(char *d, char *s) {
  char *tmp = (char*)malloc(sizeof(strlen(s)));
  strcpy(tmp,s);
  while(*tmp!= '\0') {
    *d++=*tmp++;
  }
  *d = '\0';
  return;
}

char* removeHeadBlank(char *s) {
  char *head = s;
  while(*s == ' ') {
    s++;
  }
  if (s != head) {
    moveData(head,s);
  }
  return s;
}

void removeRBlank(char* s) {
  while(*s != '\0') {
    if ((*s==' ')&&(*(s+1)==' ')) {
      moveData(s,s+1);
    }else{
      s++;
    }
  }
}

void formatHeadBlank(char *s, int level) {
  moveData(s+level,s);
  for(int i=0;i<level;i++) {
    *s++ = ' ';
  }
}

int caluLevel(char *s) {
  int mark = 0,markL=0,markR=0;
  while(*s != '\0') {
    markL = (*s == '{')? 1:markL;
    markR = (*s == '}')?-2:markR;
    mark = markL + markR;
    s++;
  }
  return mark;
}

int isMark(char s) {
  switch(s) {
    case ' ': return 1;
    case ';':
    case '&':
    case '=':
    case '<': 
    case '>': 
    case '|':
    case ',':
    case '(':
    case ')':
    case '{':
    case '}': return 2;
  }
  return 0;
}

char *getKey(char *s,int *len) {
  char *head = s;
  int type;

  while(*s == ' ') s++;

  if (isMark(*s) == 2) {
    char *tmp = (char*)malloc(1);
    strncpy(tmp,head,1);
    *len = 1;
    return tmp;
  }

  while(*s != '\0') {
    if (type = isMark(*s)) break;
    s++;
  }
  *len = s - head ;
  char *tmp = (char*)calloc(sizeof(*len),1);
  strncpy(tmp,head,*len);

  return tmp;
}

void formatCode(char *s) {
  removeHeadBlank(s);
  removeRBlank(s);


  int offset,offset_ret =0;
  char *key;

  while(*s !='\0') {

    while(*s ==' ') s++;

    key = getKey(s,&offset);

    if ( *(s+offset) == '(' ) {
      moveData(ret+offset_ret, key);
      offset_ret += offset;
    }else{
      moveData(ret+offset_ret, key);
      moveData(ret+offset_ret+offset, " ");
      offset_ret += offset+1;
    }
    s+= offset;
  }



  int iRet =caluLevel(ret);
  // 0:none  -1:}{  1:{  2:}
  switch(iRet) {
    case  0: formatHeadBlank(ret,_level);break; 
    case -1: formatHeadBlank(ret,_level-2);break;
    case  1: formatHeadBlank(ret,_level); _level+= 2;break;
    case -2: formatHeadBlank(ret,_level-2); _level-= 2;break;
  }


  return;
}

void saveData(char *s) {
  strcpy( mem+_pos,s);
  _pos += strlen(s);
}

int main() {
  char buf[BUF_SIZE];
  
  FILE *fpi = fopen("data.md","r");
  while(!feof(fpi)) {
    fgets(buf, BUF_SIZE, fpi);

    // // omit blank line
    // if( *buf =='\n') {
    //   memset(buf,'\0',BUF_SIZE);
    //   continue;
    // }

    // formatCode(buf);
    // saveData(ret);
    // memset(buf,'\0',BUF_SIZE);
    // memset(ret,'\0',BUF_SIZE);
  }
  fclose(fpi);


  FILE *fp = fopen("data.c","w");
  fprintf(fp, "%s",mem);
  fclose(fp);

  return 0;
}
