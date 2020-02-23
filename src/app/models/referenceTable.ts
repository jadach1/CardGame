import { Key } from 'protractor';

export class referenceTable {

    mapSuit: Map<number,string>;
    mapValue: Map<number,string>;

    constructor(){
        this.mapSuit = new Map<number,string>();
        this.mapValue = new Map<number, string>();

        this.mapSuit.set(0, 'Club');
        this.mapSuit.set(13, 'Diamond');
        this.mapSuit.set(26, 'Heart');
        this.mapSuit.set(39, 'Spade');
        this.mapSuit.set(100, 'Joker');

        this.mapValue.set(0, 'Ace');
        this.mapValue.set(1, '2');
        this.mapValue.set(2, '3');
        this.mapValue.set(3, '4');
        this.mapValue.set(4, '5');
        this.mapValue.set(5, '6');
        this.mapValue.set(6, '7');
        this.mapValue.set(7, '8');
        this.mapValue.set(8, '9');
        this.mapValue.set(9, '10');
        this.mapValue.set(10, 'Jack');
        this.mapValue.set(11, 'Queen');
        this.mapValue.set(12, 'King');
        this.mapValue.set(100, '');
    }
  
}