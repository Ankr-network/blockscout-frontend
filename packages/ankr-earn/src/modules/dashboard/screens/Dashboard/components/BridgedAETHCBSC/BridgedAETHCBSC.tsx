import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { BridgedAsset } from 'modules/dashboard/components/BridgedAsset';

import { useStakedBridgeAETHCData } from '../StakedTokens/hooks/ETH/useStakedBridgeAETHCData';

const { binanceConfig } = configFromEnv();

export const BridgedAETHCBSC = (): JSX.Element => {
  const {
    amount,
    chainId,
    isBalancesLoading,
    nativeAmount,
    network,
    usdAmount,
    onAddTokenClick,
  } = useStakedBridgeAETHCData();

  return (
    <BridgedAsset
      amount={amount}
      chainId={chainId}
      isLoading={isBalancesLoading}
      nativeAmount={nativeAmount}
      network={network}
      token={Token.aETHc}
      tokenAddress={binanceConfig.aETHcToken}
      usdAmount={usdAmount}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
