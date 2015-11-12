'use strict';

var Quo = function (status) {
  this.status = status;
};

Quo.prototype.get_status = function () {
  return this.status;
};

var myQuo = new Quo('confused');
console.log(Object.getPrototypeOf(myQuo) === Quo.prototype); // true
console.log(myQuo.__proto__ === Quo.prototype); // true
console.log(myQuo.constructor.prototype === Quo.prototype); // true