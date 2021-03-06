const { BrowserWindow, app } = require("electron");
const path = require("path");
const winWidth = 320;
const winHeight = 240;

exports.winWidth = winWidth;
exports.winHeight = winHeight;

let win = null;
module.exports.createWin = function ({ x, y } = { x: 0, y: 0 }) {
  if (win) {
    win.show();
    win.setPosition(x, y);
    return;
  }
  //   // Create the browser window.
  win = new BrowserWindow({
    x,
    y,
    width: winWidth,
    height: winHeight,
    transparent: true,
    skipTaskbar: true,
    frame: false,
    acceptFirstMouse: true,
    // show: false,
    opacity: 0,
    autoHideMenuBar: true,
    backgroundColor: "#00000000",
    webPreferences: {
      devTools: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.hide()
  win.setOpacity(1)

  //   // and load the index.html of the app.
  win.loadFile(path.join(__dirname, "web/index.html"));
  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }
};

module.exports.hideWin = function () {
  if (win) {
    win.hide();
  }
};
