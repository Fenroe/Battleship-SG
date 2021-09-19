const Ship = (length) => {
  function getLength() {
    if(length < 1) {
      return 1;
    } else {
      return length;
    }  
  }

  let lives = length;

  function initLives() {
    if(length < 1) {
      lives = 1;
    } else {
      lives = length;
    }
  }

  function getLives() {
    return lives;
  }

  let shipSegments = [];

  function initShipSegments() {
    for(let i = 0; i < length; i+=1) {
      shipSegments.push(true);
    }
  }

  function isHit(target) {
    if(target > length || target < 1) {
      return;
    } else if(shipSegments[target-1] === false) {
      return;
    } else {
      lives -= 1;
      shipSegments[target-1] = false;
      if(lives === 0) {
        sunk = true;
      }
    }  
  }

  let sunk = false;

  function isSunk() {
    return sunk;
  }

  initLives();
  initShipSegments();

  return {
    getLength,
    getLives,
    isHit,
    isSunk,
  }

}

export default Ship;