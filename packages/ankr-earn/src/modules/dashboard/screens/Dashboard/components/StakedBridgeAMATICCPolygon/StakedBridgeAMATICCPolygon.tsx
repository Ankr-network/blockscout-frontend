import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { StakingBridgeAsset } from 'modules/dashboard/components/StakingBridgeAsset';

import { useStakedBridgeAMATICCPolygon } from '../StakedTokens/hooks/MATIC/useStakedBridgeAMATICCPolygon';

export const StakedBridgeAMATICCPolygon = (): JSX.Element => {
  const { polygonConfig } = configFromEnv();

  const { amount, network, isBalancesLoading, onAddTokenClick, chainId } =
    useStakedBridgeAMATICCPolygon();

  return (
    <StakingBridgeAsset
      amount={amount}
      chainId={chainId}
      isLoading={isBalancesLoading}
      network={network}
      token={Token.aMATICc}
      tokenAddress={polygonConfig.aMATICcToken}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
