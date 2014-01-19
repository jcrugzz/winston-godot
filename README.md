# winston-godot

A [`winston`][winston] plugin that makes it easy to use [`godot`][godot].

## example

```js
var godotTransport = require('winston-godot');
var winston = require('winston');
var godot = require('godot');

var client = godot.createClient({
  type: 'tcp',
  host: 'whatever.com'
});

client.connect(port);

winston.add(godotTransport, { godot: client, service: 'whatever/logs'})


```

[winston]: https://github.com/flatiron/winston
[godot]: https://github.com/nodejitu/godot
