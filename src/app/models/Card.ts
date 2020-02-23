export class Card {
    suit: number;
    value: number;
    
    // Initialize Card
    constructor(val: number, sui: number){   
        if(!isNaN(val) && !isNaN(sui)){
            this.suit = sui;
            this.value = val;
        }    
    }
    
}