import electron, { app, BrowserWindow } from 'electron';

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

  electron.powerMonitor.on('on-ac', () => {
    console.log('On AC');
  });

  electron.powerMonitor.on('on-battery', () => {
    console.log('On battery');
  });

  electron.powerMonitor.on('lock-screen', () => {
    console.log('lock-screen');
  });

  electron.powerMonitor.on('resume', () => {
    console.log('resume');
  });

  electron.powerMonitor.on('suspend', () => {
    console.log('suspend');
  });

  electron.powerMonitor.on('unlock-screen', () => {
    console.log('unlock-screen');
  });

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
