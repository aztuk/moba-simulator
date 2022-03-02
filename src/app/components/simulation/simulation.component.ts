import { Subscription } from 'rxjs';
import { SimulationService } from './../../services/engine/simulation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { iGame } from 'src/app/interfaces/simulation.interface';

@Component({
  selector: 'pk-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  game: iGame|null = null;

  constructor(private simulation: SimulationService) { 
    this.subscriptions.push(this.simulation.gameSubject.subscribe(game => this.game = game));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  nextMinute() {
    this.simulation.laningPhase();
  }

}
