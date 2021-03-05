let playerPokemon = {};
let computerPokemon = {};

playerPokemon = {
  name: 'Pikachu',
  imageSrc: 'images/pikachu.png',
  healthPoints: 100,
  type: 'Thunder',
  moveset: [
    {
      name: 'Tackle',
      damage: 10,
      element: 'Normal',
      critThreshold: 10,
      accuracy: 90,
    },
    {
      name: 'Thunderbolt',
      damage: 20,
      element: 'Thunder',
      critThreshold: 10,
      accuracy: 100,
    },
    {
      name: 'Quick Attack',
      damage: 10,
      element: 'Normal',
      critThreshold: 10,
      accuracy: 100,
    },
    {
      name: 'Thunder',
      damage: 35,
      element: 'Thunder',
      critThreshold: 10,
      accuracy: 70,
    },
  ],
};

computerPokemon = {
  name: 'Mudkip',
  imageSrc: 'images/mudkip.png',
  healthPoints: 100,
  type: 'Water',
  moveset: [
    {
      name: 'Tackle',
      damage: 10,
      element: 'Normal',
      critThreshold: 10,
      accuracy: 90,
    },
    {
      name: 'Mudslap',
      damage: 8,
      element: 'Ground',
      critThreshold: 10,
      accuracy: 100,
    },
    {
      name: 'Water Gun',
      damage: 10,
      element: 'Water',
      critThreshold: 10,
      accuracy: 100,
    },
    {
      name: 'Hydro Pump',
      damage: 45,
      element: 'Water',
      critThreshold: 10,
      accuracy: 80,
    },
  ],
};

let pokemonInGame = [playerPokemon, computerPokemon];
let player = {}, pokemonImgContainer = {}, pokemonImg = {}, healthBar = {}, remainingHealthBar = {},
healthBarText = {}, movesContainer = {}, move = {}, moveMessage = {};
//will have to keep these empty/undefined as they will be initialized in the loop.
let container = document.querySelector('.container');


//create HTML content via JS
for (let i = 0; i < 2; ++i) {

  player = document.createElement('div'); //create node for each player - user and computer
  if (i == 0) {
    player.classList.add('player', 'user');
  } else {
    player.classList.add('player', 'computer');
  }

  pokemonImg = document.createElement('img'); //create img node
  pokemonImg.src = pokemonInGame[i].imageSrc;
  pokemonImg.classList.add('pokemonImg');

  pokemonImgContainer = document.createElement('div'); //create img container node
  pokemonImgContainer.classList.add('pokemonImgContainer');

  pokemonImgContainer.append(pokemonImg); //append the image to the container
  player.append(pokemonImgContainer); //append container to the player node
  container.append(player); //append the players to the main container itself

//create HP text via JS
  healthBarText = document.createElement('div');
  healthBarText.textContent = 'HP';

//create HP bar via JS
  healthBar = document.createElement('div');
  healthBar.classList.add('healthBar');

  remainingHealthBar = document.createElement('div');
  if (i == 0) {
    remainingHealthBar.classList.add('userRemainingHealthBar');
  } else {
    remainingHealthBar.classList.add('computerRemainingHealthBar');
  }

  healthBar.append(remainingHealthBar);
  player.append(healthBarText);
  player.append(healthBar);

//create moves via JS
  movesContainer = document.createElement('div');
  movesContainer.classList.add('movesContainer');

  for (let j = 0; j < 4; ++j) {
    move = document.createElement('div');
    move.classList.add('move');
    move.textContent = pokemonInGame[i].moveset[j].name;
    movesContainer.append(move);

    if (i == 0) {
      move.className += ' userMove'; //class for the player only, not the computer
    //userMove will be used to include an eventlistener for user input
    }
  }

  player.append(movesContainer);

//container for move message
  moveMessage = document.createElement('div');
  moveMessage.classList.add('moveMessage', 'disappear');
  player.append(moveMessage);
}

let userMoves = document.querySelectorAll('.userMove');
let getMovesContainer = document.querySelectorAll('.movesContainer');
let getMoveMessage = document.querySelectorAll('.moveMessage');
let getWinnerMessage = document.querySelectorAll('.winnerHide');

userMoves.forEach(function (move, index) {
  move.addEventListener('click', function () {
    let moveClickedTxt = move.textContent;
    let userPokemonMoveset = playerPokemon.moveset; //gets the moveset of the user's pokemon
    // let computerUserMoveset = computerPokemon.moveset;
    let i = 0;
    let indexOfMoveClicked = 0;

    while (userPokemonMoveset[indexOfMoveClicked].name != moveClickedTxt) {
      ++indexOfMoveClicked;
    }
    // console.log(indexOfMoveClicked);
    // will iterate over the userPokemonMoveset to get the index of the move clicked using the
    // move's name

    getMovesContainer[0].classList.add('disappear'); 
    getMoveMessage[0].classList.toggle('disappear');
    //the player's movesContainer will disappear upon clicking of a move
    //moveMessage will then appear to display the attack message

    //user's turn to attack
    processAttack(
      indexOfMoveClicked,
      playerPokemon,
      computerPokemon,
      'computerRemainingHealthBar',
      'user'
    );

    
    let computerMoveChosen = -1;
    //initialize to negative 1

    setTimeout(function() {
    //code below will execute 2 seconds after the user clicks a move

      //if computer's hp drops to zero, then game ends and displays a message that you won
      if (computerPokemon.healthPoints == 0) {
        getWinnerMessage[0].classList.remove('winnerHide');
        getWinnerMessage[0].classList.add('winnerAppear');
        return;
      }

      //the computer's moves contain will disppear sine it will be its turn to attack
      //the computer's attack message box will alsp appear
      getMovesContainer[1].classList.add('disappear');
      getMoveMessage[1].classList.toggle('disappear');

      computerMoveChosen = Math.floor(Math.random() * 4);
      //this randomizes the move that the computer will choose

      processAttack(
        computerMoveChosen,
        computerPokemon,
        playerPokemon,
        'userRemainingHealthBar',
        'computer'
      );

      setTimeout(function () {
        //2 seconds after opponent chooses a move, the code below will execute
        getMovesContainer[0].classList.remove('disappear');
        getMoveMessage[0].classList.toggle('disappear');
        //user's moveset will appear on screen

        getMovesContainer[1].classList.remove('disappear');
        getMoveMessage[1].classList.toggle('disappear');
        //computer's moveset will appear on screen

        if (playerPokemon.healthPoints == 0) {
          getWinnerMessage[1].classList.remove('winnerHide');
          getWinnerMessage[1].classList.add('winnerAppear');
          return;
          //game ends and 'YOU LOSE' message will appear
        }
      }, 2000);
    }, 2000);

    if (computerPokemon.healthPoints == 0) {
      return;
    }

  });
});


