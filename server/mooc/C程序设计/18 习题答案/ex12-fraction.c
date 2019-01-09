#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>

typedef struct Fraction {
  int x;
  int y;
} Fraction;

char **sHistory;
int idx = 0;

int number(int num) {
  int iCount=0;
  do {
    num=num/10;
    iCount++;
  }while(num!=0);
  return iCount;
}

// init fraction data
Fraction * initFraction(int x, int y) {
  Fraction *fr = (Fraction*)malloc(sizeof(Fraction));
  fr->x = x;
  fr->y = y;
  return fr;
}

//output fraction data
void printFraction(Fraction* f) {
  /* ------------------------------------------
  1) x = 0       0/3 =  0
  2) x = y       8/8 =  1
  3) x % y == 0  8/2 =  4
  4) x % y != 0  3/8 = 3/8
  ------------------------------------------ */ 
  if (f->x == 0) {
    printf("0\n");
  }else if(f->x == f->y) {
    printf("1\n");
  }else if(f->x % f->y == 0){
    printf("%d\n", f->x/f->y);
  }else{
    printf("%d/%d\n",f->x,f->y);
  }
  return;
}

//caluate the greatest common divisor
void gcDivisor(int *x, int *y) {
  int min = (abs(*x)>abs(*y))?abs(*y):abs(*x);
  for(int i=min;i>0;i--) {
    if ((*x%i==0)&&(*y%i==0)) {
      *x = *x / i;
      *y = *y / i;
    }
  }
  return;
}

//fraction four type caluation
Fraction* caluFraction(Fraction* fx,Fraction* fy, char sig) {
  int x,y;
  
  switch(sig) {
    case '+': x = fx->x*fy->y + fy->x*fx->y; break;
    case '-': x = fx->x*fy->y - fy->x*fx->y; break;
    case '*': x = fx->x*fy->x; break;
    case '/': x = fx->x*fy->y; break;
  }
  y= (sig != '/')? fx->y*fy->y: fx->y*fy->x;
  gcDivisor(&x,&y);

  int size = number(x)+number(y)+number(fx->x)+number(fx->y)+number(fy->x)+number(fy->y) + 9;
  char *buffer = (char*)malloc(size);
  sprintf(buffer, "%d/%d %c %d/%d = %d/%d", fx->x, fx->y,sig,fy->x,fy->y,x,y);
  *(sHistory+idx) = buffer;
  idx++;

  return initFraction(x,y);
}

Fraction* addFraction(Fraction* fx,Fraction* fy) {
  caluFraction(fx,fy, '+');
}

Fraction* subFraction(Fraction* fx,Fraction* fy) {
  caluFraction(fx,fy, '-');
}

Fraction* mulFraction(Fraction* fx,Fraction* fy) {
  caluFraction(fx,fy, '*');
}

Fraction* divFraction(Fraction* fx,Fraction* fy) {
  caluFraction(fx,fy, '/');
}

int main( ) {

  sHistory = (char**)malloc(sizeof(char));
  
  Fraction *frX = initFraction(3,8);
  Fraction *frY = initFraction(1,32);

  Fraction *frAdd = addFraction(frX,frY);
  Fraction *frSub = subFraction(frX,frY);
  Fraction *frMul = mulFraction(frX,frY);
  Fraction *frDiv = divFraction(frX,frY);

  printFraction(frAdd);
  printFraction(frSub);
  printFraction(frMul);
  printFraction(frDiv);

  for(int i=0;i<idx;i++) {
    printf("%s\n", *(sHistory+i));
  }

  free(frAdd);
  free(frSub);
  free(frMul);
  free(frDiv);
  free(*sHistory);

  return 0;
}