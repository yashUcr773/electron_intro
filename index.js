import { app, BrowserWindow, dialog } from 'electron';

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

  mainWindow.webContents.on('did-finish-load', async () => {
    // to detach from main window, do not pass any window
    // const result = await dialog.showOpenDialog(mainWindow, {
    //   buttonLabel: 'select a photo',
    //   defaultPath: app.getPath('desktop'),
    //   properties: ['multiSelections', 'openFile'],
    // });
    // console.log('🚀 ~ createWindow ~ result:', result);

    const result = await dialog.showMessageBox(mainWindow, {
      title: 'Message Box',
      message: 'My Custom Message',
      detail: 'Some Details',
      buttons: ['Yes', 'No', 'Maybe'],
    });
    console.log(result);

    // const result = await dialog.showSaveDialog(mainWindow, {});
    // console.log('🚀 ~ createWindow ~ result:', result);
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
