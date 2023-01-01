import gameboard from "../src/gameboard";

const g = gameboard();

test("should get cell state", () => {
  expect(g.getCellState(1, 1).empty).toBe(true);
});
test("should log an error on console for invalid input", () => {
  expect(() => {
    g.getCellState();
  }).toThrow();
});

test("should check for overlaps", () => {
  expect(g.checkOverlap(1, 1, true, 2)).toBe(false);
});

test("should place a ship", () => {
  expect(g.placeShip(0, 0, true, 5)).toBe(true);
});

test("should fail overlaps for 0,0 to 0,4", () => {
  for (let i = 0; i < 5; i++) {
    expect(g.checkOverlap(0, i, true, 4)).toBe(true);
  }
});

test("should be able to place a ship at another place vertically", () => {
  expect(g.placeShip(4, 4, false, 4)).toBe(true);
});

test('should correctly check overlap across horizontal axes',()=>{
  for(let i = 4; i<8;i++)
  expect(g.checkOverlap(i,4,true,4)).toBe(true)
});

test('should correctly check for overlap for both orientations', () => { 
  //This will test other rows than the actual placed ships
  `
  Currently there are two ships positioned as mentioned below
  0,0 to 0,5 - we will test for overlap for columns 5-9 in the same row 
  4,4 to 8,4 - we will test for overlap for rows 0-3 and 9 in the same column.
  This also manages to test multi length ships.
  `
  for(let i = 5; i< 8; i++){
    expect(g.checkOverlap(0,i,true,2)).toBe(false)
  }
  for(let i = 1; i<2;i++){
    console.log(g.getCellState(i,4))
    expect(g.checkOverlap(i,4,false,2)).toBe(false)
  }
  expect(g.checkOverlap(8,4,false,2)).toBe(false)
 })

