import { isValidETHAddress } from './isValidETHAddress';

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

describe('Test: isValidETHAddress', (): void => {
  it('Case 1: Is valid address', (): void => {
    VALID_ADDRESSES.forEach((address: string): void => {
      expect(isValidETHAddress(address)).toBeTruthy();
    });
  });

  it('Case 2: Is invalid address', (): void => {
    INVALID_ADDRESSES.forEach((address: string): void => {
      expect(isValidETHAddress(address)).toBeFalsy();
    });
  });
});
