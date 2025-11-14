import { app, BrowserWindow, Menu, MenuItem } from 'electron';

// Keep a global reference of mainwindow so it is not garbage collected.
let mainWindow;

// let mainMenu = new Menu();
// let menuItem1 = new MenuItem({
//   label: 'Menu 1',
//   submenu: [
//     { label: 'Item1' },
//     {
//       label: 'Item2',
//       submenu: [
//         { label: 'submenu1' },
//         { label: 'submenu2', click: () => console.log('click submenu2') },
//         { label: 'submenu3' },
//       ],
//     },
//     { label: 'Item3', click: () => console.log('click item 3') },
//   ],
// });

// mainMenu.append(menuItem1);

const mainMenu = Menu.buildFromTemplate([
  {
    label: 'Menu 1',
    submenu: [
      { label: 'Item1' },
      {
        label: 'Item2',
        submenu: [
          { label: 'submenu1' },
          { label: 'submenu2', click: () => console.log('click submenu2') },
          { label: 'submenu3' },
        ],
      },
      { label: 'Item3', click: () => console.log('click item 3'), accelerator: 'Shift+alt+g' },
    ],
  },
  {
    label: 'Menu 2',
    submenu: [
      { label: 'Item1' },
      {
        label: 'Item2',
        enabled: false,
      },
      { label: 'Item3' },
      { label: 'dev tools', role: 'toggleDevTools' },
      { role: 'togglefullscreen' },
    ],
  },
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

  Menu.setApplicationMenu(mainMenu);

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
