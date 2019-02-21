$(function() {
  var socket = io(); //.connect...? (//ver video)
  $("form").submit(function(e) {
    e.preventDefault() // prevents page reloading
    socket.emit("num request", $("#m").val())
    $("#m").val("")
    return false
  });

  socket.on('response num', function(data) {
    console.log(data)          
  })
});