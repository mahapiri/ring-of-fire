import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']

})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: any;
  game!: Game;

  constructor() {

  }

  /**
   * load before the game started
   */
  ngOnInit(): void {
    this.newGame();
  }


  /**
   * start new Game
   */
  newGame() {
    this.game = new Game();
  }


  /**
   * take card to get the right animation
   */
  takeCard() {
    if(!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

    }

    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000)
  }
}
