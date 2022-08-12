import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';

import { calcTotalAmount, ICalcTotalAmountArgs } from '../calcTotalAmount';

describe('modules/stake-matic/common/utils/calcTotalAmount', () => {
  const defaultArgs: ICalcTotalAmountArgs = {
    selectedToken: Token.aMATICb,
    amount: new BigNumber(1),
    balance: new BigNumber(5),
    aMATICcRatio: new BigNumber(0.5),
  };

  test('should return correct aMATICb total amount', () => {
    const expectedResult = new BigNumber(1);

    expect(calcTotalAmount(defaultArgs)).toStrictEqual(expectedResult);
  });

  test('should return correct aMATICb total amount minus fee', () => {
    const args: ICalcTotalAmountArgs = {
      ...defaultArgs,
      amount: new BigNumber(4.9),
    };
    const expectedResult = new BigNumber(4.9);

    expect(calcTotalAmount(args)).toStrictEqual(expectedResult);
  });

  test('should return correct aMATICc total amount', () => {
    const args: ICalcTotalAmountArgs = {
      ...defaultArgs,
      selectedToken: Token.aMATICc,
    };
    const expectedResult = new BigNumber(0.5);

    expect(calcTotalAmount(args)).toStrictEqual(expectedResult);
  });
});
