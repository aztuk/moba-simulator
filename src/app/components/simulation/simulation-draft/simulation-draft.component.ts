import { SimulationGame } from './../../../classes/simulation/simulation-game';
import { eChampionNames, eTeams } from './../../../enums/static.enums';
import { ePosition } from 'src/app/enums/static.enums';
import { SimulationDraft } from './../../../classes/simulation/simulation-draft';
import { SimulationPlayer } from 'src/app/classes/simulation/simulation-player';
import { iSimulationPlayer } from 'src/app/interfaces/simulation.interface';
import { getRandomInt, diceHundred, shuffle } from 'src/app/helpers/helpers';
import { iPlayer } from 'src/app/interfaces/player.interface';
import { PlayersService } from './../../../services/entities/players.service';
import { SimulationService } from './../../../services/engine/simulation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { iGame } from 'src/app/interfaces/simulation.interface';
import { Player } from 'src/app/classes/entities/player';
import { Router } from '@angular/router';

@Component({
  selector: 'pk-simulation-draft',
  templateUrl: './simulation-draft.component.html',
  styleUrls: ['./simulation-draft.component.scss']
})
export class SimulationDraftComponent implements OnInit, OnDestroy {

  mainPlayer!: iSimulationPlayer;
  draft: SimulationDraft = new SimulationDraft();
  
  positions = ePosition;
  champions = eChampionNames;
  mainPlayerteam!: eTeams;
  
  subscriptions: Subscription[] = Array();

  constructor(private simulation: SimulationService, private playerService: PlayersService, private _router: Router) {
    this.subscriptions.push(this.playerService.mainPlayer$.subscribe(player => this.mainPlayer = new SimulationPlayer(player)));
   }

  ngOnInit(): void {
      this.fillWithPlayers();
      this.assignPlayerToRandomTeam();
      shuffle(this.draft.blueTeam);
      shuffle(this.draft.redTeam);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  assignPlayerToRandomTeam() {
    if(this.mainPlayer)
      if(diceHundred(50)) {
        this.draft.blueTeam.shift();
        this.draft.blueTeam.push(this.mainPlayer);
        this.mainPlayerteam = eTeams.BLUE;
      } else {
        this.draft.redTeam.shift();
        this.draft.redTeam.push(this.mainPlayer);
        this.mainPlayerteam = eTeams.RED;
      }
  }

  fillWithPlayers() {
    for(let i = 0;i < 5;  i++) {
        this.draft.blueTeam.push(new SimulationPlayer(this.playerService.createRandomPlayer(this.mainPlayer.player)));
        this.draft.redTeam.push(new SimulationPlayer(this.playerService.createRandomPlayer(this.mainPlayer.player)));
    }
  }

  draftNext() {
    if(this.draft.draftingPlayer && this.draft.draftingPlayer.player.id !== this.mainPlayer.player.id) {
      this.draft.draftPosition();
      this.draft.draftChampion();
    }
    
    this.draft.selectNextPlayer();   
  }

  draftPosition(position: ePosition) {
    this.mainPlayer.playedPosition = position;
    if(this.mainPlayerteam === eTeams.BLUE) {
      this.draft.bluePositionsDrafted.push(position)
    } else {
      this.draft.redPositionsDrafted.push(position)
    }
  }
  draftChampion(champion: eChampionNames) {
    this.mainPlayer.playedChampion = champion;
    if(this.mainPlayerteam === eTeams.BLUE) {
      this.draft.blueChampionsDrafted.push(champion)
    } else {
      this.draft.redChampionsDrafted.push(champion)
    }
  }

  canDraftNext(): boolean {
    const isPlayerTurn: boolean = this.draft.draftingPlayer?.player?.id === this.mainPlayer.player.id;
    const isPlayerTurnFinished: boolean = (this.mainPlayer.playedPosition !== undefined) && (this.mainPlayer.playedChampion!== undefined);
    const isDraftFinished: boolean = this.draft.draftFinished;

    return (this.draft.draftingPlayer === undefined) || (!isDraftFinished && !isPlayerTurn) || (!isDraftFinished && isPlayerTurn && isPlayerTurnFinished);
  }

  isPositionPicked(position: ePosition): boolean {
    if(this.mainPlayerteam === eTeams.BLUE) {
      return this.draft.bluePositionsDrafted.includes(position);
    } else {
      return this.draft.redPositionsDrafted.includes(position);
    }
  }

  isChampionPicked(champion: eChampionNames): boolean {
    if(this.mainPlayerteam === eTeams.BLUE) {
      return this.draft.blueChampionsDrafted.includes(champion);
    } else {
      return this.draft.redChampionsDrafted.includes(champion);
    }
  }

  startGame() {
    this.simulation.createNewGame(this.draft.blueTeam, this.draft.redTeam);
    this._router.navigate(['game']);
  }

}
