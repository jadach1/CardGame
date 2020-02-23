import {Deck} from "./Deck"

export class Player{
    name:   string;
    deck:   Deck;
    points: number;

    constructor(pname: string){
        this.name = pname;
        this.deck = new Deck();
        this.points = 0;
    }
}