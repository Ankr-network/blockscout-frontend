import { StakingAsset } from 'modules/dashboard/components/StakingAsset';

import { useStakedABNBCData } from '../StakedTokens/hooks/useStakedABNBCData';

import { useStakedABNBCAnalytics } from './useStakedABNBCAnalytics';

export const StakedABNBC = (): JSX.Element => {
  const {
    amount,
    isLoading,
    isStakeLoading,
    network,
    stakeLink,
    token,
    tokenAddress,
    onAddTokenToWallet,
  } = useStakedABNBCData();

  const { onAddStakingClick } = useStakedABNBCAnalytics();

  return (
    <StakingAsset
      amount={amount}
      isLoading={isLoading}
      isStakeLoading={isStakeLoading}
      network={network}
      stakeLink={stakeLink}
      token={token}
      tokenAddress={tokenAddress}
      onAddStakingClick={onAddStakingClick}
      onAddTokenToWallet={onAddTokenToWallet}
    />
  );
};
