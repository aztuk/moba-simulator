import { iStat } from "src/app/interfaces/player.interface"

export class Stat implements iStat {
    
	public current: number
	public max: number
  
	constructor(current: number, max?: number) {
		this.current = current;
		this.max = (max) ? max : 100;
	}
   
}