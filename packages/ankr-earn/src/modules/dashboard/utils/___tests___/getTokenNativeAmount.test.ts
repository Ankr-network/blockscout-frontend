import BigNumber from 'bignumber.js';

import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';

describe('modules/dashboard/utils/getTokenNativeAmount', () => {
  test('should return the proper data', () => {
    expect(
      getTokenNativeAmount(new BigNumber(3), new BigNumber(2)),
    ).toStrictEqual(new BigNumber(1.5));

    expect(
      getTokenNativeAmount(new BigNumber(0), new BigNumber(2)),
    ).toStrictEqual(new BigNumber(0));

    expect(
      getTokenNativeAmount(new BigNumber(3), new BigNumber(0)),
    ).toBeUndefined();

    expect(getTokenNativeAmount(new BigNumber(0), undefined)).toBeUndefined();
  });
});
