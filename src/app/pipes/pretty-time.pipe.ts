import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyTime'
})
export class PrettyTimePipe implements PipeTransform {

  transform(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000);

    let text = minutes + ":";
    text+= (seconds < 10) ? '0' : '';
    text+= seconds.toFixed(0);

    return text;
  }

}
