const Ship = (length, horizontal = true) => {
	// let shipLength = length;
	let position = {};
	let setPosition = (x, y) => {
		if ((x + length >= 10 && horizontal) || (y + length >= 10 && !horizontal)) {
			throw new Error('Position exceeds grid size');

		}
        else if(Object.keys(position).length > 0){
            throw new Error('Cannot set position after it has been initialized');
        } 
        else {
			for (let i = 0; i < length; i++) {
				position[`${x}${y}`] = false;
				x += 1 && horizontal;
				y += 1 && !horizontal;
			}
            return true;
		}
	};
	const hit = (x, y) => {
		if (position.hasOwnProperty(`${x}${y}`)) {
			position[`${x}${y}`] = true;
			return true;
		}
		return false;
	};
	const isSunk = () => {
		for (key in position) {
			if (!position[key]) {
				return false;
			}
		}
		return true;
	};
	return { hit, isSunk, setPosition, length };
};

module.exports = Ship;