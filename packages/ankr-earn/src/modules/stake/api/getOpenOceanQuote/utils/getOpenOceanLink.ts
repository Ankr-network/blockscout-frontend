import { OPENOCEAN_CLASSIC_URL } from '../const';
import { TOpenOceanNetworks, TOpenOceanTokens } from '../types';

/**
 * Get OpenOcean link for trade info component
 *
 * @return  {string}  OpenOcean link
 */
export const getOpenOceanLink = (
  network: TOpenOceanNetworks,
  baseToken: TOpenOceanTokens,
  targetToken: TOpenOceanTokens,
): string => {
  const base = baseToken.toUpperCase();
  const target = targetToken.toUpperCase();

  return `${OPENOCEAN_CLASSIC_URL}/${network}/${base}/${target}`;
};
