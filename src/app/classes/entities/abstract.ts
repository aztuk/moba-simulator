import { generateUID } from "src/app/helpers/helpers";

export class AbstractEntity {

    id: string = generateUID();
    
}
