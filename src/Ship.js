const Ship = (length) => {
  // length
  function getLength() {
    return length;
  }

  function initLength() {
    if(length < 1) {
      length = 1;
    }
  }

  // lives
  let lives = length;

  function initLives() {
    lives = length;
  }

  function getLives() {
    return lives;
  }

  // ship segments
  let shipSegments = [];

  function initShipSegments() {
    for(let i = 0; i < length; i+=1) {
      shipSegments.push(true);
    }
  }

  // hit
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

  // sunk
  let sunk = false;

  function isSunk() {
    return sunk;
  }

  // run on creation
  initLength();
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