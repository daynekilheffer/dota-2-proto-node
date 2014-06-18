var Parser = require('./parser');

function ReplayParser(filename) {
    this.filename = filename;
    this.listeners = {};
}

ReplayParser.prototype.parse = function () {
    // create internal parser
    var parser = new Parser(this.filename);
    // assign listeners to internal parser
    for( var eventName in this.listeners ) {
        for( var index in this.listeners[eventName] ) {
        	parser.on(eventName, this.listeners[eventName][index]);
        }
    }
    parser.start();
    return parser;
};

ReplayParser.prototype.on = function (eventName, callback) {
    if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
};

module.exports = ReplayParser;
