import Player from "./Player";
import UI from "./UI";

const Game = (() => {
  let player = Player('Player');

  let computer = Player();

  function preGame() {
    UI.makePreGameScreen();
    UI.initStartGameButton(startGame);
  }

  function placeAllShips() {
    player.getBoard().placeShip(['C3', 'D3', 'E3', 'F3', 'G3'], 5);
    player.getBoard().placeShip(['F5', 'F6', 'F7', 'F8'], 4);
    player.getBoard().placeShip(['B2', 'B3', 'B4'], 3);
    player.getBoard().placeShip(['A9', 'B9', 'C9'], 3);
    player.getBoard().placeShip(['I5', 'J5'], 2);
    computer.getBoard().placeShip(['C3', 'D3', 'E3', 'F3', 'G3'], 5);
    computer.getBoard().placeShip(['F5', 'F6', 'F7', 'F8'], 4);
    computer.getBoard().placeShip(['B2', 'B3', 'B4'], 3);
    computer.getBoard().placeShip(['A9', 'B9', 'C9'], 3);
    computer.getBoard().placeShip(['I5', 'J5'], 2)
  }

  function setPlayers(playerName) {
    player = Player(playerName);
    computer = Player();
  }

  function updateBoard() {
    UI.updateAllTiles(
      player.getBoard().getAttackedCoordinates(),
      player.getBoard().getCoordinatesWithShips(),
      computer.getBoard().getAttackedCoordinates(),
      computer.getBoard().getCoordinatesWithShips(),
    )
  }

  function startGame(playerName) {
    setPlayers(playerName);
    UI.makeBoards(player.getBoard().getBoardCoordinates());
    placeAllShips();
    UI.colourOccupiedTiles(player.getBoard().getCoordinatesWithShips());
    UI.initTiles(computer, player.attack, updateBoard, checkForWinner, player);

  }

  function checkForWinner() {
    if(player.getBoard().getFloatingShips() === 0) {
      UI.makePostGameScreen(computer.getController());
      UI.initPlayAgainButton(preGame);
    }
    if(computer.getBoard().getFloatingShips() === 0) {
      UI.makePostGameScreen(player.getController()); 
      UI.initPlayAgainButton(preGame);    
    }
    
  }

  return {
    player,
    computer,
    preGame,
    placeAllShips,
    startGame,
  }
})()

export default Game;