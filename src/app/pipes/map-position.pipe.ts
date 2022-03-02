import { eMapPosition } from './../enums/static.enums';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapPosition'
})
export class MapPositionPipe implements PipeTransform {

  transform(value: eMapPosition|undefined): string {
    let text = '';
    switch(value) {
      case eMapPosition.BASE:
        text = 'Base';
      break;
      case eMapPosition.BOT:
        text = 'Botlane';
      break;
      case eMapPosition.JUNGLE:
        text = 'Jungle';
      break;
      case eMapPosition.MID:
        text = 'Mid';
      break;
      case eMapPosition.TOP:
        text = 'Top';
      break;
      default:
        text = 'Inconnu';
      break;
    }

    return text;
  }

}
