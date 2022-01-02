//global variables

//array to hold question content
//[ question number, answer, question text, answer option 1 ... 4]
const questions = [
    ["1", 1, "가볍다", "to be light", "to be heavy", "to be complicated", "to be simple"],
    ["2", 1, "고양이", "Cat", "Dog", "Baby", "Bird"],
    ["3", 3, "고향", "City", "Apartement", "Hometown", "Park"],
    ["4", 2, "근처", "Far away", "Near by", "to the side", "Behind"],
    ["5", 4, "빨갛다", "To be green", "To be white", "To be blue", "To be red"],
    ["6", 2, "어리다", "To be Old", "To be young", "To be oblivious", "To be anxious"],
    ["7", 3, "떠나다", "to move", "to travel", "to depart", "to Arrive"],
    ["8", 4, "내려오다", "to get on", "to ride", "to depart", "to get off"],
    ["9", 1, "나라", "Nation", "State", "County", "City"],
    ["10", 2, "야구", "Soccer", "Baseball", "Badminton", "Cricket"],
]

let qIndex = 0; //tracks which question is visible on page

let score = 0; //score
let points = 10; //points awarded for a right answer
let possibleScore = 100; //total possible score
let remainingTime = 100; //set length of quiz and track remaining time
let penalty = 10; //penalty for getting a question wrong

let timeout; //variable to hold timer interval
let displayOut; //variable to hold timeout for user feedback text

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
    showHide("questions");
    createQuestion(questions[0]);

    //start timer
    timer();
}

//end the quiz
function endQuiz() {
    //write score to page
    score = remainingTime;
    document.getElementById("score-text").innerText = score;
    document.getElementById("possible-score-text").innerText = possibleScore;

    //hide current question and show high score register
    showHide("questions");
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
    clearTimeout(displayOut);
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
        let q = parseInt(answer.parentNode.parentNode.id);
        console.log(typeof(q));
        answer.dataset.value == questions[q-1][1] ? correctAnswer() : wrongAnswer();

        //end quiz if that was the last question
        if(qIndex == questions.length - 1) {
            endQuiz();
        } else {
            //move to next question
            qIndex++;
            createQuestion(questions[qIndex]);
        }
  
    }
})

//----------------------- question builder --------------------------- //

function createQuestion(question) {
    //create container
    let article = document.createElement('article');
    article.classList.add('card', 'question');
    article.setAttribute('id', question[0]);

    //create question text
    let para = document.createElement('p');
    para.classList.add('q-text');
    para.innerText = question[2];

    //create answer div and append option buttons
    let div = document.createElement('div');
    div.classList.add("answers");
    for(let i = 0; i < 4; i++) {
        let button = document.createElement('button');
        button.classList.add('btn');
        button.setAttribute('data-value', i+1);
        button.innerText = question[i+3];
        div.append(button);
    }

    //add question text and answers to container
    article.append(para);
    article.append(div);

    //replace content with newly created question article
    let container = document.getElementById("questions");
    container.innerHTML = "";
    container.append(article);
}

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



