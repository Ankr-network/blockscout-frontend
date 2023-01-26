import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';

import { calcTotalAmount, ICalcTotalAmountArgs } from '../calcTotalAmount';

describe('modules/stake-eth/utils/calcTotalAmount', () => {
  const defaultArgs: ICalcTotalAmountArgs = {
    selectedToken: Token.aETHb,
    amount: new BigNumber(1),
    ethBalance: new BigNumber(5),
    aETHcRatio: new BigNumber(0.5),
    stakeGasFee: new BigNumber(0.1),
  };

  test('should return correct aETHb total amount', () => {
    const expectedResult = new BigNumber(1);

    expect(calcTotalAmount(defaultArgs)).toStrictEqual(expectedResult);
  });

  test('should return correct aETHb total amount minus fee', () => {
    const args: ICalcTotalAmountArgs = {
      ...defaultArgs,
      amount: new BigNumber(4.94),
    };
    const expectedResult = new BigNumber(4.9);

    expect(calcTotalAmount(args)).toStrictEqual(expectedResult);
  });

  test('should return correct aETHc total amount', () => {
    const args: ICalcTotalAmountArgs = {
      ...defaultArgs,
      selectedToken: Token.aETHc,
    };
    const expectedResult = new BigNumber(0.5);

    expect(calcTotalAmount(args)).toStrictEqual(expectedResult);
  });

  test('should return correct aETHc total amount minus fee', () => {
    const args: ICalcTotalAmountArgs = {
      ...defaultArgs,
      selectedToken: Token.aETHc,
      amount: new BigNumber(5),
    };
    const expectedResult = new BigNumber(2.45);

    expect(calcTotalAmount(args)).toStrictEqual(expectedResult);
  });
});
