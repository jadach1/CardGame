import {Card} from "./Card"

export class Deck {
    cards:          Card[];
    cardsRemaining: number;

    constructor(){
        this.cards = new Array<Card>()
        this.cardsRemaining = 0;
    }
}