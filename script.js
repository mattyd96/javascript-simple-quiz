let start = document.getElementById("start-btn");
start.addEventListener("click", (e) => {
    e.stopPropagation();

    //start the quiz
    //show first question -> maybe jump to a question function thing
    //start timer
    
})

let timeout;
//takes a time in seconds
function timer(timeLeft) {

    timeout = setInterval(() => {
        //update text with time left
        document.getElementById("time").innerText = timeLeft;
        
        //when time is 0 -> break and return
        if(timeLeft <= 0) {
            endQuiz();
            clearInterval(timeout);
        }

        //decrement time
        timeLeft--;
    }, 1000);

}

function endQuiz() {
    console.log("done");
}

//decrement time when wrong answer
function wrongAnswer(time) {
    clearInterval(timeout);
    timer(time - 10);
}


let form = document.getElementById("main");

form.addEventListener("click", (e) => {
    let answer = e.target;

    if(answer.dataset.value != "start") {
        console.log("not start");
    } else {
        console.log("start");
    }
})