
import player from "../src/player";

const p = player();

test('default test', () => { 
    expect(p.init()).toBe(true);
 });
