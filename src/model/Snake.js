"use strict";
exports.__esModule = true;
exports.Snake = void 0;
var utils_js_1 = require("../utils.js");
var Direction_1 = require("./Direction");
var Pos_1 = require("./Pos");
var Snake = /** @class */ (function () {
    function Snake() {
        var _this = this;
        Snake.count++;
        this.score = 0;
        this.id = "snake-" + Snake.count;
        this.actualDirection = new Direction_1.Direction(new Pos_1.Pos(0, -1), false);
        this.body = {
            head: new Pos_1.Pos(3, 3),
            tail: []
        };
        document.addEventListener("keydown", function (e) {
            _this.actualDirection = utils_js_1.changeDirection(e.code, _this.actualDirection);
        });
    }
    Snake.prototype.move = function () {
    };
    Snake.prototype.initHeadRandomly = function () {
    };
    Snake.count = 0;
    return Snake;
}());
exports.Snake = Snake;
