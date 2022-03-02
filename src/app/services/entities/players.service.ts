import { eChampionNames } from './../../enums/static.enums';
import { iPlayer } from 'src/app/interfaces/player.interface';
import { Player } from './../../classes/entities/player';
import { Injectable } from '@angular/core';
import { generateName, getRandomInt } from 'src/app/helpers/helpers';
import { BehaviorSubject } from 'rxjs';
import { Stat } from 'src/app/classes/components/stat';
import { ePosition } from 'src/app/enums/static.enums';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  public mainPlayer$: BehaviorSubject<iPlayer> = new BehaviorSubject(new Player('Vous'));

  public set mainPlayer(value: any) {
    this.mainPlayer$.next(value);
  }

  public get mainPlayer() {
    return this.mainPlayer$.getValue();
  }

  constructor() { }

  createRandomPlayer(basePlayer: iPlayer) {
    let player = new Player(generateName());

    player.moral = new Stat(getRandomInt(20, 80));
    player.energy = new Stat(getRandomInt(20, 80));

    this.setMetaMasteries(player, basePlayer);
    this.setRandomChampionMasteries(player);

    return player;
  }

  setRandomChampionMasteries(player: Player) {
    Object.keys(eChampionNames).forEach(champion => {
      player.championsMastery.set(eChampionNames[champion as keyof typeof eChampionNames], getRandomInt(1, 150));
    });
  }

  setMetaMasteries(player: Player, basePlayer: Player) {
    Object.keys(ePosition).forEach(position => {
      const basePlayerStat = basePlayer.metaMastery.get(ePosition[position as keyof typeof ePosition]);
      if(basePlayerStat) {
        const min:number = basePlayerStat - 10;
        const max:number = basePlayerStat + 10;
        if(min && max)
          player.metaMastery.set(ePosition[position as keyof typeof ePosition], getRandomInt(min, max));
      }
    });
  }
}
