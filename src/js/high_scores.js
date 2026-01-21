const scoresBody = document.getElementById('scores-body');

function readStorageForScores() {
    try {
        const existingScoresData = localStorage.getItem('scores');
        console.log(existingScoresData);
        return existingScoresData ? JSON.parse(existingScoresData) : [];
    } catch (error) {
        console.error("Failed to read scores from localStorage", error);
        return [];
    }
}

function renderHighScores() {
    const scores = readStorageForScores();
    const sortedScores = scores.sort((record1, record2) => record1.moves - record2.moves);

    for (const [index, score] of sortedScores.entries()) {
        createTableRow(index+1, score);
    }
}

function createTableRow(rank, record) {
    const row = document.createElement('tr');
    const rankCell = document.createElement('td');
    const nameCell = document.createElement('td');
    const movesCell = document.createElement('td');
    const bestStreakCell = document.createElement('td');
    const timeCell = document.createElement('td');
    const dateCell = document.createElement('td');

    console.log(record.name);

    rankCell.textContent = rank;
    nameCell.textContent = record.name;
    movesCell.textContent = record.moves;
    bestStreakCell.textContent = record.bestStreak;
    timeCell.textContent = record.time;
    dateCell.textContent = record.date;

    row.append(rankCell, nameCell, movesCell, bestStreakCell, timeCell, dateCell);
    scoresBody.appendChild(row);
}

renderHighScores();