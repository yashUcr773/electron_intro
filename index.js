import { app, BrowserWindow, globalShortcut } from 'electron';

// Keep a global reference of mainwindow so it is not garbage collected.
let mainWindow;

// Create window on app ready
function createWindow() {
  // create and set reference
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
  });

  mainWindow.loadFile('index.html');

  // Open dev tools for debugging.
  mainWindow.webContents.openDevTools();

  // we can add listeners on webcontents as well.
  // what this provides is a listener even if app is not in focus and then keys are pressed.
  globalShortcut.register('g', () => {
    console.log('pressed g');
  });

  globalShortcut.register('CommandorControl+g', () => {
    console.log('ctrl g');
  });

  globalShortcut.unregister('h');

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
