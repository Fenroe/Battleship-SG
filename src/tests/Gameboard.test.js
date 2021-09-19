import Gameboard from "../Gameboard";

test('can place ship at position', () => {
  let testboard = Gameboard();
  testboard.placeShip('A1');
  expect(testboard.getCoordinatesWithShips()).toContain('A1');
});
test('ship with length of 4 given array of 4 coordinates will be placed', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A1', 'A2', 'A3', 'A4'], 4);
  expect(testboard.getCoordinatesWithShips()).toEqual(['A1', 'A2', 'A3', 'A4']);
});
test('ship with length of 3 given array of 2 coordinates will not be placed', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A1', 'A2'], 3);
  expect(testboard.getCoordinatesWithShips()).toEqual([]);
});
test('no invalid coordinates', () => {
  let testboard = Gameboard();
  testboard.placeShip(['Z6']);
  expect(testboard.getCoordinatesWithShips()).toEqual([]);
});
test('no duplicate coorrdinates', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A10', 'A10'], 2);
  expect(testboard.getCoordinatesWithShips()).toEqual([]);
});
test('no overlapping ships', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A1', 'A2'], 2);
  expect(testboard.getCoordinatesWithShips()).toEqual(['A1', 'A2']);
  testboard.placeShip(['A1', 'A2', 'A3'], 3);
  expect(testboard.getCoordinatesWithShips()).toEqual(['A1', 'A2']);
});
test('orders unordered sequences', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A3', 'A1', 'A2'], 3);
  expect(testboard.getCoordinatesWithShips()).toEqual(['A1', 'A2', 'A3']);
});
test('orders unordered sequences with a 10', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A8', 'A10', 'A9'], 3);
  expect(testboard.getCoordinatesWithShips()).toEqual(['A8', 'A9', 'A10']);
})
test('no diagonal coordinate sequences', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A1', 'B2', 'C3'], 3);
  expect(testboard.getCoordinatesWithShips()).toEqual([]);
});
test('no non-consecutive horizontal sequences', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A1', 'A2', 'A3', 'A7'], 4);
  expect(testboard.getCoordinatesWithShips()).toEqual([]);
});
test('no non-consecutive vertical sequences', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A1', 'B1', 'D1'], 3);
  expect(testboard.getCoordinatesWithShips()).toEqual([]);
});
test('accepts valid horizontal sequence', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A1', 'B1', 'C1'], 3);
  expect(testboard.getCoordinatesWithShips()).toEqual(['A1', 'B1', 'C1']);
});
test('no horizontal sequences that cover two or more rows', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A9', 'A10', 'B1'], 3);
  expect(testboard.getCoordinatesWithShips()).toEqual([]);
});
test('attack on a coordinate occupied by ship will record hit on ship', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A1', 'A2', 'A3'], 3);
  testboard.receivedAttack('A2');
  expect(testboard.getShipData()[0].token.getLives()).toBe(2);
});
test('attack on a coordinate not occupied by ship will record coordinate as fired on', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A1', 'A2', 'A3'], 3);
  testboard.receivedAttack('A5');
  expect(testboard.getMissedShots()).toEqual(['A5']);
});
test('attack on a coordinate already fired on will not record twice', () => {
  let testboard = Gameboard();
  testboard.placeShip(['A1', 'A2', 'A3'], 3);
  testboard.receivedAttack('A5');
  expect(testboard.getMissedShots()).toEqual(['A5']);
  testboard.receivedAttack('A5');
  expect(testboard.getMissedShots()).not.toEqual(['A5', 'A5']);
});
test('board with one placed ship returns one floating ship', () => {
  let testboard = Gameboard(); 
  testboard.placeShip(['A1'], 1);
  expect(testboard.getFloatingShips()).toBe(1);
});
test('board with three placed ships where two are sunk does not return that all ships are sunk', () => {
  let testboard = Gameboard();
  testboard.placeShip('A1');
  testboard.placeShip('A2');
  testboard.placeShip('A3');
  expect(testboard.getFloatingShips()).toBe(3);
  testboard.receivedAttack('A1');
  testboard.receivedAttack('A2');
  expect(testboard.getFloatingShips()).toBe(1);
});
test('board with three placed ships where all are sunk returns that all ships are sunk', () => {
  let testboard = Gameboard();
  testboard.placeShip('A1');
  testboard.placeShip('A2');
  testboard.placeShip('A3');
  expect(testboard.getFloatingShips()).toBe(3);
  testboard.receivedAttack('A1');
  expect(testboard.getFloatingShips()).toBe(2);
  testboard.receivedAttack('A2');
  expect(testboard.getFloatingShips()).toBe(1);
  testboard.receivedAttack('A3');
  expect(testboard.getFloatingShips()).toBe(0);
});