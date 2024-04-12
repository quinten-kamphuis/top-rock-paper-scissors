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

//get player case-insensitive input via prompt
const getPlayerSelection = () => prompt("Please chose; rock, paper or scissors", "rock").toLowerCase();


const computerWon = () => console.log('Computer won :(');
const playerWon = () => console.log('Player won!');
const tie = () => console.log("It's a tie!");

//function playRound(playerSelection, computerSelection) should return wether player won
const playRound = (playerSelection, computerSelection) => {
    console.log(`
    You chose: ${playerSelection}
    Computer chose: ${computerSelection}
    `)
    if (playerSelection === computerSelection){
        tie();
    } else if (playerSelection === 'rock' && computerSelection === 'paper') {
        computerWon();
    } else if (playerSelection === 'rock' && computerSelection === 'scissors'){
        playerWon();
    } else if (playerSelection === 'paper' && computerSelection === 'scissors'){
        computerWon();
    } else if (playerSelection === 'paper' && computerSelection === 'rock'){
        playerWon();
    } else if (playerSelection === 'scissors' && computerSelection === 'rock'){
        computerWon();
    } else if (playerSelection === 'scissors' && computerSelection === 'paper'){
        playerWon();
    } else {
        console.warn('Something went wrong!');
    }
}

//function playGame() should play the game 5 times
const playGame = () => {
    for (let i = 1; i < 5; i++) {
        console.log(`Round: ${i}`);
        playRound(getPlayerSelection(), getComputerChoice());
    }
};

playGame();