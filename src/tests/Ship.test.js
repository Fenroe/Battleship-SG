import Ship from "../Ship";

test('created ship has length', () => {
  let testShip = Ship(4);
  expect(testShip.getLength).toBeDefined();
});
test('return 3 if gave length of 3', () => {
  let testShip = Ship(3);
  expect(testShip.getLength()).toBe(3);
});
test('return 1 if gave length of less than 1', () => {
  let testShip = Ship(-5);
  expect(testShip.getLength()).toBe(1);
});
test('newly created ship given length of 5 has 5 lives', () => {
  let testShip = Ship(5);
  expect(testShip.getLives()).toBe(5);
});
test('newly created ship given length of -5 has 1 life', () => {
  let testShip = Ship(-5);
  expect(testShip.getLives()).toBe(1);
});
test('ship with length of 5 hit in position 5 will lose 1 life', () => {
  let testShip = Ship(5);
  testShip.isHit(5)
  expect(testShip.getLives()).toBe(4);
});
test('ship with length of 1 hit in position 2 will not lose life', () => {
  let testShip = Ship(1);
  testShip.isHit(2);
  expect(testShip.getLives()).toBe(1);
});
test('ship with length of 1 hit in position 0 will not lose life', () => {
  let testShip = Ship(1);
  testShip.isHit(0);
  expect(testShip.getLives()).toBe(1);
})
test('ship with length of 3 hit once in positon 3 and once in position 2 will lose 2 life', () => {
  let testShip = Ship(3);
  testShip.isHit(3);
  testShip.isHit(2);
  expect(testShip.getLives()).toBe(1);
});
test('ship with length of 3 hit twice in position 2 will only lose 1 life', () => {
  let testShip = Ship(3);
  testShip.isHit(2);
  testShip.isHit(2);
  expect(testShip.getLives()).toBe(2);
});
test('ship with length of 1 hit in positon 1 will have 0 life', () => {
  let testShip = Ship(1);
  testShip.isHit(1);
  expect(testShip.getLives()).toBe(0);
})
test('newly created ship is not sunk', () => {
  let testShip = Ship(5);
  expect(testShip.isSunk()).toBe(false);
});
test('ship with 0 life will be sunk', () => {
  let testShip = Ship(1);
  testShip.isHit(1);
  expect(testShip.isSunk()).toBe(true);
});
test('ship with greater than 0 life will not be sunk', () => {
  let testShip = Ship(4);
  testShip.isHit(4);
  expect(testShip.isSunk()).toBe(false);
  testShip.isHit(3);
  expect(testShip.isSunk()).toBe(false);
  testShip.isHit(2);
  expect(testShip.isSunk()).toBe(false);
});

