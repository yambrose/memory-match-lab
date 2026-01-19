
// HTML References
const moves = document.getElementById('moves');
const matches = document.getElementById('matches');
const time = document.getElementById('time');

const newGameBtn = document.getElementById('btn-new-game');
const resetBtn = document.getElementById('btn-reset');

const board = document.getElementById('board');

const GameState = {
    READY_TO_PLAY: "readyToPlay",
    WAITING: "waiting",
    GAME_OVER: "gameOver",
}

const SYMBOLS = ['🍎', '🍌', '🍇', '🍉', '🍒', '🥝', '🍍', '🍑'];
let cards;
let currentSelectedCards = [];
let gameState = GameState.WAITING;

function startNewGame() {
    moves.innerHTML = '0';
    matches.innerHTML = '0';
    time.innerHTML = '0';

    // Setup board
    let boardSymbols = [...SYMBOLS, ...SYMBOLS]
    shuffleArray(boardSymbols);

    for (const [index, symbol] of boardSymbols.entries()) {
        createCard(index, symbol)
    }

    cards = document.querySelectorAll('.card')
    gameState = GameState.READY_TO_PLAY;
}

function shuffleArray(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

}

function createCard(index, symbol) {
    // console.log("creating card " + symbol);
    const card = document.createElement('div');
    card.className = 'card';

    const cardFace = document.createElement('span');
    cardFace.className = 'card-face';
    cardFace.innerHTML = symbol;

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
    console.log(`revealing ${card}`)

    card.classList.add('flipped');
    currentSelectedCards.push(card);

    if (currentSelectedCards.length === 2) {
        checkSelectionsForMatch()
    }
}

function checkSelectionsForMatch() {
    gameState = GameState.WAITING;
    console.log(currentSelectedCards[0].textContent, currentSelectedCards[1].textContent)
    if (currentSelectedCards[0].innerHTML === currentSelectedCards[1].innerHTML) {
        console.log("MATCH")
        currentSelectedCards.length = 0;
        gameState = GameState.READY_TO_PLAY;
    } else {
        console.log("NO MATCH")

        setTimeout(() => {
            currentSelectedCards[0].classList.remove('flipped');
            currentSelectedCards[1].classList.remove('flipped');
            currentSelectedCards.length = 0;
            gameState = GameState.READY_TO_PLAY;
        }, 500);

    }
}

startNewGame();