import { IChainParams } from 'domains/auth/actions/addNetwork';

export type NetworkInfo = Omit<IChainParams, 'rpcUrls' | 'chainId'> & {
  chainId: number;
};
