import { Skills } from './../components/skills';
import { Stat } from './../components/stat';
import { iChampionMastery, iMetaMastery, iPlayer, iSkills, iStat } from "src/app/interfaces/player.interface";
import { AbstractEntity } from "./abstract";
import { ePosition } from 'src/app/enums/static.enums';


export class Player extends AbstractEntity implements iPlayer {
    
    energy: iStat = new Stat(50);
    moral: iStat = new Stat(50);
    skills: iSkills = new Skills();
    metaMastery: iMetaMastery = new Map();
    championsMastery: iChampionMastery = new Map();
    name: string;

    constructor(name:string) {
        super();
        this.name = name;
        this.metaMastery.set(ePosition.TOP, 30);
        this.metaMastery.set(ePosition.MID, 30);
        this.metaMastery.set(ePosition.JUNGLE, 30);
        this.metaMastery.set(ePosition.BOT, 30);
        this.metaMastery.set(ePosition.SUPPORT, 30);
    }

    gainMoral(value:number): void {
        this.moral.current += value;

        if(this.moral.current > this.moral.max) {
            this.moral.current = this.moral.max;
        }
    }

    loseMoral(value:number): void {
        this.moral.current -= value;

        if(this.moral.current < 3) {
            this.moral.current = 3;
        }
    }

}
