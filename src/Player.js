import Gameboard from "./Gameboard";

const Player = (controller = 'Computer') => {
  function getController() {
    return controller;
  }

  let board = Gameboard();

  function getBoard() {
    return board;
  }

  let previousAttacks = [];

  function getPreviousAttacks() {
    return previousAttacks;
  }

  function attack(opponent, target) {
    if(!board.getBoardCoordinates().includes(target)) {
      return;
    }
    if(previousAttacks.includes(target)) {
      return;
    }
    opponent.getBoard().receivedAttack(target);
    previousAttacks.push(target);
    opponent.setTurn(this);
  }

  let takingTurn = false;

  function computerAttack(opponent) {
    let index = Math.floor(Math.random() * 100);
    if(!previousAttacks.includes(board.getBoardCoordinates()[index])) {
      attack(opponent, board.getBoardCoordinates()[index]);
    } else {
      computerAttack(opponent);
    }
  }

  function setTurn(opponent) {
    takingTurn = true;
    if(controller === 'Computer') {
      computerAttack(opponent);
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