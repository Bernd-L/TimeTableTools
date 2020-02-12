// Begin of polyfill

const Mainloop = imports.mainloop;

const setTimeout = function(func, millis /* , ... args */) {
  let args = [];
  if (arguments.length > 2) {
    args = args.slice.call(arguments, 2);
  }

  let id = Mainloop.timeout_add(
    millis,
    () => {
      func.apply(null, args);
      return false; // Stop repeating
    },
    null
  );

  return id;
};

const clearTimeout = function(id) {
  Mainloop.source_remove(id);
};

const setInterval = function(func, millis /* , ... args */) {
  let args = [];
  if (arguments.length > 2) {
    args = args.slice.call(arguments, 2);
  }

  let id = Mainloop.timeout_add(
    millis,
    () => {
      func.apply(null, args);
      return true; // Repeat
    },
    null
  );

  return id;
};

const clearInterval = function(id) {
  Mainloop.source_remove(id);
};

// End of polyfill

// Start of app-logic

const GLib = imports.gi.GLib;
// let fileContents = String(GLib.file_get_contents("/path/to/yourFile")[1]);
// End of app-logic

// Start of extension-logic

const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;
const Slider = imports.ui.slider;

let button, label_2, myInterval;

function init() {
  button = new St.Bin({
    style_class: "panel-button",
    reactive: true,
    can_focus: true,
    x_fill: true,
    y_fill: false,
    track_hover: true
  });

  label_2 = new St.Label({
    text: "0h 0m 42m remaining"
  });

  setText("0h 0m 42m remaining");
  // button.connect("enter-event", _moreSnow);
  button.connect("button-press-event", _snow);

  myInterval = 1;

  myInterval = setInterval(() => {
    setText("hello there" + myInterval);
  }, 1000);

  prepare();
}

function setText(text) {
  label_2 = new St.Label({ text });

  button.set_child(label_2);
}

function _snow() {
  setText("0h 42m 42m remaining");
}

function enable() {
  Main.panel._centerBox.insert_child_at_index(button, 0);
}

function disable() {
  // Stop the app logic
  clearInterval(myInterval);

  // Remove the button
  Main.panel._centerBox.remove_child(button);
}

// End of extension-logic
