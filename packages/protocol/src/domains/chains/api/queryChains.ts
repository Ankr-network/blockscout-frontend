import { IBlockchainEntity } from '@ankr.com/multirpc';
import { getChainIcon } from '../../../uiKit/utils/getTokenIcon';

export interface IFetchChainsResponseData {
  chains: Record<
    string,
    {
      blockchain: IBlockchainEntity & { extends?: string };
      rpcUrl: string;
      wsUrl: string;
    }
  >;
}

export interface IApiChain {
  id: string;
  icon: string;
  name: string;
  rpcUrl: string[];
  wsUrl: string[];
  requests?: number;
}

export const mapChains = (data: IFetchChainsResponseData): IApiChain[] => {
  const { chains } = data;

  const chainsArray = Object.values(chains);

  const mappedData = chainsArray.map(item => {
    const { blockchain, rpcUrl, wsUrl } = item;

    const { id, stats, name, extends: chainExtends } = blockchain;

    const requests = stats?.reqs;

    return {
      id,
      icon: getChainIcon(id),
      name,
      rpcUrl: rpcUrl ? [rpcUrl] : [],
      wsUrl: wsUrl ? [wsUrl] : [],
      requests,
      chainExtends,
    };
  });

  // @ts-ignore
  return mappedData
    .map(item => {
      if (item.chainExtends) {
        const { rpcUrl, wsUrl } = item;

        const chain = mappedData.find(el => el.id === item.chainExtends);

        if (chain) {
          chain.rpcUrl = [...chain.rpcUrl, ...rpcUrl];
          chain.wsUrl = [...chain.wsUrl, ...wsUrl];
        }

        return null;
      }

      return item;
    })
    .filter(Boolean);
};
