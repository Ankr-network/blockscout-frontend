import {
  ChainID,
  ChainsAthens2,
  ChainsAthens3,
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
        return ChainsAthens2.includes(id);
      case ChainSubType.Athens3:
        return ChainsAthens3.includes(id);
    }
  });
};
