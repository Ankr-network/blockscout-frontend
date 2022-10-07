import { useCallback } from 'react';

import { tHTML } from 'common';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { featuresConfig, ONE } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { WND_PROPS } from '../../const';
import { useStakedPolkadotCard } from '../../hooks/liquid-tokens/Polkadot/useStakedPolkadotCard';
import { useStakedPolkadotTxHistory } from '../../hooks/liquid-tokens/Polkadot/useStakedPolkadotTxHistory';

export const StakedAWNDB = (): JSX.Element => {
  const { polkadotConfig } = configFromEnv();

  const unstakePendingData = useUnstakePendingTimestamp({ token: Token.WND });

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
    isHistoryDataLoading,
    pendingUnstakeHistory,
    transactionHistory,
    handleLoadTxHistory,
  } = useStakedPolkadotTxHistory(EPolkadotNetworks.WND);

  const {
    address,
    amount,
    isBalancesLoading,
    isShowedTradeLink,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingValue,
    stakeLink,
    tradeLink,
    unstakeLink,
    unsupportedUnstakeHistoryTxt,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  } = useStakedPolkadotCard(WND_PROPS);

  const onTradeClick = (): void => {
    trackClickTrade({
      stakeToken: Token.aWNDb,
      stakedBalance: amount?.toFixed(),
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  const onAddStakingClick = (): void => {
    trackEnterStakingFlow({
      accessPoint: 'add_stake',
      tokenName: Token.aWNDb,
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  const handleOpenHistoryDialog = useCallback((): void => {
    onOpenHistory();

    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpenHistory]);

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      isLoading={isHistoryDataLoading}
      token={Token.aWNDb}
      tooltip={
        <PendingTable
          data={pendingUnstakeHistory}
          unstakeLabel={unstakePendingData.label}
        />
      }
      value={pendingValue}
      onLoadHistory={handleLoadTxHistory}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        isHistoryLoading={isHistoryDataLoading}
        isLoading={isBalancesLoading}
        isShowedTradeLink={isShowedTradeLink}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aWNDb}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={
          featuresConfig.isActivePolkadotStaking
            ? handleOpenHistoryDialog
            : undefined
        }
        onTokenInfoClick={onOpenInfo}
        onTradeClick={onTradeClick}
      />

      <HistoryDialog
        history={transactionHistory}
        isHistoryLoading={isHistoryDataLoading}
        open={isOpenedHistory}
        unsupportedUnstakeHistoryTxt={unsupportedUnstakeHistoryTxt}
        onClose={onCloseHistory}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description={tHTML('dashboard.token-info.aWNDb', {
          ratio: ONE.toFormat(),
        })}
        moreHref={getStakingOverviewUrl(Token.WND)}
        open={isOpenedInfo}
        tokenAddress={polkadotConfig.aWNDbToken ?? ''}
        tokenName={Token.aWNDb}
        onClose={onCloseInfo}
      />
    </>
  );
};
