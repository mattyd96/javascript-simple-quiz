let clearScores = document.getElementById("clear-scores"); //clear user scores button
let again = document.getElementById("play-again"); //play again button


//create ol from local storage scores
function createHighscoreList() {
    let scores = JSON.parse(localStorage.getItem("scores")); //get scores from local storage
    let scorediv = document.getElementById("scores"); //div to hold list

    let list = document.createElement("ol");

    if(scores == null) {
        scorediv.innerHTML = "";
        return;
    }

    scores.forEach(element => {
        let item = document.createElement("li");
        item.innerHTML = '<span id="scoreName">' + element.name + '</span> - ' + element.score;
        list.appendChild(item);
    });

    scorediv.innerHTML = list.outerHTML;
}

//play again 
again.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location = "./index.html";
})

//clear scores in local storage and rewrite html
clearScores.addEventListener("click", (e) => {
    e.stopPropagation();
    localStorage.clear();
    createHighscoreList();
})

//start script on page load
function init() {
    createHighscoreList();
}

window.addEventListener("load", init);