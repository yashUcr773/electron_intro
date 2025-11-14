// renderer.js
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const video = document.querySelector('video');

startButton.addEventListener('click', () => {
  navigator.mediaDevices
    .getDisplayMedia({
      audio: true,
      video: {
        width: 600,
        height: 800,
        frameRate: 60,
      },
    })
    .then(stream => {
      video.srcObject = stream;
      video.onloadedmetadata = e => video.play();
    })
    .catch(e => console.log(e));
});

stopButton.addEventListener('click', () => {
  video.pause();
});

const { desktopCapturer } = require('electron');
console.log(desktopCapturer.getSources({ types: ['screen'] }));
