import { eMapPosition } from './../../enums/static.enums';
import { GLOBALS } from './../../helpers/globals';
import { iSimulationPlayer } from 'src/app/interfaces/simulation.interface';
import { PlayersService } from './../entities/players.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { SimulationGame } from 'src/app/classes/simulation/simulation-game';
import { SimulationPlayer } from 'src/app/classes/simulation/simulation-player';
import { iGame, iTeam } from 'src/app/interfaces/simulation.interface';
import { diceHundred, getRandomInt, randomEnum } from 'src/app/helpers/helpers';
import { ePosition } from 'src/app/enums/static.enums';

type PlayerFunction = (player: iSimulationPlayer) => void;
type PlayerCondition = (player: iSimulationPlayer) => boolean;

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  
  public gameSubject: BehaviorSubject<iGame> = new BehaviorSubject<iGame>(new SimulationGame());

  get game(): iGame {
    return this.gameSubject.getValue();
  }

  set game(value: iGame) {
    this.gameSubject.next(value);
  }
  

  constructor(private _playerService: PlayersService) {}

  createNewGame(blue: SimulationPlayer[], red: SimulationPlayer[]) {
    this.game.blueTeam = this.createTeam(blue);
    this.game.redTeam = this.createTeam(red);
    console.log(this.game);
  }

  createTeam(team: SimulationPlayer[]): iTeam {
    let result:iTeam = new Map();

    Object.keys(ePosition).forEach(pos => {
        const player: iSimulationPlayer|undefined = team.find((p: SimulationPlayer) => p.playedPosition === ePosition[pos as keyof typeof ePosition]); 
        if(player)
          result.set(ePosition[pos as keyof typeof ePosition], player);
        else{
          console.log(team);
          throw new Error('While creating the team, player has not been found for position ' + pos);
        }
    });

    return result;
  }


  // GAME SIMULATION
  doOnEachPlayer(callback: PlayerFunction, condition?: PlayerCondition) {
    [...this.game.blueTeam.values(), ...this.game.redTeam.values()].map((player) => {
      if(condition === undefined  || (condition !== undefined && condition(player))) {
        callback(player);
      }
    });
  }

  isInNotBase(player: iSimulationPlayer): boolean {
    return player.mapPosition !== eMapPosition.BASE;
  }

  laningPhase() {
    this.game.time++; 

    // Move to position
    this.doOnEachPlayer(this.moveToLane);
    this.doOnEachPlayer(this.farm, this.isInNotBase);
  }

  moveToLane(player: iSimulationPlayer) {
    switch(player.playedPosition) {
      case ePosition.TOP:
        player.mapPosition = eMapPosition.TOP;
      break;
      case ePosition.MID:
        player.mapPosition = eMapPosition.MID;
      break;
      case ePosition.JUNGLE:
        player.mapPosition = eMapPosition.JUNGLE;
      break;
      case ePosition.BOT:
        player.mapPosition = eMapPosition.BOT;
      break;
      case ePosition.SUPPORT:
        player.mapPosition = eMapPosition.BOT;
      break;
    }
  }

  farm(player: iSimulationPlayer) {
    for(let lastHits of Array(GLOBALS.SIMULATION_POTENTIAL_FARM_PER_MINUTE)) {
      if(diceHundred(player.skills.farming)) {
        player.creepScore++;
        player.player.gainMoral(1);
      } else {
        player.player.loseMoral(0.1);
      }
    }
  }

    // Farming
   /* this.doOnPlayerPosition(ePosition.TOP, this.simulateFarming);
    this.doOnPlayerPosition(ePosition.MID, this.simulateFarming);
    this.doOnPlayerPosition(ePosition.JUNGLE, this.simulateFarming);
    this.doOnPlayerPosition(ePosition.BOT, this.simulateFarming);*/

    // Poke
   /* this.doOnLane(ePosition.MID, this.simulatePoke);
    this.doOnLane(ePosition.BOT, this.simulatePoke);
    this.doOnLane(ePosition.SUPPORT, this.simulatePoke);
    this.doOnLane(ePosition.TOP, this.simulatePoke);*/

    // Gank
    //this.simulateGank(this.game.blueTeam, this.game.redTeam);

    // Kills

/*
  simulateGank(casters: iTeam, targets: iTeam) {
    // Is there a gank?
    if(this.game.time % GLOBALS.SIMULATION_GANK_MINUTES_INTERVAL === 0){
      
      // Select a lane
      let gankedPosition = randomEnum(ePosition);
      let defenders = [targets.get(gankedPosition)];
      let attackers = [casters.get(ePosition.JUNGLE), casters.get(gankedPosition)];

      // Add bot or supp if gank is botlane


      // Add defenders with good vision
      [...targets.values()].filter(t => !t.inBase).map((target, key) => {
        if(diceHundred(target.laningSkills.vision) && key !== gankedPosition) {
          defenders.push(target);
        }
      });

      console.log(attackers, defenders);

    }
  }
*/
/*
  simulatePoke(caster: iSimulationPlayer, target: iSimulationPlayer) {
    target.poked = 0;
    for(let poke of Array(GLOBALS.SIMULATION_POTENTIAL_POKES_PER_MINUTE)) {
      if(diceHundred(caster.laningSkills.poke)) {
        if(diceHundred(target.laningSkills.dodge)) {
          caster.player.loseMoral(1);
          target.player.gainMoral(1);
        } else {
          caster.player.gainMoral(1);
          target.player.loseMoral(1);
          target.poked++;
        }
      }
    }

    if(target.poked >= GLOBALS.SIMULATION_POKES_THRESHOLD) {
      target.inBase = true;
    }
  }
*/
/*
  simulateFarming(caster: iSimulationPlayer) {
    for(let lastHits of Array(GLOBALS.SIMULATION_POTENTIAL_FARM_PER_MINUTE)) {
      if(diceHundred(caster.laningSkills.farming)) {
        caster.creepScore++;
        caster.player.gainMoral(1);
      } else {
        caster.player.loseMoral(0.1);
      }
    }
  }*/
/*
  getLaneOpponent(player: iSimulationPlayer, $this: SimulationService): iSimulationPlayer {

    return player;
  }*/
/*
  doOnLane(position: ePosition, callback: CallbackFunction) {
    const bluePlayer = this.game.blueTeam.get(position);
    const redPlayer = this.game.redTeam.get(position);

    if(!bluePlayer.inBase && !redPlayer.inBase) {
      this.simulatePoke(bluePlayer, redPlayer);
      this.simulatePoke(redPlayer, bluePlayer);
    } else {
      this.backToCombat(bluePlayer);
      this.backToCombat(redPlayer);
    }
  }


  doOnPlayerTeam(team: iTeam, callback: CallbackFunction) {
    [...team.values()].map((player) => {
      if(!player.inBase) {
        callback(player);
      } else {
        this.backToCombat(player);
      }
    })
  }

  doOnPlayerPosition(position: ePosition, callback: CallbackFunction) {
    const bluePlayer = this.game.blueTeam.get(position);
    const redPlayer = this.game.redTeam.get(position);

    if(!bluePlayer.inBase && !redPlayer.inBase) {
      callback(bluePlayer);
      callback(redPlayer);
    } else {
      this.backToCombat(bluePlayer);
      this.backToCombat(redPlayer);
    }
  }

  backToCombat(player: iSimulationPlayer) {
    player.inBase = false;
  }*/
}
