import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { BridgedAsset } from 'modules/dashboard/components/BridgedAsset';

import { useBridgedAnkrETHFTM } from './useBridgedAnkrETHFTM';

export const BridgedAnkrETHFTM = (): JSX.Element => {
  const { fantomConfig } = configFromEnv();

  const {
    amount,
    chainId,
    isBalancesLoading,
    network,
    nativeAmount,
    usdAmount,
    onAddTokenClick,
  } = useBridgedAnkrETHFTM();

  return (
    <BridgedAsset
      amount={amount}
      chainId={chainId}
      isLoading={isBalancesLoading}
      nativeAmount={nativeAmount}
      network={network}
      token={Token.aETHc}
      tokenAddress={fantomConfig.ankrETHToken}
      usdAmount={usdAmount}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
