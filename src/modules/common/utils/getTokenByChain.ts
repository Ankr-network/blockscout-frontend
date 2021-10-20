import { Chain } from '../types/Chain';
import { Token } from '../types/Token';

const chainToToken: { [key in Chain]: Token } = {
  avax: Token.avax,
  eth: Token.eth,
  fantom: Token.ftm,
  polygon: Token.ksm,
  sol: Token.sol,
  xdai: Token.stake,
};

export function getTokenByChain(chain: Chain) {
  return chainToToken[chain];
}
