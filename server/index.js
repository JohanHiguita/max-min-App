var express = require("express")
var app = express()
var http = require("http").Server(app)
var io = require("socket.io")(http)
const fns = require("./functions")

app.use(express.static("public"))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
})

io.on("connection", function(socket) {
  socket.on("num request", function(num) {
    const num_filtered = num.trim() //borrar espacios blancos
    const validation_message = fns.validates(num_filtered)
    if (validation_message == "OK") {
      highest_res = fns.getLargestNum(num_filtered)
      lowest_res = fns.getLowestNum(num_filtered)
    }

    //Respuesta al cliente
    socket.emit("response num", 
    {
      msg: validation_message,
      initial: num,
      mayor: highest_res.num,
      menor: lowest_res.num,
      mayor_indexes: highest_res.indexes,
      menor_indexes: lowest_res.indexes
    })
  })
})

http.listen(3000, function() {
  console.log("listening on *:3000")
})
