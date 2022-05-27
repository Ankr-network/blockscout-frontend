import BigNumber from 'bignumber.js';
import { BlockchainType, FetchBlockchainUrlsResult } from 'multirpc-sdk';
import { getChainIcon } from 'uiKit/utils/getTokenIcon';

export interface IFetchChainsResponseData {
  chains: FetchBlockchainUrlsResult;
}

export interface IApiChainURL {
  rpc: string;
  ws?: string;
}

export interface IApiChain {
  chainExtends?: string;
  extenders?: IApiChain[];
  extensions?: IApiChain[];
  icon: string;
  id: string;
  isArchive?: boolean;
  name: string;
  testnets?: IApiChain[];
  totalRequests?: BigNumber;
  type: BlockchainType;
  urls: IApiChainURL[];
}

export const mapChains = (data: IFetchChainsResponseData): IApiChain[] => {
  const chains = Object.values(data.chains).map<IApiChain>(chain => {
    const { blockchain, rpcURLs, wsURLs } = chain;
    const { id, name, extends: chainExtends, type } = blockchain;

    return {
      chainExtends,
      id,
      icon: getChainIcon(id),
      name,
      type,
      urls: rpcURLs.map<IApiChainURL>((url, index) => ({
        rpc: url,
        ws: wsURLs[index],
      })),
    };
  });

  const extensions = chains.reduce<Record<string, IApiChain[]>>(
    (result, chain) => {
      const { type, chainExtends } = chain;

      if (type === BlockchainType.Extension && chainExtends) {
        result[chainExtends] = result[chainExtends]
          ? [...result[chainExtends], chain]
          : [chain];
      }

      return result;
    },
    {},
  );

  const extendedChains = chains.reduce<IApiChain[]>((result, chain) => {
    const { id, type } = chain;

    if (type !== BlockchainType.Extension) {
      const evmExtension = (extensions[id] || []).find(extension =>
        extension.id.includes('evm'),
      );

      result.push({
        ...chain,
        extensions: evmExtension
          ? [
              evmExtension,
              ...extensions[id].filter(
                extension => !extension.id.includes('evm'),
              ),
            ]
          : extensions[id],
      });
    }

    return result;
  }, []);

  const testnets = extendedChains.reduce<Record<string, IApiChain[]>>(
    (result, chain) => {
      const { chainExtends, type } = chain;

      if (type === BlockchainType.Testnet && chainExtends) {
        result[chainExtends] = result[chainExtends]
          ? [...result[chainExtends], chain]
          : [chain];
      }

      return result;
    },
    {},
  );

  const chainsWithTestnets = extendedChains.reduce<IApiChain[]>(
    (result, chain) => {
      const { id, type } = chain;

      if (type !== BlockchainType.Testnet) {
        result.push({
          ...chain,
          testnets: testnets[id],
        });
      }

      return result;
    },
    [],
  );

  const extenders = chainsWithTestnets.reduce<Record<string, IApiChain[]>>(
    (result, chain) => {
      const { chainExtends } = chain;

      if (chainExtends) {
        result[chainExtends] = result[chainExtends]
          ? [...result[chainExtends], chain]
          : [chain];
      }

      return result;
    },
    {},
  );

  return chainsWithTestnets.reduce<IApiChain[]>((result, chain) => {
    const { chainExtends, id } = chain;

    if (!chainExtends) {
      result.push({
        ...chain,
        extenders: extenders[id],
      });
    }

    return result;
  }, []);
};
