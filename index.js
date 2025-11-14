import { app, BrowserWindow, screen } from 'electron';

// Keep a global reference of mainwindow so it is not garbage collected.
let mainWindow;

// Create window on app ready
function createWindow() {
  // create and set reference
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
  });

  console.log('getAllDisplays', screen.getAllDisplays());
  console.log('getPrimaryDisplay', screen.getPrimaryDisplay());
  console.log('getCursorScreenPoint', screen.getCursorScreenPoint());

  mainWindow.loadFile('index.html');

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
