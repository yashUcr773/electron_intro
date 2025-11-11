import { app, BrowserWindow } from 'electron';
import path, { dirname } from 'node:path';
import { fileURLToPath, format } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.on('ready', () => {
    const mainWindow = new BrowserWindow({})
    mainWindow.loadURL(format({
        pathname: path.resolve(__dirname, './frontend/index.html'),
    }))
    mainWindow.webContents.openDevTools()
})