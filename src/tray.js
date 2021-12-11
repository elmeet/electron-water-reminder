const path = require("path");
const { app, Tray, nativeImage } = require("electron");
const { createWin, winWidth, hideWin } = require("./window");
let appIcon = null;

module.exports.createTray = function () {
  const iconName = "./assets/tray.png";
  const iconPath = path.join(__dirname, iconName);
  const nImage = nativeImage.createFromPath(iconPath);
  appIcon = new Tray(nImage);

  appIcon.on("click", function (event, bounds, position) {
    createWin({
      x: bounds.x - Math.ceil(winWidth / 2) + Math.floor(bounds.width / 2),
      y: bounds.y + bounds.height,
    });
  });

  app.on('browser-window-blur',()=>{
    hideWin()
  })

  app.on("window-all-closed", () => {
    if (appIcon) appIcon.destroy();
  });
};
