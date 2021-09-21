import { upper } from "../node_modules/alphabet";
import Ship from "./Ship";

const Gameboard = () => {
  // board coordinates 
  let boardCoordinates = [];

  function getBoardCoordinates() {
    return boardCoordinates;
  }

  function initCoordinates() {
    for(let i = 0; i < 10; i += 1) {
      let letter = upper[i];
      for(let j = 1; j <= 10; j += 1) {
        let number = `${j}`;
        boardCoordinates.push(letter+number);
      }
    }
  }

  // ship data
  let shipData = [];

  function getShipData() {
    return shipData;
  }

  function addShipData(position, token) {
    shipData.push({ position, token });
  }

  // coordinates with ships
  let coordinatesWithShips = [];

  function getCoordinatesWithShips() {
    return coordinatesWithShips;
  }

  // coordinates without ships that have been attacked
  let missedShots = [];

  function getMissedShots() {
    return missedShots;
  }

  let attackedCoordinates = [];

  function getAttackedCoordinates() {
    return attackedCoordinates;
  }

  // coordinate validation methods
  function processCoordinates(setOfCoordinates) {
    if(!Array.isArray(setOfCoordinates)) {
      return [setOfCoordinates];
    }
    let orderedCoordinates = setOfCoordinates.sort();
    const coordinateIndexes = setOfCoordinates.map(coordinate => boardCoordinates.indexOf(coordinate));
    coordinateIndexes.forEach((coordinate) => {
      if(coordinate % 10 === 9) {
        let index = coordinateIndexes.indexOf(coordinate);
        let last = orderedCoordinates[index];
        orderedCoordinates.splice(index, 1);
        orderedCoordinates.push(last);
        return;
      }
    })
    return orderedCoordinates;
  }

  function validateCoordinates(setOfCoordinates) {
    let validCoordinates = true;
    setOfCoordinates.forEach((coordinate) => {
      if(!boardCoordinates.includes(coordinate)) {
        validCoordinates = false;
        return;
      }
    })
    return validCoordinates;
  }

  function checkForOverlap(setOfCoordinates) {
    let noOverlap = true;
    setOfCoordinates.forEach((coordinate) => {
      if(coordinatesWithShips.includes(coordinate)) {
        noOverlap = false;
        return;
      }
    })
    return noOverlap;
  }

  function parseSequence(array, interval) {
    let isValid = true;
    for(let i = 1; i < array.length; i += 1) {
      if(array[i] !== (array[i-1]+interval)) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }

  function checkCoordinateSequence(setOfCoordinates) {
    let validSequence = true;
    const coordinatesIndexes = setOfCoordinates.map(coordinate => boardCoordinates.indexOf(coordinate));
    const n = 10 - coordinatesIndexes.length;
    if(coordinatesIndexes[0] % 10 > n && parseSequence(coordinatesIndexes, 1) === true) {
      validSequence = false;
    }
    if(parseSequence(coordinatesIndexes, 1) === false && parseSequence(coordinatesIndexes, 10) === false) {
      validSequence = false;
    }
    return validSequence;
  }

  // place ship
  function placeShip(coordinate, length = 1) {
    let processedCoordinates = processCoordinates(coordinate);
    if(processedCoordinates.length !== length) {
      return;
    }
    if(validateCoordinates(processedCoordinates) === false) {
      return;
    }
    if(checkForOverlap(processedCoordinates) === false) {
      return;
    }
    if(checkCoordinateSequence(processedCoordinates) === false) {
      return;
    }
    processedCoordinates.forEach((coordinate) => {
      coordinatesWithShips.push(coordinate);
    })
    addShipData(processedCoordinates, Ship(length));
    floatingShips += 1;
  }

  // received attack
  function receivedAttack(coordinate) {
    if(!attackedCoordinates.includes(coordinate)) {
      attackedCoordinates.push(coordinate);
    }
    if(!coordinatesWithShips.includes(coordinate)) {
      if(!missedShots.includes(coordinate)) {
        missedShots.push(coordinate);
      }
      return;
    }
    shipData.forEach((ship) => {
      if(ship.position.includes(coordinate)) {
        const index = ship.position.indexOf(coordinate) + 1;
        ship.token.isHit(index);
        if(ship.token.isSunk()) {
          floatingShips -= 1;
        }
      }
    })
  }

  // floating ships
  let floatingShips = 0;

  function getFloatingShips() {
    return floatingShips;
  }

  // on init
  initCoordinates();

  return {
    getBoardCoordinates,
    getShipData,
    getCoordinatesWithShips,
    getMissedShots,
    getAttackedCoordinates,
    placeShip,
    receivedAttack,
    getFloatingShips
  }
}

export default Gameboard;