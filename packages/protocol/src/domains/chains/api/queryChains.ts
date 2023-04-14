import BigNumber from 'bignumber.js';
import { ChainID } from 'modules/chains/types';
import {
  BlockchainFeature,
  BlockchainType,
  BlockchainUrls,
  FetchBlockchainUrlsResult,
  IBlockchainEntity,
} from 'multirpc-sdk';

import { isTestnetOnlyChain } from '../utils/isTestnetOnlyChain';

export interface IApiChainURL {
  rpc: string;
  ws?: string;
}

export interface IApiChain {
  coinName: IBlockchainEntity['coinName'];
  chainExtends?: IBlockchainEntity['extends'];
  beacons?: IApiChain[];
  opnodes?: IApiChain[];
  extenders?: IApiChain[];
  extensions?: IApiChain[];
  frontChain?: Partial<IApiChain>;
  id: ChainID;
  isArchive?: boolean;
  name: IBlockchainEntity['name'];
  testnets?: IApiChain[];
  devnets?: IApiChain[];
  totalRequests?: BigNumber;
  type: IBlockchainEntity['type'];
  urls: IApiChainURL[];
  premiumOnly?: boolean;
  hasWsFeature: boolean;
  isComingSoon: boolean;
  isMainnetPremiumOnly?: boolean;
}

const getFrontChain = ({ id, name, urls }: IApiChain) => ({
  id,
  name,
  urls,
});

export const filterMapChains = (
  data: FetchBlockchainUrlsResult = {}, // TODO: fix action types
  filterCB: (urls: BlockchainUrls) => boolean = () => true,
): IApiChain[] => {
  const chains = Object.values(data)
    .filter(filterCB)
    .map<IApiChain>(chain => {
      const { blockchain, rpcURLs, wsURLs } = chain;
      const {
        coinName,
        id,
        name,
        extends: chainExtends,
        type,
        premiumOnly,
        features,
      } = blockchain;

      return {
        coinName,
        chainExtends,
        id: id as ChainID,
        name,
        type,
        urls: rpcURLs.map<IApiChainURL>((url, index) => ({
          rpc: url,
          ws: wsURLs[index],
        })),
        premiumOnly,
        hasWsFeature: features.includes(BlockchainFeature.WS),
        isComingSoon: features.includes(BlockchainFeature.ComingSoon),
        isMainnetPremiumOnly: type === BlockchainType.Mainnet && premiumOnly,
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

  const beacons = chains.reduce<Record<string, IApiChain[]>>(
    (result, chain) => {
      const { chainExtends, type } = chain;

      if (type === BlockchainType.Beacon && chainExtends) {
        result[chainExtends] = result[chainExtends]
          ? [...result[chainExtends], chain]
          : [chain];
      }

      return result;
    },
    {},
  );

  const opnodes = chains.reduce<Record<string, IApiChain[]>>(
    (result, chain) => {
      const { chainExtends, type } = chain;

      if (type === BlockchainType.Opnode && chainExtends) {
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

    if (
      type !== BlockchainType.Extension &&
      type !== BlockchainType.Beacon &&
      type !== BlockchainType.Opnode
    ) {
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
        beacons: beacons[id],
        opnodes: opnodes[id],
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
          opnodes:
            id === ChainID.ROLLUX
              ? opnodes[ChainID.ROLLUX_TESTNET]
              : opnodes[id],
          frontChain: isTestnetOnlyChain(id)
            ? getFrontChain(testnets[id]?.[0])
            : undefined,
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

  const resultedChains = chainsWithTestnetsOrDevnets.reduce<IApiChain[]>(
    (result, chain) => {
      const { chainExtends, id } = chain;

      if (!chainExtends) {
        result.push({
          ...chain,
          extenders: extenders[id],
        });
      }

      return result;
    },
    [],
  );

  resultedChains.forEach(item => {
    const isAllTestnetsForPremium =
      item.testnets?.every(el => el.premiumOnly) ?? true;
    const isAllDevnetsForPremium =
      item.devnets?.every(el => el.premiumOnly) ?? true;

    item.premiumOnly =
      item.isMainnetPremiumOnly &&
      isAllTestnetsForPremium &&
      isAllDevnetsForPremium;
  });

  return resultedChains;
};
