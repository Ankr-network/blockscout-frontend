import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { BridgedAsset } from 'modules/dashboard/components/BridgedAsset';

import { useBridgedAnkrETHAVAX } from './useBridgedAnkrETHAVAX';

export const BridgedAnkrETHAVAX = (): JSX.Element => {
  const { avalancheConfig } = configFromEnv();

  const {
    amount,
    chainId,
    isBalancesLoading,
    network,
    usdAmount,
    onAddTokenClick,
    nativeAmount,
  } = useBridgedAnkrETHAVAX();

  return (
    <BridgedAsset
      amount={amount}
      chainId={chainId}
      isLoading={isBalancesLoading}
      nativeAmount={nativeAmount}
      network={network}
      token={Token.aETHc}
      tokenAddress={avalancheConfig.ankrETHToken}
      usdAmount={usdAmount}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
