var Registry = require('winreg');

function csgoFolderFinder() {
    csgoRegistryPathGetter().then(result => {
        console.log(result)
    })
}

function csgoRegistryPathGetter() {
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

export { csgoFolderFinder as getFolderPath }
