'use strict';

var Quo = function (status) {
  this.status = status;
};
console.log(Quo.prototype.constructor === Quo); // true