import { ePosition, eMapPosition, eChampionNames } from './../enums/static.enums';
import { iPlayer, iSkills } from "./player.interface";


export interface iGame {
    time: number;
    blueTeam: iTeam;
    redTeam: iTeam;
}

export type iTeam = Map<ePosition, iSimulationPlayer>;

export interface iSimulationPlayer {
    player: iPlayer
    creepScore: number
    mapPosition: eMapPosition
    playedPosition: ePosition
    playedChampion: eChampionNames
    readonly skills: iSkills;
    readonly mentalMultiplier:number;
    readonly metaMultiplier:number;
    readonly championMasteryMultiplier:number;
    readonly totalMultiplier:number;
    readonly skillScore:number;
}
