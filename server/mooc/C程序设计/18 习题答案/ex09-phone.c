#include <stdio.h>
#include <math.h>

#define LEN 12

void init(char *p, char *phone) {
  while(*phone != '\0') {
    *p++ = *phone++;
  }
  *p = '\0';
  return;
}

int strLen(char *p) {
  int iLen = 0;
  while(*p != '\0') {
    iLen++;
    p++;
  }
  return iLen;
}

int inRange(char p,char cFrom,char cTo) {
  if ((p>=cFrom)&&(p<=cTo)) {
    return 1;
  }else{
    return 0;
  }
}

int isValidTail(char *p) {
  int iRet = 1;
  while(*p != '\0') {
    iRet = iRet && inRange(*p,'0','9');
    p++;
  }
  return iRet;
}

int isVaildPhone(char *p) {

  int iVaildF = inRange(*p,'1','1');
  int iVaildS = inRange(*(p+1),'3','8');
  int iVaildT = isValidTail(p+2);
  int iVaildFormat = iVaildF && iVaildS && iVaildT;
  int iVaildLen = (strLen(p) == 11);
  return  (iVaildFormat && iVaildLen) ;
}

int main() {
  char sPhone[LEN];
  init(sPhone,"1251a818849");
  printf("%d\n",isVaildPhone(sPhone));

  return 0;
}