import { SSV_ESTIMATE_GAS_MULTIPLIER } from '../const';

export const getIncreasedGasLimit = (gasLimit: number): number =>
  Math.round(gasLimit * SSV_ESTIMATE_GAS_MULTIPLIER);
