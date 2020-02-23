import { Component, OnInit } from '@angular/core';

import { DealerService }     from '../services/dealer.service'

import { Deck }              from '../models/Deck'
import { Player }            from '../models/Player'
import { referenceTable }    from '../models/referenceTable'


@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})

export class SimulationComponent implements OnInit {

  deck = new Deck();
  playerOne = new Player('Player One');
  playerTwo = new Player('Player Two');
  reference = new referenceTable(); // Table to dereference values to suits and numbers

  currentCardL: string;
  currentCardR: string;
  winningHand: string;
  endOfGame: string;

  constructor(private dealer: DealerService) 
  {  
    this.createDeck();
  }

  // Create a new Deck
  createDeck(){
    // Create a deck
    this.dealer.getDeck()
      .subscribe(
          res => this.deck = res,
          err => console.log("error getting deck"),
          () => this.shuffleCards() 
      );
  }

  // Randomly shuffle the deck
  shuffleCards(){
    console.log("shuffle Cards " + this.deck.cards.length)
    if(this.deck.cards.length == 54){
      this.dealer.shuffleDeck(this.deck)
        .subscribe(
          res => this.deck = res,
          err => console.log("error upon shuffling deck method in service"),
          () => { console.log("finished shufflin deck"), this.dealCards() }
        );
    }
  }

  // Deals each player their own deck of cards
  dealCards(){
    console.log(this.deck.cards);
    while(this.deck.cardsRemaining > 0){
      console.log(this.deck.cardsRemaining);
      this.playerOne.deck.cards.push(this.deck.cards.pop());
      this.playerTwo.deck.cards.push(this.deck.cards.pop());
      this.playerOne.deck.cardsRemaining++;
      this.playerTwo.deck.cardsRemaining++;
      this.deck.cardsRemaining-=2;
    }
    console.log("done");
    console.log(this.playerOne.deck);
    console.log(this.playerTwo.deck);
  }
  
  async cardDuelStart(){
    await this.showCards();
  }

  /*
    Function to Dereference and display both players cards to the screen
  */
  async showCards(){
    let pOneTop = this.playerOne.deck.cardsRemaining - 1;
    
    if(pOneTop >= 0){
      console.log(pOneTop);
      this.currentCardL = this.reference.mapValue.get(this.playerOne.deck.cards[pOneTop].value);
      this.currentCardL += " ";
      this.currentCardL += this.reference.mapSuit.get(this.playerOne.deck.cards[pOneTop].suit);
      this.currentCardR = this.reference.mapValue.get(this.playerTwo.deck.cards[pOneTop].value);
      this.currentCardR += " ";
      this.currentCardR += this.reference.mapSuit.get(this.playerTwo.deck.cards[pOneTop].suit);
      await this.compareCards(pOneTop);
      await this.discardCards(pOneTop);
    } else {
      this.announceWinner();
    }

    console.log(this.currentCardL + " " + this.currentCardR);

  }

  /*
    Function to discard the top cards of both players piles
  */
  async discardCards(pos: number){
    this.playerOne.deck.cards.pop();
    this.playerTwo.deck.cards.pop();
    this.playerOne.deck.cardsRemaining--;
    this.playerTwo.deck.cardsRemaining--;
  }

  /*
    Function to compare the two players cards, evaluate which is higher,
    allocate the points and display the winning hand
  */
  async compareCards(pos: number){
    
    let pOneV = this.playerOne.deck.cards[pos].value;
    let pTwoV = this.playerTwo.deck.cards[pos].value;
    
    // check for double joker
    if(pOneV == 100 && pTwoV == 100 )
    {
      this.winningHand = "X"
      return;
    }
    if(pOneV > pTwoV)
    {
      this.playerOne.points++;
      this.winningHand = "<-"
    }
    else if(pOneV < pTwoV)
    {
      this.playerTwo.points++;
      this.winningHand = "->"
    }
    else
    {
       // Tie Breaker through suits
       let pOneS = this.playerOne.deck.cards[pos].suit;
       let pTwoS = this.playerTwo.deck.cards[pos].suit;
       if(pOneS > pTwoS)
       {
         this.playerOne.points++;
         this.winningHand = "<-"
       }
       else
       {
        this.playerTwo.points++;
        this.winningHand = "->"
       }
    }
  }

  announceWinner(){
    if(this.playerOne.points > this.playerTwo.points){
      this.endOfGame = "Player One is the Winner !\n Please push reset to restart game";
    } else if (this.playerOne.points < this.playerTwo.points){
      this.endOfGame = "Player Two is the Winner !\n Please push reset to restart game";
    } else {
      this.endOfGame = "Tie Game !\n Please push reset to restart game";
    }
  }

  // Reset Game
  resetGame(){
    this.currentCardL = "";
    this.currentCardR = "";
    this.winningHand  = "";
    this.endOfGame    = "";
    this.deck         = new Deck();
    this.playerOne    = new Player("Player 1");
    this.playerTwo    = new Player("Player 2");
    this.createDeck();
  }
   ngOnInit() {
    console.log("simulation works")
  }

}
