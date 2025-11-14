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

// reply back to sender
ipcMain.on('channel:1', (e, ...args) => {
  e.sender.send('channel:2', 'Recieved', 'asd');
});

// send to all windows
ipcMain.on('channel:1', (e, ...args) => {
  console.log(e);
  console.log(args);
  broadcast('channel:2', 'Recieved', 'asd');
});

function broadcast(channel, ...data) {
  for (const window of BrowserWindow.getAllWindows()) {
    window.webContents.send(channel, ...data);
  }
}
