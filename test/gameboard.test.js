const GameBoard = require('../src/gameboard');

let game = GameBoard();

test('should declare a gameBoard Object', () => {
	expect(typeof game).toBe('object');
});

test('should get orientation', () => {
	expect(game.getOrientation()).toBe(true);
});

test('should update orientation', () => {
	expect(
		(() => {
			game.changeOrientation();
			return game.getOrientation();
		})()
	).toBe(false);
});

test('should place first ship with length 5', () => {
	game.changeOrientation();
	expect(game.placeShip(0, 0, 5)).toEqual({ valid: true, coordinates: [] });
});

test('should give a false validity for the next ship', () => {
	expect(game.placeShip(0, 0, 4)).toEqual({ valid: false, coordinates: [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ] });
});

test('give a correct validity if lower level ship is placed correctly', () => {
	expect(game.placeShip(0, 1, 4)).toEqual({ valid: true, coordinates: [] });
});

test('should vertical placement as well', () => {
	game.changeOrientation();
	expect(game.getOrientation()).toBe(false);

	expect(game.placeShip(4, 0, 3)).toEqual({ valid: false, coordinates: [ [ 4, 0 ] ] });
});

test('should add vertical ship after orientation change', () => {
	expect(game.placeShip(4,1,3)).toEqual({valid:true,coordinates:[]});
});
