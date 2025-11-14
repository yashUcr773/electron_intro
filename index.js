import { app, BrowserWindow, session } from 'electron';

// Keep a global reference of mainwindow so it is not garbage collected.
let mainWindow;

// Create window on app ready
async function createWindow() {
  // get cookies
  // const cookies = await session.defaultSession.cookies.get({});
  // console.log('🚀 ~ createWindow ~ cookies:', cookies);

  // filter cookies
  // const cookies = await session.defaultSession.cookies.get({ name: 'cookie1' });
  // console.log('🚀 ~ createWindow ~ cookies:', cookies);

  // set cookies
  await session.defaultSession.cookies.set({
    url: 'https://mydomain.com',
    name: 'cookie1',
    value: 'myval',
    expirationDate: new Date().getTime() + 10000,
  });

  // remove cookies
  // await session.defaultSession.cookies.remove('https://mydomain.com', 'cookie1');

  // create and set reference
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      partition: 'abc',
    },
  });

  // mainWindow.loadFile('index.html');
  mainWindow.loadURL('https://yashaggarwal.com');

  // Open dev tools for debugging.
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('did-finish-load', async () => {
    const cookies = await session.defaultSession.cookies.get({});
    console.log('🚀 ~ createWindow ~ cookies:', cookies);
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
