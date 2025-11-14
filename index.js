import { app, BrowserWindow, Menu } from 'electron';

// Keep a global reference of mainwindow so it is not garbage collected.
let mainWindow;

const contextMenu = Menu.buildFromTemplate([
  { label: 'Item 1' },
  { label: 'Item 2' },
  { role: 'editMenu' },
]);

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

  mainWindow.webContents.on('context-menu', e => {
    contextMenu.popup();
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
