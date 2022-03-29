import { Token } from 'modules/common/types/token';

import { getValidSelectedToken } from '../getValidSelectedToken';

describe('modules/stake-bnb/utils/getValidSelectedToken', () => {
  test('should return valid synthetic BNB token', () => {
    expect(getValidSelectedToken('dsad')).toBe(Token.aBNBb);
    expect(getValidSelectedToken('aBNBc')).toBe(Token.aBNBc);
    expect(getValidSelectedToken('aBNBb')).toBe(Token.aBNBb);
  });
});
