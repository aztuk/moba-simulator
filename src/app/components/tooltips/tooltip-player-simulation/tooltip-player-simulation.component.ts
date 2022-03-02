import { iSimulationPlayer } from './../../../interfaces/simulation.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pk-tooltip-player-simulation',
  templateUrl: './tooltip-player-simulation.component.html',
  styleUrls: ['./tooltip-player-simulation.component.scss']
})
export class TooltipPlayerSimulationComponent implements OnInit {

  @Input() data!:iSimulationPlayer;
  
  constructor() { }

  ngOnInit(): void {
  }

}
