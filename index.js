import { app, BrowserWindow, ipcMain, webContents } from 'electron';

// Keep a global reference of mainwindow so it is not garbage collected.
let mainWindow;

// Create window on app ready
function createWindow() {
  // create and set reference
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
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

ipcMain.on('channel:sync', async (e, ...args) => {
  console.log(args);
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 10000);
  });
  e.returnValue = ['1', '2'];
});
