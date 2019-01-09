#include <stdio.h>
#include <math.h>
#define  OK   1

int isPrime(int iNumber) {
  int isPrime = 1;
  for (int i = 2; i <= sqrt(iNumber); i++) {
    if ( iNumber % i == 0) {
      isPrime = 0;
      break;
    }
  }
  return isPrime;
}

int isOdd(int iNumber) {
  return iNumber%2;
}

int isEven(int iNumber) {
  return !(iNumber%2);
}

int Count( int(*fp)(int),int *p, int iLength ) {
  int sum = 0;
  for(int i=0;i<iLength;i++) {
    if ( OK == fp(*(p+i)) ) {
      sum++;
    }
  }
  return sum;
}

int main(void) {
  int iList[] = {12,4,5,7,3,49,24,1};

  int primeCount = Count( isPrime, iList, 8 );
  int oddCount   = Count( isOdd,   iList, 8 );
  int evenCount  = Count( isEven,  iList, 8 );

  printf("%d\n", primeCount);
  printf("%d\n", oddCount);
  printf("%d\n", evenCount);
  return 0;
}