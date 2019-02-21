var express = require("express")
var app = express()
var http = require("http").Server(app)
var io = require("socket.io")(http)

app.use(express.static('public'))

app.get("/", function(req, res) {
	console.log(__dirname);
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function(socket) {
	console.log("a user connected");
	socket.on('num request', function(num){
  
    console.log('message: ' + num);
    socket.emit('response num', {
      id: 1,
      name: "Johan Higuita",
      text: num
    })
  });

  



})

http.listen(3000, function() {
  console.log("listening on *:3000");
})
