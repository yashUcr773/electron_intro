import { app, BrowserWindow, session } from 'electron';

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

  session.defaultSession.on('will-download', (e, downloadItem, webContents) => {
    // console.log('🚀 ~ createWindow ~ webContents:', webContents);
    // console.log('🚀 ~ createWindow ~ downloadItem:', downloadItem);
    // console.log('🚀 ~ createWindow ~ e:', e);

    console.log(
      `Downloading ${downloadItem.getFilename()} with size ${downloadItem.getTotalBytes()} bytes`
    );

    downloadItem.setSavePath(app.getPath('desktop') + '/' + downloadItem.getFilename());

    downloadItem.on('updated', (e, state) => {
      let recieved = downloadItem.getReceivedBytes();

      if (state === 'progressing' && recieved) {
        let progress = (recieved / downloadItem.getTotalBytes()) * 100;
        console.log('🚀 ~ createWindow ~ progress:', progress);
        webContents.executeJavaScript(`window.progressBar.value = ${progress}`);
      }
    });
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
