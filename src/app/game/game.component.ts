import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
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
    this.pickCardAnimation = true;
  }
}
