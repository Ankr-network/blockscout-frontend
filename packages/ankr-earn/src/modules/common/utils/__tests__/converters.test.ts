import { ETH_SCALE_FACTOR, MAX_UINT256 } from 'modules/common/const';

import { convertNumberToHex } from '../numbers/converters';

describe('modules/common/utils/numbers/converters', () => {
  test('should convert amount to hex', () => {
    const result = convertNumberToHex(MAX_UINT256);

    expect(result).toBe(
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    );
  });

  test('should convert amount to hex and scale it', () => {
    const result = convertNumberToHex('1', ETH_SCALE_FACTOR);

    expect(result).toBe(convertNumberToHex(10 ** 18));
  });
});
