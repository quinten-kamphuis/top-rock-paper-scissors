const bod = document.querySelector('body');
const originalBackgroundColor = window.getComputedStyle(document.body).backgroundColor;

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

const updatePrompt = (winner, computerSelection) => {
    let winnerPrompt;
    switch(winner){
        case 'player':
            winnerPrompt = 'You Won!';
            break;
        case 'equal':
            winnerPrompt = "It's a tie!";
            break;
        case 'computer':
            winnerPrompt = 'You Lost!';
            break;
    }
    gamePrompt.innerText = `${winnerPrompt} 
    The computer chose: ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)}`;
};

const saveScoreToLocalStorage = () => {
    localStorage.setItem('gameScore', JSON.stringify(score));
};

const loadScoreFromLocalStorage = () => {
    const scoreData = JSON.parse(localStorage.getItem('gameScore'));
    if (scoreData) {
        score.wins = scoreData.wins;
        score.ties = scoreData.ties;
        score.losses = scoreData.losses;
    } else {
        score.wins = 0;
        score.ties = 0;
        score.losses = 0;
    }
    updateScore();
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

const disableButtons = () => {
    buttonElements.forEach(elem => {elem.classList.add("disabled");})
    bod.style.cursor = 'not-allowed';
    setTimeout(() => {
        buttonElements.forEach(elem => {elem.classList.remove("disabled");})
        bod.style.cursor = '';
    }, 1000);
};

const backgroundAnimation = winner => {
    let color;

    switch(winner){
        case 'player':
            color = '#2ecc71'
            break;
        case 'equal':
            color = '#bdc3c7'
            break;
        case 'computer':
            color = '#e74c3c'
            break;
    }

    bod.style.transition = 'none'; 
    bod.style.backgroundColor = color; 


    setTimeout(() => {
        bod.style.transition = 'background-color 1.5s ease'; 
        bod.style.backgroundColor = originalBackgroundColor; 
    }, 500);
};

//function playRound(playerSelection, computerSelection) should return wether player won
const playRound = (playerSelection, computerSelection) => {
    let winner;
    if (playerSelection === computerSelection){
        winner = 'equal';
    } else if (playerSelection === 'rock' && computerSelection === 'paper') {
        winner = 'computer';
    } else if (playerSelection === 'rock' && computerSelection === 'scissors'){
        winner = 'player';
    } else if (playerSelection === 'paper' && computerSelection === 'scissors'){
        winner = 'computer';
    } else if (playerSelection === 'paper' && computerSelection === 'rock'){
        winner = 'player';
    } else if (playerSelection === 'scissors' && computerSelection === 'rock'){
        winner = 'computer';
    } else if (playerSelection === 'scissors' && computerSelection === 'paper'){
        winner = 'player';
    } else {
        console.warn('Something went wrong!');
    }
    updateScore(winner);
    backgroundAnimation(winner);
    disableButtons();
    updatePrompt(winner, computerSelection);
    saveScoreToLocalStorage();
}

buttonElements.forEach(elem => elem.addEventListener('click', e => {
    playRound(elem.getAttribute('id'), getComputerChoice());
}));

document.addEventListener('DOMContentLoaded', () => {
    loadScoreFromLocalStorage();
});