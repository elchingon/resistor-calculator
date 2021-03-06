function Band(resistor, position) {
  var resisitor = resistor;
  var position = position;
  var color = 'black';

  this.colorValues = {
    'black'  : 0
  , 'brown'  : 1
  , 'red'    : 2
  , 'orange' : 3
  , 'yellow' : 4
  , 'green'  : 5
  , 'blue'   : 6
  , 'violet' : 7
  , 'grey'   : 8
  , 'white'  : 9
  }

  this.resistor = function() {
    return resistor;
  };

  this.position = function() {
    return position;
  };

  this.value = function() {
    return this.colorValues[color];
  };

  this.setColor = function(newColor) {
    color = newColor;
    return color;
  };

  this.color = function() {
    return color;
  };

  return this;
};
