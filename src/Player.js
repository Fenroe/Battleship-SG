import Gameboard from "./Gameboard";

const Player = (controller = 'Computer') => {
  // return controller
  function getController() {
    return controller;
  }

  // board
  let board = Gameboard();

  function getBoard() {
    return board;
  }

  // previous attacks
  let previousAttacks = [];

  function getPreviousAttacks() {
    return previousAttacks;
  }

  // launch attack
  function attack(opponent, target, callback, callbackTwo, player = this) {
    if(!board.getBoardCoordinates().includes(target)) {
      return;
    }
    if(previousAttacks.includes(target)) {
      return;
    }
    opponent.getBoard().receivedAttack(target);
    previousAttacks.push(target);
    callback();
    callbackTwo();
    console.log(board.getFloatingShips());
    opponent.setTurn(player, callback, callbackTwo);
  }

  // AI attack functions
  function computerAttack(opponent, callback, callbackTwo) {
    let index = Math.floor(Math.random() * 100);
    if(!previousAttacks.includes(board.getBoardCoordinates()[index])) {
      attack(opponent, board.getBoardCoordinates()[index], callback, callbackTwo);
    } else {
      computerAttack(opponent, callback, callbackTwo);
    }
  }

  function setTurn(opponent, callback, callbackTwo) {
    if(controller === 'Computer') {
      computerAttack(opponent, callback, callbackTwo);
    }
  }

  return {
    getController,
    getBoard,
    getPreviousAttacks,
    attack,
    setTurn,
  }
}

export default Player;