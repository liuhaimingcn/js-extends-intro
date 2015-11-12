'use strict';

var myMammal = {
  name: 'Herb the Mammal',
  get_name: function () {
    return this.name;
  },
  says: function () {
    return this.saying || '';
  }
};

console.log('myMammal name:' + myMammal.get_name()); // myMammal name:Herb the Mammal

var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
  var s = '';
  for (var i = 0; i < n; i++) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};
myCat.get_name = function () {
  return this.says() + ' ' + this.name;
};

console.log('says:' + myCat.says()); // says:meow
console.log('purr:' + myCat.purr(5)); // purr:r-r-r-r-r
console.log('myCat name:' + myCat.get_name()); // myCat name:meow Henrietta