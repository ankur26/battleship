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

	const changeOrientation = () => {orientation = !orientation};
	const getOrientation = () => orientation;

	const overlap = (ship) => {
	    let coordinates = [];
	    if (ships.length === 0 ){
	        return {valid:true,coordinates};
	    }

	    ship.getCoordinates().forEach(coordinate =>{
            let [x,y] =  coordinate;
	        if(board[x][y].occupied){
                coordinates.push(coordinate);
	        }
	    });
        return {valid:coordinates.length === 0,coordinates}
	}
	const updateBoard = (ship) => {
		try {
			ship.getCoordinates().forEach(coordinate => {
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
			let ship = Ship(length, orientation);
			ship.setPosition(x, y);
			let { valid, coordinates } = overlap(ship);
			if (valid) {
				ships.push(ship);
				updateBoard(ship);
			}
			return { valid, coordinates };
		} catch (e) {
			console.error(e);
		}
	};

    return {getOrientation,changeOrientation,placeShip};
};

module.exports = GameBoard;
