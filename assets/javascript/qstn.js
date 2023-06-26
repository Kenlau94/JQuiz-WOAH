//my variables and values (online shows that var is outdated and to use let but going by what im taught)
var score = 0;
var container = document.querySelector("#container");
var quizContent = document.querySelector("#quizContent");
var questionTitle = document.querySelector("#qTitle");
var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var questionIndex = 0;
var timeInterval = 0;
var countdown = 75;
var penalty = 10;

//creating an unordered list and assigning it to createUl,  then it is given the id of "optionsUl"
var createUl = document.createElement("ul");
createUl.setAttribute("id", "optionsUl");

//setting up the questions array with 3properties (title,choices,answer)
var questions = [
  {
    title: "The first index of an array is: ",
    choices: ["0", "1", "What is an index?", "Array who?"],
    answer: "0",
  },
  {
    title: "What is the output for: '5' === 5",
    choices: ["0", "55", "true", "false"],
    answer: "false",
  },
  {
    title: "How do you add comments in JavaScript?",
    choices: ["< !-- Maybe-->", "/*MaybeNot*/", "~Close~", "//Closer"],
    answer: "//Closer",
  },
  {
    title: "Which one of these examples is a string?",
    choices: [
      "let fact=(WOAH!)",
      "let fact=Ken's okay",
      "let fact=//Ken Sucks",
      "let fact='Ken Rocks'",
    ],
    answer: "let fact='Ken Rocks'",
  },
  {
    title: "Am I getting good at this coding thing?",
    choices: ["NO", "nO", "no", "YESS"],
    answer: "YESS",
  },
];

//Sets the timer on click.      REVIEW THE TIMER!  i struggled with timer and some functions
startBtn.addEventListener("click", function () {
  if (timeInterval === 0) {
    timeInterval = setInterval(function () {
      countdown--;
      timer.textContent = "Time: " + countdown;
      if (countdown <= 0) {
        clearInterval(timeInterval);
        theEnd();
      }
    }, 1000);
  }
  newQuestion(questionIndex);
});

// generates a new question
function newQuestion(questionIndex) {
  quizContent.innerHTML = "";
  createUl.innerHTML = "";
  var displayQuestion = document.createElement("h2");

  for (var i = 0; i < questions.length; i++) {
    displayQuestion.innerHTML = questions[questionIndex].title;
    var displayChoices = questions[questionIndex].choices;
    quizContent.appendChild(displayQuestion);
  }
  console.log(displayChoices);
  displayChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.innerHTML += "<button>" + newItem + "</button>";
    quizContent.appendChild(createUl);
    createUl.appendChild(listItem);
    listItem.addEventListener("click", checkAns);
  });
}

var i = 0;
var newDiv = document.createElement("div");
var feedback = document.createElement("h3");
newDiv.setAttribute("id", "newDiv");

// checks to see if selected answer is correct, then tell u correct||incorrect
function checkAns(event) {
  var choice = event.target;
  quizContent.appendChild(newDiv);
  newDiv.appendChild(feedback);
  var next = document.createElement("button");
  next.setAttribute("id", "nextButton");
  next.textContent = "Next Question";

  // condition that answer is correct
  if (choice.textContent == questions[questionIndex].answer) {
    score++;
    feedback.textContent = "NICE! 😎";
    newDiv.appendChild(feedback);

    newDiv.appendChild(next);
    next.addEventListener("click", movingOn);

    //condition that answer is incorrect
  } else {
    countdown = countdown - penalty;
    feedback.textContent = "WOAH! 💀";
    newDiv.appendChild(feedback);
  }
}
// Decides whether to go to final page or to go to next question
function movingOn(event) {
  newDiv.innerHTML = "";
  questionIndex++;
  if (questionIndex >= questions.length) {
    theEnd();
  } else {
    newQuestion(questionIndex);
  }
}

function theEnd() {
  quizContent.innerHTML = "";
  timer.innerHTML = "";

  // Sets up high score page
  var newH1 = document.createElement("h1");
  newH1.setAttribute("id", "newH1");
  newH1.textContent = "Finished!";
  quizContent.appendChild(newH1);

  // Calculation and display of final score
  if (countdown >= 0) {
    score = countdown;
    clearInterval(timeInterval);
    var newP = document.createElement("p");
    newP.textContent = "Your final score is: " + score;
    quizContent.appendChild(newP);
  } else {
    score = 0;
    var outOfTime = document.createElement("h2");
    outOfTime.textContent = "Time is up! 🕔";
    quizContent.appendChild(outOfTime);
    var newP = document.createElement("p");
    newP.textContent = "Your final score is: " + score;
    quizContent.appendChild(newP);
  }

  // Initials, submission box and button
  var initialsPrompt = document.createElement("label");
  initialsPrompt.setAttribute("for", "inputBox");
  initialsPrompt.textContent = "Enter your initials: ";
  quizContent.appendChild(initialsPrompt);

  var inputBox = document.createElement("input");
  inputBox.setAttribute("type", "text");
  inputBox.setAttribute("id", "inputBox");
  inputBox.textContent = "";
  quizContent.appendChild(inputBox);

  var submit = document.createElement("button");
  submit.setAttribute("type", "submit");
  submit.setAttribute("id", "submit");
  submit.textContent = "Submit";
  quizContent.appendChild(submit);

  // Event listener for submission button and stores initials and score
  submit.addEventListener("click", function () {
    var initials = inputBox.value;

    if (initials === "") {
      console.log("No initials entered");
      window.alert("Please enter your initials");
    } else {
      var finalScore = {
        initials: initials,
        score: score,
      };

      // Storage of past scores
      var storeScores = localStorage.getItem("storeScores");
      if (storeScores === null) {
        storeScores = [];
      } else {
        storeScores = JSON.parse(storeScores);
      }
      storeScores.push(finalScore);
      var newScore = JSON.stringify(storeScores);
      localStorage.setItem("storeScores", newScore);
      window.location.replace("scores.html");
    }
  });
}
