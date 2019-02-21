$(function() {
  var socket = io(); //.connect...? (//ver video)
  /* $("form").submit(function(e) {
    e.preventDefault() // prevents page reloading
    socket.emit("num request", $("#m").val())
    $("#m").val("")
    return false
  }); */

  socket.on('response num', function(data) {
    console.log(data)          
  })


  //Generate random num (HEX)
  $( "#form-digitos" ).submit(function( e ) {
    e.preventDefault()
    let long = $('.input-digitos').val()
    long = Number(long)
    let num_hex = []
    for (let i = 0; i < long; i++) {
      let random_dig = Math.floor((Math.random() * 15) + 1);
      
      random_dig = random_dig.toString(16)
      num_hex.push(random_dig)
    }
    const generated = num_hex.join('').toUpperCase()
    $('.input-masa').val(generated)
  });

});