"use strict";
exports.__esModule = true;
var random_1 = require("./random");
var Engineer = /** @class */ (function () {
    function Engineer(name) {
        this.name = name;
    }
    Object.defineProperty(Engineer.prototype, "asJson", {
        get: function () {
            return {
                name: this.name
            };
        },
        enumerable: true,
        configurable: true
    });
    Engineer.createInitial = function (num) {
        return random_1.createInitial(num, this.create);
    };
    Engineer.random = function (list) {
        list = list || this.engineers;
        var index = Math.floor(Math.random() * list.length);
        return {
            element: list[index],
            index: index
        };
    };
    /**
     * Select number of engineers from list
     * @param num
     */
    Engineer.select = function (num, exludeList) {
        var _this = this;
        if (num === void 0) { num = 2; }
        if (this.engineers.length < num) {
            this.createInitial(num);
            // throw new Error(`not enough engineers to select from: ${this.engineers.length} < ${num}`)
        }
        function filtered(engineers) {
            return engineers.filter(function (e) {
                var condition = !Boolean(exludeList.find(function (ex) { return ex.name === e.name; }));
                return condition;
            });
        }
        var engineers = this.engineers;
        var selectionPool = exludeList.length > 0 ? filtered(engineers) : this.engineers;
        if (selectionPool.length < num) {
            throw new Error("not enough engineers to select from: " + selectionPool.length + " < " + num);
        }
        var list = selectionPool.slice(0);
        var a = new Array(num).fill(1);
        return a.map(function () {
            var _a = _this.random(list), element = _a.element, index = _a.index;
            var clone = Object.assign({}, element);
            list.splice(index, 1);
            return clone;
        });
    };
    Engineer.add = function (engineer) {
        this.engineers.push(engineer);
        return engineer;
    };
    Engineer.create = function (name) {
        var engineer = new Engineer(name);
        return Engineer.add(engineer);
    };
    Engineer.engineers = [];
    return Engineer;
}());
exports.Engineer = Engineer;
