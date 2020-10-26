import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stock'
})
export class StockPipe implements PipeTransform {

  transform(value: any[], text: string): any[] {
    if (text == '') {
      return value;
    }
    if (!value) {
      return value
    }

    text = text.toLocaleLowerCase();

    console.log(text)
    console.log(value.filter(item => item.id.toLocaleLowerCase().includes(text)))

    return value.filter(
      item=> item.id.toLocaleLowerCase().includes(text)
      
    )
  }

}
