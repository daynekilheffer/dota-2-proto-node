
function DemoParser(filename) {
    if ( arguments.length === 0 ) {
        throw 'missing argument [filename]';
    }
    this._filename = filename;

}

DemoParser.prototype.parse = function () {
    this._fd = fs.openSync(this._filename, 'r');
};

module.exports = DemoParser;

