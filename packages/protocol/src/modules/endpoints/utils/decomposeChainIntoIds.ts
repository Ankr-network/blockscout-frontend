import { ChainID } from '../types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { flatChains } from './flatChains';

export interface DecomposedChainIds {
  devnets: ChainID[];
  mainnets: ChainID[];
  testnets: ChainID[];
}

const exceptions: Record<ChainID, Partial<DecomposedChainIds>> = {
  avalanche: {
    mainnets: ['avalanche'],
    testnets: ['avalanche_fuji'],
  },
  nervos: {
    mainnets: ['nervos'],
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

export const decomposeChainIntoIds = (
  chain: IApiChain,
  withExceptions?: boolean,
): DecomposedChainIds => {
  const mainnets = flatChains(chain)
    .filter(({ urls }) => urls.length > 0)
    .map(({ id }) => id);

  const testnets = getSubchainsIds(chain.testnets)
    // subchain ids with `-evm` suffix refer to their parent chain
    .map(id => id.replace('-evm', ''));

  const devnets = getSubchainsIds(chain.devnets);

  return addExceptions(chain, { devnets, mainnets, testnets }, withExceptions);
};
