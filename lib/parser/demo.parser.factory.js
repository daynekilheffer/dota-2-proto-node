var fs = require('fs');

var Schema = require('protobuf').Schema;
var demoSchema = new Schema(fs.readFileSync('proto/demo.desc'));
var netSchema = new Schema(fs.readFileSync('proto/netmessages.desc'));

console.log(demoSchema['EDemoCommands']);

module.exports = {
    parse: function(details) {
        var parserType = undefined;
        if( details.command === 0 ) {
            details.type = 'stop';
        }
        if( details.command === 1 ) {
            details.type = 'file header';
            parserType = demoSchema['CDemoFileHeader'];
        }
        if( details.command === 6 ) {
            parserType = demoSchema['CDemoSendTables'];
        }
        if( details.command === 8 ) {
            parserType = netSchema['CNETMsg_SignonState'];
        }

        if( parserType === undefined ) {
            console.warn('not yet implemented');
            return undefined;
        }
        return parserType.parse(details.raw);
    }
}
