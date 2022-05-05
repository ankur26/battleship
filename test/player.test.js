const Player = require('../src/player');


test('should return default name', () => { 
    expect(Player().getName()).toBe('Computer');
 });

test('should update name if given one', () => { 
    expect(Player('Ankur').getName()).toBe('Ankur');
 });

test('should return horizontal oritentation as defaul', () => { 
    expect(Player().getNamedOrientation()).toBe('Horizontal');
 });

test('should get new orientation after update', () => { 
    let p = Player();
    p.updateOrientation();
    expect(p.getNamedOrientation()).toBe('Vertical');
 });


let player1 = Player("Player 1");
let player2 = Player();

test('should add ships without any issues', () => { 
  expect(player1.setShip(0,0,5)).toEqual({valid:true, coordinates:[]});
  expect(player2.setShip(0,0,5)).toEqual({valid:true,coordinates:[]});
 });

test('should take an attack and receive attacks', ()=>{
    expect(player1.takeAttack(0,0)).toEqual({hit:true,gameOver:false});
    expect(player2.takeAttack(0,0)).toEqual({hit:true,gameOver:false});

})