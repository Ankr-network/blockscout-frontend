import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainID } from 'modules/chains/types';
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
  [ChainID.NERVOS]: {
    mainnets: [ChainID.NERVOS],
  },
};

const getSubchainsIds = (subchains: IApiChain[] = []): ChainID[] =>
  subchains
    .flatMap(chain => flatChains(chain))
    .filter(({ urls }) => urls.length > 0)
    .map(({ id }) => id);

const addExceptions = (
  chain: IApiChain,
  decomposed: DecomposedChainIds,
  withExceptions?: boolean,
) =>
  withExceptions
    ? { ...decomposed, ...(exceptions[chain.id] || {}) }
    : decomposed;

const getTestnets = (chain: IApiChain, keepEVMChainID: boolean) => {
  const testnets = getSubchainsIds(chain.testnets);

  if (keepEVMChainID) {
    return testnets;
  }

  // subchain ids with `-evm` suffix refer to their parent chain
  return testnets.map(id => id.replace('-evm', '') as ChainID);
};

export const decomposeChainIntoIds = (
  chain: IApiChain,
  withExceptions?: boolean,
  keepEVMChainID = false,
): DecomposedChainIds => {
  const mainnets = flatChains(chain)
    .filter(({ urls }) => urls.length > 0)
    .map(({ id }) => id)
    .map(id => id.replace('-evm', '') as ChainID);

  const testnets = getTestnets(chain, keepEVMChainID);

  const devnets = getSubchainsIds(chain.devnets);

  return addExceptions(chain, { devnets, mainnets, testnets }, withExceptions);
};
