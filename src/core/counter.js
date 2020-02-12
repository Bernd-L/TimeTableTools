"use strict";
exports.__esModule = true;
var Counter = /** @class */ (function () {
    /**
     * The counter class
     *
     * @param interval The interval in seconds between refreshing
     * @param units The units to be used for counting
     */
    function Counter(interval, units) {
        var _this = this;
        this.interval = interval;
        this.units = units;
        this.countInCliBlocking = function () {
            setInterval(function () { return _this.countInCliOnce(); }, _this.interval * 1000);
        };
        this.countInCliOnce = function () {
            /**
             * The unit which is active at this moment in time
             */
            var currentUnit = _this.getCurrentUnitForTime(new Date());
            var countString = _this.getRenderedString(currentUnit, _this.getNextUnit(currentUnit));
            console.log(countString);
        };
        /**
         * Returns the unit which is active at the specified moment in time
         */
        this.getCurrentUnitForTime = function (now) {
            return _this.units.find(function (unit) { return now >= unit.startDate && now < unit.endDate; });
        };
        /**
         * Returns the unit which will be active after the current one,
         * or the current one if there is none after it
         */
        this.getNextUnitForDate = function (now) {
            return _this.units
                .filter(function (unit) { return unit.startDate > now; })
                .reduce(function (acc, unit) { return (acc.startDate < unit.startDate ? acc : unit); });
        };
        /**
         * Returns the unit which will be active after the current one,
         * or undefined if there is none after it
         */
        this.getNextUnit = function (currentUnit) {
            // Handle undefined units
            // if (currentUnit === undefined) return undefined;
            var nextUnit = _this.getNextUnitForDate(new Date());
            // Avoid returning the current unit
            return currentUnit === nextUnit ? undefined : nextUnit;
        };
        this.getRenderedString = function (currentUnit, nextUnit) {
            var nextUp = nextUnit === undefined
                ? "nothing"
                : nextUnit.subjectName.name + " with " + nextUnit.teacherName.name + " at " + nextUnit.startDate.getHours() + ":" + nextUnit.startDate.getMinutes() + ".";
            // Handle undefined units
            if (currentUnit === undefined)
                return "Nothing active at the moment; next up is " + nextUp;
            var delta = new Date(currentUnit.endDate.getTime() - new Date().getTime());
            return (_this.getFancyStringFromDeltaDate(delta) +
                (" left in " + currentUnit.subjectName.name + " with " + currentUnit.teacherName.name + "; next up is ") +
                nextUp);
        };
        /**
         * Turns a delta-date into a hh:mm:ss string
         */
        this.getColonStringFromDeltaDate = function (delta) {
            return delta.toLocaleTimeString([], {
                timeZone: "UTC",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });
        };
        /**
         * Turns a delta-date into a "XXh YYm ZZs" string,
         * where h, m and s are literals, and XX, YY and ZZ are values.
         */
        this.getFancyStringFromDeltaDate = function (delta) {
            return delta.getUTCHours() + "h " + delta.getUTCMinutes() + "m " + delta.getUTCSeconds() + "s";
        };
    }
    return Counter;
}());
exports.Counter = Counter;
