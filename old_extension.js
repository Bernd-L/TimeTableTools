// Imports
const { Clutter, Gio, Gtk, GLib, GObject, Soup, St } = imports.gi;
const { Main, Tweener, PopupMenu, PanelMenu, Slider } = imports.ui;

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

var panelBox = Main.layoutManager.panelBox;

var origY = panelBox.y;

class myPanel {
  constructor() {}

  b = false;

  /**
   * Moves the panel to the bottom of the screen
   */
  movePanel = () => {
    panelBox.y = Main.layoutManager.primaryMonitor.height - panelBox.height;
  };

  /**
   * Moves the panel to the top of the screen
   */
  revertPanel = () => {
    panelBox.y = origY;
  };

  toggle = () => {
    this.b = !this.b;

    if (this.b) this.movePanel();
    else this.revertPanel();
  };
}

var panel = new myPanel();

class CountingPanel {
  constructor() {}

  refreshIntervalId //: number;

  startCounting = () => {
    // panel.toggle();
    this.refreshIntervalId = setInterval(() => {
      // panel.toggle();
    }, 1000 * 2);
  };

  stopCounting = () => {
    // panel.revertPanel();
    clearInterval(this.refreshIntervalId);
    panel.revertPanel();
  };

  private topBox = new St.BoxLayout();

  makePanel = () => {
    this.topBox.add_actor(this._weatherIcon);
  };
}

var c = new CountingPanel();

const init = () => {
  setInterval(() => {
    log(new Date().toTimeString());
  }, 1000);
  // this.addActor(null);
};

function enable() {
  // panel.movePanel();

  c.startCounting();

  const simpleTest = new St.Label({
    y_align: Clutter.ActorAlign.CENTER,
    text: "..."
  });

  this.add_actor(simpleTest);
}

const disable = () => {
  // panel.revertPanel();
  c.stopCounting();
};
