# dota 2 replay parser

Do not fork - this is only a test project.
Still attempting to simply parse the replay.

## TODO:
1. Everything is done via sync calls right now.  This defeats a lot of the API options available for this project as node excels in the async world.  Most of the calls could simply be moved to their async version.  For the time being, I'll stick with sync until I have the parsing foundation down
1. Unit tests
1. The number of filesystem reads may be too high for some use cases.  Some testing will need to be done.
  * consider writing the reader as a modular system.  If you are okay with file io, use reader1, if you have enough memory, use reader2
  * parser should only parse if there is a listener for that command type or if the parser needs to know information inside the message.

## thoughts

Possible API:
```javascript
    var parser = require('parser'),
        DemoParser = parser.DemoParser
        DotaParser = parser.DotaParser

    var demoParser = new DemoParser(),
        dotaParser = new DotaParser();

    var players = [];

    demoParser.use(dotaParser);

    demoParser.on('dota:player:added', function (details) {
        players.add(details);
    });

    demoParser.parse();
```
