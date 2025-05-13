
// Game state
let userScore = 0;
let computerScore = 0;
const winningScore = 5;

// DOM elements
const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const statusMessage = document.getElementById('status-message');
const choices = document.querySelectorAll('.choice');
const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const battleArea = document.querySelector('.battle-area');
const resetButton = document.getElementById('reset-button');
const rulesButton = document.getElementById('rules-button');
const rulesModal = document.getElementById('rules-modal');
const closeButton = document.querySelector('.close-button');
const confettiContainer = document.getElementById('confetti-container');

// Game choices
const gameChoices = ['rock', 'paper', 'scissors'];
const choiceEmojis = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️'
};

// Event listeners
choices.forEach(choice => {
  choice.addEventListener('click', () => {
    const userChoice = choice.getAttribute('data-choice');
    playGame(userChoice);
  });
});

resetButton.addEventListener('click', resetGame);
rulesButton.addEventListener('click', showRules);
closeButton.addEventListener('click', closeRules);
window.addEventListener('click', (e) => {
  if (e.target === rulesModal) {
    closeRules();
  }
});

// Functions
function playGame(userChoice) {
  // Clear previous selection
  choices.forEach(choice => choice.classList.remove('selected'));
  
  // Highlight user selection
  document.querySelector(`[data-choice="${userChoice}"]`).classList.add('selected');
  
  const computerChoice = getComputerChoice();
  const result = getResult(userChoice, computerChoice);
  
  // Update battle display
  showBattleArea(userChoice, computerChoice);
  
  // Update scores and display
  updateScore(result);
  displayResult(result, userChoice, computerChoice);
  
  // Check if game is over
  checkGameOver();
}

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * 3);
  return gameChoices[randomIndex];
}

function getResult(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return 'tie';
  }
  
  if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'win';
  }
  
  return 'lose';
}

function showBattleArea(userChoice, computerChoice) {
  userChoiceDisplay.textContent = choiceEmojis[userChoice];
  computerChoiceDisplay.textContent = choiceEmojis[computerChoice];
  battleArea.classList.add('active');
  
  // Add pulse animation
  userChoiceDisplay.classList.add('pulse');
  computerChoiceDisplay.classList.add('pulse');
  
  // Remove pulse animation after it completes
  setTimeout(() => {
    userChoiceDisplay.classList.remove('pulse');
    computerChoiceDisplay.classList.remove('pulse');
  }, 500);
}

function updateScore(result) {
  if (result === 'win') {
    userScore++;
    userScoreElement.textContent = userScore;
  } else if (result === 'lose') {
    computerScore++;
    computerScoreElement.textContent = computerScore;
  }
}

function displayResult(result, userChoice, computerChoice) {
  statusMessage.classList.remove('win', 'lose', 'tie');
  
  let message;
  switch (result) {
    case 'win':
      message = `${choiceEmojis[userChoice]} beats ${choiceEmojis[computerChoice]}. You win!`;
      statusMessage.classList.add('win');
      break;
    case 'lose':
      message = `${choiceEmojis[computerChoice]} beats ${choiceEmojis[userChoice]}. You lose!`;
      statusMessage.classList.add('lose');
      break;
    case 'tie':
      message = `${choiceEmojis[userChoice]} equals ${choiceEmojis[computerChoice]}. It's a tie!`;
      statusMessage.classList.add('tie');
      break;
  }
  
  statusMessage.textContent = message;
}

function checkGameOver() {
  if (userScore === winningScore || computerScore === winningScore) {
    const winner = userScore === winningScore ? 'You' : 'Computer';
    setTimeout(() => {
      alert(`Game Over! ${winner} won the game!`);
      if (winner === 'You') {
        createConfetti();
      }
      resetGame();
    }, 500);
  }
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  userScoreElement.textContent = '0';
  computerScoreElement.textContent = '0';
  statusMessage.textContent = 'Choose your move!';
  statusMessage.classList.remove('win', 'lose', 'tie');
  battleArea.classList.remove('active');
  choices.forEach(choice => choice.classList.remove('selected'));
  userChoiceDisplay.textContent = '?';
  computerChoiceDisplay.textContent = '?';
}

function showRules() {
  rulesModal.style.display = 'flex';
}

function closeRules() {
  rulesModal.style.display = 'none';
}

// Confetti effect for winning the game
function createConfetti() {
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 10 + 5}px`;
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.position = 'absolute';
    confetti.style.top = '-10px';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.borderRadius = '50%';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    const animationDuration = Math.random() * 3 + 2;
    confetti.style.animation = `fall ${animationDuration}s linear forwards`;
    
    // Add fall animation
    const keyframes = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(${Math.random() * 360 + 180}deg);
        }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    confettiContainer.appendChild(confetti);
    
    // Remove confetti after animation completes
    setTimeout(() => {
      confetti.remove();
      style.remove();
    }, animationDuration * 1000);
  }
}

function getRandomColor() {
  const colors = [
    '#9b87f5', '#7E69AB', '#4ade80', '#facc15', '#f87171', 
    '#60a5fa', '#c084fc', '#2dd4bf', '#fb923c', '#f472b6'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize the game
resetGame();
