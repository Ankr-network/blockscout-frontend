import { getAprFromBalance } from '../getAprFromBalance';

describe('modules/stake-eth/utils/getAprFromBalance', () => {
  test('should return correct APR', () => {
    expect(getAprFromBalance(100)).toBe(0);
    expect(getAprFromBalance(5000000)).toBe(7.03);
    expect(getAprFromBalance(11000000)).toBe(4.97);
  });
});
