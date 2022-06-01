import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { BridgedAsset } from 'modules/dashboard/components/BridgedAsset';

import { useStakedBridgeAETHBData } from '../StakedTokens/hooks/ETH/useStakedBridgeAETHBData';

export const BridgedEthBond = (): JSX.Element => {
  const { binanceConfig } = configFromEnv();

  const { amount, network, isBalancesLoading, onAddTokenClick, chainId } =
    useStakedBridgeAETHBData();

  return (
    <BridgedAsset
      amount={amount}
      chainId={chainId}
      isLoading={isBalancesLoading}
      network={network}
      token={Token.aETHb}
      tokenAddress={binanceConfig.aETHbToken}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
