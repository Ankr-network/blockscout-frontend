import { Chain, ChainType } from '@ankr.com/chains-list';

import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';

interface CheckSubnetsArguments {
  nets: Chain[];
  subnetTab: ChainType;
  netId?: string;
  isMainnetPremiumOnly?: boolean;
  isTestnetPremiumOnly?: boolean;
}

const checkSubnets = ({
  isMainnetPremiumOnly,
  isTestnetPremiumOnly,
  netId,
  nets,
  subnetTab,
}: CheckSubnetsArguments) => {
  const isSubnetTab = nets?.find(
    el =>
      netId?.includes(el.id) || el.extensions?.some(({ id }) => netId === id),
  );
  const isMainnetDisabledAndNets = isMainnetPremiumOnly && nets?.length > 0;

  if (isMainnetPremiumOnly && isTestnetPremiumOnly) return undefined;

  return isSubnetTab || isMainnetDisabledAndNets ? subnetTab : undefined;
};

interface GetInitialChainTypeParams {
  chain: Chain;
  netId?: string;
  isMainnetPremiumOnly?: boolean;
  isTestnetPremiumOnly?: boolean;
  isHiddenMainnet?: boolean;
  selectedType?: ChainType;
}

export const getInitialChainType = ({
  chain,
  isHiddenMainnet,
  isMainnetPremiumOnly,
  isTestnetPremiumOnly,
  netId,
  selectedType,
}: GetInitialChainTypeParams): ChainType => {
  if (selectedType) {
    return selectedType;
  }

  const { devnets = [], id, testnets = [] } = chain;

  if (isTestnetOnlyChain(id) || isHiddenMainnet) {
    return ChainType.Testnet;
  }

  const testnetTab = checkSubnets({
    nets: testnets,
    subnetTab: ChainType.Testnet,
    netId,
    isMainnetPremiumOnly,
    isTestnetPremiumOnly,
  });

  const devnetTab = checkSubnets({
    nets: devnets,
    subnetTab: ChainType.Devnet,
    netId,
    isMainnetPremiumOnly,
    isTestnetPremiumOnly,
  });

  return testnetTab || devnetTab || ChainType.Mainnet;
};
