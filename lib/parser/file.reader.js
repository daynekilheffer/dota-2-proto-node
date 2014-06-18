var fs = require('fs');
var snappy = require('snappy');

var varint = require('../util/varint');

var COMPRESSION_FLAG = 0x70;

function FileReader (fd) {
    this.fd = fd;
    this._hasNext = true;
    this.position = 12;

    this.filestats = fs.fstatSync(this.fd);
}

FileReader.prototype.hasNext = function () {
    return this._hasNext;    
};

function readVarint() {

    var buffer = new Buffer(12);
    fs.readSync(this.fd, buffer, 0, 12, this.position);
    var result = varint.decode(buffer);
    this.position = this.position + result.bytes;

    return result;
}

FileReader.prototype.next = function () {
    var isCompressed = false;

    var cmd = readVarint.call(this);
    if( cmd.value & COMPRESSION_FLAG) {
        cmd.value = cmd.value & ~COMPRESSION_FLAG;
        isCompressed = true;
    }
    var tick = readVarint.call(this);
    var size = readVarint.call(this);

    var result = {
        command: cmd.value,
        tick: tick.value,
        size: size.value,
        errors: []
    };

    if( size.value > 0 ) {
        var rawMessage = new Buffer(size.value);
        fs.readSync(this.fd, rawMessage, 0, size.value, this.position);
        if( isCompressed ) {
            if( snappy.isValidCompressedSync(rawMessage)) {
                rawMessage = snappy.decompressSync(rawMessage, snappy.parsers.raw);
            } else {
                result.errors.push('invalid compression');
            }
        }
        this.position = this.position + size.value;

        result.raw = rawMessage
    }

    return result;
};

module.exports = FileReader;
