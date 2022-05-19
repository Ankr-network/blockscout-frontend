import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { StakingBridgeAsset } from 'modules/dashboard/components/StakingBridgeAsset';

import { useStakedBridgeAMATICCBSC } from '../StakedTokens/hooks/MATIC/useStakedBridgeAMATICCBSC';

export const StakedBridgeAMATICCBSC = (): JSX.Element => {
  const { binanceConfig } = configFromEnv();

  const { amount, network, isBalancesLoading, onAddTokenClick, chainId } =
    useStakedBridgeAMATICCBSC();

  return (
    <StakingBridgeAsset
      amount={amount}
      chainId={chainId}
      isLoading={isBalancesLoading}
      network={network}
      token={Token.aMATICc}
      tokenAddress={binanceConfig.aMATICcToken}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
