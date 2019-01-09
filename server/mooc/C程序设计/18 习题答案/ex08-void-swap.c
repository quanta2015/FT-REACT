#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void swap(void *src, void *dst, int size) {

  void *tmp = malloc(size);
  memcpy(tmp, src, size);
  memcpy(src, dst, size);
  memcpy(dst, tmp, size);

  free(tmp);
}

int main() {
  int   iX =   3, iY =   5;
  float fX = 3.2, fY = 5.6;
  char  cX = 'a', cY = 'z';

  swap(&iX, &iY, sizeof(int));
  swap(&fX, &fY, sizeof(float));
  swap(&cX, &cY, sizeof(char));

  printf("%d\n", iX);
  printf("%d\n", iY);
  printf("%f\n", fX);
  printf("%f\n", fY);
  printf("%c\n", cX);
  printf("%c\n", cY);

  return 0;
}

char *inputData;

char * caluStr(char *p);

char *str = caluStr(inputData);
int iRet = strSplitToInt(str);

int iLen = iRet[0];
int *p = iRet +1;

for (int i=0;i<iLen;i++) {
  printf("%d\n", *(p+i));
}
