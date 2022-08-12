import BigNumber from 'bignumber.js';
import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';

export const getBlockCount = (remainingBlocks?: number) => {
  if (typeof remainingBlocks === 'undefined') return 0;

  return new BigNumber(remainingBlocks).minus(CONFIRMATION_BLOCKS).abs();
};
