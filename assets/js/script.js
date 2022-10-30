

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
var highScoreName = document.querySelector("#user-name");
var highScoreScore = document.querySelector("#user-score");

// Global Variables
var currentQuestion = "";
var optionOne = "";
var optionTwo = "";
var optionThree = "";
var optionFour = "";
var correctAnswer = "";
var timeLeft = 0;
var score = 0;

var numHighScores = 10;
var HIGH_SCORES = 'highScores';
var highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];

// QuESTION BANK. ANSWERS[0] is correct answer.
questionBank = [
    {questionText: "This is question 1", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 2", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 3", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 4", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 5", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]}
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
        return correctAnswer;
};

// FUNCTION: RANDOMIZE ANSWER ORDER
// TODO: MAKE INTO FOR LOOP
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
    answerOneButton.textContent =  optionOne;
    answerTwoButton.textContent = optionTwo;
    answerThreeButton.textContent = optionThree;
    answerFourButton.textContent = optionFour;
};

// FUNCTION: Consolodates steps of pulling new question
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
    questionBlock.setAttribute("style", "display: none");
    timerEl.setAttribute("style", "display: none");
    userScore.textContent = "Your score is:  " + score;
    userInputBlock.setAttribute("style", "display: contents");
    userNameSubmit();
};

// TODO: ASK NAME TO ADD TO HIGH SCORES
    // SAVE LOCAL NAME AND SCORE
var userNameSubmit = function(){
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        var newScore = {
            userName: nameInput.value.trim(),
            userScore: score
        };
        
          // 1. Add to list
        highScores.push(newScore);

        // 2. Sort the list
        highScores.sort((a, b) => b.userScore - a.userScore);
        
        // 3. Select new list
        highScores.splice(numHighScores);
        
        // 4. Save to local storage
        localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));


        console.log(highScores);
        console.log(HIGH_SCORES);
        userInputBlock.setAttribute("style", "display: none");    
        renderHighScore(); 
    });    
};        


// TODO: DISPLAY HIGH SCORES
        // SORT HIGH SCORES
        // DISPLAY 1-5 
var renderHighScore = function() {
    var userName = localStorage.getItem("userName");
    var score = localStorage.getItem("score");
    highScoreName.textContent = userName;
    highScoreScore.textContent = score;
    highScoreBlock.setAttribute("style", "display: contents");
}


init();