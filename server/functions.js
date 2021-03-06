exports.validates = function(value) {
  /* Validaciones:
	1. digitos menores o iguales a 0
	2. dígitos correspondeintes a hexadecimales
	3 primer dígito diferente de 0
	*/
  const regExp = /^[0-9A-Fa-f]+$/ // Expresión regular para Hexadecimales

  //validates first value is not 0
  if (value.charAt(0) == "0") {
    return "El primer dígito no puede ser 0"
  }
  //validates value is a hexadecimal
  else if (!regExp.test(value)) {
    return "El valor no corresponde a un número hexadecimal"
  }

  //validates value is less than or equal to 30
  else if (value.length > 30) {
    return `El valor supera los 30 dígitos (${value.length})`
  }

  return "OK"
}

exports.getLargestNum = function(num) {
  const num_hex = num.split("") // convertir Array
  let largest_num = largest(num_hex) //array (esta operación está alterando el valor de num_hex)
  changed_indexes = getChangedIndexes(num.split(''), largest_num)
  largest_num = largest_num.join('').toUpperCase()
  return {num: largest_num, indexes: changed_indexes}
}

exports.getLowestNum = function(num) {
  const num_hex = num.split("") // convertir Array
  let lowest_num = lowest(num_hex, true) //array  
  changed_indexes = getChangedIndexes(num.split(''), lowest_num)
  lowest_num = lowest_num.join('').toUpperCase()
  return {num: lowest_num, indexes: changed_indexes}
}

function lowest(arr_hex, first_digit) {
  const num_dec = arr_hex.map(function(num) {
    return parseInt(num, 16)
  })
  let min_dec = 0
  if (first_digit) {
    min_dec = min(num_dec) //excluye el cero
  } else {
    min_dec = Math.min(...num_dec) //incluye el cero
  }

  const min_hex = min_dec.toString(16) // max value (HEX)
  const indexes = getIndexes(arr_hex, min_hex)

  const changed_array = changeDigits(arr_hex, indexes, false)
  return changed_array
}

function largest(arr_hex) {
  // array con elementos en el orden del número mayor
  const num_dec = arr_hex.map(function(num) {
    return parseInt(num, 16)
  })
  const max_dec = Math.max(...num_dec) // max value (DEC)
  const max_hex = max_dec.toString(16) // max value (HEX)
  const indexes = getIndexes(arr_hex, max_hex)
  const changed_array = changeDigits(arr_hex, indexes, true)
  return changed_array
}

function getIndexes(arr, val) {
  // indices de los números mayores en el array
  var indexes = [],
    i
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === val.toLowerCase() || arr[i] === val.toUpperCase()) {
      indexes.push(i)
    }
  }
  return indexes
}

function changeDigits(arr, indexes, is_largest) {
  if (indexes.includes(0)) {
    //Sí hay un número mayor en la primera posición
    const first_element = [arr[0]]
    arr.shift() //separar el primer elemento y obtener el número mayor de la parte restante
    if (is_largest) {
      return first_element.concat(largest(arr)) // función recursiva
    } else {
      return first_element.concat(lowest(arr, false)) // función recursiva
    }
  } else {
    //cambiar posción del primer elemento con el mayor que ocupe la cifra menos significativa (mas a la derecha)
    const first_val = arr[0]
    arr[0] = arr[indexes[indexes.length - 1]]
    arr[indexes[indexes.length - 1]] = first_val
    return arr
  }
}

function min(arr) {
  //devuelve el elemento menor de un array (sin tener en cuenta el 0)
  let menor = 15 // el número mas grande de un dígito en hexa
  arr.forEach(function(val) {
    if (val < menor && val !== 0) {
      menor = val
    }
  })
  return menor
}

function getChangedIndexes(arr1, arr2) {
  /*devuelve los indices de los elementos que cambiaron de posición
    las dos posiciones donde los elementos son diferentes
    arr1[] arr2[] ---> array[]
  */
  var indexes = []
  arr1.forEach(function(dig, index) {

    if (arr1[index].toUpperCase() !== arr2[index].toUpperCase()) {   
      indexes.push(index)
    } 
  })
  return indexes
}
