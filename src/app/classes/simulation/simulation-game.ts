import { iGame, iTeam } from "src/app/interfaces/simulation.interface";


export class SimulationGame implements iGame {

    time: number = 0;
    blueTeam!: iTeam;
    redTeam!: iTeam;

    constructor() { }

}
