import { Chain, IBlockchainEntity } from 'multirpc-sdk';
import { getChainIcon } from '../../../uiKit/utils/getTokenIcon';

export interface IFetchChainsResponseData {
  chains: Record<
    string,
    {
      blockchain: IBlockchainEntity;
      rpcUrl: string;
      wsUrl: string;
    }
  >;
}

export interface IApiChain {
  id: string;
  icon: string;
  name: string;
  rpcUrl: string;
  wsUrl: string;
  requests?: number;
}

export const mapChains = (data: IFetchChainsResponseData): IApiChain[] => {
  const { chains } = data;

  const chainsArray = Object.values(chains);

  return chainsArray.map(item => {
    const { blockchain, rpcUrl, wsUrl } = item;
    const { id, stats, name } = blockchain;

    const requests = stats?.reqs;

    return {
      id,
      icon: getChainIcon(id as Chain),
      name,
      rpcUrl,
      wsUrl,
      requests,
    };
  });
};
