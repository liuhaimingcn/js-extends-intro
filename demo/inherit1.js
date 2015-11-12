'use strict';

var Mammal = function (name) {
  this.name = name;
};

Mammal.prototype.get_name = function() {
  return this.name;
};

Mammal.prototype.says = function () {
  return this.saying || '';
};

var myMammal = new Mammal('Herb the Mammal');
console.log('myMammal name:' + myMammal.get_name()); // myMammal name:Herb the Mammal

var Cat = function (name) {
  this.name = name;
  this.saying = 'meow';
};

Cat.prototype = new Mammal();
Cat.prototype.purr = function(n) {
  var s = '';
  for(var i = 0; i < n; i++) {
    if(s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};
Cat.prototype.get_name = function() {
  return this.says() + ' ' + this.name;
};

var myCat = new Cat('Henrietta');
console.log('says:' + myCat.says());
console.log('purr:' + myCat.purr(5));
console.log('myCat name:' + myCat.get_name());