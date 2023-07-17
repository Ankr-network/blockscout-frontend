import { IChainParams } from 'domains/auth/actions/addNetwork';
import { Chain, ChainSubType, ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';

export type NetworkInfo = Omit<IChainParams, 'rpcUrls' | 'chainId'> & {
  chainId: number;
};

export interface IUseAddNetworkButtonParams {
  chain: Chain;
  chainType?: ChainType;
  chainSubType?: ChainSubType;
  group?: EndpointGroup;
}
