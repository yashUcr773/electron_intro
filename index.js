import { app, BrowserWindow } from 'electron';
import { writeFile } from 'fs';

app.disableHardwareAcceleration();
// Keep a global reference of mainwindow so it is not garbage collected.
let mainWindow,
  i = 1;

// Create window on app ready
function createWindow() {
  // create and set reference
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    show: false,
    webPreferences: {
      offscreen: true,
    },
  });

  mainWindow.loadURL('https://yashaggarwal.com');

  mainWindow.webContents.on('paint', (e, dirty, image) => {
    const ss = image.toPNG();
    console.log(app.getPath('desktop') + '/screenshot/' + i + '.png');
    writeFile(app.getPath('desktop') + '/screenshot/' + i + '.png', ss, console.log);
    i++;
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log(mainWindow.getTitle());
    mainWindow.close();
    mainWindow = null;
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
