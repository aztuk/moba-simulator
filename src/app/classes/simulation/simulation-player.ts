import { eChampionNames } from './../../enums/static.enums';
import { eMapPosition, ePosition } from "src/app/enums/static.enums";
import { iPlayer, iSkills } from "src/app/interfaces/player.interface";
import { iSimulationPlayer } from "src/app/interfaces/simulation.interface";
import { ChampionsService } from 'src/app/services/entities/champions.service';



export class SimulationPlayer implements iSimulationPlayer {


    creepScore: number = 0;
    mapPosition: eMapPosition = eMapPosition.BASE;
    playedPosition!: ePosition;
    playedChampion!: eChampionNames;
    player: iPlayer;

    constructor(player: iPlayer) {
       this.player = player; 
       
    }

    get skillScore():number {
        return Math.round(this.skills.farming + this.skills.roaming + this.skills.vision + this.skills.engage + this.skills.disengage);
    } 

    get totalMultiplier(): number {
        return this.mentalMultiplier * this.metaMultiplier * this.championMasteryMultiplier;
    }
    
    get mentalMultiplier(): number{
        return (this.player.moral.current + this.player.energy.current) / 2 / 100;
    }

    get metaMultiplier(): number{
        const positionSkill = this.player.metaMastery.get(this.playedPosition);
        return (positionSkill === undefined) ? 1 :  positionSkill / 100;
    }

    get championMasteryMultiplier(): number{
        const championMastery = this.player.championsMastery.get(this.playedChampion);
        return (championMastery === undefined) ? 1 :  championMastery / 100;
    }

    get skills(): iSkills{
        return {
            farming: this.player.skills.farming * this.totalMultiplier * (ChampionsService.champions.get(this.playedChampion)?.farming || 1),
            roaming: this.player.skills.roaming * this.totalMultiplier  * (ChampionsService.champions.get(this.playedChampion)?.roaming || 1),
            vision: this.player.skills.vision * this.totalMultiplier *  (ChampionsService.champions.get(this.playedChampion)?.vision || 1),
            engage: this.player.skills.engage * this.totalMultiplier  * (ChampionsService.champions.get(this.playedChampion)?.engage || 1),
            disengage: this.player.skills.disengage * this.totalMultiplier * (ChampionsService.champions.get(this.playedChampion)?.disengage || 1),
        }
    }

}
