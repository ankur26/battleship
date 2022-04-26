const Ship = require('./ship');

const GameBoard = () => {
	/* orientation : true represents horizontal false represents vertical*/
	let orientation = true;
	let board = (() => {
		let output = {};
		for (let i = 0; i < 10; i++) {
			output[i] = {};
			for (let j = 0; j < 10; j++) {
				output[i][j] = { occupied: false, attacked: false };
			}
		}
		return output;
	})();

	let ships = [];

	const changeOrientation = () => {
		orientation = !orientation;
	};
	const getOrientation = () => orientation;

	const overlap = (ship) => {
		let coordinates = [];
		if (ships.length === 0) {
			return { valid: true, coordinates };
		}

		ship.getCoordinates().forEach((coordinate) => {
			let [ x, y ] = coordinate;
			if (board[x][y].occupied) {
				coordinates.push(coordinate);
			}
		});
		return { valid: coordinates.length === 0, coordinates };
	};
	const updateBoard = (ship) => {
		try {
			ship.getCoordinates().forEach((coordinate) => {
				let [ x, y ] = coordinate;
				board[x][y].occupied = true;
			});
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};
	const placeShip = (x, y, length) => {
		try {
			if (length <= 0) {
				throw new Error('Length is invalid');
			}
			let ship = Ship(length, orientation);
			ship.setPosition(x, y);
			let { valid, coordinates } = overlap(ship);
			if (valid) {
				ships.push(ship);
				updateBoard(ship);
			}
			return { valid, coordinates };
		} catch (e) {
			throw new Error(e);
		}
	};
	const registerHitAndCheckGameOver = (x, y) => {
		let hit = false;
		let gameOver = true;
		ships.forEach((ship) => {
			if (ship.hit(x, y)) {
				hit = true;
			}
		});
		// let gameOver = false;
		ships.forEach((ship) => {
			if (!ship.isSunk()) {
				gameOver = false;
			}
		});
		return { hit, gameOver };
	};
	const receiveAttack = (x, y) => {
		if (x > 9 || y > 9 || x < 0 || y < 0) {
			throw new Error('Invalid coordinates ');
		} else {
			if (!board[x][y].attacked) {
				board[x][y].attacked = true;
				return registerHitAndCheckGameOver(x, y);
			} else {
				throw new Error('Grid was already attacked');
			}
		}
	};
	return { getOrientation, changeOrientation, placeShip, receiveAttack };
};

module.exports = GameBoard;
