import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { AvailableSwitcherToken } from 'modules/switcher/const';

import { getFromLabel, getToLabel } from '../labels';

describe('modules/switcher/screens/Main/utils/labels', () => {
  test('should return "from" label properly', () => {
    expect(getFromLabel({ token: Token.aETHb })).toBe('1 aETHb = 1 ETH');
    expect(getFromLabel({ token: Token.aETHc })).toBe('1 aETHb = 1 ETH');
    expect(getFromLabel({ token: Token.aBNBb })).toBe('1 aBNBb = 1 BNB');
    expect(getFromLabel({ token: Token.aBNBc })).toBe('1 aBNBb = 1 BNB');
  });

  test('should return empty "from" label for unknown token', () => {
    const result = getFromLabel({ token: 'unknown' as AvailableSwitcherToken });

    expect(result).toBe('');
  });

  test('should return "to" label properly', () => {
    const ratio = new BigNumber(0.64);

    expect(getToLabel({ token: Token.aETHb, ratio })).toBe(
      '1 aETHc = 1.5625 ETH',
    );
    expect(getToLabel({ token: Token.aETHc, ratio })).toBe(
      '1 aETHc = 1.5625 ETH',
    );
    expect(getToLabel({ token: Token.aBNBb, ratio })).toBe(
      '1 aBNBc = 1.5625 BNB',
    );
    expect(getToLabel({ token: Token.aBNBc, ratio })).toBe(
      '1 aBNBc = 1.5625 BNB',
    );
  });

  test('should return empty "to" label for unknown token', () => {
    const result = getToLabel({
      token: 'unknown' as AvailableSwitcherToken,
      ratio: new BigNumber(1),
    });

    expect(result).toBe('');
  });

  test('should return zero for "from" label if ration is zero', () => {
    const result = getToLabel({
      token: Token.aETHc,
      ratio: ZERO,
    });

    expect(result).toBe('1 aETHc = 0 ETH');
  });
});
