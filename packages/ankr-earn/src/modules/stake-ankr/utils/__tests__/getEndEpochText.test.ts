import { getEndEpochText } from '../getEndEpochText';

describe('modules/stake-ankr/utils/getEndEpochText', () => {
  test('should return correct end time', () => {
    expect(getEndEpochText(90_100)).toStrictEqual('1d 1h 1m');
    expect(getEndEpochText(86_460)).toStrictEqual('1d 1m');
    expect(getEndEpochText(4_000)).toStrictEqual('1h 6m');
    expect(getEndEpochText(3_000)).toStrictEqual('50m');
    expect(getEndEpochText(0)).toStrictEqual('');
    expect(getEndEpochText(-10)).toStrictEqual('');
  });
});
