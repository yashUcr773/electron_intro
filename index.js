import { app, BrowserWindow, Tray, Menu } from 'electron';

// Keep a global reference of mainwindow so it is not garbage collected.
let mainWindow, tray;

function createTray() {
  tray = new Tray('trayTemplate@2x.png');
  tray.setToolTip('My electron app tooltip');

  tray.on('click', e => {
    if (e.shiftKey) {
      app.quit();
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Item 1',
      },
      { role: 'quit' },
    ])
  );
}

// Create window on app ready
function createWindow() {
  // create and set reference
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
  });

  mainWindow.loadFile('index.html');

  createTray();

  // Open dev tools for debugging.
  mainWindow.webContents.openDevTools();

  // unset the reference on close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Listen the app ready event
app.on('ready', () => {
  console.log('App is ready');
  createWindow();
});
