import { SimulationComponent } from './components/simulation/simulation.component';
import { SimulationDraftComponent } from './components/simulation/simulation-draft/simulation-draft.component';
import { GameComponent } from './components/game/game.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: GameComponent
},{
  path: 'draft',
  component: SimulationDraftComponent
},{
  path: 'game',
  component: SimulationComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
