//setting my variables to the value of the "#_____"
var scoreContainer = document.querySelector("#quizContent");
var highScores = document.querySelector("#displayScores");
var backButton = document.querySelector("#back");
var clearButton = document.querySelector("#clear");

//adds an event listener for a click on the back button that then replaces the current window to quiz window
backButton.addEventListener("click", function () {
  window.location.replace("quiz.html");
});

//adds event listener for a click on the clear button that will then cause the function to clear the data
clearButton.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//this retrieves the stored data from local storage and then coverts the string("") into javascript
var storeScores = localStorage.getItem("storeScores");
storeScores = JSON.parse(storeScores);

//if the scores is not equal to null then the for loop activates
if (storeScores !== null) {
  for (var i = 0; i < storeScores.length; i++) {
    //creates a new list (li) element and gives it an id "scoreLi"
    var addScore = document.createElement("li");
    addScore.setAttribute("id", "scoreLi");

    //this combines the initials with the score
    addScore.textContent = storeScores[i].initials + " " + storeScores[i].score;

    //addScore will now be added as a child to the highscores element adding the new item in the list related with highScores
    highScores.appendChild(addScore);
  }
}
