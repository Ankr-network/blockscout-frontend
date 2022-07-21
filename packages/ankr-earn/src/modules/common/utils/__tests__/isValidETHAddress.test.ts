import { isValidETHAddress } from '../isValidETHAddress';

const VALID_ADDRESSES: string[] = [
  '0xc1912fee45d61c87cc5ea59dae31190fffff232d',
  '0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D',
];

const INVALID_ADDRESSES: string[] = [
  '0xc1912fee45d61c87cc5ea59dae31190fffff23h',
  '0XC1912FEE45D61C87CC5EA59DAE31190FFFFF22g1',
  '0XC1912FEE45D61C87CC5EA59DAE31190FFF22g1',
  '0pC1912FEE45D61C87CC5EA59DAE31190FFF22g1',
];

describe('modules/common/utils/isValidETHAddress', () => {
  it('Case 1: Is valid address', () => {
    VALID_ADDRESSES.forEach((address: string): void => {
      expect(isValidETHAddress(address)).toBe(true);
    });
  });

  it('Case 2: Is invalid address', () => {
    INVALID_ADDRESSES.forEach((address: string): void => {
      expect(isValidETHAddress(address)).toBe(false);
    });
  });
});
