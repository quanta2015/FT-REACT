#include <stdio.h>

int isInRange(char c) {
  switch(c) {
    case '0'...'9':return 1;break;
    default: return 0;
  }
}


int isVaildInt(char *p) {
  int iRet = 0;
  if (*p == '-') { 
    p++;
    iRet = 1;
  }

  while(*p!= '\0') {
    if (!isInRange(*p)) {
      iRet = 2;
      break;
    }
    p++;
  }
  return iRet;
}


int strToInt(char *p,int isNeg) {
  int iRet = 0;
  while(*p!='\0') {
    iRet = iRet*10 + (*p-'0');
    p++;
  }
  return iRet * isNeg;
}


int main() {
  char *sInput = "874";

  switch( isVaildInt(sInput) ) {
    case 0: //pos number
      printf("%d\n", strToInt(sInput, 1));
      break;
    case 1: //neg number
      printf("%d\n", strToInt(sInput+1, -1));
      break;
    case 2: 
      printf("inVaildNum\n");break;
  }
}