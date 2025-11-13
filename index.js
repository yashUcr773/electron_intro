import { app, BrowserWindow } from 'electron';

// Keep a global reference of parent so it is not garbage collected.
let parent, child;

// Create window on app ready
function createWindow() {
  // create and set reference
  parent = new BrowserWindow({
    width: 1000,
    height: 800,
  });

  child = new BrowserWindow({
    width: 800,
    height: 600,
    parent: parent,
    modal: true,
  });

  parent.loadFile('index.html');
  child.loadFile('index.html');

  // Open dev tools for debugging.
  parent.webContents.openDevTools();

  // unset the reference on close
  parent.on('closed', () => {
    parent = null;
  });
  child.on('closed', () => {
    child = null;
  });
}

// Listen the app ready event
app.on('ready', () => {
  console.log('App is ready');
  createWindow();
});
