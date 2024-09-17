import { Chain } from '@ankr.com/chains-list';

import { flatChain } from './flatChain';

export const isChainHasOnlyOneNetwork = (chain: Chain) => {
  return (
    flatChain(chain).filter(
      subchain => subchain.paths && subchain.paths.length > 0,
    ).length === 1
  );
};
