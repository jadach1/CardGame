import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Deck }       from '../models/Deck';
import { Card }       from '../models/Card';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  // Creates a Deck of Cards in Serialized Order 
  getDeck(): Observable<Deck>{

    let deck = new Deck();
    let suit: number = 0;
    //deck.cards = new Array<Card>();

    // Generate a deck of cards from 0 - 12.
    // 0 Being Ace low and 12 being Kind high
    // Suit has a range of 1 - 4.  1 Being lowest (clubs) and 4 being highest (Spades)
    for(let i = 0; i < 52; i+=13){
      if(i == 0)  suit = 1;
      if(i == 13) suit = 2;
      if(i == 26) suit = 3;
      if(i == 39) suit = 4;
      for(let k = 0; k < 13; k++){
        let card = new Card(k,i);
        deck.cards.push(card);
        deck.cardsRemaining += 1;
      }
    }

    // Jokers
    for(let i = 0; i < 2; i++){
      let joker = new Card(100,100);
      deck.cards.push(joker);
      deck.cardsRemaining += 1;
    }

    return of(deck);
  }

  shuffleDeck(stdDeck: Deck) : Observable<Deck>{
    let newDeck = stdDeck;
    let counter = 1000;
    let cardOne;
    let cardTwo;
    let tmp: Card;

    while(counter){
      cardOne = Math.floor(Math.random() * 54);
      cardTwo = Math.floor(Math.random() * 54);
      tmp = newDeck.cards[cardOne];
      newDeck.cards[cardOne] = newDeck.cards[cardTwo];
      newDeck.cards[cardTwo] = tmp;
      counter--;
    }
    return of(newDeck);
  }
}
