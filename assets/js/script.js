
// DOM Accessed variables
var startButton = document.querySelector(".start-button");
var timerEl = document.querySelector(".countdown");
var askedQuestion = document.querySelector(".question");
var answerOneButton = document.querySelector(".answer-a");
var answerTwoButton = document.querySelector(".answer-b");
var answerThreeButton = document.querySelector(".answer-c");
var answerFourButton = document.querySelector(".answer-d");
var questionBlock = document.querySelector(".quiz-question");
var previousAnswerFeedback = document.querySelector(".previous-feedback");
var userScore = document.querySelector(".user-score");
var userInputBlock = document.querySelector(".user-input");
var nameInput = document.querySelector("#name");
var submitButton = document.querySelector(".submit-name");
var highScoreBlock = document.querySelector(".high-scores");
var highScoreList = document.querySelector("#high-score-list");

// Global Variables
var currentQuestion = "";
var correctAnswer = "";
var timeLeft = 0;
var score = 0;

// Answer and three additional choices
var optionOne = "";
var optionTwo = "";
var optionThree = "";
var optionFour = "";

// Length of High Score List
var numHighScores = 5;
// Checks local storage for existing high score list. '??' operator returns blank array if empty.
var highScores = JSON.parse(localStorage.getItem('highScores')) ?? [];

// QuESTION BANK. ANSWERS[0] is correct answer.
questionBank = [
    {questionText: "What is the naming convention for JavaScript variables?", answers: ["camelCase", "UPPERCASE", "lowercase", "lOlCaSe"]},
    {questionText: "What symbol is used to refer to an id?", answers: ["#", ".", "$", "&"]},
    {questionText: "What method is used to convert an object to a string?", answers: ["JSON.stringify()", "JSON.parse()", "toString()", "splice()"]},
    {questionText: "What method is used to add a child element into HTML?", answers: ["appendChild", "addElement", "createElement", "addChild"]},
    {questionText: "Where is a variable with global scope declared?", answers: ["Outside of functions", "Within functions", "Anywhere", "At the bottom of the code"]}
];

// FUNCTION: START BUTTON
var init = function(){
    startButton.addEventListener("click", function(event) {
        event.preventDefault();
        startButton.setAttribute("style", "display: none");
        questionBlock.setAttribute("style", "display: inline-block")
        userSelection();
        countdown();
        newQuestion();
    });
};

// FUNCTION: TIMER / Started on press of start button
var countdown = function () {
    timeLeft = 60;
    var timeInterval = setInterval(function () {
      if (timeLeft >= 1) {
        timerEl.textContent = ("Time remaining: \n" +  timeLeft);
        timeLeft--;
        return timeLeft;
      } else {
        timerEl.textContent = "";
        gameOver();
        clearInterval(timeInterval);        
      };
    }, 1000);
};

// Random number gererator
function randomNumber(max) {
    return Math.floor(Math.random() * max);
};

// FUNCTION: RANDOMLY SELECT QUESTION FROM BANK
var chooseQuestion = function(){
        questionNumber = randomNumber(questionBank.length);
        currentQuestion = questionBank[questionNumber];
        questionBank.splice(questionNumber, 1);
        correctAnswer = currentQuestion.answers[0];
        return currentQuestion;
};

// FUNCTION: RANDOMIZE ANSWER ORDER
// TODO: MAKE INTO FOR LOOP
 var shuffleAnswers = function(){
    // Get random number 0-3
    answerPullOrder = randomNumber(currentQuestion.answers.length);
    // Assign answer option based on random index position to optionOne
    optionOne = currentQuestion.answers[answerPullOrder];
    // Remove answer option from pool
    currentQuestion.answers.splice(answerPullOrder, 1);
    // New random number 0-2, and continue until all assigned
    answerPullOrder = randomNumber(currentQuestion.answers.length);
    optionTwo = currentQuestion.answers[answerPullOrder];
    currentQuestion.answers.splice(answerPullOrder, 1);
    answerPullOrder = randomNumber(currentQuestion.answers.length);
    optionThree = currentQuestion.answers[answerPullOrder];
    currentQuestion.answers.splice(answerPullOrder, 1);
    answerPullOrder = randomNumber(currentQuestion.answers.length);
    optionFour = currentQuestion.answers[answerPullOrder];
};



