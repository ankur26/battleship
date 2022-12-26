const ship = (length) => {
    if(length && length<0){
        throw new Error("Cannot accept empty/undefined or values less than 0")
    }
    if(typeof length !== "number"){
        throw new TypeError("Need a numeric value for length");
    }
    let hits = 0
    const getLength = () => length
    const hit = () => {
        if (isSunk()) return false;
        hits+=1;
        return true;
    }
    const numberOfHits = () => {
        return hits;
    }
    const isSunk = () =>{
        return hits === length;
    }
    return {getLength,hit,numberOfHits,isSunk};
}

export default ship;