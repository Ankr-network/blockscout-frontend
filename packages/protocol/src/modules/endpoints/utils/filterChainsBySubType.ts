import {
  ChainID,
  ZETACHAIN_ATHENS3_CHAINS,
  ChainSubType,
} from '@ankr.com/chains-list';

export const filterChainsBySubType = (
  chainIds: ChainID[],
  subType?: ChainSubType,
) => {
  if (!subType) {
    return chainIds;
  }

  return chainIds.filter(id => {
    switch (subType) {
      default:
      case ChainSubType.Athens3:
        return ZETACHAIN_ATHENS3_CHAINS.includes(id);
    }
  });
};
