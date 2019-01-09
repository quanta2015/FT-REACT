#include <stdio.h>
#include <math.h>


//check the number is prime
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

//calu the reverse number
int reverse(int iNumber) {
  int iRet = 0;

  while ( iNumber / 10 != 0) {
    iRet = (iNumber % 10) + iRet * 10;
    iNumber = iNumber / 10;
  }
  iRet = (iNumber % 10) + iRet * 10;
  return iRet;
}
 
int input() {
  int iInput;
  //input the iMax
  while (1) {
    printf("Please input the iMax (10-iMax)\n");
    scanf("%d", &iInput);

    //check the range
    if (iInput > 10 && iInput <= 999999) { 
      //input is valid
      break;
    } else {
      printf("Your input is invalid! Please try again!\n");
    }
  }

  return iInput;
}


int main() {
  int i, j, iMax;

  //get input to iMax
  iMax = input();

  //calu the prime
  for (i = 10; i < iMax; i++) {
    //calue the reverse
    int iRev = reverse(i);

    //check the i and reverse is prime
    if (isPrime(i) && (isPrime(iRev)) && (iRev <= i)) {
      printf("%d - %d\n", i, reverse(i));
    }
  }

  return 0;
}