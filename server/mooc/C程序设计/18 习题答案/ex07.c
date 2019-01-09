#include <stdio.h>
#include <math.h>
#include <string.h>

#define INIT        0
#define INTO_WORD   1
#define WORD_END    2

int iCountW = 0, iCountB = 0, iCountM = 0;

int doCheckWordStart(char *p) {
  if (p[0] == ' ') && (isLetter(p[1])) {
    return INTO_WORD;
  } else {
    return INIT;
  }
}

int doCheckWordEnd(char *p) {
  if (p[0] == ' .!')) {
    return WORD_END;
  } else {
    return INTO_WORD;
  }
}

void count(char *str) {
  int i = 0;
  int isWord = INIT;
  while ( str[i] != '\0') {

    switch (isWord) {
    case INIT: isWord = doCheckWordStart(str + i); break;
    case INTO_WORD:
      isWord = doCheckWordEnd(str + i);
      if (isWord == WORD_END) {
        iCountW ++;
        isWord = INIT;
      }
    }
    i++;
  }
}




void moveTail(char *str) {
  char i = 0;
  while (str[i] != '\0') {
    str[i] = str[i + 1];
    i++;
  }
}

void removeBlank(char *str) {
  int i = 0;
  while ( str[i] != '\0') {
    if ( (str[i] == ' ') && (str[i + 1] == ' ')) {
      moveTail(str + i);
    } else {
      i++;
    }
  }
}

int main() {
  int i, j, cTmp, iCount = 0;
  char sInput[100];

  while ( (cTmp = getchar()) != 27) {
    sInput[iCount] = cTmp;
    iCount++;
  }
  sInput[iCount] = '\0';


  printf("\n%s\n", sInput );
  removeBlank(sInput);
  printf("\n%s\n", sInput );
  count(sInput);

  return 0;
}