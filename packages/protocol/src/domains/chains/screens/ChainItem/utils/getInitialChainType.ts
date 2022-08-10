import { ChainType } from 'domains/chains/types';
import { IApiChain } from 'domains/chains/api/queryChains';

export const getInitialChainType = (
  { devnets, testnets }: IApiChain,
  netId?: string,
): ChainType => {
  const isTestNetTab = testnets?.find(el => netId?.includes(el.id));

  if (isTestNetTab) {
    return ChainType.Testnet;
  }

  const isDevNetTab = devnets?.find(el => netId?.includes(el.id));

  if (isDevNetTab) {
    return ChainType.Devnet;
  }

  return ChainType.Mainnet;
};
