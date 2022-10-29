
// DOM Accessed variables

var askedQuestion = document.querySelector(".question");
var answerOne = document.querySelector(".answer-a");
var answerTwo = document.querySelector(".answer-b");
var answerThree = document.querySelector(".answer-c");
var answerFour = document.querySelector(".answer-d");
currentQuestion = "";
optionOne = "";
optionTwo = "";
optionThree = "";
optionFour = "";

// QuESTION BANK

questionBank = [
    {questionText: "This is question 1", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 2", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 3", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 4", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]},
    {questionText: "This is question 5", answers: ["Opt1", "Opt2", "Opt3", "Opt4"]}
]

// console.log(questionBank.length);
// console.log(questionBank[2].questionText);
// console.log(questionBank[1].answers[3]);

// VAR SCORE

// FUNCTION: START BUTTON

// FUNCTION: TIMER ON START

// FUNCTION: ASK QUESTION

    // IF AT LEAST ONE QUESTION, CONTINUE, ELSE, NO MORE QUESTIONS/GAME OVER.

    // Random number function
function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

    // FUNCTION: RANDOMLY SELECT QUESTION FROM BANK
var chooseQuestion = function(){
    questionNumber = randomNumber(questionBank.length);
    currentQuestion = questionBank[randomNumber(questionBank.length)];
    questionBank.splice(questionNumber, 1);
    return currentQuestion;
}


chooseQuestion();
// currentQuestion = chosenQuestion;


// FUNCTION: REMOVE QUESTION FROM BANK

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

 shuffleAnswers();

 console.log(answerOne);
 console.log(answerTwo);
 console.log(answerThree);
 console.log(answerFour);

    // FUNCTION: DISPLAY QUESTION AND ANSWER

askedQuestion.textContent = currentQuestion.questionText;
answerOne.textContent =  optionOne;
answerTwo.textContent = optionTwo;
answerThree.textContent = optionThree;
answerFour.textContent = optionFour;

// FUNCTION: USER MAKES SELECTION

    // IF CORRECT
        // MESSAGE(CORRECT!)
        // SCORE ++

    // IF INCORRECT
        // MESSAGE(THE CORRECT ANSWER WAS __)
        // REDUCE TIME

    // ASK QUESTION()

// FUNCTION: END OF GAME (NO MORE QUESTIONS OR TIMER 0)

    // MESSAGE(NICE JOB!)
    
    // ASK NAME TO ADD TO HIGH SCORES
        // SAVE LOCAL NAME AND SCORE
    
        // DISPLAY HIGH SCORES
            // SORT HIGH SCORES
            // DISPLAY 1-5


// start button

// timer

// questions

// answers

// WHEN I answer a question
// THEN I am presented with another question

// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over

// stats


// Nest everything in while loop, while timer runs…load random question with answers, event.target the right answer


// 