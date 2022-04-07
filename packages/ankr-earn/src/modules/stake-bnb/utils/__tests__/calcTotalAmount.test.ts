import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';

import { calcTotalAmount, ICalcTotalAmountArgs } from '../calcTotalAmount';

describe('modules/stake-eth/utils/calcTotalAmount', () => {
  const defaultArgs: ICalcTotalAmountArgs = {
    selectedToken: Token.aBNBb,
    amount: new BigNumber(1),
    balance: new BigNumber(5),
    stakeGasFee: new BigNumber(0.1),
    relayerFee: new BigNumber(0.2),
    aBNBcRatio: new BigNumber(0.5),
  };

  test('should return correct aBNBb total amount', () => {
    const expectedResult = new BigNumber(0.8);

    expect(calcTotalAmount(defaultArgs)).toStrictEqual(expectedResult);
  });

  test('should return correct aBNBb total amount minus fee', () => {
    const args: ICalcTotalAmountArgs = {
      ...defaultArgs,
      amount: new BigNumber(4.94),
    };
    const expectedResult = new BigNumber(4.7);

    expect(calcTotalAmount(args)).toStrictEqual(expectedResult);
  });

  test('should return correct aBNBc total amount', () => {
    const args: ICalcTotalAmountArgs = {
      ...defaultArgs,
      selectedToken: Token.aBNBc,
    };
    const expectedResult = new BigNumber(0.4);

    expect(calcTotalAmount(args)).toStrictEqual(expectedResult);
  });

  test('should return correct aBNBc total amount minus fee', () => {
    const args: ICalcTotalAmountArgs = {
      ...defaultArgs,
      selectedToken: Token.aBNBc,
      amount: new BigNumber(5),
    };
    const expectedResult = new BigNumber(2.35);

    expect(calcTotalAmount(args)).toStrictEqual(expectedResult);
  });
});
