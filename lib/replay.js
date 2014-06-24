var Parser = require('./parser');

function DemoParser(filename) {
    this.filename = filename;
    this.listeners = {};
}

DemoParser.prototype.parse = function () {
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

DemoParser.prototype.on = function (eventName, callback) {
    if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
};

module.exports = DemoParser;
