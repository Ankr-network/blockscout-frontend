import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { BridgedAsset } from 'modules/dashboard/components/BridgedAsset';

import { useBridgedMaticCertBSC } from '../StakedTokens/hooks/MATIC/useBridgedMaticCertBSC';

export const BridgedMaticCertBSC = (): JSX.Element => {
  const { binanceConfig } = configFromEnv();

  const {
    amount,
    chainId,
    isBalancesLoading,
    nativeAmount,
    network,
    usdAmount,
    onAddTokenClick,
  } = useBridgedMaticCertBSC();

  return (
    <BridgedAsset
      amount={amount}
      chainId={chainId}
      isLoading={isBalancesLoading}
      nativeAmount={nativeAmount}
      network={network}
      token={Token.aMATICc}
      tokenAddress={binanceConfig.aMATICcToken}
      usdAmount={usdAmount}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
