import ship from "../src/ship";

const s = ship(5);

test("should return length", () => {
  expect(s.getLength()).toBe(5);
});
test("should register a hit", () => {
  expect(s.hit()).toBe(true);
});
test("should return how many times ship was hit", () => {
  expect(s.numberOfHits()).toBe(1);
});
test("check if the ship is sunk", () => {
  expect(s.isSunk()).toBe(false);
});
test("check if the ship is sunk after correct hits", () => {
  let n = s.numberOfHits();
  let l = s.getLength();
  for (let i = n; i < l; i++) {
    // console.log(i);
    expect(s.hit()).toBe(true);
  }
  expect(s.isSunk()).toBe(true);
});
test("should return false if we go for a hit after ship is sun", () => {
  expect(s.isSunk()).toBe(true);
  expect(s.hit()).toBe(false);
});

test("should throw an error if invalid length is passed", () => {
    expect(()=>{return ship(-1)}).toThrow("Cannot accept empty/undefined or values less than 0");
});

test('should not accept object or string values', () => { 
    expect(()=>{return ship("1111")}).toThrow("Need a numeric value for length");
    expect(()=>{return ship({something:"something"})}).toThrow("Need a numeric value for length");
    
})
