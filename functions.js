//var hex = require("is-hexadecimal");
//console.log(validates('36890aaff'))

exports.validates = function(value) {

    const regExp = /^[0-9A-Fa-f]+$/;

    //validates value is less than or equal to 30
    if (value.charAt(0) == '0') {
      return("El primer dígito no puede ser 0")
    }
    //validates value is a hexadecimal
    else if (!regExp.test(value)) {
      return("El valor no corresponde a un número hexadecimal")
    }

    //validates value is less than or equal to 30
    else if (value.length > 30) {
      return(`El valor supera los 30 dígitos (${value.length})`)
    }

    return 'OK'

};

exports.getLargerNum = function(num) {
  //console.log(hex("zz"));
};
