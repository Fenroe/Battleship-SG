import Game from "../Game";

test('place all ships gives both players five ships each', () => {
  Game.placeAllShips();
  expect(Game.player.getBoard().getFloatingShips()).toBe(5);
  expect(Game.computer.getBoard().getFloatingShips()).toBe(5);
})