//"use strict";

function add(a, b) {
  console.log('result:' + (this === global)); // result:true
  return a + b;
}

console.log('value:' + add(1, 2)); //value:3