function processAttack(
  indexOfMoveChosen,
  player, //this will be used to get the whole pokemon object currently attacking - can be compute
  //or user - and we'll also use its moveset
  opponent, //this will receive the whole object of the opponent pokemon
  classOfOpponentHealthBar, //receives a string, either 'userRemainingHealthBar' or 'computerRemainingHealthBar'
  classOfPlayer, //each player is assigned a unique class - 'user' or a 'computer'
){
  
  let turnDamage = player.moveset[indexOfMoveChosen].damage;
  //gets the damage of the move/attack chosen

  let effectivity = checkEffectivity(
    player.moveset[indexOfMoveChosen].element,
    opponent    
  );

  if (effectivity == 0) {
    turnDamage /= 2; //if move or attack is not effective, half the damage
  } else if (effectivity == 1) {
    turnDamage *= 2; //if move or attack is effective, double the damage
  }

  //use a randomizer for critical chance
  let critChance = Math.floor(Math.random() * 100);
  let critTrigger;
  if (critChance <= player.moveset[indexOfMoveChosen].critThreshold) {
    turnDamage *= 2;
    critTrigger = true;
  }
  //if critChance is less than or equal to the critThreshold of the move or attack chosen,
  //then double the damage and set critTrigger to true

  let attackHit = false; //this determines if the attack will land or not

  if (player.moveset[indexOfMoveChosen].accuracy == 100){
  //if the move chosen has 100 accuracy, then attack will land without fail
  //turn attackHit to true in this case
    attackHit = true;
  } else {
    //if the move's accuracy is not 100, then perform randomization
    let accuracy = Math.floor(
      Math.random() * player.moveset[indexOfMoveChosen].accuracy + 1
    );  

    if(accuracy <= player.moveset[indexOfMoveChosen].accuracy) {
    //if accuracy is less than or equal to the accuracy of the move, then attack executes
      attackHit = true;
    } else {
    // otherwise, attack misses
      attackHit = false;   
    }
  }

  executeAttack(
    indexOfMoveChosen,
    turnDamage,
    critTrigger,
    attackHit,
    effectivity,
    player,
    classOfPlayer,
    opponent,
    classOfOpponentHealthBar,
  );
}


function checkEffectivity(moveElement, opponent) {
  if (moveElement == 'Thunder') {
    if (opponent.type == 'Water') {
      return 1; //1 means effective
    }
  }
  if (moveElement == 'Ground') {
    if (opponent.type == 'Thunder') {
      return 1;
    }
  }
  if (moveElement == 'Water') {
    if (opponent.type == 'Thunder') {
      return 0; //0 means weak
    }
  }
  return -1; //-1 means neither effective nor weak
}

//classOfOpponentHealthBar comes from processAttack function
//it's passed to processAttack as a string, either 'userRemainingHealthBar' or 'computerRemainingHealthBar'


function executeAttack(
    indexOfMoveClicked,
    damage,
    crit,
    attackHit,
    effectivity,
    player, //the currently attacking pokemon object - could be the user or computer
    classOfPlayer, //either 'user' or 'computer'
    opponent, //whole object of the opponent pokemon - could be user or computer
    classOfOpponentHealthBar
  ) {
    let message = '';
    if (attackHit) { //if attack hits
      opponent.healthPoints -= damage; //if accurate, execute attack to opponent's health
      if (opponent.healthPoints < 0) {
        opponent.healthPoints = 0; //if hp calculation results into a negative, then set hp to zero
      }

      //update healthbar of opponent
      document.querySelector(
        '.' + classOfOpponentHealthBar
      ).style.width = `${opponent.healthPoints}%`;

      //display attack message
      message = `${player.name} used ${player.moveset[indexOfMoveClicked].name}!`;
      if (effectivity == 0) {
        message += " It's not very effective.";
      } else if (effectivity == 1) {
        message += " It's super effective!";
      }
      if (crit) {
        message += " It's a critical hit!";       //append to text
      }

    } else { //if attack misses

      message = `${player.name}'s attack missed.`;
      //display attack missed message
    }
    let moveMessageContainer = document.querySelector(
      `.${classOfPlayer} .moveMessage`
    );
    moveMessageContainer.textContent = message;
  }