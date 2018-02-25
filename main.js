const electron = require('electron')
const app = electron.app

const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({ width: 600, height: 600 })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
})