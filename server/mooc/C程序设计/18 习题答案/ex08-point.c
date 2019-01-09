#include <stdio.h>


int max(char *p) {
	int index = 0;
	for (int i = 0; i < 10; i++) {
		int count = p[index];
		index++;
	}


	while (*p != '\0') {
		int count = *p++;
	}
}

int main() {
	int i = 10;
	float f = 332.1;
	int iArr[] = {1, 3, 2, 4, 3};
	int *pi = iArr;

	printf("%d\n", *pi );
	pi++;
	printf("%d\n", *pi );

	return 0;
}



// p = 0X0000001000;
// p ++;

// if (p == char) p = p+4   0X0000001001
// if (p == int) p = p+4   0X0000001004
// if (p == float) p = p+8   0X0000001008

// DATA SEGMENT
// 0X0000001000 0000101000000000
// 0X0000001010 1004


// CODE SEGMENT
// 0X0000000000 MAIN
// 0X0000001000 int *pi = &i;
// 0X0000001000 printf("%p\n", pi);

// 0X0000008000 MAX
// 0X0000009000 int *pi = &i;
// 0X000000a000 printf("%p\n", pi);


void getInput() {


	return;
}


int max(int iA, int iB);


int iArr = { 1, 2, 3, 4, 5, 6, 7};

void sort(void *iArr,int iLength) {
	for(i=0;i<iLength;i++) {
		int iItem = *(iArr+i);
	}
}



int iArr[] = {1,2,3};
int *p = iArr;


int *p;
p= iArr;


iArr == &iArr[0] == (iArr + 0) == p

* []


*iArr *(iArr + 0) *p
iArr[0] (iArr + 0)[0] p[0]

iArr = 0x0000089883;

iArr[4] = 34;


int iNum = 10;
int *pi = &iNum;
int *ppi = pi;



int max(ppi) {

	int iAddr = *ppi;  // the address of pi
	int iRet = *iAddr; // get value
}
