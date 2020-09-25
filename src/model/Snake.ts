import {changeDirection} from "../utils.js";
import {Direction} from "./Direction";
import {Pos} from "./Pos";

export class Snake {

    static count = 0;
    id : String;
    score : number;
    actualDirection : Direction;
    body: {
        head: Pos,
        tail: Array<any>
    };

    constructor() {
        Snake.count++;
        this.score = 0;
        this.id = `snake-${Snake.count}`;
        this.actualDirection = new Direction(
            new Pos(0, -1),
            false
        );
        this.body = {
            head: new Pos(3,3),
            tail: []
        };

        document.addEventListener(
            "keydown",
            (e) => {
                this.actualDirection = changeDirection(e.code, this.actualDirection)
            }
        );
    }

    move() {
    }

    initHeadRandomly() {
    }
}
