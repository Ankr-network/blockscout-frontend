import { useCallback } from 'react';

import { tHTML } from 'common';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { NewHistoryDialog } from 'modules/common/components/HistoryDialog/NewHistoryDialog';
import { featuresConfig, ONE, ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useStakedFTMTxHistory } from '../../hooks/liquid-tokens/FTM/useStakedFTMTxHistory';

import { useStakedAFTMCData } from './useStakedAFTMCData';

export const StakedAFTMC = (): JSX.Element | null => {
  const { fantomConfig } = configFromEnv();
  const unstakePendingData = useUnstakePendingTimestamp({ token: Token.FTM });
  const {
    isOpened: isOpenedHistory,
    onClose: onCloseHistory,
    onOpen: onOpenHistory,
  } = useDialog();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const {
    pendingUnstakeHistoryAFTMC,
    stakedAFTMC,
    unstakedAFTMC,
    isHistoryLoading,
    handleLoadTxHistory,
  } = useStakedFTMTxHistory(Token.aFTMc);

  const {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    pendingUnstakes,
    ratio,
    stakeLink,
    unstakeLink,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  } = useStakedAFTMCData();

  const onTradeClick = () => {
    trackClickTrade({
      walletType: walletName,
      walletPublicAddress: address,
      stakeToken: Token.aFTMc,
      stakedBalance: amount?.toFixed(),
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: Token.aFTMb,
    });
  };

  const handleOpenHistoryDialog = useCallback(() => {
    onOpenHistory();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpenHistory]);

  const renderedPendingSlot = !pendingUnstakes.isZero() && (
    <Pending
      isLoading={isHistoryLoading}
      token={Token.aFTMc}
      tooltip={
        <PendingTable
          data={pendingUnstakeHistoryAFTMC}
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
        nativeAmount={nativeAmount}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aFTMc}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
        onTradeClick={onTradeClick}
      />

      {featuresConfig.newStakingHistoryDialog ? (
        <NewHistoryDialog
          open={isOpenedHistory}
          token={Token.aFTMc}
          onClose={onCloseHistory}
        />
      ) : (
        <HistoryDialog
          history={{
            staked: stakedAFTMC,
            stakedToken: Token.aFTMc,
            unstaked: unstakedAFTMC,
            unstakedToken: Token.aFTMc,
          }}
          isHistoryLoading={isHistoryLoading}
          open={isOpenedHistory}
          onClose={onCloseHistory}
        />
      )}

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description={tHTML('dashboard.token-info.aFTMc', {
          ratio: ratio && !ratio.isZero() ? ONE.div(ratio) : ZERO.toFormat(),
        })}
        moreHref={getStakingOverviewUrl(Token.FTM)}
        open={isOpenedInfo}
        tokenAddress={fantomConfig.aftmcToken}
        tokenName={Token.aFTMc}
        onClose={onCloseInfo}
      />
    </>
  );
};
