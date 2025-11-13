import { app, BrowserWindow } from 'electron';

// console.log('Is App ready', app.isReady());
// setTimeout(() => {
//   console.log('Is App ready', app.isReady());
// }, 2000);

// Keep a global reference of mainwindow so it is not garbage collected.
let mainWindow;

// Create window on app ready
function createWindow() {
  // create and set reference
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
  });

  // Load file to be launched
  // mainWindow.loadURL(`file://${process.cwd()}/index.html`);
  mainWindow.loadFile('index.html');

  // Open dev tools for debugging.
  mainWindow.webContents.openDevTools();

  // unset the reference on close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Listen the close event.
  // Prvent closing of window here.
  mainWindow.on('close', e => {
    // console.log('close window');
    // e.preventDefault();
  });
}

// Get Paths
console.log('App Path', app.getAppPath());
console.log('AppData Path', app.getPath('appData'));
console.log('desktop Path', app.getPath('desktop'));
console.log('downloads Path', app.getPath('downloads'));
console.log('userdata Path', app.getPath('userData'));

// Listen the app ready event
app.on('ready', () => {
  console.log('App is ready');
  createWindow();
});

// Listen the window close event. Quit app if all windows are closed. Except macos darwin
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// If app icon is clicked and app is running but no windows are shown, recreate browser window.
app.on('activate', () => {
  if (!mainWindow) {
    createWindow();
  }
});

// Event to see whenever a window is created
app.on('browser-window-created', () => {
  console.log('Browser Window Created');
});

// Event to see when app is blurred
app.on('browser-window-blur', () => {
  console.log('Browser Window Blurred');

  // setTimeout(() => {
  //   app.quit();
  // }, 3000);
});

// Event to see when app is in focus
app.on('browser-window-focus', () => {
  console.log('Browser Window in Focus');
});

// Event fired when app is quitting
// Can do async cleanup here
app.on('before-quit', event => {
  console.log('Quitting app');

  // Prevent app from quitting.
  // Note. This prevents the app from quitting, The windows may close.
  // If you wish to prevent the browser window from closing, add event listenter to mainwindow or browser window.
  // console.log('Prevent quitting');
  // event.preventDefault();
});
