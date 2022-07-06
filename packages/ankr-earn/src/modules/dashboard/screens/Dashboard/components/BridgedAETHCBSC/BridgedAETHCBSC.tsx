import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { BridgedAsset } from 'modules/dashboard/components/BridgedAsset';

import { useStakedBridgeAETHCData } from '../StakedTokens/hooks/ETH/useStakedBridgeAETHCData';

export const BridgedAETHCBSC = (): JSX.Element => {
  const { binanceConfig } = configFromEnv();
  const { amount, network, isBalancesLoading, onAddTokenClick, chainId } =
    useStakedBridgeAETHCData();

  return (
    <BridgedAsset
      amount={amount}
      chainId={chainId}
      isLoading={isBalancesLoading}
      network={network}
      token={Token.aETHc}
      tokenAddress={binanceConfig.aETHcToken}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
