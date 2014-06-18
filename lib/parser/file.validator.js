var fs = require('fs');

module.exports = {
    validateReplayHeader: function(fd) {
        var headerBuffer = new Buffer(7);
        fs.readSync(fd, headerBuffer, 0, 7, 0);
        if( headerBuffer.toString() !== 'PBUFDEM' ) {
            throw new Error(headerBuffer);
        }
    }
};
        
            
