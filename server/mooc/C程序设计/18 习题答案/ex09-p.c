#include <stdio.h>
#include <math.h>

#define  LEN    10

void init(int *p, int iLen) {
  for (int i = 0; i < iLen; i++) {
    scanf("%d", p + i);
  }
}

void printList(int *p, int iLen) {
  for (int i = 0; i < iLen; i++) {
    printf("%d ", *(p+i));
  }
  printf("\n");
}

void sortList(int *p, int iLen) {
  int iTmp;
  for (int i = 0; i < iLen; i++) {
    for (int j = i+1; j < iLen; j++) {
      if (*(p+i) > *(p+j)) {
        iTmp = *(p+i);
        *(p+i) = *(p+j);
        *(p+j) = iTmp;
      }
    }
  }
}

int maxList(int *p, int iLen) {
  return *(p+iLen-1);
}

int minList(int *p, int iLen) {
  return *(p);
}

float avgList(int *p, int iLen) {
  static int sum;
  for (int i = 0; i < iLen; i++) {
    sum += *(p+i);
  }
  return (sum*1.0)/iLen;
}

int isPrime(int iNumber) {
  int isPrime = 1;

  if ((iNumber == 1)||(iNumber == 2)) {
    return 0;
  }

  for (int i = 2; i <= sqrt(iNumber); i++) {
    if ( iNumber % i == 0) {
      isPrime = 0;
      break;
    }
  }
  return isPrime;
}

int countPrime(int *p, int iLen) {
  static int iCount;
  for (int i = 0; i < iLen; i++) {
    if (isPrime(*(p+i))==1) {
      iCount++;
    }
  }
  return iCount;
}

int countOdd(int *p, int iLen) {
  static int iCount;
  for (int i = 0; i < iLen; i++) {
    if (*(p+i)%2 == 1) {
      iCount++;
    }
  }
  return iCount;
}

int countEven(int *p, int iLen) {
  static int iCount;
  for (int i = 0; i < iLen; i++) {
    if (*(p+i)%2 == 0) {
      iCount++;
    }
  }
  return iCount;
}

int main() {
  int iList[LEN];

  init(iList, LEN);
  printList(iList, LEN);

  sortList(iList, LEN);
  printList(iList, LEN);

  printf("the max number is:%d\n",    maxList(iList, LEN) );
  printf("the min number is:%d\n",    minList(iList, LEN) );
  printf("the avg number is:%.2f\n",  avgList(iList, LEN) );

  printf("the prime number is:%d\n",  countPrime(iList, LEN) );
  printf("the ODD   number is:  %d\n",countOdd(iList, LEN) );
  printf("the EVEN  number is:  %d\n",countEven(iList, LEN) );

  return 0;
}