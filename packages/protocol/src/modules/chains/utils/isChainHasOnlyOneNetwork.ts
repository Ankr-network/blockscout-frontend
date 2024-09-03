import { flatChain } from './flatChain';
import { Chain } from '../types';

export const isChainHasOnlyOneNetwork = (chain: Chain) => {
  return (
    flatChain(chain).filter(
      subchain => subchain.paths && subchain.paths.length > 0,
    ).length === 1
  );
};
