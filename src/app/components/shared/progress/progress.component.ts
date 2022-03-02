import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pk-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  @Input() max: number = 100;
  @Input() current: number = 100;
  @Input() color = 'black';
  
  constructor() { }

  ngOnInit(): void {
  }

}