// FUNCTION: DISPLAY QUESTION AND ANSWERS  ON BUTTONS
var displayNewQuestion = function(){
    askedQuestion.textContent = currentQuestion.questionText;
    answerOneButton.textContent =  optionOne;
    answerTwoButton.textContent = optionTwo;
    answerThreeButton.textContent = optionThree;
    answerFourButton.textContent = optionFour;
};

// FUNCTION: Consolodates steps of pulling new question. If no more questions in bank, timer to 0 and game over
var newQuestion = function(){
    if (questionBank.length > 0) {
        chooseQuestion();
        shuffleAnswers();
        displayNewQuestion();
    } else {
        timeLeft=0;
    }
};

// FUNCTION: User selects correct answer
var correctChoice = function() {
    previousAnswerFeedback.textContent = "Correct!"
    previousAnswerFeedback.setAttribute("style", "color: rgb(0, 212, 35)");
    score++;
};

// FUNCTION: User selects wrong answer
var incorrectChoice = function() {
    timeLeft = timeLeft-10;
    previousAnswerFeedback.textContent = ("Incorrect. The answer was: " + correctAnswer)
    previousAnswerFeedback.setAttribute("style", "color: rgb(175, 0, 0)");
    return timeLeft;
};

// FUNCTION: USER MAKES SELECTION. Evaluates selection with correct answer and proceeds accordingly
var userSelection = function(){
    answerOneButton.addEventListener("click", function(event) {
        event.preventDefault();
        if (optionOne === correctAnswer){
            correctChoice();
            newQuestion();
        } else {
            incorrectChoice();
            newQuestion();
        }
    });

    answerTwoButton.addEventListener("click", function(event) {
        event.preventDefault();
        if (optionTwo === correctAnswer){
            correctChoice();
            newQuestion();
        } else {
            incorrectChoice();
            newQuestion();
        }
    });

    answerThreeButton.addEventListener("click", function(event) {
        event.preventDefault();
        if (optionThree === correctAnswer){
            correctChoice();
            newQuestion();
        } else {
            incorrectChoice();
            newQuestion();
        }
    });

    answerFourButton.addEventListener("click", function(event) {
        event.preventDefault();
        if (optionFour === correctAnswer){
            correctChoice();
            newQuestion();
        } else {
            incorrectChoice()
            newQuestion();
        }
    });
};

// FUNCTION: END OF GAME (NO MORE QUESTIONS OR TIMER 0)
var gameOver = function(){
    // Hide questions and timer
    questionBlock.setAttribute("style", "display: none");
    timerEl.setAttribute("style", "display: none");
    // Display score and user input section
    userScore.textContent = "Your score is:   " + score;
    userInputBlock.setAttribute("style", "display: contents");
    userNameSubmit();
};

// ASK NAME TO ADD TO HIGH SCORES. SAVE LOCAL NAME AND SCORE
var userNameSubmit = function(){
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        // Saves user's name and score as an object
        var newScore = {
            userName: nameInput.value.trim(),
            userScore: score
        };
          // Adds new score to list
        highScores.push(newScore);
        // Sorts high scores from most to least
        highScores.sort((a, b) => b.userScore - a.userScore);
        // Cuts list to top 5
        highScores.splice(numHighScores);
        // Saves list to local storage
        localStorage.setItem('highScores', JSON.stringify(highScores));
        userInputBlock.setAttribute("style", "display: none");    
        renderHighScore(); 
    });    
};        


// DISPLAY HIGH SCORES. Creates and appends list element for each of top 5 scores
var renderHighScore = function() {
    for (i=0; i<highScores.length; i++) {
        var li = document.createElement("li");
        li.textContent = highScores[i].userName + " - " + highScores[i].userScore;
        highScoreList.appendChild(li);
    }
    highScoreBlock.setAttribute("style", "display: contents");
};


init();