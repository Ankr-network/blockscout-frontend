import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { BridgedAsset } from 'modules/dashboard/components/BridgedAsset';

import { useBridgedMaticBond } from '../StakedTokens/hooks/MATIC/useBridgedMaticBond';

export const BridgedMaticBond = (): JSX.Element => {
  const { contractConfig } = configFromEnv();

  const { amount, network, isBalancesLoading, onAddTokenClick, chainId } =
    useBridgedMaticBond();

  return (
    <BridgedAsset
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
