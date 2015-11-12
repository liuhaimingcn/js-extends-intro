'use strict';

Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};

Function.method('inherites', function (Parent) {
  this.prototype = new Parent();
  return this;
});


var Mammal = function (name) {
  this.name = name;
};
Mammal.method('get_name', function () {
  return this.name;
});
Mammal.method('says', function () {
  return this.saying || '';
});

var myMammal = new Mammal('Herb the Mammal');
console.log('myMammal name:' + myMammal.get_name());


var Cat = function (name) {
  this.name = name;
  this.saying = 'meow';
};
Cat.inherites(Mammal);
Cat.method('purr', function (n) {
  var s = '';
  for (var i = 0; i < n; i++) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
});
Cat.method('get_name', function () {
  return this.says() + ' ' + this.name;
});

var myCat = new Cat('Henrietta');
console.log('says:' + myCat.says());
console.log('purr:' + myCat.purr(5));
console.log('myCat name:' + myCat.get_name());