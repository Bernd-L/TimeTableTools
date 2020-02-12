"use strict";
exports.__esModule = true;
var counter_1 = require("./core/counter");
console.log("This is the main entry point for this GNOME extension");
var ExtensionUtils = imports.misc.extensionUtils;
var Me = ExtensionUtils.getCurrentExtension();
var counter;
function init() {
    log("initializing " + Me.metadata.name + " version " + Me.metadata.version);
    var units = [
        {
            subjectName: { id: 1, name: "Sub1", longname: "Subject 1" },
            teacherName: { id: 2, name: "Te1", longname: "Teacher 1" },
            startDate: new Date(new Date().setHours(7)),
            endDate: new Date(new Date().setHours(20))
        }
    ];
    counter = new counter_1.Counter(1, units);
}
function enable() {
    log("enabling " + Me.metadata.name + " version " + Me.metadata.version);
}
function disable() {
    log("disabling " + Me.metadata.name + " version " + Me.metadata.version);
}
