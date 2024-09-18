import { t } from '@ankr.com/common';
import { ChainID } from '@ankr.com/chains-list';

import { root } from '../../../const';

const flareCTestnets = [
  ChainID.FLARE_COSTON_C,
  ChainID.FLARE_COSTON2_C,
  ChainID.FLARE_SONGBIRD_C,
];

const flarePTestnets = [
  ChainID.FLARE_COSTON_P,
  ChainID.FLARE_COSTON2_P,
  ChainID.FLARE_SONGBIRD_P,
];

const flareXTestnets = [
  ChainID.FLARE_COSTON_X,
  ChainID.FLARE_COSTON2_X,
  ChainID.FLARE_SONGBIRD_X,
];

export const renderFlareTitle = (url: string) => {
  const path = new URL(url).pathname
    .split('/')
    .filter(pathItem => !!pathItem)[0];

  if (flareCTestnets.includes(path as ChainID)) {
    return t(`${root}.endpoints.c-chain-title`);
  }

  if (flarePTestnets.includes(path as ChainID)) {
    return t(`${root}.endpoints.p-chain-title`);
  }

  if (flareXTestnets.includes(path as ChainID)) {
    return t(`${root}.endpoints.x-chain-title`);
  }

  return t(`${root}.endpoints.evm-title`);
};
