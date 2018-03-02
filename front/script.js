const { ipcRenderer } = require('electron')

let body = document.getElementById('main-body')

ipcRenderer.sendSync('ipc-register')

ipcRenderer.on('ipc-channel', (event, args) => {
    body.innerHTML = args
})
