import { configFromEnv } from 'modules/api/config';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { useStakedAFTMBData } from '../StakedTokens/hooks/useStakedAFTMBData';

export const StakedAFTMB = (): JSX.Element | null => {
  const { fantomConfig } = configFromEnv();

  const {
    amount,
    pendingValue,
    network,
    isBalancesLoading,
    isStakeLoading,
    stakeLink,
  } = useStakedAFTMBData();

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending value={pendingValue} token={Token.aMATICb} />
  );

  return (
    <StakingAsset
      network={network}
      token={Token.aFTMb}
      tokenAddress={fantomConfig.aftmbToken}
      amount={amount}
      pendingSlot={renderedPendingSlot}
      isLoading={isBalancesLoading}
      stakeLink={stakeLink}
      isStakeLoading={isStakeLoading}
    />
  );
};
