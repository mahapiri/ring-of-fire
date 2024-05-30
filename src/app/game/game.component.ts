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
import { Firestore, collection, collectionData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc, doc, getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, MatDialogModule, DialogAddPlayerComponent, GameInfoComponent, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']

})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: any;
  game!: Game;
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  gamesCollection;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.gamesCollection = collection(this.firestore, 'games');
    this.items$ = collectionData(this.gamesCollection);

    this.items$.subscribe(data => {
      console.log('Game update: ', data);
    })
  }

  /**
   * load before the game started
   */
  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      let id = params['id'];
      console.log(id);
      this.addGame(id);
    });
  }


  /**
   * start new Game
   */
  newGame() {
    this.game = new Game();
  }

  /**
   * add Game to Firebase
   */
  addGame(id: string) {
    addDoc(this.gamesCollection, this.game.toJson());
  }


  /**
   * take card to get the right animation
   */
  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.currenPlayer++;
      this.game.currenPlayer = this.game.currenPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000)
    }
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
