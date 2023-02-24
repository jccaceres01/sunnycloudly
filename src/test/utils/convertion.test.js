/**
 * 
 * Test utils functions
 */

import { mtok, tempConverter } from '../../utils/convertion';

// mtok test
describe('mtok(meters to kilometers) unit test', () => {

  let meters = Math.ceil(Math.random() * 9000) + 1000;

  it('should be a function', () => {
    expect(typeof mtok).toBe('function');
  });

  it('should return a string', () => {
    expect(typeof mtok(meters)).toBe('string');
  });

  it ('should return 0 when no params pass', () => {
    expect(mtok()).toEqual(0);
  });
});

// Temp Converter tests
describe('tempConverter unit test suit', () => {
  const typeValues = ['c', 'f'];
  const kelvinTemp = Math.floor(Math.random() * 374);

  it('should be a function', () => {
    expect(typeof tempConverter).toBe('function');
  });

  it('should return a string', () => {
    expect(typeof tempConverter(kelvinTemp, 
      typeValues[Math.floor(Math.random() * 1)])).toBe('string');
  });
});