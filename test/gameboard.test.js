import gameboard from "../src/gameboard";

const g = gameboard();

test("should get cell state for correct input", () => {
  expect(g.getCellState(1, 1)).toBe("E");
});
test("should throw error for empty input", () => {
  expect(() => {
    g.getCellState();
  }).toThrow("Row and/or column cannot be empty");
  expect(() => {
    g.getCellState(1);
  }).toThrow("Row and/or column cannot be empty");
  expect(() => {
    g.getCellState(undefined, 1);
  }).toThrow("Row and/or column cannot be empty");
});
test("should check for type", () => {
  expect(() => {
    g.getCellState("1", "2");
  }).toThrow("Row and col should have number types");
  expect(() => {
    g.getCellState(1, "2");
  }).toThrow("Row and col should have number types");
  expect(() => {
    g.getCellState("1", 2);
  }).toThrow("Row and col should have number types");
});
test("should check for row range", () => {
  expect(() => {
    g.getCellState(-1, 1);
  }).toThrow("Row cannot be less than 0 or greater than 9");
  expect(() => {
    g.getCellState(10, 1);
  }).toThrow("Row cannot be less than 0 or greater than 9");
});
test("should check for column range", () => {
  expect(() => {
    g.getCellState(1, -1);
  }).toThrow("Column cannot be less than 0 or greater than 9");
  expect(() => {
    g.getCellState(1,10 );
  }).toThrow("Column cannot be less than 0 or greater than 9");
});
