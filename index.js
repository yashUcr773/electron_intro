import { app, BrowserWindow } from 'electron';

// Keep a global reference of mainwindow so it is not garbage collected.
let mainWindow;

// Create window on app ready
function createWindow() {
  // create and set reference
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 200,
    minHeight: 400,
    maxHeight: 1000,
    maxWidth: 1200,
  });

  mainWindow.loadFile('index.html');

  // Open dev tools for debugging.
  mainWindow.webContents.openDevTools();

  // unset the reference on close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  console.log('id', mainWindow.id);
  console.log(BrowserWindow.getAllWindows());
}

// Listen the app ready event
app.on('ready', () => {
  console.log('App is ready');
  createWindow();
});
