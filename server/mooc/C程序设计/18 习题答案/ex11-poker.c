#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>

char POKER[] = {'2',' ','3','4','5','6','7','8','9','0','J','Q','K','A'};
char *TYPE[] = {"invaild", "Single", "Double", "Trigle", "Bomb", "Together"};

int indexPoker(char p) {
  for(int i =0;i<sizeof(POKER);i++) {
    if (p == POKER[i]) {
      return i;
    }
  }
  return -1;
}

void sortPoker(char *p) {
  while( *p != '\0') {
    char *q = p+1;
    while( *q != '\0') {
      if (indexPoker(*p)>indexPoker(*q)) {
        char tmp = *p;
        *p = *q;
        *q = tmp;
      }
      q++;
    }
    p++;
  }
}

int isInRange(char c) {
  return (( c >= '0') && (c <= '9') || (c == 'A') || (c == 'J')|| (c == 'Q')|| (c == 'K'));
}

int isInRanges(char *p) {
  while(*p != '\0') {
    if (!isInRange(*p)) {
      return 0;
    } 
    p++;
  }
  return 1;
}

int isSame(char *p, int iLen) {
  return (*p == *(p+iLen-1)) * iLen;
}

int isContinuity(char *p) {
  while(*(p+1) != '\0') {
    if (indexPoker(*p)+1 != indexPoker(*(p+1))) {
      return 0;
    }
    p++;
  }
  return 5;
}

int isPokerVaild(char *p) {
  int  iRet;
  int  iLen = strlen(p);
  char *tmp = (char*)malloc(sizeof(char)*iLen);
  assert(tmp != NULL);
  strcpy(tmp, p);
  sortPoker(tmp);

  switch(iLen) {
    case 1 ... 4:  iRet = isSame(tmp,iLen)  * isInRanges(tmp); break;
    case 5 ... 12: iRet = isContinuity(tmp) * isInRanges(tmp); break;
  }
  
  free(tmp);
  return iRet;
}

int main( ) {
  char *pk = "345678";
  printf("%s\n",TYPE[isPokerVaild(pk)]);

  return 0;
}

