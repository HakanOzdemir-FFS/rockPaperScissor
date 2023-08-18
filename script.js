//Gives the score past time at local Storage
let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  lose: 0,
  tie: 0
};

let isAutoPlaying = false;
let intervalId;

//Auto Play And Stop Menu
function autoPlay() {
  if (!isAutoPlaying) {
      intervalId = setInterval(() => {
          const playerMove = pickComputerMove();
          playGame(playerMove);
          document.querySelector('.autoPlayButton').innerHTML = 'Stop Playing';
      }, 1000);
      isAutoPlaying = true;
  } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
      document.querySelector('.autoPlayButton').innerHTML = 'Auto Play';
  }
}
resetScoreButton();
updateScore();

// Onclick Menu
document.querySelector('.button-Img-Rock')
  .addEventListener('click', () => {
      playGame('rock');
  })
document.querySelector('.button-Img-Paper')
  .addEventListener('click', () => {
      playGame('paper');
  })
document.querySelector('.button-Img-Scissors')
  .addEventListener('click', () => {
      playGame('scissors');
  })


//Are You Sure Text Area --OnClick
function resetScoreButton() {
  document.querySelector('.js-reset-score-button')
      .addEventListener('click', () => {
          document.querySelector('.js-questions')
              .innerHTML = `<p>Are you sure you want to reset the score?</p>
          <button class="js-yes-button">Yes</button>
          <button class="js-no-button">No</button>`
      
              if (document.querySelector('.js-yes-button')
              .addEventListener('click', () => {
                  score.win = 0,
                  score.lose = 0,
                  score.tie = 0
                  localStorage.removeItem('score');
                  updateScore();
                  document.querySelector('.js-questions')
                      .innerHTML = ``
              }));
               else if (document.querySelector('.js-no-button')
                  .addEventListener('click', () => {
                  document.querySelector('.js-questions')
                      .innerHTML = ``
              }));
          }); 
}

// KeyDown Menu
document.querySelector('body')
  .addEventListener('keydown', () => {
      if (event.key === 'r') {
          playGame('rock');
      } else if (event.key === 'p') {
          playGame('paper');
      } else if (event.key === 's') {
          playGame('scissors');
      } else if (event.key === 'Backspace') {
          document.querySelector('.js-questions')
              .innerHTML = `<p>Are you sure you want to reset the scrore?</p>
          <button class="js-yes-button">Yes</button>
          <button class="js-no-button">No</button>`

          // To be continou
          
      }
      updateScore();
  })

//Player Choose Move and Computer to compare
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'rock') {
      if (computerMove === 'rock') {
          result = 'Tie';
          score.tie += 1;
      } else if (computerMove === 'scissors') {
          result = 'You Win';
          score.win++;
      } else if (computerMove === 'paper') {
          result = 'You Lose';
          score.lose += 1;
      }
  }
  else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
          result = 'You Win';
          score.win++;
      } else if (computerMove === 'scissors') {
          result = 'You Lose';
          score.lose += 1;
      } else if (computerMove === 'paper') {
          result = 'Tie';
          score.tie += 1;
      }
  }
  else if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
          result = 'You Lose';
          score.lose += 1;
      } else if (computerMove === 'scissors') {
          result = 'Tie';
          score.tie += 1;
      } else if (computerMove === 'paper') {
          result = 'You Win';
          score.win++;
      }
  }
  //Score is saved localStorage
  localStorage.setItem('score', JSON.stringify(score));
  updateScore();

  //Result write the screen
  document.querySelector('.resultText')
      .innerHTML = result;
  document.querySelector('.moveText')
      .innerHTML = `You 
  <img src="img/${playerMove}-emoji.png"> 
  - 
  <img src="img/${computerMove}-emoji.png"> Computer `;
}


//Score updated here
function updateScore() {
  document.querySelector('.score')
      .innerHTML = `Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;
}

//Computer pick Move
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
  }
  return computerMove;
}


