var DemoParser = require('../../lib/demo-file');
describe('DemoParser', function () {
    it('should act as a constructor given a filename', function () {
        var parser = new DemoParser('test.file.name');
        expect(parser._filename).toEqual('test.file.name');
    });
    it('should fail if no file name is supplied', function () {
        expect(function () {
            new DemoParser();
        }).toThrow('missing argument [filename]');
    });
    it('should expose a parse() method', function () {
        var parser = new DemoParser('');
        expect(typeof parser.parse).toBe('function');
    });
});

