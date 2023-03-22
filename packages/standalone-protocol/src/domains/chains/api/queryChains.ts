import { FetchBlockchainUrlsResult } from 'multirpc-sdk';
import { getChainIcon } from '../../../uiKit/utils/getTokenIcon';

export interface IFetchChainsResponseData {
  chains: FetchBlockchainUrlsResult;
}
export interface IApiChain {
  id: string;
  icon: string;
  name: string;
  rpcUrls: string[];
  wsUrls: string[];
  requests?: number;
  isComingSoon?: boolean;
}

enum BlockchainFeature {
  ComingSoon = 'coming soon',
}

export const mapChains = (data: IFetchChainsResponseData): IApiChain[] => {
  const { chains } = data;

  const chainsArray = Object.values(chains);

  return chainsArray.map(item => {
    const { blockchain, rpcURLs, wsURLs } = item;
    const { id, name, features } = blockchain;

    return {
      id,
      icon: getChainIcon(id),
      name,
      rpcUrls: rpcURLs,
      wsUrls: wsURLs,
      isComingSoon: features.includes(BlockchainFeature.ComingSoon),
    };
  });
};
