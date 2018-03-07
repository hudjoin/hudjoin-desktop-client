var Registry = require('winreg');
function csgoFolderFinder(callback) {
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
    return 'yolo';
}
module.exports = {
    getFolderPath: csgoFolderFinder
};
