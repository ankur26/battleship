const Ship = (length, horizontal = true) => {
	// let shipLength = length;
	let position = {}; 

    function checkValidity(x,y,length,orientation){
        return (x + length >= 10 && orientation) || (y + length >= 10 && !orientation)
    }
	const setPosition = (x, y) => {
		if (checkValidity(x,y,length,horizontal)) {
			throw new Error('Position exceeds grid size');

		}
        else if(Object.keys(position).length > 0){
            throw new Error('Cannot set position after it has been initialized');
        } 
        else {
            position['origin'] = {x,y};
			for (let i = 0; i < length; i++) {
				position[`${x}${y}`] = false;
				x += 1 && horizontal;
				y += 1 && !horizontal;
			}
            return true;
		}
	};
    const getOrigin = () => {
        if (position.hasOwnProperty('origin')){
            return position['origin'];
        }else{
            throw new Error('Position has not been set');
        }
    }
	const getCoordinates = () => {
		if(position.hasOwnProperty('origin')){
			let coordinates = [];
			let i = 0;
			let {x,y} = position['origin'];
			while(i<length){
				coordinates.push([x,y]);
				x+=1 && horizontal;
				y+=1 && !horizontal;
				i++;
			}
			return coordinates
		}else{
			throw new Error('Position has not been set');
		}
	}
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
	return { hit, isSunk, setPosition, length,getOrigin, getCoordinates };
};

module.exports = Ship;