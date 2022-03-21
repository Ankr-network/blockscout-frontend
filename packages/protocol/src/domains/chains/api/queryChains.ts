import BigNumber from 'bignumber.js';
import { BlockchainType, FetchBlockchainUrlsResult } from 'multirpc-sdk';
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
  isArchive?: boolean;
  requests?: number;
  totalRequest?: BigNumber;
  chainExtends?: string;
  testnets?: IApiChain[];
  type: BlockchainType;
}

export const mapChains = (data: IFetchChainsResponseData): IApiChain[] => {
  const { chains } = data;

  const chainsArray = Object.values(chains);

  const mappedData = chainsArray.map<IApiChain>(item => {
    const { blockchain, rpcURLs, wsURLs } = item;

    const { id, stats, name, extends: chainExtends, type } = blockchain;

    const requests = stats?.reqs;

    return {
      id,
      icon: getChainIcon(id),
      name,
      rpcUrls: rpcURLs,
      wsUrls: wsURLs,
      requests,
      chainExtends,
      type,
    };
  });

  // @ts-ignore
  return mappedData
    .map(item => {
      if (item.chainExtends) {
        const { rpcUrls, wsUrls } = item;

        const chain = mappedData.find(el => el.id === item.chainExtends);

        if (chain) {
          if (item.type === BlockchainType.Mainnet) {
            chain.rpcUrls = [...chain.rpcUrls, ...rpcUrls];
            chain.wsUrls = [...chain.wsUrls, ...wsUrls];
          } else if (item.type === BlockchainType.Testnet) {
            chain.testnets = chain.testnets
              ? [...chain.testnets, item]
              : [item];
          }

          return null;
        }

        return item;
      }

      return item;
    })
    .filter(Boolean);
};
