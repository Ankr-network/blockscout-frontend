import { SSV_ESTIMATE_GAS_MULTIPLIER } from '../const';

export const getIncreasedGasLimit = (gasLimit: number): number => {
  if (gasLimit <= 0) {
    return 0;
  }

  return Math.round(gasLimit * SSV_ESTIMATE_GAS_MULTIPLIER);
};
