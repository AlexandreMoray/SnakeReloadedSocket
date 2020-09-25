import {GAME_SIZE, CELL_ID} from "./constants";
import {Direction} from "./model/Direction";
import {DirectionCodes} from "./model/DirectionCodes";
import {Pos} from "./model/Pos";

/**
 * Wait the amount of milliseconds given.
 * @param time
 * @returns {Promise<*>}
 */
export async function sleep(time : number) {
    return new Promise(r => setTimeout(r, time));
}

/**
 * Creates a nex div with specified type and returns it.
 * @param type={"cell"|"wall"|"door"}
 * @returns {HTMLDivElement}
 */
export function generate(type = CELL_ID) {
}

/**
 * Returns true if given index is a door in the wall of the given length.
 * @param index
 * @param wallLength
 * @returns {boolean}
 */
export function isDoor(index : number, wallLength = GAME_SIZE) {
    return (index === wallLength/2 || index === wallLength/2 -1);
}

/**
 * Returns random position object between given limits.
 */
export function randomPosition(min = 0, max = GAME_SIZE): Pos {

    const rand = () => {return Math.floor(Math.random()*(max - min) + min)};

    const randomPos : Pos =  new Pos(
        rand(),
        rand()
    );

    return randomPos;
}

/**
 * Spawns food randomly on the map.
 */
export function throwFood() {
}

/**
 * Returns the position of the next head cell, given the actual head and the direction.
 * @param position
 * @param direction
 * @returns {{x: *, y: *}}
 */
export function nextCellPos(position : Pos, direction : Direction) {
    let nextPos = {
        x: position.x + direction.pos.x,
        y: position.y + direction.pos.y
    };

    // Teleports symmetrically if head is going through a door (2 cells in middle of walls).
    if(nextPos.x < 0 && isDoor(nextPos.y)) {
        nextPos.x = GAME_SIZE-1;
    } else if(nextPos.x >= GAME_SIZE && isDoor(nextPos.y)) {
        nextPos.x = 0;
    } else if(nextPos.y < 0 && isDoor(nextPos.x)) {
        nextPos.y = GAME_SIZE-1;
    } else if(nextPos.y >= GAME_SIZE && isDoor(nextPos.x)) {
        nextPos.y = 0;
    }

    return nextPos;
}

/**
 * Returns new direction depending on the key event given.
 * @param e
 * @param lastDirection
 * @returns Direction
 */
export function changeDirection(e: String, lastDirection: Direction) : Direction {
    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    let newDirection : Direction = new Direction(
        new Pos(0, 0),
        false
    );

    if(!lastDirection.used) {
        return lastDirection;
    } else {
        switch(e) {
            case DirectionCodes.Up:
                lastDirection.pos.y !== 1 ? newDirection.pos.y-- : newDirection.pos.y++;
                break;
            case DirectionCodes.Down:
                lastDirection.pos.y !== -1 ? newDirection.pos.y++ : newDirection.pos.y--;
                break;
            case DirectionCodes.Left:
                lastDirection.pos.x !== 1 ? newDirection.pos.x-- : newDirection.pos.x++;
                break;
            case DirectionCodes.Right:
                lastDirection.pos.x !== -1 ? newDirection.pos.x++ : newDirection.pos.x--;
                break;
            default:
                newDirection = lastDirection;
                break;
        }

        return newDirection;
    }
}