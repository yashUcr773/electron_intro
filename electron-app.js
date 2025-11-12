import { app, BrowserWindow } from 'electron';
import path, { dirname } from 'node:path';
import { fileURLToPath, format } from 'node:url';
import { hash } from 'bcrypt'

debugger
const pass = await hash('pass', 10)
console.log(pass)

const __dirname = dirname(fileURLToPath(import.meta.url));

app.on('ready', () => {
    const mainWindow = new BrowserWindow({})
    mainWindow.loadURL(format({
        pathname: path.resolve(__dirname, './frontend/index.html'),
    }))
    mainWindow.webContents.openDevTools()
})