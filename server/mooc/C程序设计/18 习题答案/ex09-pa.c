#include <stdio.h>
#include <math.h>

#define  LEN          10
#define  MIN          0
#define  MAX          1
#define  AVG          2
#define  COUNT_PRIME  3
#define  COUNT_ODD    4
#define  COUNT_EVEN   5
#define  OK           1

float fRet[6];

void init(int *p, int iLen) {
  for (int i = 0; i < iLen; i++) {
    scanf("%d", p + i);
  }
}

void printList(int *p, int iLen) {
  for (int i = 0; i < iLen; i++) {
    printf("%d ", *(p + i));
  }
  printf("\n");
}


int Count( int(*fp)(int), int *p, int iLength ) {
  int sum = 0;
  for (int i = 0; i < iLength; i++) {
    if ( OK == fp(*(p + i)) ) {
      sum++;
    }
  }
  return sum;
}

int isOdd(int iNumber) {
  return iNumber % 2;
}
int isEven(int iNumber) {
  return !(iNumber % 2);
}

int isPrime(int iNumber) {
  int isPrime = 1;
  if ((iNumber == 1) || (iNumber == 2)) return 0;
  for (int i = 2; i <= sqrt(iNumber); i++) {
    if ( iNumber % i == 0) {
      isPrime = 0;
      break;
    }
  }
  return isPrime;
}

void caluList(int *p, int iLen) {
  int sum = *p, iTmp;
  for (int i = 0; i < iLen; i++) {
    if (i != iLen - 1) {sum += *(p + i);};
    for (int j = i + 1; j < iLen; j++) {
      if (*(p + i) > *(p + j)) {
        iTmp = *(p + i);
        *(p + i) = *(p + j);
        *(p + j) = iTmp;
      }
    }
  }
  fRet[MIN] = *p;
  fRet[MAX] = *(p + iLen - 1);
  fRet[AVG] = sum * 1.0 / iLen;
  fRet[COUNT_PRIME] = Count( isPrime, p, iLen );
  fRet[COUNT_ODD]   = Count( isOdd,   p, iLen );
  fRet[COUNT_EVEN]  = Count( isEven,  p, iLen );

  return;
}

void printResult() {
  printf("max\t min\t avg\t prime\t ODD\t EVEN\t\n");
  printf("%.0f\t %.0f\t %.2f\t %.0f\t %.0f\t %.0f\t\n", fRet[MIN], fRet[MAX], fRet[AVG], fRet[COUNT_PRIME], fRet[COUNT_ODD], fRet[COUNT_EVEN] );
}

int main() {
  int iList[LEN];

  init(iList, LEN);
  printList(iList, LEN);

  caluList(iList, LEN);
  printResult(iList, LEN);
  return 0;
}