import { Token } from 'modules/common/types/token';

import { getValidSelectedToken } from '../getValidSelectedToken';

describe('modules/stake-eth/utils/getValidSelectedToken', () => {
  test('should return valid synthetic ETH token', () => {
    expect(getValidSelectedToken('dsad')).toBe(Token.aETHb);
    expect(getValidSelectedToken('aETHc')).toBe(Token.aETHc);
    expect(getValidSelectedToken('aETHb')).toBe(Token.aETHb);
  });
});
