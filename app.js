var server = require("./server");
var config = require("./config");

console.log(config.get("port"));

server(config);

console.log("app is running!");

