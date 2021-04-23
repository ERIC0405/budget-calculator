const iconClasses = [
'fa-atom','fa-frog','fa-feather-alt','fa-cogs','fa-anchor','fa-fan',
'fa-bolt','fa-hat-wizard','fa-apple-alt','fa-bell','fa-bomb','fa-brain'
];

const cardsBoard = document.querySelector('#cards');
const allCards = document.querySelectorAll('.card');
const nextCard = document.querySelector('#next-card');
const yourScore = document.querySelector('#score');
const restartButton = document.querySelector('.restart');

let totalMoves = 0;
let hiddenCardsArray = [];
let wantedIconClassString = '';
let canClick = true;

let shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function onCardSelected(event) {
  if (event.target.tagName !== 'LI'|| hiddenCardsArray.length === 0) 
  	return;
  if(!canClick)
  	return;
  if (event.target.className.indexOf('matched') !== -1) {
    return;
  }
  
  canClick = false;
  totalMoves++;
  yourScore.innerHTML = totalMoves;
  event.target.classList.add('show');

  if (event.target.children[0].className.indexOf(wantedIconClassString) !== -1) {
    event.target.classList.add('matched');
    hiddenCardsArray = hiddenCardsArray.filter(iconClass => iconClass !== wantedIconClassString);
    setNextCardIcon();
    winCheck();
    canClick = true;
  } else {
    setTimeout(function() {
      event.target.classList.remove('show');
      canClick = true;
    }, 500);
  }
} 

function winCheck() {
  if (hiddenCardsArray.length === 0) {
    setTimeout(function() {
      alert('Winner! You took '+totalMoves+'moves.');
    });
  }
}

function resetGame() {

  hiddenCardsArray = shuffle(iconClasses);
  setNextCardIcon();

  totalMoves = 0;
  yourScore.textContent = 0;

  allCards.forEach(function(element,index,array) {
    element.classList.remove('matched');
    element.classList.remove('show');
    element.children[0].className = "fas " + hiddenCardsArray[index];
  })
}

function setNextCardIcon() {
  let random = Math.floor(Math.random() * hiddenCardsArray.length);
  if (hiddenCardsArray.length > 0) {
    wantedIconClassString = hiddenCardsArray[random];
    nextCard.children[0].className = "fas " + wantedIconClassString;
  }
}
cardsBoard.addEventListener('click', onCardSelected);
restartButton.addEventListener('click', resetGame);

resetGame();