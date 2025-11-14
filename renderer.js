const { ipcRenderer } = require('electron');

document.querySelector('#btn1').addEventListener('click', async () => {
  let res = await ipcRenderer.invoke('channel:1', 'a', 'b');
  console.log(res);
});
