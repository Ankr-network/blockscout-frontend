import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';

import { calcTotalAmount, ICalcTotalAmountArgs } from '../calcTotalAmount';

describe('modules/stake-eth/utils/calcTotalAmount', () => {
  const defaultArgs: ICalcTotalAmountArgs = {
    selectedToken: Token.aAVAXb,
    amount: new BigNumber(1),
    balance: new BigNumber(5),
    aAVAXcRatio: new BigNumber(0.5),
  };

  test('should return correct aAVAXb total amount', () => {
    const expectedResult = new BigNumber(1);

    expect(calcTotalAmount(defaultArgs)).toStrictEqual(expectedResult);
  });

  test('should return correct aAVAXb total amount', () => {
    const args: ICalcTotalAmountArgs = {
      ...defaultArgs,
      amount: new BigNumber(4.94),
    };
    const expectedResult = new BigNumber(4.94);

    expect(calcTotalAmount(args)).toStrictEqual(expectedResult);
  });

  test('should return correct aAVAXc total amount', () => {
    const args: ICalcTotalAmountArgs = {
      ...defaultArgs,
      selectedToken: Token.aAVAXc,
    };
    const expectedResult = new BigNumber(0.5);

    expect(calcTotalAmount(args)).toStrictEqual(expectedResult);
  });

  test('should return correct aAVAXc total amount minus fee', () => {
    const args: ICalcTotalAmountArgs = {
      ...defaultArgs,
      selectedToken: Token.aAVAXc,
      amount: new BigNumber(5),
    };
    const expectedResult = new BigNumber(2.5);

    expect(calcTotalAmount(args)).toStrictEqual(expectedResult);
  });
});
