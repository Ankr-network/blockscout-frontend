import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { StakingBridgeAsset } from 'modules/dashboard/components/StakingBridgeAsset';

import { useStakedBridgeAETHBData } from '../StakedTokens/hooks/useStakedBridgeAETHBData';

export const StakedBridgeAETHB = (): JSX.Element => {
  const { binanceConfig } = configFromEnv();

  const { amount, network, isBalancesLoading, onAddTokenClick } =
    useStakedBridgeAETHBData();

  return (
    <StakingBridgeAsset
      amount={amount}
      isLoading={isBalancesLoading}
      network={network}
      token={Token.aETHb}
      tokenAddress={binanceConfig.aETHbToken}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
