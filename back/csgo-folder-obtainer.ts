const Registry = require('winreg');
const path = require('path')
const fs = require('fs')
const vdf = require('simple-vdf')

const configFileName: string = 'gamestate_integration_hudJoin.cfg'

function csgoFolderFinder() {
    let promise = new Promise((resolve, reject) => {
        steamRegistryPathGetter().then(result => {
            let libraryFolders: string[] = [result.toString()]
            var libraryVdfFilePath = path.join(result, 'steamapps', 'libraryfolders.vdf')
            const contents = fs.readFileSync(libraryVdfFilePath).toString()
            let contentInJson: {} = vdf.parse(contents)
            for (let i = 1; ; i++) {
                let element: string = contentInJson['LibraryFolders'][i]
                if (element === undefined)
                    break
                else {
                    element = element.replace('\\\\', '\\')
                    libraryFolders.push(element)
                }
            }
            libraryFolders.forEach(element => {
                let folderPath = path.join(element, 'steamapps', 'common', 'Counter-Strike Global Offensive')
                if (fs.existsSync(folderPath)) {
                    fs.createReadStream(path.join('back', configFileName)).pipe(fs.createWriteStream(path.join(folderPath, 'csgo', 'cfg', configFileName)))
                    resolve(folderPath)
                }
            });
        }, (rejectReason) => {
            //create new window and ask for directory path
            //resolve with directory path
        })
    })
    return promise
}

function steamRegistryPathGetter() {
    let promise = new Promise(function (resolve, reject) {
        let regKey = new Registry({
            hive: Registry.HKCU,
            key: '\\Software\\Valve\\Steam'
        });
        regKey.get('SteamPath', function (err, result) {
            if (err) {
                reject('ERROR: ' + err.name + err.message + err.stack);
            }
            else {
                resolve(result.value);
            }
        });
    })
    return promise
}

export { csgoFolderFinder as placeConfigFile }
