'use strict';

var Quo = function (status) {
  this.status = status;
};

var myQuo = new Quo('confused');
console.log(myQuo.constructor === Quo); // true
console.log(Quo.constructor === Function); // true
