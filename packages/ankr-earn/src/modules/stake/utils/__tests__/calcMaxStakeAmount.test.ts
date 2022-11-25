import BigNumber from 'bignumber.js';

import {
  calcMaxStakeAmount,
  ICalcMaxStakeAmountArgs,
} from '../calcMaxStakeAmount';

describe('modules/stake/utils/calcMaxStakeAmount.ts', () => {
  const defaultArgs: ICalcMaxStakeAmountArgs = {
    balance: new BigNumber(3.3999900000000003),
    maxAmount: new BigNumber(28.661),
    maxAmountDecimals: 8,
    stakingAmountStep: 0.00001,
  };

  test('should return correct max amount', () => {
    expect(calcMaxStakeAmount(defaultArgs)).toStrictEqual('3.39999');

    expect(
      calcMaxStakeAmount({ ...defaultArgs, maxAmount: new BigNumber(2) }),
    ).toStrictEqual('2');

    expect(
      calcMaxStakeAmount({
        ...defaultArgs,
        maxAmountDecimals: undefined,
        stakingAmountStep: undefined,
      }),
    ).toStrictEqual('3.3999900000000003');
  });

  test('should return correct amount rounded by step', () => {
    expect(
      calcMaxStakeAmount({
        ...defaultArgs,
        maxAmountDecimals: undefined,
        stakingAmountStep: 0.5,
      }),
    ).toStrictEqual('3');
  });

  test('should return correct max decimals length', () => {
    expect(
      calcMaxStakeAmount({ ...defaultArgs, maxAmountDecimals: 2 }),
    ).toStrictEqual('3.39');
  });
});
