//global variables

let questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"]; //holds each question div id
let qIndex = 0; //tracks which question is visible on page
let answers = { //holds which button is the correct answer foe each question
    "q1" : "1",
    "q2" : "1",
    "q3" : "3",
    "q4" : "2",
    "q5" : "4",
    "q6" : "2",
    "q7" : "3",
    "q8" : "4",
    "q9" : "1",
    "q10": "2"
}

let score = 0; //score
let points = 10; //points awarded for a right answer
let possibleScore = 100; //total possible score
let remainingTime = 100; //set length of quiz and track remaining time
let penalty = 10; //penalty for getting a question wrong

let timeout; //variable to hold timer interval

let form = document.getElementById("main"); //main container
let start = document.getElementById("start-btn"); //start quiz button
let usernameSubmit = document.getElementById("username-submit"); //register score button

//initial start
start.addEventListener("click", (e) => {
    e.stopPropagation();
    //start the quiz
    showHide("start");
    startQuiz();   
})

//start the quiz -> used for both initial start and replay
function startQuiz() {
    //reset text in register score form
    document.getElementById("username").value = "";

    //show first question
    showHide("q1");

    //start timer
    timer();
}

//end the quiz
function endQuiz(question) {
    //write score to page
    score = remainingTime;
    document.getElementById("score-text").innerText = score;
    document.getElementById("possible-score-text").innerText = possibleScore;

    //hide current question and show high score register
    showHide(question);
    showHide("register");

    //stop timer
    clearInterval(timeout);
}

//timer function
function timer() {

    timeout = setInterval(() => {
        //decrement time
        remainingTime--;

        //update text with time left
        document.getElementById("time").innerText = remainingTime;
        
        //when time is 0 -> break and return
        if(remainingTime <= 0) {
            endQuiz(questions[qIndex]);
            clearInterval(timeout);
        }

    }, 1000);

}

//wrong answer 
function wrongAnswer() {
    //reset timer with time penalty
    clearInterval(timeout);
    remainingTime -= penalty;
    timer();

    //write to answer status div
    displayFeedback("Wrong!");
}

//correct answer
function correctAnswer() {
    //write to answer status div 
    displayFeedback("Correct!");
}

//displays text to let user know whether they got the previous answer right
function displayFeedback(text) {
    document.getElementById("feedback-text").innerText = text;

    setTimeout(() => {
        document.getElementById("feedback-text").innerText = "";
    }, 3000);
}


//listener for user click on answer button
form.addEventListener("click", (e) => {
    let answer = e.target;

    if(answer.tagName == "BUTTON") {
        //get id of question and check whether the answer was correct
        let q = answer.parentNode.parentNode.id;
        answer.dataset.value == answers[q] ? correctAnswer() : wrongAnswer();

        //end quiz if that was the last question
        if(qIndex == questions.length - 1) {
            endQuiz(questions[qIndex]);
        } else {
            //move to next question
            showHide(questions[qIndex]);
            qIndex++;
            showHide(questions[qIndex]);
        }
  
    }
})

//user scores --------------------------------------------------------- //
//listener for score submission 
usernameSubmit.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

    let username = document.getElementById("username").value;
    let error = document.getElementById("error");

    //if name left blank
    if(username == "") {
        error.innerText = "Please enter a name";
        return;
    }

    //update highscore list and go to highscore page
    let userStats = {
        "name" : username,
        "score" : score
    }

    modifyHighscores(userStats);
    error.innerText = "";
    window.location = "highscore.html";

})

//modify scores data -> takes a user score object argument
function modifyHighscores(userScore) {
    //get scores from local storage
    let scores = localStorage.getItem("scores");
  
    //if it doesn't exist, create it with userScore as first entry
    if(scores == null) {
        scores = [userScore];
        localStorage.setItem("scores", JSON.stringify(scores));
        return;
    }
    
    //else parse the JSON object
    scores = JSON.parse(scores);

    let alreadyExists = false; //bool to track if user already has a score

    //if user exists and new score is higher, change score
    scores.forEach(element => {
        if(element.name == userScore.name) {
            if(element.score < userScore.score) {
                element.score = userScore.score;
            } 
            alreadyExists = true;
        }
    })

    //else add user to list
    if(!alreadyExists) {
        scores.push(userScore);
    }

    //sort list and store in local storage as JSON string
    scores.sort(highscoreSort);
    localStorage.setItem("scores", JSON.stringify(scores));
}

//sort helper function
function highscoreSort(a, b) {
    return a.score >= b.score ? -1 : 1;
}


//helper function to toggle an elements visibility
//takes and id as an argument
function showHide(element) {
    document.getElementById(element).classList.toggle("hidden");
}
