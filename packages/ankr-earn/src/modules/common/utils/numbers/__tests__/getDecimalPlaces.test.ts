import { getDecimalPlaces } from '../getDecimalPlaces';

describe('modules/common/utils/numbers/getDecimalPlaces', () => {
  test('should return actual decimal places for regular number', () => {
    const result = getDecimalPlaces(999_000.984328923);

    expect(result).toStrictEqual(4);
  });

  test('should return actual decimal places for big numbers', () => {
    const result = getDecimalPlaces(1_000_000.3465);

    expect(result).toStrictEqual(2);
  });

  test('should return actual decimal places for very big numbers', () => {
    const result = getDecimalPlaces(1_000_000_000.5435645);

    expect(result).toStrictEqual(0);
  });

  test('should return actual decimal places for NaN', () => {
    const result = getDecimalPlaces('#$%');
    const result2 = getDecimalPlaces();

    expect(result).toStrictEqual(4);
    expect(result2).toStrictEqual(4);
  });
});
