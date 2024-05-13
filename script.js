const gamePrompt = document.querySelector('#game-prompt');
const buttonElements = document.querySelectorAll('.button');
const scoreElements = document.querySelectorAll('.score');
const score = {
    wins: 0,
    ties: 0,
    losses: 0
};

//function getComputerChoice() that randomly return rock, paper or scissors
const getComputerChoice = () => {
    const choice = Math.floor(Math.random() * 3) + 1;
    switch (choice){
        case 1:
            return 'rock';
            break;
        case 2:
            return 'paper';
            break;
        case 3:
            return 'scissors';
            break;
    }
};

const updatePrompt = computerSelection => {
    switch(computerSelection){
        case 'rock':
            score.wins++;
            break;
        case 'paper':
            score.ties++;
            break;
        case 'scissors':
            score.losses++;
            break;
    }
};

const updateScoreBoard = () => {
    scoreElements.forEach(elem => {
        const scoreType = elem.id;
        elem.innerText = `${scoreType.charAt(0).toUpperCase() + scoreType.slice(1)}: ${score[scoreType]}`;
    });
};

const updateScore = winner => {
    switch(winner){
        case 'player':
            score.wins++;
            break;
        case 'equal':
            score.ties++;
            break;
        case 'computer':
            score.losses++;
            break;
    }
    updateScoreBoard();
};

//function playRound(playerSelection, computerSelection) should return wether player won
const playRound = (playerSelection, computerSelection) => {
    if (playerSelection === computerSelection){
        updateScore('equal');
    } else if (playerSelection === 'rock' && computerSelection === 'paper') {
        updateScore('computer');
    } else if (playerSelection === 'rock' && computerSelection === 'scissors'){
        updateScore('player');
    } else if (playerSelection === 'paper' && computerSelection === 'scissors'){
        updateScore('computer');
    } else if (playerSelection === 'paper' && computerSelection === 'rock'){
        updateScore('player');
    } else if (playerSelection === 'scissors' && computerSelection === 'rock'){
        updateScore('computer');
    } else if (playerSelection === 'scissors' && computerSelection === 'paper'){
        updateScore('player');
    } else {
        console.warn('Something went wrong!');
    }
    updatePrompt(computerSelection);
}

buttonElements.forEach(elem => elem.addEventListener('click', e => {
    playRound(elem.getAttribute('id'), getComputerChoice());
}));