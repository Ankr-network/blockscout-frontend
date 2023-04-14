import { ChainType } from 'domains/chains/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';

const checkSubnets = (
  nets: IApiChain[],
  subnetTab: ChainType,
  netId?: string,
  isMainnetPremiumOnly?: boolean,
) => {
  const isSubnetTab = nets?.find(el => netId?.includes(el.id));
  const isMainnetDisabledAndNets = isMainnetPremiumOnly && nets?.length > 0;

  return isSubnetTab || isMainnetDisabledAndNets ? subnetTab : undefined;
};

export const getInitialChainType = (
  { id, devnets = [], testnets = [] }: IApiChain,
  netId?: string,
  isMainnetPremiumOnly?: boolean,
): ChainType => {
  if (isTestnetOnlyChain(id)) {
    return ChainType.Testnet;
  }

  const testnetTab = checkSubnets(
    testnets,
    ChainType.Testnet,
    netId,
    isMainnetPremiumOnly,
  );

  const devnetTab = checkSubnets(
    devnets,
    ChainType.Devnet,
    netId,
    isMainnetPremiumOnly,
  );

  return testnetTab || devnetTab || ChainType.Mainnet;
};
