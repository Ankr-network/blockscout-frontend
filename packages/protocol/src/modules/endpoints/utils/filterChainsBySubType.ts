import {
  ChainID,
  ZETACHAIN_ATHENS2_CHAINS,
  ZETACHAIN_ATHENS3_CHAINS,
  ChainSubType,
} from 'domains/chains/types';

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
      case ChainSubType.Athens2:
        return ZETACHAIN_ATHENS2_CHAINS.includes(id);

      case ChainSubType.Athens3:
        return ZETACHAIN_ATHENS3_CHAINS.includes(id);
    }
  });
};
