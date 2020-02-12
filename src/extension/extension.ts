import { Counter } from "../core/counter";
import { Unit } from "../models/unit";

console.log("This is the main entry point for this GNOME extension");

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

let counter;

function init() {
  log(`initializing ${Me.metadata.name} version ${Me.metadata.version}`);

  const units: Unit[] = [
    {
      subjectName: { id: 1, name: "Sub1", longname: "Subject 1" },
      teacherName: { id: 2, name: "Te1", longname: "Teacher 1" },
      startDate: new Date(new Date().setHours(7)),
      endDate: new Date(new Date().setHours(20))
    }
  ];

  counter = new Counter(1, units);
}

function enable() {
  log(`enabling ${Me.metadata.name} version ${Me.metadata.version}`);
}

function disable() {
  log(`disabling ${Me.metadata.name} version ${Me.metadata.version}`);
}
