import '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { groupLeadingFloatZeroes } from '../numbers/groupLeadingFloatZeroes';

describe('modules/common/utils/numbers/groupLeadingFloatZeroes', () => {
  test('should show last digit', () => {
    const result = groupLeadingFloatZeroes(
      new BigNumber('0.000000000000000001234567'),
      5,
    );

    expect(result).toStrictEqual({
      lead: '0.0',
      number: '1',
      zeroesCount: 16,
    });
  });

  test('should show last two digit', () => {
    const result = groupLeadingFloatZeroes(
      new BigNumber('0.000000000000000001234567'),
      6,
    );

    expect(result).toStrictEqual({
      lead: '0.0',
      number: '12',
      zeroesCount: 16,
    });
  });

  test('should show full number', () => {
    const result = groupLeadingFloatZeroes(
      new BigNumber('0.000000000000000001'),
      21,
    );

    expect(result).toStrictEqual({
      lead: '0.000000000000000001',
      number: '',
      zeroesCount: 0,
    });
  });

  test('should show formatted number if value is bigger than 0.0001', () => {
    const result = groupLeadingFloatZeroes(
      new BigNumber('0.123456789012345678'),
      10,
    );

    expect(result).toStrictEqual({
      lead: '0.1235',
      number: '',
      zeroesCount: 0,
    });
  });

  test('should show grouped number if value is smaller than 0.0001', () => {
    const result = groupLeadingFloatZeroes(
      new BigNumber('0.123456789012345678'),
      10,
    );

    expect(result).toStrictEqual({
      lead: '0.1235',
      number: '',
      zeroesCount: 0,
    });
  });

  test('should show zero', () => {
    const result = groupLeadingFloatZeroes(new BigNumber('0.0'), 6);

    expect(result).toStrictEqual({
      lead: '0',
      number: '',
      zeroesCount: 0,
    });
  });

  test('should not group if value is bigger than zero', () => {
    const result = groupLeadingFloatZeroes(new BigNumber('1234567.1234567'), 6);

    expect(result).toStrictEqual({
      lead: '1,234,567.12',
      number: '',
      zeroesCount: 0,
    });
  });

  test('should not group if value is smaller than max', () => {
    const result = groupLeadingFloatZeroes(new BigNumber('1234567.12'), 11);

    expect(result).toStrictEqual({
      lead: '1,234,567.12',
      number: '',
      zeroesCount: 0,
    });
  });

  test('should throw error', () => {
    const fn = () => {
      groupLeadingFloatZeroes(new BigNumber('0.000000000000000001234567'), 4);
    };

    expect(fn).toThrowError();
  });
});
