import { getNextUnlockTime } from '../getNextUnlockTime';

describe('modules/referrals/utils/getNextUnlockTime', () => {
  test('should return correct end time 1d 1m', () => {
    const expectedResult = '1d 1m';

    expect(getNextUnlockTime(86_460)).toStrictEqual(expectedResult);
  });

  test('should return correct end time 50m', () => {
    const expectedResult = '50m';

    expect(getNextUnlockTime(3_000)).toStrictEqual(expectedResult);
  });
});
