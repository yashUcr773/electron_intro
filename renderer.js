const { ipcRenderer } = require('electron');

document.querySelector('#btn1').addEventListener('click', () => {
  let res = ipcRenderer.sendSync('channel:sync', 'a', 'b');
  console.log(res);
});
