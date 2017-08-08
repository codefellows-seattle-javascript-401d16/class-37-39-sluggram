import * as util from './util.js';

describe('util functions', () => {

  test('renderIf should render if the condition is true', () => {
    const result = util.renderIf(true, 'a', 'b');
    expect(result).toBe('a');
  });

  test('renderIf should render the alternative if the condition is false', () => {
    const result = util.renderIf(false, 'a', 'b');
    expect(result).toBe('b');
  });

  test('renderIf should return null if the condition is false and no alternative is provided', () => {
    const result = util.renderIf(false, 'a');
    expect(result).toBe(null);
  });

  test('classToggler should add one class if it should be on', () => {
    const config = {
      fun: true,
    };
    const result = util.classToggler(config);
    expect(result).toEqual('fun');
  });

  test('classToggler should add multiple classes if they should be on', () => {
    const config = {
      happy: true,
      fun: true,
    };
    const result = util.classToggler(config);
    // strictly speaking we can't assert that this is always true,
    // Object.keys() iteration order is implementation dependent
    // so it could very well be 'fun happy'
    expect(result).toEqual('happy fun');
  });

  test('classToggler includes only classes that are on', () => {
    const config = {
      happy: true,
      fun: false,
    };
    const result = util.classToggler(config);
    expect(result).toEqual('happy');
  });

});
