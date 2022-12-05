import { Token } from 'modules/common/types/token';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';

import { useStakedAXDCC } from './useStakedAXDCC';
import { useTokenInfoDialog } from './useTokenInfoDialog';

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
    onAddStakingClick,
  } = useStakedAXDCC();

  const {
    description,
    isOpenedInfo,
    moreHref,
    tokenAddress,
    onAddToken,
    onCloseInfo,
    onOpenInfo,
  } = useTokenInfoDialog();

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
        onAddStakingClick={onAddStakingClick}
        onTokenInfoClick={onOpenInfo}
      />

      <TokenInfoDialog
        addTokenToWallet={onAddToken}
        description={description}
        moreHref={moreHref}
        open={isOpenedInfo}
        tokenAddress={tokenAddress}
        tokenName={Token.aXDCc}
        onClose={onCloseInfo}
      />
    </>
  );
};
