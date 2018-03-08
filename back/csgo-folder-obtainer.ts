var Registry = require('winreg');
function csgoFolderFinder(callback: Function): void {
    var steamPath;
    var regKey = new Registry({
        hive: Registry.HKCU,
        key: '\\Software\\Valve\\Steam'
    });
    regKey.get('SteamPath', function (err, result) {
        if (err) {
            console.log('ERROR: ' + err.name + err.message + err.stack);
        }
        else {
            callback(result.value);
        }
    });
}

export { csgoFolderFinder as getFolderPath }
