'use strict';

var Quo = function (status) {
  this.status = status;
};

var myQuo = new Quo('confused');
var myQuo2 = new Quo('confused');

myQuo.constructor.prototype.get_status = function() {
  return this.status;
};

console.log(myQuo.get_status()); // confused
console.log(myQuo2.get_status()); // confused