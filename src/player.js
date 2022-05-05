const { EvalSourceMapDevToolPlugin } = require('webpack');
const gameboard = require('./gameboard');
const Player = (name = 'Computer') => {
	let playerGameboard = gameboard();
	const updateOrientation = () => playerGameboard.changeOrientation();
	const getNamedOrientation = () => (playerGameboard.getOrientation() ? 'Horizontal' : 'Vertical');
	const getName = () => name;
	const takeAttack = (x, y) => {
        try {
            return playerGameboard.receiveAttack(x, y);
        } catch (e) {
            throw new Error(e);
        }
	};
	const setShip = (x, y, length) => {
		try {
			return playerGameboard.placeShip(x, y, length);
		} catch (e) {
			throw new Error(e);
		}
	};
	return { getName, updateOrientation, getNamedOrientation, setShip, takeAttack };
};

module.exports = Player;
