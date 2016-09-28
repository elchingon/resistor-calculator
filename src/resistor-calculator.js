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
function ColorSelector(band, startX, startY) {
  var svg = band.svg;
  var paper = svg.paper;

  var resistor = band.resistor();
  console.log(resistor);

  var height = 30;
  var width = 100;

  function Button(color) {
    var color = color;

    function changeColor() {
      band.setColor(color);
      svg.attr({ 'fill' : band.color() });
      updateResistorValue();
      updateResistorTolerance();
    };

    function updateResistorValue() {
      resistor.output.attr({
        'text' : resistor.value()
      });
    };

    function updateResistorTolerance() {
      resistor.toleranceOutput.attr({
        'text' : resistor.tolerance()
      });
    };

    this.draw = function(offset) {
      var y = startY + (offset * height);
      var ele = paper.rect(startX, y, width, height);
      ele.attr({ 'fill' : color });
      ele.click(changeColor);
    };

    return this;
  };

  var offset = 0;
  for(color in band.colorValues) {
    var button = new Button(color);
    button.draw(offset);
    offset += 1;
  };

  return this;
};
function MultiplierBand(resistor) {
  var band = new Band(resistor, 4);

  band.setColor('black');
  band.colorValues = {
    'black'  : 1
  , 'brown'  : 10
  , 'red'    : 100
  , 'orange' : 1000
  , 'yellow' : 10000
  , 'green'  : 100000
  , 'blue'   : 1000000
  , 'gold'   : 0.1
  , 'silver' : 0.01
  };

  return band;
};
/*! Resistor Calculator
 *
 *  Simple application to calculate
 *  the value of a resistor.
 */
function Resistor() {
  var firstBand      = new Band(this, 1);
  var secondBand     = new Band(this, 2);
  var multiplierBand = new MultiplierBand(this)
  var toleranceBand  = new ToleranceBand(this)

  this.firstBand = function() {
    return firstBand;
  };

  this.secondBand = function() {
    return secondBand;
  };

  this.multiplierBand = function() {
    return multiplierBand;
  };

  this.toleranceBand = function() {
    return toleranceBand;
  };

  this.value = function() {
    var x = ""
          + firstBand.value()
          + secondBand.value();

    var actualValue = parseInt(x) * multiplierBand.value();
    if ((actualValue / 1000000) > 1) {
      return actualValue / 1000000 + " M";
    } else if ((actualValue / 1000) > 1) {
      return actualValue / 1000 + " K";
    } else {
      return actualValue;
    }
  };

  this.tolerance = function() {
    return (toleranceBand.value() * 100) + " %"
  };

  return this;
}
function ToleranceBand(resistor) {
  var band = new Band(resistor, 5);

  band.setColor('gold');
  band.colorValues = {
    'brown'  : 0.01
  , 'red'    : 0.02
  , 'gold'   : 0.05
  , 'silver' : 0.1
  };

  return band;
};
(function() {

  var paper = Raphael("paper", 700, 800);
  var resistor = new Resistor();

  resistor.svg = paper.set();
  resistor.svg.push(
    paper.rect(50, 50, 600, 4)
  , paper.rect(250, 22, 200, 58)
  );
  resistor.svg.attr({
    'fill'         : 'white'
  , 'stroke'       : 'black'
  , 'stroke-width' : '2'
  });

  resistor.outputLabel = paper.text(650, 114, "ohms");
  resistor.outputLabel.attr({
    'font-size' : '18px'
  , 'text-anchor' : 'end'
  });

  resistor.output = paper.text(600, 114, resistor.value());
  resistor.output.attr({
    'font-size' : '18px'
  , 'text-anchor' : 'end'
  });

  resistor.toleranceLabel = paper.set();
  resistor.toleranceLabel.push(
    paper.text(595, 138, "+")
  , paper.text(595, 136, "_")
  );
  resistor.toleranceLabel.attr({
    'font-size' : '18px'
  , 'text-anchor' : 'end'
  });

  resistor.toleranceOutput = paper.text(650, 138, resistor.tolerance());
  resistor.toleranceOutput.attr({
    'font-size' : '18px'
  , 'text-anchor' : 'end'
  });

  resistor.firstBand().svg = paper.rect(270, 22, 18, 58);
  resistor.firstBand().svg.attr({
    'fill' : resistor.firstBand().color()
  });

  resistor.secondBand().svg = paper.rect(300, 22, 18, 58);
  resistor.secondBand().svg.attr({
    'fill' : resistor.firstBand().color()
  });

  resistor.multiplierBand().svg = paper.rect(330, 22, 18, 58);
  resistor.multiplierBand().svg.attr({
    'fill' : resistor.multiplierBand().color()
  });

  resistor.toleranceBand().svg = paper.rect(400, 22, 18, 58);
  resistor.toleranceBand().svg.attr({
    'fill' : resistor.toleranceBand().color()
  });

  new ColorSelector(resistor.firstBand(), 50, 100);
  new ColorSelector(resistor.secondBand(), 170, 100);
  new ColorSelector(resistor.multiplierBand(), 290, 100);
  new ColorSelector(resistor.toleranceBand(), 410, 100);

})();

