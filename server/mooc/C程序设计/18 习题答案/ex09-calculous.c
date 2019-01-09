#include <stdio.h>  
   
//Calculate用于计算积分
double Calculate(double(*func)(double x), double a, double b)  {  
    double dx = 0.0001;//细分的区间长度  
    double sum = 0;  
    for (double xi = a+dx; xi <= b; xi+=dx) {  
       double area = func(xi)*dx;  
       sum +=area;  
    }  
    return sum;  
}  
   
double func_1(double x) {  
    return x*x;  
}  
   
double func_2(double x) {  
    return x*x*x;  
}  
   
void main() {  
    printf("%lf\n", Calculate(func_1, 0, 1));  
    printf("%lf\n", Calculate(func_2, 0, 1));  
} 