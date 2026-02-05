import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

class Player {
  constructor(name: string) {
    this.name = name;
  }

  name: string;
  state: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

const winstates = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1]
]

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss'
})
export class TicTacToeComponent {
  board = signal<Array<'x' | 'o' | null>>(Array(9).fill(null));
  player1 = new Player("Player 1");
  player2 = new Player("Player 2");
  currentPlayer = signal<Player>(this.player1);
  moveCount = signal<number>(0);
  isGameOver = signal<boolean>(false);

  move(index: number, player: Player) {
    if(this.player1.state[index] === 0 && this.player2.state[index] === 0 && !this.isGameOver()) {
      player.state[index] = 1;
      this.moveCount.update(count => count + 1);
      const symbol = player === this.player1 ? 'x' : 'o';
      this.board.update(b => {
        b[index] = symbol;
        return b;
      })

      if(!this.isGameOver()) {
        this.changePlayer(player);
      }
    }
  }

  changePlayer(player: Player) {
    return player === this.player1 ? this.currentPlayer.set(this.player2) : this.currentPlayer.set(this.player1);
  }

  checkwin(player: Player) {
    winstates.forEach(state => {
      let isWin = state.map((value, idx) => {
        return player.state[idx] * value
      })

      if(isWin.toString().includes(state.toString())) {
        this.isGameOver(player);
      }
    })
  }
} 
