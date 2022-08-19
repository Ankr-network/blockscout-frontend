import { getEndEpochText } from '../getEndEpochText';

describe('modules/stake-ankr/utils/getEndEpochText', () => {
  test('should return correct end time 1d, 1m', () => {
    const expectedResult = '1d, 1m';

    expect(getEndEpochText(86_460)).toStrictEqual(expectedResult);
  });

  test('should return correct end time 50m', () => {
    const expectedResult = '50m';

    expect(getEndEpochText(3_000)).toStrictEqual(expectedResult);
  });
});
