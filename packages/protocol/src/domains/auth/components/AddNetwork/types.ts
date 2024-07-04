import { IChainParams } from 'domains/auth/actions/addNetwork';
import { Chain, ChainSubType, ChainType } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';

export type NetworkInfo = Omit<IChainParams, 'rpcUrls' | 'chainId'> & {
  chainId: number;
  searchKeys?: string[];
};

export interface IUseAddNetworkButtonParams {
  chain: Chain;
  chainType?: ChainType;
  chainSubType?: ChainSubType;
  group?: EndpointGroup;
  isEnterprise?: boolean;
}
