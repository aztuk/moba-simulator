import { TooltipPlayerSimulationComponent } from './../components/tooltips/tooltip-player-simulation/tooltip-player-simulation.component';
import { TooltipPlayerComponent } from './../components/tooltips/tooltip-player/tooltip-player.component';
import { Player } from './../classes/entities/player';
import { Directive, HostListener, Input, Renderer2, ViewContainerRef, Component, ComponentRef } from '@angular/core';
import { ComponentFactoryService } from '../services/engine/component-factory-resolver.service';
import { SimulationPlayer } from '../classes/simulation/simulation-player';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  @Input('tooltip') data: any;
  @Input('on-click') onClick:boolean = false;
  
  public component: unknown;
  public tooltip: ComponentRef<any>|undefined;

  @HostListener('mouseup', ['$event']) onMouseClick($event: any) {
    if(this.onClick){
      this.displayTooltip($event);
      this.position($event);
    }
  }

  @HostListener('mouseenter', ['$event']) onMouseEnter($event: any) {
    if(!this.onClick){
      this.displayTooltip($event);
    }
  }

  @HostListener('mousemove', ['$event']) onMouseMove($event: any) {
    if(!this.onClick){
      this.position($event);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if(!this.onClick){
      if (this.tooltip !== undefined) {
        this.tooltip.destroy();
      }
    }
  }

  constructor(private cfs: ComponentFactoryService, private container: ViewContainerRef, private renderer: Renderer2) {
  }

  ngOnDestroy(): void {
    if (this.tooltip !== undefined) {
      this.tooltip.destroy();
    }
  }

  displayTooltip($event:MouseEvent) {
    if (this.data instanceof Player) {
      this.component = TooltipPlayerComponent;
    }
    if (this.data instanceof SimulationPlayer) {
      this.component = TooltipPlayerSimulationComponent;
    }
    
    this.tooltip = this.cfs.createComponent(this.container, this.component);
    this.tooltip.instance.data = this.data;

    if(this.onClick) {
      let overlay = this.renderer.createElement('div');
      this.renderer.addClass(overlay, 'overlay');
      this.renderer.appendChild(this.tooltip.location.nativeElement, overlay);
      this.renderer.listen(overlay, 'mousedown', ($e) => {
        this.tooltip?.destroy();
      })
    }
    $event.stopPropagation();
  }

  position($event:MouseEvent) {
    if(!this.onClick) {
      let bottomCoord = $event.pageY - 50 + this.tooltip?.location.nativeElement.offsetHeight;
      let deltaY = (bottomCoord > document.body.offsetHeight) ? bottomCoord - document.body.offsetHeight + 10 : 0;

      let rightCoord = $event.pageX - 50 + this.tooltip?.location.nativeElement.offsetWidth;

      if(rightCoord >= document.body.offsetWidth) {
        this.renderer.setStyle(this.tooltip?.location.nativeElement, 'right',  document.body.offsetWidth - $event.pageX + 50 + "px");
        this.renderer.setStyle(this.tooltip?.location.nativeElement, 'left',"auto");
      } else {
        this.renderer.setStyle(this.tooltip?.location.nativeElement, 'left', $event.pageX + 50 + "px");
        this.renderer.setStyle(this.tooltip?.location.nativeElement, 'right',  "auto");

      }

      const top =  ($event.pageY - 50 - deltaY < 30) ? 30 : $event.pageY - 50 - deltaY;

      this.renderer.setStyle(this.tooltip?.location.nativeElement, 'top',  top + "px");
    } else {
      this.renderer.setStyle(this.tooltip?.location.nativeElement, 'right', "20px");
      this.renderer.setStyle(this.tooltip?.location.nativeElement, 'bottom', "20px");
      this.renderer.setStyle(this.tooltip?.location.nativeElement, 'left',"auto");
      this.renderer.setStyle(this.tooltip?.location.nativeElement, 'top',"auto");
    }

    $event.stopPropagation();
  }
}
