import BigNumber from 'bignumber.js';

import { calcFeeAndTotal } from '../calcFeeAndTotal';

describe('modules/switcher/screens/Main/utils/calcFeeAndTotal', () => {
  test('should calculate fee and total', () => {
    const result = calcFeeAndTotal({
      feeBP: new BigNumber(30),
      amount: new BigNumber(1),
    });

    expect(result).toStrictEqual({
      fee: new BigNumber(0.003),
      total: new BigNumber(0.997),
    });
  });
});
