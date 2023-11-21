import { Chain, ChainType } from 'modules/chains/types';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';

interface CheckSubnetsArguments {
  nets: Chain[];
  subnetTab: ChainType;
  netId?: string;
  isMainnetPremiumOnly?: boolean;
}

const checkSubnets = ({
  nets,
  subnetTab,
  netId,
  isMainnetPremiumOnly,
}: CheckSubnetsArguments) => {
  const isSubnetTab = nets?.find(el => netId?.includes(el.id));
  const isMainnetDisabledAndNets = isMainnetPremiumOnly && nets?.length > 0;

  return isSubnetTab || isMainnetDisabledAndNets ? subnetTab : undefined;
};

interface GetInitialChainTypeParams {
  chain: Chain;
  netId?: string;
  isMainnetPremiumOnly?: boolean;
  isHiddenMainnet?: boolean;
  selectedType?: ChainType;
}

export const getInitialChainType = ({
  chain,
  netId,
  isMainnetPremiumOnly,
  isHiddenMainnet,
  selectedType,
}: GetInitialChainTypeParams): ChainType => {
  if (selectedType) {
    return selectedType;
  }

  const { id, devnets = [], testnets = [] } = chain;

  if (isTestnetOnlyChain(id) || isHiddenMainnet) {
    return ChainType.Testnet;
  }

  const testnetTab = checkSubnets({
    nets: testnets,
    subnetTab: ChainType.Testnet,
    netId,
    isMainnetPremiumOnly,
  });

  const devnetTab = checkSubnets({
    nets: devnets,
    subnetTab: ChainType.Devnet,
    netId,
    isMainnetPremiumOnly,
  });

  return testnetTab || devnetTab || ChainType.Mainnet;
};
