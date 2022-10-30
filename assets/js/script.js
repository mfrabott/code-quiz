
// DOM Accessed variables
var startButton = document.querySelector(".start-button")
var timerEl = document.querySelector(".countdown");
var askedQuestion = document.querySelector(".question");
var answerOne = document.querySelector(".answer-a");
var answerTwo = document.querySelector(".answer-b");
var answerThree = document.querySelector(".answer-c");
var answerFour = document.querySelector(".answer-d");

// Empty Variables
var currentQuestion = "";
var optionOne = "";
var optionTwo = "";
var optionThree = "";
var optionFour = "";
var correctAnswer = "";
var score = 0;


// QuESTION BANK. ANSWERS[0] is correct answer.
questionBank = [
    {questionText: "This is question 1", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 2", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 3", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 4", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 5", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]}
];

// TODO: VAR SCORE

// FUNCTION: TIMER
var countdown = function () {
    timeLeft = 10;
    var timeInterval = setInterval(function () {
      if (timeLeft >= 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
        return timeLeft;
      } else {
        timerEl.textContent = "";
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        // displayMessage();
      };
    }, 1000);
  };

// FUNCTION: START BUTTON
var startQuiz = function(){
    startButton.addEventListener("click", function(event) {
        event.preventDefault();
        startButton.setAttribute("style", "display: none");
        countdown();
        newQuestion();
    });
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
        return correctAnswer;
};

// FUNCTION: RANDOMIZE ANSWER ORDER
 var shuffleAnswers = function(){
    answerPullOrder = randomNumber(currentQuestion.answers.length);
    optionOne = currentQuestion.answers[answerPullOrder];
    currentQuestion.answers.splice(answerPullOrder, 1);
    answerPullOrder = randomNumber(currentQuestion.answers.length);
    optionTwo = currentQuestion.answers[answerPullOrder];
    currentQuestion.answers.splice(answerPullOrder, 1);
    answerPullOrder = randomNumber(currentQuestion.answers.length);
    optionThree = currentQuestion.answers[answerPullOrder];
    currentQuestion.answers.splice(answerPullOrder, 1);
    answerPullOrder = randomNumber(currentQuestion.answers.length);
    optionFour = currentQuestion.answers[answerPullOrder];
 };

    // FUNCTION: DISPLAY QUESTION AND ANSWER
var displayNewQuestion = function(){
    askedQuestion.textContent = currentQuestion.questionText;
    answerOne.textContent =  optionOne;
    answerTwo.textContent = optionTwo;
    answerThree.textContent = optionThree;
    answerFour.textContent = optionFour;
};

var newQuestion = function(){
    if (questionBank.length > 0) {
        chooseQuestion();
        shuffleAnswers();
        displayNewQuestion();
    } else {
        gameOver()
    }
};

// TODO: FUNCTION: correctChoice
var correctChoice = function() {
    console.log("correct")
};

// MESSAGE(CORRECT!)
        // SCORE ++

// TODO: FUNCTION: incorrectChoice
var incorrectChoice = function() {
    console.log("incorrect")
};

    // MESSAGE(THE CORRECT ANSWER WAS __)
        // REDUCE TIME

// FUNCTION: USER MAKES SELECTION
var userSelection = function(){
    answerOne.addEventListener("click", function(event) {
        event.preventDefault();
        if (optionOne === correctAnswer){
            correctChoice();
            newQuestion();
            // console.log(currentQuestion);
            // console.log(correctAnswer);
        } else {
            incorrectChoice();
            newQuestion();
            // console.log(currentQuestion);
            // console.log(correctAnswer);
        }
    });

    answerTwo.addEventListener("click", function(event) {
        event.preventDefault();
        if (optionTwo === correctAnswer){
            correctChoice();
            newQuestion();
            // console.log(currentQuestion);
            // console.log(correctAnswer);
        } else {
            incorrectChoice();
            newQuestion();
            // console.log(currentQuestion);
            // console.log(correctAnswer);
        }
    });

    answerThree.addEventListener("click", function(event) {
        event.preventDefault();
        if (optionThree === correctAnswer){
            correctChoice();
            newQuestion();
            // console.log(currentQuestion);
            // console.log(correctAnswer);
        } else {
            incorrectChoice();
            newQuestion();
            // console.log(currentQuestion);
            // console.log(correctAnswer);
        }
    });

    answerFour.addEventListener("click", function(event) {
        event.preventDefault();
        if (optionFour === correctAnswer){
            correctChoice();
            newQuestion();
            // console.log(currentQuestion);
            // console.log(correctAnswer);
        } else {
            incorrectChoice();
            newQuestion();
            // console.log(currentQuestion);
            // console.log(correctAnswer);
        }
    });
};


// TODO: FUNCTION: END OF GAME (NO MORE QUESTIONS OR TIMER 0)
var gameOver = function (){
    askedQuestion.setAttribute("style", "display:none");
    answerOne.setAttribute("style", "display:none");
    answerTwo.setAttribute("style", "display:none");
    answerThree.setAttribute("style", "display:none");
    answerFour.setAttribute("style", "display:none");
};
    // MESSAGE(NICE JOB!)
    
    // ASK NAME TO ADD TO HIGH SCORES
        // SAVE LOCAL NAME AND SCORE
    
        // DISPLAY HIGH SCORES
            // SORT HIGH SCORES
            // DISPLAY 1-5

            // startButton.setAttribute("style", "display: visible");


// WHEN I answer a question
// THEN I am presented with another question

// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over

// TODO: stats



// console.log(timeLeft);
// Nest everything in while loop, while timer runs…load random question with answers, event.target the right answer

// chooseQuestion();
// shuffleAnswers();
// displayNewQuestion();
// userSelection();
// console.log(timeLeft);




// console.log(answerTwo.value);
// console.log(answerThree.value);
// console.log(optionFour);


startQuiz();
userSelection();