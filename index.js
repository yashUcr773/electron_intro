import { app, BrowserWindow, session } from 'electron';

// Keep a global reference of mainwindow so it is not garbage collected.
let mainWindow, secWindow, tertWindow;

// Create window on app ready
function createWindow() {
  // Create custom sessions
  // in memory
  const customSes = session.fromPartition('part1');
  // persisted
  const customPersistantSes = session.fromPartition('persist:part2');

  // create and set reference
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
  });

  secWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      session: customSes,
    },
  });

  tertWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      session: customPersistantSes,
      // partition: 'persist:name'
    },
  });

  mainWindow.loadFile('index.html');
  secWindow.loadFile('index.html');
  tertWindow.loadFile('index.html');

  // get default session
  const ses = mainWindow.webContents.session;
  console.log(ses);
  const ses2 = secWindow.webContents.session;
  console.log(ses2);
  const defaultSes = session.defaultSession;
  console.log(Object.is(ses, ses2));
  console.log(Object.is(ses, defaultSes));
  console.log(Object.is(ses, customSes));

  // unset the reference on close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // unset the reference on close
  secWindow.on('closed', () => {
    secWindow = null;
  });

  // unset the reference on close
  tertWindow.on('closed', () => {
    tertWindow = null;
  });
}

// Listen the app ready event
app.on('ready', () => {
  console.log('App is ready');
  createWindow();
});
