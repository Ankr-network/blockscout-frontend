import { Token } from 'modules/common/types/token';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';

import { useStakedASETHC } from './useStakedASETHC';
import { useStakedASETHCAnalytics } from './useStakedASETHCAnalytics';
import { useStakedASETHCStyles } from './useStakedASETHCStyles';
import { useTokenInfoDialog } from './useTokenInfoDialog';

export const StakedASETHC = (): JSX.Element => {
  const classes = useStakedASETHCStyles();

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
  } = useStakedASETHC();

  const { onAddStakingClick } = useStakedASETHCAnalytics();

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
        iconTokenRootClass={classes.icon}
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
        tokenName={Token.asETHc}
        onClose={onCloseInfo}
      />
    </>
  );
};
