import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';

import { getPortfolioUSDAmount } from '../getPortfolioUSDAmount';

describe('modules/dashboard/utils/getPortfolioUSDAmount', () => {
  const INVALID_DATA = [
    new BigNumber(NaN),
    new BigNumber(Infinity),
    new BigNumber(-Infinity),
    new BigNumber(-1.2345),
    new BigNumber(-1.23),
    new BigNumber(-1),
    ZERO,
  ];

  const VALID_DATA = [
    new BigNumber('0.01'),
    new BigNumber('0.0115'),
    new BigNumber('99.9999999999999999999999999'),
    new BigNumber('100'),
    new BigNumber('100.49999999999999999999999999'),
    new BigNumber('100.5'),
    new BigNumber('100.5678'),
    new BigNumber('100.9999999999999999999991'),
    new BigNumber('237964.008'),
    new BigNumber('237964.498'),
    new BigNumber('237964.5'),
    new BigNumber('237964.51'),
  ];

  const VALID_RESULTS = [
    '0.01',
    '0.0115',
    '99.9999999999999999999999999',
    '100',
    '100',
    '101',
    '101',
    '101',
    '237,964',
    '237,964',
    '237,965',
    '237,965',
  ];

  test('should return "0" for invalid data', () => {
    INVALID_DATA.forEach(amount => {
      const data = getPortfolioUSDAmount(amount);

      expect(data).toBe('0');
    });
  });

  test('should return valid data', () => {
    VALID_DATA.forEach((amount, i) => {
      const data = getPortfolioUSDAmount(amount);

      expect(data).toBe(VALID_RESULTS[i]);
    });
  });
});
