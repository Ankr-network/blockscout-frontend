import { tHTML } from '@ankr.com/common';
import { useCallback } from 'react';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { NewHistoryDialog } from 'modules/common/components/HistoryDialog/NewHistoryDialog';
import { BSC_NETWORK_BY_ENV, ONE } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useStakedBNBTxHistory } from '../../hooks/liquid-tokens/BNB/useStakedBNBTxHistory';

import { useStakedABNBBData } from './useStakedABNBBData';

export const StakedABNBB = (): JSX.Element => {
  const { binanceConfig } = configFromEnv();
  const unstakePendingData = useUnstakePendingTimestamp({ token: Token.BNB });

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
    address,
    amount,
    chainId,
    isBalancesLoading,
    isPendingUnstakeLoading,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingValue,
    stakeLink,
    tradeLink,
    unstakeLink,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  } = useStakedABNBBData();

  const {
    isHistoryDataLoading,
    pendingUnstakeHistoryABNBB,
    handleLoadTxHistory,
  } = useStakedBNBTxHistory();

  const onTradeClick = () => {
    trackClickTrade({
      walletType: walletName,
      walletPublicAddress: address,
      stakeToken: Token.aBNBb,
      stakedBalance: amount?.toFixed(),
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: Token.aBNBb,
    });
  };

  const handleOpenHistoryDialog = useCallback(() => {
    onOpenHistory();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpenHistory]);

  const preventHistoryLoading =
    !!pendingUnstakeHistoryABNBB.length || isHistoryDataLoading;

  const renderedPendingSlot = (!pendingValue.isZero() ||
    isPendingUnstakeLoading) && (
    <Pending
      isLoading={isHistoryDataLoading}
      isUnstakeValueLoading={isPendingUnstakeLoading}
      token={Token.aBNBb}
      tooltip={
        <PendingTable
          data={pendingUnstakeHistoryABNBB}
          unstakeLabel={unstakePendingData.label}
        />
      }
      value={pendingValue}
      onLoadHistory={preventHistoryLoading ? undefined : handleLoadTxHistory}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        chainId={chainId}
        isHistoryLoading={isHistoryDataLoading}
        isLoading={isBalancesLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aBNBb}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
        onTradeClick={onTradeClick}
      />

      <NewHistoryDialog
        network={BSC_NETWORK_BY_ENV}
        open={isOpenedHistory}
        token={Token.aBNBb}
        onClose={onCloseHistory}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description={tHTML('dashboard.token-info.aBNBb', {
          ratio: ONE.toFormat(),
        })}
        moreHref={getStakingOverviewUrl(Token.BNB)}
        open={isOpenedInfo}
        tokenAddress={binanceConfig.aBNBbToken}
        tokenName={Token.aBNBb}
        onClose={onCloseInfo}
      />
    </>
  );
};
