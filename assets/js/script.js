
// DOM Accessed variables
var startButton = document.querySelector(".start-button")
var timerEl = document.querySelector(".countdown");
var askedQuestion = document.querySelector(".question");
var answerOne = document.querySelector(".answer-a");
var answerTwo = document.querySelector(".answer-b");
var answerThree = document.querySelector(".answer-c");
var answerFour = document.querySelector(".answer-d");

// Empty Variables
currentQuestion = "";
optionOne = "";
optionTwo = "";
optionThree = "";
optionFour = "";
correctAnswer = "";
score = 0;


// QuESTION BANK. ANSWERS[0] is correct answer.

questionBank = [
    {questionText: "This is question 1", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 2", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 3", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 4", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 5", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]}
];

// console.log(questionBank.length);
// console.log(questionBank[2].questionText);
// console.log(questionBank[1].answers[3]);

// TODO: VAR SCORE




// TODO: FUNCTION: TIMER
var countdown = function () {
    var timeLeft = 20;
    var timeInterval = setInterval(function () {
      if (timeLeft >= 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
      } else {
        timerEl.textContent = "";
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        // displayMessage();
      }
    }, 1000);
  };

// TODO: FUNCTION: START BUTTON
var startQuiz = function(){
    startButton.addEventListener("click", function(event) {
        event.preventDefault();
        startButton.setAttribute("style", "display: none");
        countdown();
    });
}

startQuiz();
// TODO: IF AT LEAST ONE QUESTION, CONTINUE, ELSE, NO MORE QUESTIONS/GAME OVER.

// Random number gererator
function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

// FUNCTION: RANDOMLY SELECT QUESTION FROM BANK
var chooseQuestion = function(){
    questionNumber = randomNumber(questionBank.length);
    currentQuestion = questionBank[randomNumber(questionBank.length)];
    questionBank.splice(questionNumber, 1);
    correctAnswer = currentQuestion.answers[0];
    return currentQuestion;
}


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
 }

    // FUNCTION: DISPLAY QUESTION AND ANSWER
var displayNewQuestion = function(){
    askedQuestion.textContent = currentQuestion.questionText;
    answerOne.textContent =  optionOne;
    answerTwo.textContent = optionTwo;
    answerThree.textContent = optionThree;
    answerFour.textContent = optionFour;
}

// TODO: FUNCTION: correctChoice
        // MESSAGE(CORRECT!)
        // SCORE ++

// TODO: FUNCTION: incorrectChoice
        // MESSAGE(THE CORRECT ANSWER WAS __)
        // REDUCE TIME

// FUNCTION: USER MAKES SELECTION
var userSelection = function(){
    answerOne.addEventListener("click", function(event) {
        event.preventDefault();
        if (optionOne === correctAnswer){
            correctChoice();
        } else {
            incorrectChoice();
        }
    });

    answerTwo.addEventListener("click", function(event) {
        event.preventDefault();
        if (optionOne === correctAnswer){
            correctChoice();
        } else {
            incorrectChoice();
        }
    });

    answerThree.addEventListener("click", function(event) {
        event.preventDefault();
        if (optionOne === correctAnswer){
            correctChoice();
        } else {
            incorrectChoice();
        }
    });

    answerFour.addEventListener("click", function(event) {
        event.preventDefault();
        if (optionOne === correctAnswer){
            correctChoice();
        } else {
            incorrectChoice();
        }
    });
}



// TODO: FUNCTION: END OF GAME (NO MORE QUESTIONS OR TIMER 0)

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


// Nest everything in while loop, while timer runs…load random question with answers, event.target the right answer

chooseQuestion();
shuffleAnswers();
displayNewQuestion();
userSelection();

console.log(answerOne.value);
console.log(answerTwo.value);
console.log(answerThree.value);
console.log(optionFour);
console.log(correctAnswer);