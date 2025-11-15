import { app, BrowserWindow } from 'electron';

// Keep a global reference of mainwindow so it is not garbage collected.
let mainWindow;

console.log(`${process.cwd()}/preload.js`);
// Create window on app ready
function createWindow() {
  // create and set reference
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // we need to disable node integration and context isolation for security
      // nodeIntegration: true,
      // contextIsolation: false,
      preload: `${process.cwd()}/preload.js`,
    },
  });

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
