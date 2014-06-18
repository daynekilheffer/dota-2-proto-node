var events = require('events');
var fs = require('fs');
var util = require('util');

var fileValidator = require('./file.validator');
var FileReader = require('./file.reader');
var parserFactory = require('./demo.parser.factory');

function Parser (filename) {
    events.EventEmitter.call(this);
    this.filename = filename;
    this.stats = {};
}

util.inherits(Parser, events.EventEmitter);

function collectStats(result) {
    this.stats[result.command] = (this.stats[result.command] || 0) + 1;
}

Parser.prototype.start = function () {
	this.emit('parsing started');
    this.fd = fs.openSync(this.filename, 'r');
    this.emit('file opened');
    fileValidator.validateReplayHeader(this.fd);
    this.emit('header validated');
    
    this.fileReader = new FileReader(this.fd);
    while(this.fileReader.hasNext() && this.state !== 'stopped') {
        var result = this.fileReader.next();
        if( result.errors.length === 0 ) {
            result.message = parserFactory.parse(result) || {};
        } else {
            console.warn(result.errors);
        }
        if( result.type === 'stop' ) {
            this.stop();
        }
        collectStats.call(this, result);

    }
    console.log('stats: ', this.stats);
};

Parser.prototype.stop = function () {
    this.state = 'stopped';
    fs.closeSync(this.fd);
    this.emit('file closed');
    this.emit('parsing stopped');
};

module.exports = Parser;
