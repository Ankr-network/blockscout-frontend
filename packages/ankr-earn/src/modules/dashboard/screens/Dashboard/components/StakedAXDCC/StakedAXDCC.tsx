import { StakingAsset } from 'modules/dashboard/components/StakingAsset';

import { useStakedAXDCC } from './useStakedAXDCC';

export const StakedAXDCC = (): JSX.Element => {
  const {
    amount,
    isLoading,
    isStakeLoading,
    nativeAmount,
    network,
    stakeLink,
    token,
    unstakeLink,
    usdAmount,
  } = useStakedAXDCC();

  return (
    <>
      <StakingAsset
        amount={amount}
        isLoading={isLoading}
        isShowedTradeLink={false}
        isStakeLoading={isStakeLoading}
        nativeAmount={nativeAmount}
        network={network}
        stakeLink={stakeLink}
        token={token}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={undefined}
        onTokenInfoClick={undefined}
      />
    </>
  );
};
