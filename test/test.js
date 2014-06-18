var fs = require('fs');
var varint = require('varint');
var Schema = require('protobuf').Schema;

var schema = new Schema(fs.readFileSync('proto/demo.desc'));

var DemoFileHeader = schema['CDemoFileHeader'];

fs.open('test/replay.dem', 'r', function(err, fd) {
    console.log(err);
    var buf = new Buffer(1000);
    fs.read(fd, buf, 0, 300, 0, function() {
        console.log('buffer slice');
        console.log(buf.slice(0,12));
        console.log('int32 le');
        console.log(buf.readInt32LE(8));
        console.log('int32 be');
        console.log(buf.readInt32BE(8));
        console.log('varint');
        var cmd = varint.decode(buf, 12);
        var bytes = varint.decode.bytesRead;
        var next = 12 + bytes;
        console.log(buf.slice(12,16),cmd, bytes, next);
        console.log('varint next');
        var tick = varint.decode(buf, next);
        bytes = varint.decode.bytesRead;
        next = next + bytes;
        console.log(buf.slice(13,17), tick, bytes, next);
        console.log('varint next');
        var size = varint.decode(buf, next);
        console.log(buf.slice(14,26), size, varint.decode.bytesRead);
        console.log('parse');
        
        var start = next + varint.decode.bytesRead;
        var end = start + size;
        console.log(start, end);
        console.log(buf.slice(start, end));
        console.log(DemoFileHeader.parse(buf.slice(start, end)));
    });
});
