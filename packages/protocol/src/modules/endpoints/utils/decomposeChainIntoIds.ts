import { Chain, ChainID } from '@ankr.com/chains-list';

import { flatChains } from './flatChains';

export interface DecomposedChainIds {
  devnets: ChainID[];
  mainnets: ChainID[];
  testnets: ChainID[];
}

const exceptions: Partial<Record<ChainID, Partial<DecomposedChainIds>>> = {
  [ChainID.AVALANCHE]: {
    mainnets: [ChainID.AVALANCHE],
    testnets: [ChainID.AVALANCHE_FUJI],
  },
  [ChainID.FLARE]: {
    mainnets: [ChainID.FLARE],
  },
  [ChainID.TENET]: {
    mainnets: [ChainID.TENET_EVM],
  },
  [ChainID.HORIZEN]: {
    mainnets: [ChainID.HORIZEN_EVM],
  },
  [ChainID.KAVA]: {
    mainnets: [ChainID.KAVA_EVM, ChainID.KAVA_COSMOS_REST],
  },
};

const getSubchainsIds = (subchains: Chain[] = []): ChainID[] =>
  subchains
    .flatMap(chain => flatChains(chain))
    .filter(({ urls }) => urls.length > 0)
    .map(({ id }) => id);

const addExceptions = (
  chain: Chain,
  decomposed: DecomposedChainIds,
  withExceptions?: boolean,
) =>
  withExceptions
    ? { ...decomposed, ...(exceptions[chain.id] || {}) }
    : decomposed;

const getTestnets = (chain: Chain, keepEVMChainID: boolean) => {
  const testnets = getSubchainsIds(chain.testnets);

  if (keepEVMChainID) {
    return testnets;
  }

  // subchain ids with `-evm` suffix refer to their parent chain
  return testnets.map(id => id.replace('-evm', '') as ChainID);
};

export const decomposeChainIntoIds = (
  chain: Chain,
  withExceptions?: boolean,
  keepEVMChainID = false,
): DecomposedChainIds => {
  const mainnets = flatChains(chain)
    .filter(({ urls }) => urls.length > 0)
    .map(
      keepEVMChainID
        ? ({ id }) => id
        : ({ id }) => id.replace('-evm', '') as ChainID,
    );

  const testnets = getTestnets(chain, keepEVMChainID);

  const devnets = getSubchainsIds(chain.devnets);

  return addExceptions(chain, { devnets, mainnets, testnets }, withExceptions);
};
