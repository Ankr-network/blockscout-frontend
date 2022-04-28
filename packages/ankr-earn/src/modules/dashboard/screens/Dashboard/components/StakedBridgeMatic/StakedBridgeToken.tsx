import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { StakingBridgeAsset } from 'modules/dashboard/components/StakingBridgeAsset';

import { useStakedBridgeMaticData } from '../StakedTokens/hooks/MATIC/useStakedBridgeMatic';

export const StakedBridgeMatic = (): JSX.Element => {
  const { contractConfig } = configFromEnv();

  const { amount, network, isBalancesLoading, onAddTokenClick, chainId } =
    useStakedBridgeMaticData();

  return (
    <StakingBridgeAsset
      amount={amount}
      chainId={chainId}
      isLoading={isBalancesLoading}
      network={network}
      token={Token.aMATICb}
      tokenAddress={contractConfig.polygonPool}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
