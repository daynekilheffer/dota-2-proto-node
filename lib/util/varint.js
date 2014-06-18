var varint = require('varint');


module.exports = {
    decode: function(buffer) {
        var value = varint.decode(buffer);
        return {
            value: value,
            bytes: varint.decode.bytesRead
        };
    }
};