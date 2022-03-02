import { iSkills, iStat } from "src/app/interfaces/player.interface";
import { Stat } from "./stat";

export class Skills implements iSkills{
    

    farming: number = 40;
    engage: number = 12;
    disengage: number = 12;
    vision: number = 1;
    roaming: number = 8;

    constructor(defaultSkills?:iSkills) { 
        if(defaultSkills !== undefined) {
            this.farming = defaultSkills.farming;
            this.engage = defaultSkills.engage;
            this.disengage = defaultSkills.disengage;
            this.vision = defaultSkills.vision;
            this.roaming = defaultSkills.roaming;
        }
    }
}
