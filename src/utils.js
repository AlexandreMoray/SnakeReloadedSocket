"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.changeDirection = exports.nextCellPos = exports.throwFood = exports.randomPosition = exports.isDoor = exports.generate = exports.sleep = void 0;
var constants_1 = require("./constants");
var Direction_1 = require("./model/Direction");
var DirectionCodes_1 = require("./model/DirectionCodes");
var Pos_1 = require("./model/Pos");
/**
 * Wait the amount of milliseconds given.
 * @param time
 * @returns {Promise<*>}
 */
function sleep(time) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (r) { return setTimeout(r, time); })];
        });
    });
}
exports.sleep = sleep;
/**
 * Creates a nex div with specified type and returns it.
 * @param type={"cell"|"wall"|"door"}
 * @returns {HTMLDivElement}
 */
function generate(type) {
    if (type === void 0) { type = constants_1.CELL_ID; }
}
exports.generate = generate;
/**
 * Returns true if given index is a door in the wall of the given length.
 * @param index
 * @param wallLength
 * @returns {boolean}
 */
function isDoor(index, wallLength) {
    if (wallLength === void 0) { wallLength = constants_1.GAME_SIZE; }
    return (index === wallLength / 2 || index === wallLength / 2 - 1);
}
exports.isDoor = isDoor;
/**
 * Returns random position object between given limits.
 */
function randomPosition(min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = constants_1.GAME_SIZE; }
    var rand = function () { return Math.floor(Math.random() * (max - min) + min); };
    var randomPos = new Pos_1.Pos(rand(), rand());
    return randomPos;
}
exports.randomPosition = randomPosition;
/**
 * Spawns food randomly on the map.
 */
function throwFood() {
}
exports.throwFood = throwFood;
/**
 * Returns the position of the next head cell, given the actual head and the direction.
 * @param position
 * @param direction
 * @returns {{x: *, y: *}}
 */
function nextCellPos(position, direction) {
    var nextPos = {
        x: position.x + direction.pos.x,
        y: position.y + direction.pos.y
    };
    // Teleports symmetrically if head is going through a door (2 cells in middle of walls).
    if (nextPos.x < 0 && isDoor(nextPos.y)) {
        nextPos.x = constants_1.GAME_SIZE - 1;
    }
    else if (nextPos.x >= constants_1.GAME_SIZE && isDoor(nextPos.y)) {
        nextPos.x = 0;
    }
    else if (nextPos.y < 0 && isDoor(nextPos.x)) {
        nextPos.y = constants_1.GAME_SIZE - 1;
    }
    else if (nextPos.y >= constants_1.GAME_SIZE && isDoor(nextPos.x)) {
        nextPos.y = 0;
    }
    return nextPos;
}
exports.nextCellPos = nextCellPos;
/**
 * Returns new direction depending on the key event given.
 * @param e
 * @param lastDirection
 * @returns Direction
 */
function changeDirection(e, lastDirection) {
    var keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    var newDirection = new Direction_1.Direction(new Pos_1.Pos(0, 0), false);
    if (!lastDirection.used) {
        return lastDirection;
    }
    else {
        switch (e) {
            case DirectionCodes_1.DirectionCodes.Up:
                lastDirection.pos.y !== 1 ? newDirection.pos.y-- : newDirection.pos.y++;
                break;
            case DirectionCodes_1.DirectionCodes.Down:
                lastDirection.pos.y !== -1 ? newDirection.pos.y++ : newDirection.pos.y--;
                break;
            case DirectionCodes_1.DirectionCodes.Left:
                lastDirection.pos.x !== 1 ? newDirection.pos.x-- : newDirection.pos.x++;
                break;
            case DirectionCodes_1.DirectionCodes.Right:
                lastDirection.pos.x !== -1 ? newDirection.pos.x++ : newDirection.pos.x--;
                break;
            default:
                newDirection = lastDirection;
                break;
        }
        return newDirection;
    }
}
exports.changeDirection = changeDirection;
