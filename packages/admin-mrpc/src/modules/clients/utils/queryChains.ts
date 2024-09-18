import BigNumber from 'bignumber.js';
import {
  EBlockchainType,
  BlockchainUrls,
  ChainsConfig,
  IBlockchainEntity,
} from '@ankr.com/chains-list';

import { getChainIcon } from 'uiKit/utils/getTokenIcon';

import { ChainID } from '../types';

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
  id: ChainID;
  isArchive?: boolean;
  name: IBlockchainEntity['name'];
  testnets?: IApiChain[];
  devnets?: IApiChain[];
  totalRequests?: BigNumber;
  type: IBlockchainEntity['type'];
  urls: IApiChainURL[];
}

export const filterMapChains = (
  data: ChainsConfig = {},
  filterCB: (urls: BlockchainUrls) => boolean = () => true,
): IApiChain[] => {
  const chains = Object.values(data)
    .filter(filterCB)
    .map<IApiChain>(chain => {
      const { blockchain, rpcURLs, wsURLs } = chain;

      const { coinName, id, name, extends: chainExtends, type } = blockchain;

      return {
        coinName,
        chainExtends,
        id: id as ChainID,
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

      if (type === EBlockchainType.Extension && chainExtends) {
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

    if (type !== EBlockchainType.Extension) {
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

      if (type === EBlockchainType.Testnet && chainExtends) {
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

      if (type === EBlockchainType.Devnet && chainExtends) {
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

      if (type !== EBlockchainType.Testnet && type !== EBlockchainType.Devnet) {
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
