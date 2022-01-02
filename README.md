# Simple Javascript Quiz

A simple Javascript Quiz written for a bootcamp assignment. It has a user answer questions within a time limit where a wrong answer results in a time penalty. Upon time running out or finishing all the questions, the user can then store their score and view a highscore page to compare with other users. The current implementation runs only using local storage on the browser.

<br/>

The quiz questions are for Korean vocabulary, a recent hobby I have picked up. For testing purposes the answers are 

<details>
<summary> Answers </summary>
1,  1,  3,  2,  4,  2,  3,  4,  1,  2
</details>

<br/>
## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```


## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```


## Screenshot

![Quiz Demo GIF](./assets/demo_images/demo.gif)

## Notes

###  Method of changing questions

</br>

For the implementation on the main branch, I have all the questions already written in the html file. They are then
all hidden at the start and progressively hidden and displayed as the user clicks on the answer buttons.

</br>
  
Another implementation I did in the js_insert branch, creates each question in javascript then replaces the content on the page. I am not to sure of the performance difference between the two at the moment, but as far as I can tell they both have a similar number DOM calls, so it should be fairly similar performance.

</br>

I think both work well for this project and meeting the requirements, so I have left both there for reference. The published page is running off of the main branch. The advantage of the js_insert method is the ease of modification. All the questions are stored in an array mimicking a database of sorts. Modifying the quiz only requires changes to that array whereas the method in main requires changes to the html and two variables in the Javascript.

## Links

[Live Website](https://mattyd96.github.io/javascript-simple-quiz/)  

[My Github Account](https://github.com/mattyd96)