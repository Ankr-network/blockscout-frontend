import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';

import { convertAmountToBN } from '../convertAmountToBN';

describe('modules/common/utils/forms/convertAmountToBN', () => {
  test('should convert number to BigNumber', () => {
    const result = convertAmountToBN(10);

    expect(result.toFormat()).toBe(new BigNumber(10).toFormat());
  });

  test('should convert string to BigNumber', () => {
    const result = convertAmountToBN('12.1231');

    expect(result.toFormat()).toBe(new BigNumber('12.1231').toFormat());
  });

  test('should convert undefined to BigNumber', () => {
    const result = convertAmountToBN();

    expect(result.toFormat()).toBe(ZERO.toFormat());
  });
});
