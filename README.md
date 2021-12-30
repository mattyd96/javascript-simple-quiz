# Javascript Random password Generator

A simple Javascript Quiz written for a bootcamp assignment. It has a user answer questions within a time limit where a wrong answer results in a time penalty. Upon time running out or finishing all the questions, the user can then store their score and view a highscore page to compare with other users. The current implementation runs only using local storage on the browser.
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

![The Password Generator application displays a red button to "Generate Password".](./Assets/Screenshot.png)

## Notes

###  Method of changing questions

</br>

For this implementation I have all the questions already written in the html file. They are then
all hidden at the start and progressively hidden and displayed as the user clicks on the answer buttons.

</br>
  
Another implementation I would like to try is to just make each question in the Javascript and then change
the HTML content directly for each question. I believe this would allow for easier editing on the backend as far as modifying questions. This would work well for when the question data was stored in a database as 
opposed to sitting in the Front-end Javascript itself.

</br>

I think both work well for this project and meeting the requirements. However I'm not sure if either implementation significantly effects performance. 

## Links

[Live Website](https://mattyd96.github.io/javascript-simple-quiz/)  

[My Github Account](https://github.com/mattyd96)