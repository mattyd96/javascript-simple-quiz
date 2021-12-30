let clearScores = document.getElementById("clear-scores"); //clear user scores button
let again = document.getElementById("play-again"); //play again button


//create ol from local storage scores
function createHighscoreList() {
    console.log()
    let scores = JSON.parse(localStorage.getItem("scores")); //get scores from local storage
    let scorediv = document.getElementById("scores"); //div to hold list

    let list = document.createElement("ul");

    if(scores == null) {
        scorediv.innerHTML = "";
        return;
    }

    for(let i = 0; i < scores.length; i++) {

        let item = document.createElement("li");    
        item.innerHTML = '<span id="scoreName">' + scores[i].name + '</span><span>' + scores[i].score + '</span>';

        if(i == 0) { item.classList.add("gold") }
        else if(i == 1) { item.classList.add("silver") }
        else if(i == 2) {item.classList.add("bronze") }

        list.appendChild(item);
    }

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