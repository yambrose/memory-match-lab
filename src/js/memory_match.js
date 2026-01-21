
// region HTML References

const movesLabel = document.getElementById('moves');
const matchesLabel = document.getElementById('matches');
const totalPairsLabel = document.getElementById('total-pairs');
const timeLabel = document.getElementById('time');
const winPopup = document.getElementById('message');

const newGameBtn = document.getElementById('btn-new-game');
const resetBtn = document.getElementById('btn-reset');

const board = document.getElementById('board');

// endregion

const GameState = {
    READY_TO_PLAY: "readyToPlay",
    WAITING: "waiting",
    GAME_OVER: "gameOver",
}
const SYMBOLS = ['🍎', '🍌', '🍇', '🍉', '🍒', '🥝', '🍍', '🍑'];

let cards;
let currentSelectedCards = [];
let gameState = GameState.WAITING;
let timerInterval;
let moves = 0;
let matches = 0;
let totalPairs = 0;
let timeSec = 0;

function startTimer() {
    timerInterval = setInterval(() => {
        timeSec++;
        timeLabel.textContent = `${timeSec}`
    }, 1000)
}

function resetStatuses() {
    moves = 0;
    matches = 0;
    timeSec = 0;
    totalPairs = SYMBOLS.length;

    movesLabel.textContent = moves;
    matchesLabel.textContent = matches;
    timeLabel.textContent = timeSec;
    totalPairsLabel.textContent = totalPairs;
    winPopup.style.visibility = 'hidden';
    clearInterval(timerInterval);
}

function resetSymbolPositions() {
    let boardSymbols = [...SYMBOLS, ...SYMBOLS]
    shuffleArray(boardSymbols);

    for (const [index, symbol] of boardSymbols.entries()) {
        createCard(index, symbol)
    }
}

function startNewGame() {
    gameState = GameState.WAITING;
    board.innerHTML = '';
    resetStatuses();
    resetSymbolPositions();
    resetStatuses();

    startTimer();
    gameState = GameState.READY_TO_PLAY;
    cards = document.querySelectorAll('.card')
}

function resetBoardStatus() {
    gameState = GameState.WAITING;
    resetStatuses();
    for (const card of cards) {
        card.className = 'card';
    }

    startTimer();
    gameState = GameState.READY_TO_PLAY;
    cards = document.querySelectorAll('.card')
}

function updateBoardStatus(hasMatch) {
    if (hasMatch) {matches++}
    moves++;

    matchesLabel.textContent = matches;
    movesLabel.textContent = moves;
}

function shuffleArray(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

function createCard(index, symbol) {
    const card = document.createElement('div');
    card.className = 'card';

    const cardFace = document.createElement('span');
    cardFace.className = 'card-face';
    cardFace.textContent = symbol;

    card.appendChild(cardFace);
    card.id = index;

    card.addEventListener('click', () => {
        handleCardSelection(card);
    })

    board.appendChild(card);
}

function handleCardSelection(card) {
    if (
        gameState !== GameState.READY_TO_PLAY ||
        card.classList.contains('flipped')
    ) {
        return;
    }

    card.classList.add('flipped');
    currentSelectedCards.push(card);

    if (currentSelectedCards.length === 2) {
        checkSelectionsForMatch()
    }
}

function checkSelectionsForMatch() {
    gameState = GameState.WAITING;
    console.log(currentSelectedCards[0].textContent, currentSelectedCards[1].textContent)
    if (currentSelectedCards[0].textContent === currentSelectedCards[1].textContent) {
        currentSelectedCards[0].classList.add('matched')
        currentSelectedCards[1].classList.add('matched')
        currentSelectedCards.length = 0;
        updateBoardStatus(true);
        gameState = GameState.READY_TO_PLAY;
    } else {
        currentSelectedCards[0].classList.add('wrong')
        currentSelectedCards[1].classList.add('wrong')
        setTimeout(() => {
            currentSelectedCards[0].className = 'card';
            currentSelectedCards[1].className = 'card';
            currentSelectedCards.length = 0;
            updateBoardStatus(false);
            gameState = GameState.READY_TO_PLAY;
        }, 1000);
    }

    checkForWin();
}

function checkForWin() {
    if (matches === totalPairs) {
        winPopup.style.visibility = 'visible';
    }
}

function setupButtons() {
    newGameBtn.addEventListener('click', () => startNewGame());
    resetBtn.addEventListener('click', () => resetBoardStatus());
}


setupButtons();
startNewGame();