#include <stdio.h>
#include <ctype.h>
#include <stdarg.h>

#define NAME        1
#define BOOK        2
#define DATE        3
#define BUFFER_SIZE 20
#define FILE_NAME   "data.dat"

char buf[BUFFER_SIZE];
char tmp[BUFFER_SIZE];

int checkDate(int iYear,int iMonth,int iDay) {
  int validYear = (iYear>=1000) && (iYear < 2100);
  int validMonth = (iMonth>=1) && (iMonth<=12);
  int validDay = (iDay>=1) && (iDay<=31);
  return (validYear) && (validMonth) && (validDay);
}

void saveData(int cnt,...) {
  va_list valist;
  char *sBook;
  float fPrice;
  int iYear,iMonth,iDay;
  
  va_start(valist, cnt); 
  FILE *fp = fopen(FILE_NAME, "a");
  switch(cnt) {
    case DATE: 
      iYear = va_arg(valist, int); 
      iMonth = va_arg(valist, int);
      iDay = va_arg(valist, int);
      fprintf(fp, "data:%d-%d-%d\n",iYear,iMonth,iDay);
      break;
    case BOOK:
      sBook  = va_arg(valist, char*);
      fPrice = va_arg(valist, double);
      fprintf(fp,"book:%s\n",sBook);
      fprintf(fp,"price:%f\n",fPrice);
      break;
    case NAME:
      fprintf(fp, "user:%s",buf);
      break;
  }
  fclose(fp);
  va_end(valist);
}

void getName() {
  printf("\nPlease input name as string:\n");
  fgets(buf, BUFFER_SIZE, stdin);
  saveData(NAME, buf);
}

void getBook() {
  float fPrice;
  printf("\nPlease input data as [string],[price] :\n");
  fgets(buf, BUFFER_SIZE, stdin);
  sscanf(buf,"%[^,] ", tmp);
  sscanf(buf,"%*[^,],%f",&fPrice);
  saveData(BOOK, tmp, fPrice);
}

void getYear() {
  int iYear,iMonth,iDay;
  printf("\nPlease input data as [yyyy mm dd] :\n");
  fgets(buf, BUFFER_SIZE, stdin);
  sscanf(buf, "%d %d %d", &iYear, &iMonth, &iDay);

  if (!checkDate(iYear,iMonth,iDay)) {
    printf("Input date is invalid!\n\n");
    return;
  }
  saveData(DATE, iYear, iMonth, iDay);
}

void showInfo() {
  printf("\nPlease choose one?\n");
  printf("[Y]ear, [N]ame, [B]ook, [E]xit:\n");
}

int main() {
  char cInput;
  while(1) {
    showInfo();
    cInput = getchar();
    while( getchar()!= '\n');
    switch(tolower(cInput)) {
      case 'y': getYear();break;
      case 'n': getName();break;
      case 'b': getBook();break;
      case 'e': goto end;
    }
  }

end: 
  return 0;
}