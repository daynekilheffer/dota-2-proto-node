var dotaReplay = require('../');

var Replay = dotaReplay.ReplayParser;

var replay = new Replay('test/replay.dem');

replay.on('test', function() {
    console.log('on test');
});

replay.parse();
