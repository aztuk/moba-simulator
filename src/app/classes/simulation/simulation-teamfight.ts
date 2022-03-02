import { iSimulationPlayer } from 'src/app/interfaces/simulation.interface';

export interface iSimulationTeamfights {
    attackers: iSimulationPlayer[]
    defenders: iSimulationPlayer[]
}

export class SimulationTeamfight implements iSimulationTeamfights {

    attackers: iSimulationPlayer[];
    defenders: iSimulationPlayer[];

    constructor(attackers: iSimulationPlayer[], defenders: iSimulationPlayer[]) {
        this.attackers = attackers;
        this.defenders = defenders;
    }
}
