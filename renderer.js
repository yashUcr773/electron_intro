const { ipcRenderer } = require('electron');

document.querySelector('#btn1').addEventListener('click', () => {
  ipcRenderer.send('channel:1', 'a', 'b');
});

ipcRenderer.on('channel:2', (e, ...args) => {
  console.log(e);
  console.log(args);
});
