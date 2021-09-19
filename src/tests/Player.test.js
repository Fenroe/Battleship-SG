import Player from "../Player";

test('create player controlled by Jake', () => {
  let jake = Player('Jake');
  expect(jake.getController()).toBe('Jake');
});
test('create player without specifying controller and return computer as controller', () => {
  let comp = Player();
  expect(comp.getController()).toBe('Computer');
});
test('player creates their own gameboard automatically', () => {
  let tester = Player('Tester');
  expect(tester.getBoard()).not.toBe(undefined);
});
test('player can attack other player and affect their board', () => {
  let playerA = Player('A');
  let playerB = Player('B');
  playerA.attack(playerB, 'A1');
  expect(playerB.getBoard().getMissedShots()).toEqual(['A1']);
});
test('player attack fails if coordinate is not valid by gameboard definition', () => {
  let playerA = Player('A');
  let playerB = Player('B');
  playerA.attack(playerB, 'Z55');
  expect(playerB.getBoard().getMissedShots()).toEqual([]);
});
test('player logs attacks', () => {
  let playerA = Player('A');
  let playerB = Player('B');
  playerA.attack(playerB, 'B5');
  expect(playerA.getPreviousAttacks()).toEqual(['B5']);
});
test('player cannot attack the same coordinate more than once', () => {
  let playerA = Player('A');
  let playerB = Player('B');
  playerA.attack(playerB, 'A2');
  playerA.attack(playerB, 'B6');
  playerA.attack(playerB, 'A2');
  expect(playerA.getPreviousAttacks()).toEqual(['A2', 'B6']);
});
test('player contnrolled by computer can make a random attack that follows established rules after being attacked', () => {
  let playerA = Player('A');
  let computer = Player();
  playerA.attack(computer, 'B6');
  expect(computer.getPreviousAttacks().length).toBe(1);
});