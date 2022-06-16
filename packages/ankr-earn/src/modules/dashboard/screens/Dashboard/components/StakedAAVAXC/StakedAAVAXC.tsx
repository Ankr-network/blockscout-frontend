import BigNumber from 'bignumber.js';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { PendingTemporary } from 'modules/dashboard/components/Pending';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';

import { useStakedAAVAXCData } from '../StakedTokens/hooks/AVAX/useStakedAAVAXCData';

export const StakedAAVAXC = (): JSX.Element => {
  const { avalancheConfig } = configFromEnv();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const {
    amount,
    pendingValue,
    network,
    chainId,
    tradeLink,
    stakeLink,
    unstakeLink,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    walletName,
    ratio,
    address,
    handleAddTokenToWallet,
  } = useStakedAAVAXCData();

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: Token.aAVAXc,
    });
  };

  const renderedPendingSlot = !pendingValue.isZero() && <PendingTemporary />;

  return (
    <>
      <StakingAsset
        amount={amount}
        chainId={chainId}
        isLoading={isBalancesLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aAVAXc}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        onAddStakingClick={onAddStakingClick}
        onTokenInfoClick={onOpenInfo}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description="dashboard.token-info.aAVAXc"
        moreHref={getStakingOverviewUrl(Token.AVAX)}
        open={isOpenedInfo}
        ratio={ratio ? new BigNumber(1).div(ratio) : ZERO}
        tokenAddress={avalancheConfig.aAVAXc}
        tokenName={Token.aAVAXc}
        onClose={onCloseInfo}
      />
    </>
  );
};
