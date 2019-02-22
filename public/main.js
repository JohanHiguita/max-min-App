$(function() {
  var socket = io()

  //enviar número al servidor
  $("#form-masa").submit(function(e) {
    e.preventDefault() // prevents page reloading
    socket.emit("num request", $(".input-masa").val())

    return false
  })

  //recibir datos del servidor
  socket.on("response num", function(data) {
    if (data.msg == "OK") {
      renderSuccess(data)
    } else {
      renderError(data)
    }
  })

  //Generate random num (HEX)
  $("#form-digitos").submit(function(e) {
    e.preventDefault()
    let long = $(".input-digitos").val()
    long = Number(long)
    let num_hex = []
    for (let i = 0; i < long; i++) {
      if (i == 0) {
        var random_dig = Math.floor(Math.random() * 15 + 1) //random DEC [1-15]
      } else {
        random_dig = Math.floor(Math.random() * 15 + 0) //random DEC [0-15]
      }
      random_dig = random_dig.toString(16) // DEC to HEX
      num_hex.push(random_dig)
    }
    const generated = num_hex.join("").toUpperCase()
    $(".input-masa").val(generated)
  });

  /****************** FUNCIONES ***********************/
  function renderSuccess(data) {
    $(".success-response").show()
    $(".error-response").hide()
    $("#initial-num").text(data.initial.toUpperCase())
    $("#highest-num").text("")
    $("#lowest-num").text("")

    //Renderizar el mayor
    for (var i = 0; i < data.mayor.length; i++) {
      if (data.mayor_indexes.includes(i)) {
        $("#highest-num").append(
          `<span class="digit-color">${data.mayor.charAt(i)}</span>`
        )
      } else {
        $("#highest-num").append(`<span>${data.mayor.charAt(i)}</span>`)
      }
    }

    //Renderizar menor
    for (var i = 0; i < data.menor.length; i++) {
      if (data.menor_indexes.includes(i)) {
        $("#lowest-num").append(
          `<span class="digit-color">${data.menor.charAt(i)}</span>`
        )
      } else {
        $("#lowest-num").append(`<span>${data.menor.charAt(i)}</span>`)
      }
    }
  }

  function renderError(data) {
    $(".error-response").show()
    $(".success-response").hide()
    $(".error-message").text(data.msg)
  }
})
