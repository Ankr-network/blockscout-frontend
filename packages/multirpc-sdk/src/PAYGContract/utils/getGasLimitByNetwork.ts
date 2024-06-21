import { ARB_GAS_LIMIT, GAS_LIMIT } from '../const';
import { EBlockchain } from '../../common';

export const getGasLimitByNetwork = (network: EBlockchain) => {
  const isArbitrumNetwork =
    network === EBlockchain.arbitrum ||
    network === EBlockchain.arbitrum_sepolia;
  
  return isArbitrumNetwork ? ARB_GAS_LIMIT : GAS_LIMIT;
};
