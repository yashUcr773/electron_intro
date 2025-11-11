import { app, BrowserWindow, ipcMain } from 'electron';
import path, { dirname } from 'node:path';
import { fileURLToPath, format } from 'node:url';
import ffmpeg from 'fluent-ffmpeg';

const __dirname = dirname(fileURLToPath(import.meta.url));

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    mainWindow.loadURL(format({
        pathname: path.resolve(__dirname, './frontend/index.html'),
    }))
    mainWindow.webContents.openDevTools()
})

ipcMain.on('video:submit', (event, data) => {
    console.log("🚀 ~ event:", event)
    console.log("🚀 ~ data:", data)
    // ffmpeg.ffprobe(data, (err, metadata) => {
    // console.log("🚀 ~ metadata:", metadata)
    // console.log("🚀 ~ err:", err)
    const length = Math.random() * 100
    mainWindow.webContents.send('video:length', { length })
    // })
})