#include <stdio.h>


int main() {
  char *sEmail = "tom@163.com";


  int iPosAt;
  int iPosDot;
  int iLength = strLen(sEmail);

  int isValidAt = (iPosAt != -1) && (iPosAt>0);
  int isValidDoc = (iPosDot - iPosAt >1) && (iLength-iPosDoc > 1);
  int isValidEmail = isValidAt && isValidDoc;
}