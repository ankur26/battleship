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

test('should throw error if length of ship is 0', () => {
	expect(() => {
		game.placeShip(1, 2, 0);
	}).toThrow('Length is invalid');
});
test('should give a false validity and overlapped coordiates for the incorrectly placed ship', () => {
	expect(game.placeShip(0, 0, 4)).toEqual({ valid: false, coordinates: [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ] });
});

test('give a correct validity if lower level ship is placed correctly', () => {
	expect(game.placeShip(0, 1, 4)).toEqual({ valid: true, coordinates: [] });
});

test('should throw invalid error overlap between horizontal and vertical ships as well.', () => {
	game.changeOrientation();
	expect(game.getOrientation()).toBe(false);

	expect(game.placeShip(4, 0, 3)).toEqual({ valid: false, coordinates: [ [ 4, 0 ] ] });
});

test('should add vertical ship after orientation change', () => {
	expect(game.placeShip(4, 1, 3)).toEqual({ valid: true, coordinates: [] });
});

/*
Game has three ships placed
1. Of length 5 placed from (0,0) to (4,0)
2. Of length 4 placed from (0,1) to (3,1)
3. Of length 3 placed from (4,1) to (4,3)

Below we are testing the game logic for attack and game over rules.
 */

test('should throw an error for -ve and over 9 coordinates', () => {
	expect(() => {
		game.receiveAttack(10, 0);
	}).toThrow('Invalid coordinates ');

	expect(() => {
		game.receiveAttack(0, 10);
	}).toThrow('Invalid coordinates ');

	expect(() => {
		game.receiveAttack(10, 10);
	}).toThrow('Invalid coordinates ');

	expect(() => {
		game.receiveAttack(-1, 2);
	}).toThrow('Invalid coordinates ');

	expect(() => {
		game.receiveAttack(1, -14);
	}).toThrow('Invalid coordinates ');
});

test('should receive an attack', () => {
	expect(game.receiveAttack(0, 0)).toEqual({ hit: true, gameOver: false });
});

test('should throw an error if same Grid is attacked', () => {
	expect(() => {
		game.receiveAttack(0, 0);
	}).toThrow('Grid was already attacked');
});

test('should give false if it misses a hit', () => {
	expect(game.receiveAttack(9, 0)).toEqual({ hit: false, gameOver: false });
});

test('should report game over after finishing off all ships', () => {
	for (let i = 1; i < 5; i++) {
		expect(game.receiveAttack(i, 0)).toEqual({ hit: true, gameOver: false });
	}
	for (let i = 0 ; i <= 3; i++) {
		expect(game.receiveAttack(i,1)).toEqual({hit:true,gameOver:false});
	}
	for (let i=1;i<3;i++){
		expect(game.receiveAttack(4,i)).toEqual({hit:true,gameOver:false});
	}
	expect(game.receiveAttack(4,3)).toEqual({hit:true,gameOver:true});
});

test('should not allow ship placement after game is over',()=>{

	expect(()=>{
		game.placeShip(8,2,2);
	}).toThrow('Game over');
});

test('should not allow attacks after game over', () => { 
	expect(()=>{
		game.receiveAttack(8,2);
	}).toThrow('Game is potentially over');
 })