
export function generateUID():string {
	return '_' + Math.random().toString(36)
}

export function diceHundred(threshold:number):boolean {
	return getRandomInt(0, 100) <= threshold
}

export function getRandomInt(min: number, max: number):number {
	return Math.round(Math.random() * (max - min) + min)
}

export function getRandomInArray(array: Array<any>, min?:number, max?:number):any {
	min = (min !== undefined) ? min : 0
	max = (max !== undefined) ? max : array.length - 1
	const index = Math.round(Math.random() * (max - min) + min)
	return array[index]
}

const prefix = ['Phar', 'Tal', 'Te', 'Sor', 'Geo', 'Gan', 'Fle', 'Zeph', 'Wor', 'Kin', 'Lam', 'Pan', 'Mon', 'Fri', 'Vish']
const middle = ['sith', 'tu', 'a', 'ke', 'nus', 'mil', 'pri', 'fen', 'o', 'e', 'y', 'ba', 'mo', 'ke', 'hu']
const suffix = ['is', 'gam', 'ya', 'are', 'ava', 'rus', 'nea', 'bra', 'via', 'lion', 'cor', 'ere', 'dan', 'win', 'kon']

export function generateName():string {
	let name = ''
	name = getRandomInArray(prefix)
	if (getRandomInt(0, 3) === 1) {
		name += getRandomInArray(middle)
	}
	name += getRandomInArray(suffix)

	return name
}

export function randomEnum<T>(anEnum: T): T[keyof T] {
	const enumValues = Object.keys(anEnum)
	  .map(n => Number.parseInt(n))
	  .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
	const randomIndex = Math.floor(Math.random() * enumValues.length)
	const randomEnumValue = enumValues[randomIndex]
  
	return randomEnumValue;
  }

  export function shuffle(array: Array<any>) {
	let currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle...
	while (currentIndex != 0) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
  
	return array;
  }