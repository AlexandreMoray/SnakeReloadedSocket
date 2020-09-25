import {Pos} from "./Pos";

export class Direction {
    pos : Pos;
    used: Boolean;

    constructor(pos : Pos, used : Boolean) {
        this.pos = pos;
        this.used = used;
    }

}