import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pk-tooltip-player',
  templateUrl: './tooltip-player.component.html',
  styleUrls: ['./tooltip-player.component.scss']
})
export class TooltipPlayerComponent implements OnInit {

  @Input() data:any;

  constructor() { }

  ngOnInit(): void {
  }

}
