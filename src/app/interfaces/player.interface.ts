import { eChampionNames } from './../enums/static.enums';
import { ePosition } from "../enums/static.enums";

export type iMetaMastery = Map<ePosition, number>;
export type iChampionMastery = Map<eChampionNames, number>;

export interface iPlayer {
    id: string;
    name: string;
    energy: iStat;
    moral: iStat;
    skills: iSkills;
    metaMastery: iMetaMastery;
    championsMastery: iChampionMastery;
    gainMoral(value:number): void;
    loseMoral(value:number): void;
}

export interface iSkills {
    farming: number
    engage: number
    disengage: number
    vision: number
    roaming: number
}

export interface iStat {
    current: number;
    max: number;
}
