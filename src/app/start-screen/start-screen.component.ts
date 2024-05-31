import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';
import { GameComponent } from '../game/game.component';


@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [GameComponent],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  gamesRef;
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {
    this.gamesRef = collection(this.firestore, 'games');
  }


  /**
   * navigate to the playfield
   */
  newGame() {
    this.addGame();
  }


  /**
   * add Game to Firebase
   */
  addGame() {
    let game = new Game();
    addDoc(this.gamesRef, game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }

}
