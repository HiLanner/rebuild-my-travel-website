var config = require('config-lite');
var mongolass = require('mongolass');
var mongolass = new mongolass();
mongolass.connect(config.mongodb);