"use strict";
exports.__esModule = true;
var day_1 = require("./day");
var Month = /** @class */ (function () {
    function Month() {
        this.days = [];
        this.day = 0;
    }
    Month.prototype.fill = function (num) {
        var _this = this;
        if (num === void 0) { num = 30; }
        var max = 30 - this.day;
        num = Math.min(max, num);
        this.day += num;
        var previousDay;
        var day, force;
        return new Array(num).fill(1).map(function (_, index) {
            force = index === 0;
            day = new day_1.Day().fill(previousDay, force);
            _this.days.push(day);
            previousDay = day;
            return day;
        });
    };
    Object.defineProperty(Month.prototype, "asJson", {
        get: function () {
            return {
                days: this.days.map(function (day, index) {
                    return day.asJson(index);
                })
            };
        },
        enumerable: true,
        configurable: true
    });
    return Month;
}());
exports.Month = Month;
function createMonth() {
    return new Month();
}
exports.createMonth = createMonth;
