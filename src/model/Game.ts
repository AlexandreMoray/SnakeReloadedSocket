import {Snake} from "./Snake";
import {}
export class Game {
    board: String[GAME_SIZE][];
    players: Snake[];

    constructor() {
    }

    print() : void {
        this.board.forEach(
            column => {
                column.forEach(
                    cell => {
                        console.log(cell);
                    }
                )
            }
        )
    }
}