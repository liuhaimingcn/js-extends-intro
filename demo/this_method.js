'use strict';

var myObject = {
  value: 0,
  increment: function (inc) {
    this.value += inc;
  }
};

myObject.increment(3);
console.log('value:' + myObject.value); // value:3