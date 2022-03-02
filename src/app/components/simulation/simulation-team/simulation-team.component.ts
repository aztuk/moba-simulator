import { iTeam } from './../../../interfaces/simulation.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pk-simulation-team',
  templateUrl: './simulation-team.component.html',
  styleUrls: ['./simulation-team.component.scss']
})
export class SimulationTeamComponent implements OnInit {

  @Input() team: iTeam | undefined;
  @Input() reverse: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
