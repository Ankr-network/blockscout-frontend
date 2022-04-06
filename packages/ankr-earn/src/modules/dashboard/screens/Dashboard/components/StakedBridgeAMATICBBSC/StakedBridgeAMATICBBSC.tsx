import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { StakingBridgeAsset } from 'modules/dashboard/components/StakingBridgeAsset';

import { useStakedBridgeBSCMaticData } from '../StakedTokens/hooks/MATIC/useStakedBridgeBSCMatic';

export const StakedBridgeAMATICBBSC = (): JSX.Element => {
  const { binanceConfig } = configFromEnv();

  const { amount, network, isBalancesLoading, onAddTokenClick } =
    useStakedBridgeBSCMaticData();

  return (
    <StakingBridgeAsset
      amount={amount}
      isLoading={isBalancesLoading}
      network={network}
      token={Token.aMATICb}
      tokenAddress={binanceConfig.aMATICbToken}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
