import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { BridgedAsset } from 'modules/dashboard/components/BridgedAsset';

import { useBridgedMaticBondBSC } from '../StakedTokens/hooks/MATIC/useBridgedMaticBondBSC';

export const BridgedMaticBondBSC = (): JSX.Element => {
  const { binanceConfig } = configFromEnv();

  const {
    amount,
    chainId,
    isBalancesLoading,
    network,
    usdAmount,
    onAddTokenClick,
  } = useBridgedMaticBondBSC();

  return (
    <BridgedAsset
      amount={amount}
      chainId={chainId}
      isLoading={isBalancesLoading}
      network={network}
      token={Token.aMATICb}
      tokenAddress={binanceConfig.aMATICbToken}
      usdAmount={usdAmount}
      onAddTokenToWallet={onAddTokenClick}
    />
  );
};
