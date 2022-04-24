const GameBoard = () => {
    
    let board = (() => {
        let output = {}
        for (let i=0;i<10;i++){
            output[i] = {}
            for (let j = 0;j<10; j++){
                output[i][j] = false;
            }
        }
        return output;
    })();

    
    
}