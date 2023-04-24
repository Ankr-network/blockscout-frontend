import {
  BlockchainFeature,
  BlockchainType,
  BlockchainUrls,
  ChainsConfig,
} from 'multirpc-sdk';

import { ChainID } from 'domains/chains/types';
import { isTestnetOnlyChain } from './isTestnetOnlyChain';
import { GroupedBlockchainType, Chain, ChainURL } from '../types';
import { isEvmExtension } from './isEvmExtension';

const getChainWithoutMainnet = ({ id, name, urls }: Chain) => ({
  id,
  name,
  urls,
});

const getExtensions = (chains: Chain[]) => {
  return chains.reduce<Record<string, Chain[]>>((result, chain) => {
    const { type, chainExtends } = chain;

    if (type === BlockchainType.Extension && chainExtends) {
      result[chainExtends] = result[chainExtends]
        ? [...result[chainExtends], chain]
        : [chain];
    }

    return result;
  }, {});
};

const getBeacons = (chains: Chain[]) => {
  return chains.reduce<Record<string, Chain[]>>((result, chain) => {
    const { chainExtends, type } = chain;

    if (type === BlockchainType.Beacon && chainExtends) {
      result[chainExtends] = result[chainExtends]
        ? [...result[chainExtends], chain]
        : [chain];
    }

    return result;
  }, {});
};

const getOpnodes = (chains: Chain[]) => {
  return chains.reduce<Record<string, Chain[]>>((result, chain) => {
    const { chainExtends, type } = chain;

    if (type === BlockchainType.Opnode && chainExtends) {
      result[chainExtends] = result[chainExtends]
        ? [...result[chainExtends], chain]
        : [chain];
    }

    return result;
  }, {});
};

const getExtendedChains = (
  chains: Chain[],
  extensions: GroupedBlockchainType,
  beacons: GroupedBlockchainType,
  opnodes: GroupedBlockchainType,
) => {
  return chains.reduce<Chain[]>((result, chain) => {
    const { id, type } = chain;

    if (
      type !== BlockchainType.Extension &&
      type !== BlockchainType.Beacon &&
      type !== BlockchainType.Opnode
    ) {
      const evmExtension = (extensions[id] || []).find(extension =>
        isEvmExtension(extension.id),
      );

      result.push({
        ...chain,
        extensions: evmExtension
          ? [
              evmExtension,
              ...extensions[id].filter(
                extension => !isEvmExtension(extension.id),
              ),
            ]
          : extensions[id],
        beacons: beacons[id],
        opnodes: opnodes[id],
      });
    }

    return result;
  }, []);
};

export const getTestnets = (extendedChains: Chain[]) => {
  return extendedChains.reduce<Record<string, Chain[]>>((result, chain) => {
    const { chainExtends, type } = chain;

    if (type === BlockchainType.Testnet && chainExtends) {
      result[chainExtends] = result[chainExtends]
        ? [...result[chainExtends], chain]
        : [chain];
    }

    return result;
  }, {});
};

export const getDevnets = (extendedChains: Chain[]) => {
  return extendedChains.reduce<Record<string, Chain[]>>((result, chain) => {
    const { chainExtends, type } = chain;

    if (type === BlockchainType.Devnet && chainExtends) {
      result[chainExtends] = result[chainExtends]
        ? [...result[chainExtends], chain]
        : [chain];
    }

    return result;
  }, {});
};

const addExtensions = (
  extendedChains: Chain[],
  testnets: GroupedBlockchainType,
  devnets: GroupedBlockchainType,
  opnodes: GroupedBlockchainType,
) => {
  return extendedChains.reduce<Chain[]>((result, chain) => {
    const { id, type } = chain;

    if (type !== BlockchainType.Testnet && type !== BlockchainType.Devnet) {
      result.push({
        ...chain,
        testnets: testnets[id],
        devnets: devnets[id],
        opnodes:
          id === ChainID.ROLLUX ? opnodes[ChainID.ROLLUX_TESTNET] : opnodes[id],
        chainWithoutMainnet: isTestnetOnlyChain(id)
          ? getChainWithoutMainnet(testnets[id]?.[0])
          : undefined,
      });
    }

    return result;
  }, []);
};

export const addExtenders = (chains: Chain[]) => {
  const extenders = chains.reduce<Record<string, Chain[]>>((result, chain) => {
    const { chainExtends } = chain;

    if (chainExtends) {
      result[chainExtends] = result[chainExtends]
        ? [...result[chainExtends], chain]
        : [chain];
    }

    return result;
  }, {});

  return chains.reduce<Chain[]>((result, chain) => {
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

const addPremiumOnly = (chains: Chain[]) => {
  chains.forEach(item => {
    const isAllTestnetsForPremium =
      item.testnets?.every(el => el.premiumOnly) ?? true;
    const isAllDevnetsForPremium =
      item.devnets?.every(el => el.premiumOnly) ?? true;

    item.premiumOnly =
      item.isMainnetPremiumOnly &&
      isAllTestnetsForPremium &&
      isAllDevnetsForPremium;
  });

  return chains;
};

const getURLs = ({ restURLs, rpcURLs, wsURLs }: BlockchainUrls) => {
  const template = new Array(Math.max(restURLs.length, rpcURLs.length)).fill(
    '',
  );

  return template.map<ChainURL>((_, index) => ({
    rpc: rpcURLs[index],
    ws: wsURLs[index],
    rest: restURLs[index],
  }));
};

const getApiChains = (data: ChainsConfig) => {
  return Object.values(data).map(chain => {
    const { blockchain } = chain;
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
      premiumOnly,
      urls: getURLs(chain),
      hasRESTFeature: features.includes(BlockchainFeature.REST),
      hasRPCFeature: features.includes(BlockchainFeature.RPC),
      hasWSFeature: features.includes(BlockchainFeature.WS),
      isComingSoon: features.includes(BlockchainFeature.ComingSoon),
      isMainnetPremiumOnly: type === BlockchainType.Mainnet && premiumOnly,
    } as Chain;
  });
};

const changeMainnetToChainWithoutMainnet = (chains: Chain[]) => {
  return chains.map(item => {
    const { id, chainWithoutMainnet, urls } = item;

    return {
      ...item,
      ...(chainWithoutMainnet || {}),
      urls: chainWithoutMainnet ? [] : urls,
      id,
    };
  });
};

export const formatChainsConfigToChains = (
  data: ChainsConfig = {},
): Chain[] => {
  const chains = getApiChains(data);

  const extensions = getExtensions(chains);
  const beacons = getBeacons(chains);
  const opnodes = getOpnodes(chains);
  const extendedChains = getExtendedChains(
    chains,
    extensions,
    beacons,
    opnodes,
  );
  const testnets = getTestnets(extendedChains);
  const devnets = getDevnets(extendedChains);
  const chainsWithExtensions = addExtensions(
    extendedChains,
    testnets,
    devnets,
    opnodes,
  );
  const chainsWithExtenders = addExtenders(chainsWithExtensions);
  const chainsWithPremiumOnly = addPremiumOnly(chainsWithExtenders);

  return changeMainnetToChainWithoutMainnet(chainsWithPremiumOnly);
};
