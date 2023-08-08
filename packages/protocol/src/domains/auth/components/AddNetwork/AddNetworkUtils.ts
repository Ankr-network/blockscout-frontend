import { t } from '@ankr.com/common';
import { PrefixedHex } from 'multirpc-sdk';

import { flatNetworkURLs } from 'domains/auth/utils/flatNetworkURLs';
import {
  ChainID,
  Chain,
  ChainURL,
  ChainType,
  ChainSubType,
} from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { getChainId } from 'domains/chains/screens/ChainItem/components/ChainItemSections/utils/getChainId';
import { getChainById } from 'domains/chains/screens/ChainItem/utils/getChainById';

import { IChainParams } from '../../actions/addNetwork';
import { NETWORK_INFO_MAP } from './const';
import { IUseAddNetworkButtonParams } from './types';

const toHex = (num: number): PrefixedHex => {
  return `0x${num.toString(16)}`;
};

const addNamePostfix = (name: string) =>
  t('chain-item.get-started.endpoints.network-postfix', { name });

const flattenAllChainTypes = (chain: Chain): Chain[] => [
  chain,
  ...(chain.extenders || []).flatMap(flattenAllChainTypes),
  ...(chain.extensions || []).flatMap(flattenAllChainTypes),
  ...(chain.testnets || []).flatMap(flattenAllChainTypes),
  ...(chain.devnets || []).flatMap(flattenAllChainTypes),
];

const getMappedNetwork = (
  chain?: Chain,
  flatChainId?: ChainID,
): IChainParams | undefined => {
  const networkInfo = NETWORK_INFO_MAP[flatChainId || ChainID.UNDEFINED];

  if (!networkInfo || !chain) {
    return undefined;
  }

  return {
    ...networkInfo,
    chainId: toHex(networkInfo.chainId),
    chainName: addNamePostfix(networkInfo.chainName),

    rpcUrls: flatNetworkURLs<ChainURL, Chain>(chain).mainnetURLs.map(
      ({ rpc }) => rpc,
    ),
  };
};

interface GetFlattenChainArguments {
  publicChain: Chain;
  chainType: ChainType;
  group: EndpointGroup;
  chainSubType?: ChainSubType;
}

export const getFlattenChain = ({
  publicChain,
  chainType,
  group,
  chainSubType,
}: GetFlattenChainArguments) => {
  const flatChainId = getChainId({
    publicChain,
    chainType,
    chainSubType,
    group,
    withExceptions: false,
    keepEVMChainID: publicChain.id === ChainID.ZETACHAIN,
  }) as ChainID;

  const flatChains = flattenAllChainTypes(publicChain);

  const flatChain = getChainById(flatChains, flatChainId);

  return { flatChainId, flatChain };
};

export const getNetworkConfiguration = (
  publicChain: Chain,
  chainType?: ChainType,
  group?: EndpointGroup,
) => {
  const shouldFlatten = chainType && group;

  if (shouldFlatten) {
    const { flatChainId, flatChain } = getFlattenChain({
      publicChain,
      chainType,
      group,
    });

    return getMappedNetwork(flatChain, flatChainId);
  }

  return getMappedNetwork(publicChain, publicChain?.id as ChainID);
};

const getFlattenChainAndId = ({
  chain,
  chainType,
  chainSubType,
  group,
}: IUseAddNetworkButtonParams) => {
  if (group && chainType) {
    return getFlattenChain({
      publicChain: chain,
      chainType,
      group,
      chainSubType,
    });
  }

  return { flatChain: chain, flatChainId: chain.id };
};

export const getNetworkParams = ({
  chain,
  chainType,
  chainSubType,
  group,
}: IUseAddNetworkButtonParams) => {
  const { flatChain, flatChainId } = getFlattenChainAndId({
    chain,
    chainType,
    chainSubType,
    group,
  });

  const networkConfiguration = getNetworkConfiguration(flatChain!);

  return {
    chainId: flatChainId,
    networkConfiguration,
  };
};
