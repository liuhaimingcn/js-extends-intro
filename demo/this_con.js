'use strict';

var Quo = function (status) {
  this.status = status;
};

Quo.prototype.get_status = function () {
  return this.status;
};

var myQuo = new Quo('confused');
console.log('status:' + myQuo.get_status()); // status:confused