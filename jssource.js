var $round = $("#round")
var viewTypes = ["Percentage", "Decimal", "Fraction"];
var viewType = "Percentage";
var typeCount = 0;
var probs = [];

function displayCycle() {
  typeCount += 1;
  if (typeCount > viewTypes.length -1){
    typeCount = 0
  }
  viewType = viewTypes[typeCount];
  $("button").text("Display type: ".concat(viewType));
  processResults();
}

$(document).keypress(function(e) {
  processResults();
});

var options = {
    callback: function (value) {
        processResults();
     },
    wait: 750,
    highlight: true,
    allowSubmit: false,
    captureLength: 2
}

$("#round").typeWatch( options );


function processResults() {
  probs = [];
  var fCards = 11;
  var lCards = 6;
  var data = $round.val().toLowerCase();

  //if first 3 letters are valid
  if (data.match("(?:[fl]{3})")) {
    $(answer).text("calculating");
    for (var i = 0, len = data.length; i < len; i++) {
      if (data[i] == "f"){
        probs[i] = fCards / (fCards + lCards);
        fCards -= 1;
      };

      if (data[i] == "l"){
        probs[i] = lCards / (fCards + lCards);
        lCards -= 1;
      };

    }

    var decimalProb = (probs.reduce(function(a,b){return a*b;})).toFixed(2);
    var percentProb = (probs.reduce(function(a,b){return a*b;})*100).toFixed(2);
    var fractionProb = new Fraction(decimalProb);
    switch (viewType) {
      case "Percentage":
        $(answer).text(percentProb.concat("%"));
        break;
      case "Decimal":
        $(answer).text(decimalProb);
        break;
      case "Fraction":
        $(answer).text(fractionProb.numerator.toString().concat("/")
        .concat(fractionProb.denominator.toString()));
        break;
      default:
        console.log("Oops")
        break;
    };
    $(answer).text("~".concat($(answer).text()))
  } else{
    $(answer).text("N/A");
  }
}
