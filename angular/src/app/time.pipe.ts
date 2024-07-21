import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: number) {
    var hours =  Math.floor(value / 60);
    var minuets = value % 60
    return hours > 0 ? `${hours}:${minuets}` : `${minuets} minuets`
  }

}
