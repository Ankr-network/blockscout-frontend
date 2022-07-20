import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { BridgedAsset } from 'modules/dashboard/components/BridgedAsset';

import { useBridgedMaticCertPolygon } from '../StakedTokens/hooks/MATIC/useBridgedMaticCertPolygon';

export const BridgedMaticCertPolygon = (): JSX.Element => {
  const { polygonConfig } = configFromEnv();

  const {
    amount,
    chainId,
    isBalancesLoading,
    nativeAmount,
    network,
    usdAmount,
    onAddTokenClick,
  } = useBridgedMaticCertPolygon();

  return (
    <BridgedAsset
      amount={amount}
      chainId={chainId}
      isLoading={isBalancesLoading}
      nativeAmount={nativeAmount}
      network={network}
      token={Token.aMATICc}
      tokenAddress={polygonConfig.aMATICcToken}
      usdAmount={usdAmount}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
