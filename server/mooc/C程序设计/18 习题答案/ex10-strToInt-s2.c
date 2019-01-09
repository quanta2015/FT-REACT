#include <stdio.h>

int isInRange(char c) {
  return (( c >= '0') && (c <= '9'));
}

int isVaildInt(char *p) {
  int iRet = 0;
  (*p == '-') ? p++ : 0;
  while (*p != '\0') {
    if (!isInRange(*p)) {
      iRet = 1;
      break;
    }
    p++;
  }
  return iRet;
}

int strToInt(char *p) {
  int iRet = 0;
  int isNeg = (*p == '-') ? (p++, -1) : 1;
  while (*p != '\0') {
    iRet = iRet * 10 + (*p - '0');
    p++;
  }
  return iRet * isNeg;
}

int main() {
  char *sInput = "-874";
  switch ( isVaildInt(sInput) ) {
  case 0:
    printf("%d\n", strToInt(sInput)); break;
  case 1:
    printf("inVaildNum\n"); break;
  }
}