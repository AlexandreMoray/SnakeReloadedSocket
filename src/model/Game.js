"use strict";
exports.__esModule = true;
exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.print = function () {
        this.board.forEach(function (column) {
            column.forEach(function (cell) {
                console.log(cell);
            });
        });
    };
    return Game;
}());
exports.Game = Game;
