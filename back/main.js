const { app, BrowserWindow, ipcMain } = require('electron')
const http = require('http');
const path = require('path')
const url = require('url')

let port = 3000;
let host = '127.0.0.1';
let registeredSenders = []
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({ width: 600, height: 600 })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..\\front\\index.html'),
        protocol: 'file',
        slashes: true
    }))
}

server = http.createServer(function (req, res) {
    if (req.method == 'POST') {
        console.log("Handling POST request...");
        res.writeHead(200, { 'Content-Type': 'text/html' });

        var body = '';
        req.on('data', function (data) {
            body += data;
            registeredSenders.forEach(sender => {
                sender.send('ipc-channel', data)
                console.log('sending to ipc-channel')
            });
        });
        req.on('end', function () {
            console.log("POST payload: " + body);
            res.end('');
        });
    }
    else {
        console.log("Not expecting other request types...");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
        res.end(html);
    }
});

server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);

ipcMain.on('ipc-register', (event, args) => {
    registeredSenders.push(event.sender)
    event.returnValue = 'sender registered'
    console.log('sender registered')
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    server.close()
    app.quit()
})
