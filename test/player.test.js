const Player = require('../src/player');


test('should return default name', () => { 
    expect(Player().name).toBe('Computer');
 });

test('should update name if given one', () => { 
    expect(Player('Ankur').name).toBe('Ankur');
 });

test('should return horizontal oritentation as defaul', () => { 
    expect(Player().getNamedOrientation()).toBe('Horizontal');
 });

test('should get new orientation after update', () => { 
    let p = Player();
    p.updateOrientation();
    expect(p.getNamedOrientation()).toBe('Vertical');
 })