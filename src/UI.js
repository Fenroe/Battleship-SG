const UI = (() => {
  const content = document.getElementById('content');

  function makePreGameScreen() {
    const preGameContainer = document.createElement('div');
    preGameContainer.classList.add('pre-game-container');
    const playerNameLabel = document.createElement('label');
    playerNameLabel.classList.add('player-name-label');
    const playerNameInput = document.createElement('input');
    playerNameInput.classList.add('player-name-input');
  }

  // game in progress
  function makePlayerBoard(tiles, controller) {
    const playerboard = document.createElement('div');
    playerboard.classList.add('game-board', controller);
    tiles.forEach((tile) => {
      let element = document.createElement('div');
      element.classList.add('board-tile');
      element.setAttribute('data-index', tile);
      element.setAttribute('data-attacked', 'no');
      element.setAttribute('data-marked', 'no');
      playerboard.append(element);
    })
    return playerboard;
  }

  function makeBoards(tiles) {
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('game-board-container');
    boardContainer.append(makePlayerBoard(tiles, 'player-one'));
    boardContainer.append(makePlayerBoard(tiles, 'player-two'));
    content.append(boardContainer);
  }

  function updateTiles(board, receivedAttacks, occupiedTiles) {
    const tiles = board.querySelectorAll('.board-tile');
    tiles.forEach((tile) => {
      if(receivedAttacks.includes(tile.dataset.index) && tile.dataset.marked === 'no') {
        if(occupiedTiles.includes(tile.dataset.index)) {
          tile.classList.add('occupied-attacked-tile');
        } else {
          tile.classList.add('attacked-tile');
        }   
        tile.dataset.marked = 'yes';
      }
    })
  }

  function updateAllTiles(playerReceivedAttacks, playerOccupiedTiles, enemyReceivedAttacks, enemeyOccupiedTiles) {
    const playerBoard = document.querySelector('.player-one');
    const computerBoard = document.querySelector('.player-two');
    updateTiles(playerBoard, playerReceivedAttacks, playerOccupiedTiles);
    updateTiles(computerBoard, enemyReceivedAttacks, enemeyOccupiedTiles);
  }

  function initTiles(opponent, callback, callbackTwo, callbackThree, sender) {
    const board = document.querySelector('.player-two')
    const boardTiles = board.querySelectorAll('.board-tile');
    boardTiles.forEach((tile) => {
      tile.addEventListener('click', () => {
        tile.dataset.attacked = 'yes';
        callback(opponent, tile.dataset.index, callbackTwo, callbackThree, sender);       
      })
    })
  }

  function colourOccupiedTiles(occupiedTiles) {
    const board = document.querySelector('.player-one');
    const boardTiles = board.querySelectorAll('.board-tile');
    boardTiles.forEach((tile) => {
      if(occupiedTiles.includes(tile.dataset.index)) {
        tile.classList.add('occupied-tile');
      }
    })
  }

  function makePostGameScreen(winner) {
    content.innerHTML = '';
    const postGameContainer = document.createElement('div');
    postGameContainer.classList.add('post-game-container');
    const postGameHeading = document.createElement('div');
    postGameHeading.classList.add('post-game-heading');
    postGameHeading.textContent = `The Winner Is ${winner}`;
    postGameContainer.append(postGameHeading);
    content.append(postGameContainer);

  }

  return {
    makeBoards,
    initTiles,
    colourOccupiedTiles,
    updateAllTiles,
    makePostGameScreen
  }
})()

export default UI;