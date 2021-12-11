// Modules to control application life and create native browser window
const { app, ipcMain } = require("electron");
const { createTray } = require("./tray");
const { createWin } = require("./window");
const ex = process.execPath;

// 单例关闭
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

app.dock.hide();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  app.dock.hide();
  createTray();
  createWin()

  //  开机自启动
  app.setLoginItemSettings({
    openAtLogin: true,
    path: ex,
    args: [],
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("exitApp", () => {
  app.exit();
});
