var createPolitician = function(name, partyColor) {
  var politician = {};
  politician.name = name;
  politician.electionResults = null;
  politician.totalVotes = 0;
  politician.partyColor = partyColor;

  politician.tallyTotalVotes = function () {

    this.totalVotes = 0;

    for (var i = 0; i < this.electionResults.length; i++) {
    this.totalVotes = this.totalVotes + this.electionResults[i];
    }
  };

  return politician;
};

var winner;

var sylvia = createPolitician("Sylvia Rivera", [132,17,11]);
var marsha = createPolitician("Marsha P. Johnson", [245,141,136]);

sylvia.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];
marsha.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];

sylvia.electionResults[9] = 1;
marsha.electionResults[9] = 28;

sylvia.electionResults[4] = 17;
marsha.electionResults[4] = 38;

sylvia.electionResults[43] = 11;
marsha.electionResults[43] = 27;

var setStateResults = function(state) {
  theStates[state].winner = null;
  if (sylvia.electionResults[state] > marsha.electionResults[state]) {
    theStates[state].winner = sylvia;
  } else if (sylvia.electionResults[state] < marsha.electionResults[state]) {
    theStates[state].winner = marsha;
  }

  var stateWinner = theStates[state].winner;

  if (stateWinner !== null) {
    theStates[state].rgbColor = stateWinner.partyColor;
  } else {
    theStates[state].rgbColor = [11, 32, 57];
  }

  var stateInfoTable = document.getElementById('stateResults');
  var header = stateInfoTable.children[0].children[0];
  var body = stateInfoTable.children[1];
  var stateName = header.children[0];
  var abbrev = header.children[1];
  var candidate1Name = body.children[0].children[0];
  var candidate2Name = body.children[1].children[0];
  var candidate1Results = body.children[0].children[1];
  var candidate2Results = body.children[1].children[1];
  var winnersName = body.children[2].children[1];

  stateName.innerText = theStates[state].nameFull;
  abbrev.innerText = "(" + theStates[state].nameAbbrev + ")";
  candidate1Name.innerText = sylvia.name;
  candidate2Name.innerText = marsha.name;
  candidate1Results.innerText = sylvia.electionResults[state];
  candidate2Results.innerText = marsha.electionResults[state];

  if (theStates[state].winner === null) {
    winnersName.innerText = "TIE";
  } else {
    winnersName.innerText = theStates[state].winner.name;
  }
};

sylvia.tallyTotalVotes();
marsha.tallyTotalVotes();

if (sylvia.totalVotes > marsha.totalVotes) {
  winner = sylvia.name;
} else if (marsha.totalVotes > sylvia.totalVotes) {
  winner = marsha.name;
} else winner = "Tie!";

var countryInfoTable = document.getElementById('countryResults');
var row = countryInfoTable.children[0].children[0];

row.children[0].innerText = sylvia.name;
row.children[1].innerText = sylvia.totalVotes;
row.children[2].innerText = marsha.name;
row.children[3].innerText = marsha.totalVotes;
row.children[5].innerText = winner;
