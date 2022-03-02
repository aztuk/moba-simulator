import { PlayersService } from './../../services/entities/players.service';
import { iPlayer } from 'src/app/interfaces/player.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CallbackHolderService } from 'src/app/services/engine/callback-holder.service';

@Component({
  selector: 'pk-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  mainPlayer: iPlayer|undefined;
  subscriptions: Subscription[] = [];

  constructor(private playerSerivce: PlayersService) { 
    this.subscriptions.push(this.playerSerivce.mainPlayer$.subscribe(mainPlayer => this.mainPlayer = mainPlayer));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
