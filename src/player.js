const gameboard = require('./gameboard');
const Player = (name="Computer") =>{
    let playerGameboard = gameboard();
    const updateOrientation=()=> playerGameboard.changeOrientation();
    const getNamedOrientation =()=> playerGameboard.getOrientation() ? "Horizontal" : "Vertical";
    return {name,updateOrientation,getNamedOrientation};
}

module.exports = Player;