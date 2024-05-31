import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData, setDoc, doc, addDoc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { getFirestore } from "firebase/firestore";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, MatDialogModule, DialogAddPlayerComponent, GameInfoComponent, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']

})
export class GameComponent implements OnInit {
  game: Game = new Game();
  firestore: Firestore = inject(Firestore);
  gamesRef;
  gameId: any; 

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

    this.gamesRef = collection(this.firestore, 'games');
  }

  /**
   * load before the game started
   */
  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.getGameWithId(this.gameId);
    });
  }


  getGameWithId(id: string) {
    onSnapshot(doc(this.firestore, 'games', id), (doc: any) => {
      let game = doc.data();
      this.game.currentPlayer = game.currenPlayer;
      this.game.playedCards = game.playedCards;
      this.game.players = game.players;
      this.game.stack = game.stack;
      this.game.pickCardAnimation = game.pickCardAnimation;
      this.game.currentCard = game.currentCard;
    })
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
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() ||'';
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000)
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame() {
    setDoc(doc(this.firestore, 'games', this.gameId), this.game.toJson())
  }
}
