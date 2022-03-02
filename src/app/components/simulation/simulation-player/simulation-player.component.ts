import { iSimulationPlayer } from './../../../interfaces/simulation.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pk-simulation-player',
  templateUrl: './simulation-player.component.html',
  styleUrls: ['./simulation-player.component.scss']
})
export class SimulationPlayerComponent implements OnInit {

  @Input() player: iSimulationPlayer|undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
