import BigNumber from 'bignumber.js';

import {
  BlockchainType,
  FetchBlockchainUrlsResult,
  IBlockchainEntity,
} from 'multirpc-sdk';
import { getChainIcon } from 'uiKit/utils/getTokenIcon';

export interface IFetchChainsResponseData {
  chains: FetchBlockchainUrlsResult;
}

export interface IApiChainURL {
  rpc: string;
  ws?: string;
}

export interface IApiChain {
  coinName: IBlockchainEntity['coinName'];
  chainExtends?: IBlockchainEntity['extends'];
  extenders?: IApiChain[];
  extensions?: IApiChain[];
  icon: string;
  id: IBlockchainEntity['id'];
  isArchive?: boolean;
  name: IBlockchainEntity['name'];
  testnets?: IApiChain[];
  devnets?: IApiChain[];
  totalRequests?: BigNumber;
  type: IBlockchainEntity['type'];
  urls: IApiChainURL[];
}

export const mapChains = (data: IFetchChainsResponseData): IApiChain[] => {
  const chains = Object.values(data.chains).map<IApiChain>(chain => {
    const { blockchain, rpcURLs, wsURLs } = chain;
    const { coinName, id, name, extends: chainExtends, type } = blockchain;

    return {
      coinName,
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

  const devnets = extendedChains.reduce<Record<string, IApiChain[]>>(
    (result, chain) => {
      const { chainExtends, type } = chain;

      if (type === BlockchainType.Devnet && chainExtends) {
        result[chainExtends] = result[chainExtends]
          ? [...result[chainExtends], chain]
          : [chain];
      }

      return result;
    },
    {},
  );

  const chainsWithTestnetsOrDevnets = extendedChains.reduce<IApiChain[]>(
    (result, chain) => {
      const { id, type } = chain;

      if (type !== BlockchainType.Testnet && type !== BlockchainType.Devnet) {
        result.push({
          ...chain,
          testnets: testnets[id],
          devnets: devnets[id],
        });
      }

      return result;
    },
    [],
  );

  const extenders = chainsWithTestnetsOrDevnets.reduce<
    Record<string, IApiChain[]>
  >((result, chain) => {
    const { chainExtends } = chain;

    if (chainExtends) {
      result[chainExtends] = result[chainExtends]
        ? [...result[chainExtends], chain]
        : [chain];
    }

    return result;
  }, {});

  return chainsWithTestnetsOrDevnets.reduce<IApiChain[]>((result, chain) => {
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
