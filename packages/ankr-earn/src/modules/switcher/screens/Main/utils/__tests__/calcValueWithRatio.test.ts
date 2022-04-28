import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { calcValueWithRatio } from '../calcValueWithRatio';

describe('modules/switcher/screens/Main/utils/calcValueWithRatio', () => {
  test('should calculate value with ratio for aETHb', () => {
    const result = calcValueWithRatio({
      total: new BigNumber(1),
      from: Token.aETHb,
      ratio: new BigNumber(0.64),
    });

    expect(result).toStrictEqual(new BigNumber(0.64));
  });

  test('should calculate value with ratio for aETHc', () => {
    const result = calcValueWithRatio({
      total: new BigNumber(1),
      from: Token.aETHc,
      ratio: new BigNumber(0.64),
    });

    expect(result).toStrictEqual(new BigNumber(1.5625));
  });

  test('should calculate value with zero ratio for aETHc', () => {
    const result = calcValueWithRatio({
      total: new BigNumber(1),
      from: Token.aETHc,
      ratio: ZERO,
    });

    expect(result).toStrictEqual(ZERO);
  });
});
