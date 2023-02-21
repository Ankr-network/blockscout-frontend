import { tHTML } from '@ankr.com/common';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { ONE } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { EKnownDialogs, useDialog as useKnownDialog } from 'modules/dialogs';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useStakedFTMTxHistory } from '../../hooks/liquid-tokens/FTM/useStakedFTMTxHistory';

import { useStakedAFTMBData } from './useStakedAFTMBData';

const token = Token.aFTMb;
const nativeToken = Token.FTM;

export const StakedAFTMB = (): JSX.Element | null => {
  const { fantomConfig } = configFromEnv();
  const unstakePendingData = useUnstakePendingTimestamp({ token: nativeToken });

  const { handleOpen: handleOpenHistoryDialog } = useKnownDialog(
    EKnownDialogs.history,
    token,
  );

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const { pendingUnstakeHistoryAFTMB, isHistoryLoading, handleLoadTxHistory } =
    useStakedFTMTxHistory(token);

  const {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingUnstakes,
    stakeLink,
    switchLink,
    unstakeLink,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  } = useStakedAFTMBData();

  const onTradeClick = () => {
    trackClickTrade({
      walletType: walletName,
      walletPublicAddress: address,
      stakeToken: token,
      stakedBalance: amount?.toFixed(),
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: token,
    });
  };

  const renderedPendingSlot = !pendingUnstakes.isZero() && (
    <Pending
      isLoading={isHistoryLoading}
      token={token}
      tooltip={
        <PendingTable
          data={pendingUnstakeHistoryAFTMB}
          unstakeLabel={unstakePendingData.label}
        />
      }
      value={pendingUnstakes}
      onLoadHistory={handleLoadTxHistory}
    />
  );

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
        switchLink={switchLink}
        token={token}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
        onTradeClick={onTradeClick}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description={tHTML('dashboard.token-info.aFTMb', {
          ratio: ONE.toFormat(),
        })}
        moreHref={getStakingOverviewUrl(nativeToken)}
        open={isOpenedInfo}
        tokenAddress={fantomConfig.aftmbToken}
        tokenName={token}
        onClose={onCloseInfo}
      />
    </>
  );
};
