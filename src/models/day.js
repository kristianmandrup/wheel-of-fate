"use strict";
exports.__esModule = true;
var engineer_1 = require("./engineer");
var Day = /** @class */ (function () {
    function Day() {
    }
    Day.prototype.isWorking = function (engineer) {
        return [this.morning, this.evening].indexOf(engineer) >= 0;
    };
    Day.prototype.asJson = function (index) {
        return {
            index: index,
            morning: this.morning.asJson,
            evening: this.evening.asJson
        };
    };
    /**
     *
     * @param previous
     * @param force To force engineer selection without taking into consideration a previosu day schedule
     */
    Day.prototype.fill = function (previous, force) {
        if (!previous && !force) {
            throw new Error('Must take a previous day schedule to ensure engineers are not overworked');
        }
        var exludeList = force ? [] : [previous.morning, previous.evening];
        var engineers = engineer_1.Engineer.select(2, exludeList);
        this.morning = engineers[0];
        this.evening = engineers[1];
        return this;
    };
    return Day;
}());
exports.Day = Day;
