import { t } from '@ankr.com/common';
import { flatNetworkURLs } from 'domains/auth/utils/flatNetworkURLs';
import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import { Chain, ChainType } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { PrefixedHex } from 'multirpc-sdk';
import { IChainParams } from '../../actions/addNetwork';
import { NETWORK_INFO_MAP } from './const';
// TODO
import { getChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/utils/getChainId';
import { getChainById } from 'domains/chains/screens/ChainItem/components/Endpoint/EndpointUtils';

const toHex = (num: number): PrefixedHex => {
  return `0x${num.toString(16)}`;
};

const addNamePostfix = (name: string) =>
  t('chain-item.get-started.endpoints.network-postfix', { name });

const flattenAllChainTypes = (chain: IApiChain): IApiChain[] => [
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

    rpcUrls: flatNetworkURLs<IApiChainURL, Chain>(chain).mainnetURLs.map(
      ({ rpc }) => rpc,
    ),
  };
};

export const getFlattenChain = (
  publicChain: IApiChain,
  chainType: ChainType,
  group: EndpointGroup,
) => {
  const flatChainId = getChainId({
    publicChain,
    chainType,
    group,
    withExceptions: false,
  }) as ChainID;

  const flatChains = flattenAllChainTypes(publicChain);

  const flatChain = getChainById(flatChains, flatChainId);

  return { flatChainId, flatChain };
};

export const getMetamaskNetwork = (
  publicChain: IApiChain,
  chainType?: ChainType,
  group?: EndpointGroup,
) => {
  const shouldFlatten = chainType && group;

  if (shouldFlatten) {
    const { flatChainId, flatChain } = getFlattenChain(
      publicChain,
      chainType,
      group,
    );

    return getMappedNetwork(flatChain, flatChainId);
  }

  return getMappedNetwork(publicChain, publicChain.id as ChainID);
};
