import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fractionPipe'
})
export class FractionPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value === parseInt(value, 10)) {
      return value.toString();
    } else {
      let top = value.toString().includes('.') ? value.toString().replace(/\d+[.]/, '') : 0;
      const wholeNumber = Math.floor(value);
      const decimal = value - wholeNumber;
      const bottom = Math.pow(10, top.toString().replace('-', '').length);
      if (decimal >= 1) {
        top = +top + (Math.floor(decimal) * bottom);
      } else if (decimal <= -1) {
        top = +top + (Math.ceil(decimal) * bottom);
      }

      const x = Math.abs(this.gcd(top, bottom));
      if (wholeNumber === 0) {
        return (top / x) + '/' + (bottom / x);
      }
      return wholeNumber + ' ' + (top / x) + '/' + (bottom / x);
    }
  }

  gcd(a: number, b: number) {
    return (b) ? this.gcd(b, a % b) : a;
  }
}
