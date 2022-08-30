import { t } from 'common';
import { flatNetworkURLs } from 'domains/auth/utils/flatNetworkURLs';
import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import { Chain } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';
import { ChainID } from 'modules/chains/types';
import { PrefixedHex } from 'multirpc-sdk';
import { IChainParams } from '../../actions/addNetwork';
import { NETWORK_INFO_MAP } from './const';

const toHex = (num: number): PrefixedHex => {
  return `0x${num.toString(16)}`;
};

const addNamePostfix = (name: string) =>
  t('chain-item.get-started.endpoints.network-postfix', { name });

export const flattenAllChainTypes = (chain: IApiChain): IApiChain[] => [
  chain,
  ...(chain.extenders || []).flatMap(flattenAllChainTypes),
  ...(chain.extensions || []).flatMap(flattenAllChainTypes),
  ...(chain.testnets || []).flatMap(flattenAllChainTypes),
  ...(chain.devnets || []).flatMap(flattenAllChainTypes),
];

export const getMappedNetwork = (
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
