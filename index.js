import { app, BrowserWindow, webContents, BrowserView } from 'electron';

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

  // console.log(webContents.getAllWebContents());

  // new window handler
  mainWindow.webContents.setWindowOpenHandler(details => {
    // details: {
    //   url: 'https://placecats.com/300/200',
    //   frameName: '',
    //   features: '',
    //   disposition: 'foreground-tab',
    //   referrer: { url: '', policy: 'strict-origin-when-cross-origin' },
    //   postBody: undefined
    // }
    console.log('🚀 ~ createWindow ~ details:', details);
    console.log('new window');
    return {
      action: 'allow',
      createWindow: options => {
        const browserView = new BrowserView(options);
        mainWindow.addBrowserView(browserView);
        browserView.setBounds({ x: 0, y: 0, width: 640, height: 480 });
        return browserView.webContents;
      },
    };
  });

  // handle right click
  mainWindow.webContents.on('context-menu', (e, params) => {
    console.log(e, params);
    // execute js in browser
    mainWindow.webContents.executeJavaScript(`alert("${params.selectionText}")`);
  });

  // check if media is playing
  mainWindow.webContents.on('media-started-playing', () => {
    console.log('Media Playing');
  });

  // check if media is paused
  mainWindow.webContents.on('media-paused', () => {
    console.log('Media Paused');
  });

  // All content loaded
  mainWindow.webContents.on('before-input-event', () => {
    // console.log(e, input);
  });

  // All content loaded
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('content loaded');
  });

  // All HTML ready
  mainWindow.webContents.on('dom-ready', () => {
    console.log('dom ready');
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
