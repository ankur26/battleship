const ship = require('../src/ship');

let testShipHorizontal = ship(3,true);
let testShipVertical = ship(3,false);

test('should create a ship object', () => { 
    expect(typeof testShipHorizontal).toBe('object');
    expect(typeof testShipVertical).toBe('object');
});

test('length should be correctly set', () => { 
    expect(testShipHorizontal.length).toBe(3);
    expect(testShipVertical.length).toBe(3);
 });
test('should throw error if origin is not set', () => { 
    expect(()=>{
        testShipHorizontal.getOrigin()
    }).toThrow('Position has not been set');

    expect(()=>{
        testShipVertical.getOrigin()
    }).toThrow('Position has not been set');
 })
test('should set Position correctly', () => { 
    expect(testShipHorizontal.setPosition(1,1)).toBe(true);
    expect(testShipVertical.setPosition(1,1)).toBe(true);
 });

test('should return position once set', () => { 
    expect(testShipHorizontal.getOrigin()).toEqual({x:1,y:1});
    expect(testShipVertical.getOrigin()).toEqual({x:1,y:1});

 })
test('should throw Error if grid exceeds in both directions',()=>{
    expect(()=>{
        testShipHorizontal.setPosition(9,1)
    }).toThrow('Position exceeds grid size');

    expect(()=>{
        testShipVertical.setPosition(1,7);
    }).toThrow('Position exceeds grid size');
});

test('should return true for hit', () => { 
    expect(testShipHorizontal.hit(1,1)).toBe(true);
    expect(testShipVertical.hit(1,1)).toBe(true);
 });

test('should return false for no hits in both directions', () => { 
    expect(testShipHorizontal.hit(1,2)).toBe(false);
    expect(testShipVertical.hit(2,1)).toBe(false);
 });

test('should not report sunk after 1 hit', () => { 
    expect(testShipHorizontal.isSunk()).toBe(false);
    expect(testShipVertical.isSunk()).toBe(false);
 });
test('should take two more hits and report sunk horizontally', () => { 
    expect(testShipHorizontal.hit(2,1)).toBe(true);
    expect(testShipHorizontal.isSunk()).toBe(false);
    expect(testShipHorizontal.hit(3,1)).toBe(true);
    expect(testShipHorizontal.isSunk()).toBe(true);
 });
test('should take two more hits and report sunk vertically', () => { 
    expect(testShipVertical.hit(1,2)).toBe(true);
    expect(testShipVertical.isSunk()).toBe(false);
    expect(testShipVertical.hit(1,3)).toBe(true);
    expect(testShipVertical.isSunk()).toBe(true);
 });

test('should not set a new position after we set it before', () => { 
    expect(()=>{
        testShipHorizontal.setPosition(3,3)
    }).toThrow('Cannot set position after it has been initialized');
    expect(()=>{
        testShipVertical.setPosition(2,3)
    }).toThrow('Cannot set position after it has been initialized');
 });