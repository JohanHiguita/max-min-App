var express = require("express")
var app = express()
var http = require("http").Server(app)
var io = require("socket.io")(http)
const fns = require('./functions');

app.use(express.static('public'))

app.get("/", function(req, res) {
	console.log(__dirname);
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function(socket) {
	console.log("a user connected");
	socket.on('num request', function(num){
    const highest = fns.getLargestNum(num)
    const lowest = fns.getSmallestNum(num)

    socket.emit('response num', {
      messagge: 'OK',
      initial: num,
      mayor: highest,
      menor: lowest,
      indexes: []
    
    })
  });
})

http.listen(3000, function() {
  console.log("listening on *:3000");
})
