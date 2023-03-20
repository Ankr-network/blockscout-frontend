import { Token } from 'modules/common/types/token';

import { OPENOCEAN_CLASSIC_URL } from '../const';
import { TOpenOceanChains } from '../types';

type TTokenNameForOpenOcean =
  | 'AVAX'
  | 'AAVAXB'
  | 'ANKRAVAX'
  | 'BNB'
  | 'ABNBB'
  | 'ANKRBNB'
  | 'FTM'
  | 'AFTMB'
  | 'ANKRFTM'
  | 'MATIC'
  | 'AMATICB'
  | 'ANKRMATIC'
  | 'ETH'
  | 'AETHB'
  | 'ANKRETH';

/**
 * Get OpenOcean link for trade info component
 *
 * @return  {string}  OpenOcean link
 */
export const getOpenOceanLink = (
  network: TOpenOceanChains,
  baseToken: Token,
  targetToken: Token,
): string => {
  const base = getTokenNameForOpenOcean(baseToken);
  const target = getTokenNameForOpenOcean(targetToken);
  const formattedNetwork = network.toUpperCase();

  return `${OPENOCEAN_CLASSIC_URL}/${formattedNetwork}/${base}/${target}`;
};

function getTokenNameForOpenOcean(token: Token): TTokenNameForOpenOcean {
  let tokenName: TTokenNameForOpenOcean;
  switch (token) {
    case Token.aAVAXc:
      tokenName = 'ANKRAVAX';
      break;
    case Token.aBNBc:
      tokenName = 'ANKRBNB';
      break;
    case Token.aFTMc:
      tokenName = 'ANKRFTM';
      break;
    case Token.aMATICc:
      tokenName = 'ANKRMATIC';
      break;
    case Token.aETHc:
      tokenName = 'ANKRETH';
      break;

    default:
      tokenName = token.toUpperCase() as TTokenNameForOpenOcean;
      break;
  }

  return tokenName;
}
