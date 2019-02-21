$(function() {
  var socket = io(); //.connect...? (//ver video)
  $("#form-masa").submit(function(e) {
    e.preventDefault() // prevents page reloading
    socket.emit("num request", $(".input-masa").val()) 

    return false
  });
  

  socket.on('response num', function(data) {
    console.log(data)
    $('.error-response').show()
    $('#initial-num').text(data.initial)
    $('#highest-num').text(data.mayor)
    $('#lowest-num').text(data.menor)          
  })


  //Generate random num (HEX)
  $( "#form-digitos" ).submit(function( e ) {
    e.preventDefault()
    let long = $('.input-digitos').val()
    long = Number(long) 
    let num_hex = []
    for (let i = 0; i < long; i++) {
      if (i == 0) {
        var random_dig = Math.floor((Math.random() * 15) + 1); //random DEC [1-15]
      } else {
        random_dig = Math.floor((Math.random() * 15) + 0); //random DEC [0-15]
      }
      
      random_dig = random_dig.toString(16) // DEC to HEX
      num_hex.push(random_dig)
    }
    const generated = num_hex.join('').toUpperCase()
    $('.input-masa').val(generated)
  });

});