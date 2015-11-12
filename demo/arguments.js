"use strict";

function add() {
  //console.log(arguments);
  var sum = 0;
  for(var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

var value = add(1,2,3,4,5); // value值为15
console.log('value:' + value);