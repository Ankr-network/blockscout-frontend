import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { StakingBridgeAsset } from 'modules/dashboard/components/StakingBridgeAsset';

import { useStakedBridgeMaticData } from '../StakedTokens/hooks/useStakedBridgeMatic';

export const StakedBridgeMatic = (): JSX.Element => {
  const { contractConfig } = configFromEnv();

  const { amount, network, isBalancesLoading } = useStakedBridgeMaticData();

  return (
    <StakingBridgeAsset
      amount={amount}
      isLoading={isBalancesLoading}
      network={network}
      token={Token.aMATICb}
      tokenAddress={contractConfig.polygonPool}
    />
  );
};
