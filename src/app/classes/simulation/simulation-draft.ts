import { eTeams } from "src/app/enums/static.enums";
import { iSimulationPlayer } from "src/app/interfaces/simulation.interface";



export class SimulationDraft {

    blueTeam: iSimulationPlayer[] = Array();
    redTeam: iSimulationPlayer[] = Array();

    draftingTeam: eTeams = eTeams.BLUE;
    draftingPlayer!: iSimulationPlayer;
    draftingIndex: number = 0;
    draftFinished: boolean = false;

    bluePositionsDrafted: Array<string> = new Array();
    blueChampionsDrafted: Array<string> = new Array();

    redPositionsDrafted: Array<string> = new Array();
    redChampionsDrafted: Array<string> = new Array();

    // DRAFTIN SIMULATION
    draftPosition() {
        let positionDrafted = (this.draftingTeam === eTeams.BLUE) ? this.bluePositionsDrafted : this.redPositionsDrafted;
        // Pick a position
        const bestPosition = [...this.draftingPlayer.player.metaMastery.entries()].sort((a, b) => {
            if(a[1] > b[1])
                return -1;
            if(a[1] < b[1])
                return 1;
            return 0;
        }).filter(positions => !positionDrafted.includes(positions[0]))[0][0];

        positionDrafted.push(bestPosition);
        this.draftingPlayer.playedPosition = bestPosition;
    }

    draftChampion() {
        let championsDrafted = (this.draftingTeam === eTeams.BLUE) ? this.blueChampionsDrafted : this.redChampionsDrafted;
        // Pick a position
        const bestChampion = [...this.draftingPlayer.player.championsMastery.entries()].sort((a, b) => {
            if(a[1] > b[1])
                return -1;
            if(a[1] < b[1])
                return 1;
            return 0;
        }).filter(champion => !championsDrafted.includes(champion[0]))[0][0];

        championsDrafted.push(bestChampion);
        this.draftingPlayer.playedChampion = bestChampion;
    }

    selectNextPlayer() {
        // Everyone has picked
        if(this.blueTeam.every(player =>player.playedChampion) && this.redTeam.every(player => player.playedChampion)) {
            this.draftFinished = true;
        } else {
            // First player to draft
            if(!this.draftingPlayer) {
            this.draftingPlayer = this.blueTeam[this.draftingIndex];
            } else {
            // Pass to red player
            if(this.draftingTeam === eTeams.BLUE) {
                this.draftingTeam = eTeams.RED;
                this.draftingPlayer = this.redTeam[this.draftingIndex]
            
                // Pass to blue player
            } else {
                    this.draftingTeam = eTeams.BLUE;
                    this.draftingIndex++;
                    this.draftingPlayer = this.blueTeam[this.draftingIndex];
                }
            } 
        }
    }
}
