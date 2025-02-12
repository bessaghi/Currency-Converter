import {ConverterUtils} from './converter.utils';

describe('ConverterUtils', () => {

  describe('roundValue', () => {
    [
      { input: 1.235, expected: 1.24 },
      { input: 1.234, expected: 1.23 },
      { input: 1.2, expected: 1.2 },
      { input: -1.235, expected: -1.24 },
      { input: -1.234, expected: -1.23 },
      { input: 0.5555, expected: 0.56 },
      { input: 2.6789, expected: 2.68 }
    ].forEach(({ input, expected }) => {
      it(`should round ${input} to ${expected}`, () => {
        expect(ConverterUtils.roundValue(input)).toBe(expected);
      });
    })
  });

  describe('convertAmount', () => {
    [
      { amount: 10, rate: 1.12345, expected: 11.23 },
      { amount: 50, rate: 1.2345, expected: 61.72 },
      { amount: 100, rate: 1.199, expected: 119.9 },
      { amount: 0, rate: 1.2345, expected: 0 },
      { amount: 50, rate: 0, expected: 0 },
      { amount: -10, rate: 1.5, expected: -15 }
    ].forEach(({ amount, rate, expected }) => {
      it(`should convert ${amount} at rate ${rate} to ${expected}`, () => {
        expect(ConverterUtils.convertAmount(amount, rate)).toBe(expected);
      });
    })
  });

});
