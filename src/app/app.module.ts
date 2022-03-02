import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { PrettyTimePipe } from './pipes/pretty-time.pipe';
import { SimulationComponent } from './components/simulation/simulation.component';
import { SimulationTeamComponent } from './components/simulation/simulation-team/simulation-team.component';
import { SimulationPlayerComponent } from './components/simulation/simulation-player/simulation-player.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { TooltipPlayerComponent } from './components/tooltips/tooltip-player/tooltip-player.component';
import { TooltipPlayerSimulationComponent } from './components/tooltips/tooltip-player-simulation/tooltip-player-simulation.component';
import { ProgressComponent } from './components/shared/progress/progress.component';
import { MapPositionPipe } from './pipes/map-position.pipe';
import { SimulationDraftComponent } from './components/simulation/simulation-draft/simulation-draft.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PrettyTimePipe,
    SimulationComponent,
    SimulationTeamComponent,
    SimulationPlayerComponent,
    TooltipDirective,
    TooltipPlayerComponent,
    TooltipPlayerSimulationComponent,
    ProgressComponent,
    MapPositionPipe,
    SimulationDraftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
