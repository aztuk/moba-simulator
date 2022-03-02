import { Skills } from './../../classes/components/skills';
import { iSkills } from './../../interfaces/player.interface';
import { eChampionNames } from './../../enums/static.enums';
import { Champions } from './../../interfaces/champion.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  public static champions = new Map([
    [eChampionNames.AMERICA, new Skills({farming: 1.3, engage: 0.7,  disengage: 1.2,  vision:0.9, roaming: 0.9 })],
    [eChampionNames.ANTMAN, new Skills({farming: 1.3, engage: 0.7,  disengage: 1.2,  vision:0.9, roaming: 0.9 })],
    [eChampionNames.HAWKEYE, new Skills({farming: 1.3, engage: 0.7,  disengage: 1.2,  vision:0.9, roaming: 0.9 })],
    [eChampionNames.HULK, new Skills({farming: 1.3, engage: 0.7,  disengage: 1.2,  vision:0.9, roaming: 0.9 })],
    [eChampionNames.IRON, new Skills({farming: 1.3, engage: 0.7,  disengage: 1.2,  vision:0.9, roaming: 0.9 })],
    [eChampionNames.MARVEL, new Skills({farming: 1.3, engage: 0.7,  disengage: 1.2,  vision:0.9, roaming: 0.9 })],
    [eChampionNames.SPIDER, new Skills({farming: 1.3, engage: 0.7,  disengage: 1.2,  vision:0.9, roaming: 0.9 })],
    [eChampionNames.STRANGE, new Skills({farming: 1.3, engage: 0.7,  disengage: 1.2,  vision:0.9, roaming: 0.9 })],
    [eChampionNames.THOR, new Skills({farming: 1.3, engage: 0.7,  disengage: 1.2,  vision:0.9, roaming: 0.9 })],
    [eChampionNames.WIDOW, new Skills({farming: 1.3, engage: 0.7,  disengage: 1.2,  vision:0.9, roaming: 0.9 })],
  ]);

  constructor() {}
}
