import { useCallback } from 'react';

import { t } from 'common';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';

import { useStakedAETHCData } from '../StakedTokens/hooks/ETH/useStakedAETHCData';
import { useStakedTxHistoryETH } from '../StakedTokens/hooks/ETH/useStakedTxHistoryETH';

export const StakedAETHC = (): JSX.Element => {
  const { contractConfig } = configFromEnv();

  const {
    isOpened: isOpenedHistory,
    onOpen: onOpenHistory,
    onClose: onCloseHistory,
  } = useDialog();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const {
    amount,
    network,
    chainId,
    tradeLink,
    stakeLink,
    isStakeLoading,
    isBalancesLoading,
    walletName,
    address,
    ratio,
    nativeAmount,
    handleAddTokenToWallet,
  } = useStakedAETHCData();

  const {
    stakedAETHC,
    pendingUnstakeHistory,
    pendingValue,
    isHistoryLoading,
    handleLoadTxHistory,
  } = useStakedTxHistoryETH();

  const handleOpenHistoryDialog = useCallback(() => {
    onOpenHistory();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpenHistory]);

  const onTradeClick = () => {
    trackClickTrade({
      walletType: walletName,
      walletPublicAddress: address,
      stakeToken: Token.aETHc,
      stakedBalance: amount?.toFixed(),
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: Token.aETHc,
    });
  };

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      isLoading={isHistoryLoading}
      token={Token.aETHc}
      tooltip={<PendingTable data={pendingUnstakeHistory} />}
      value={pendingValue}
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
        nativeAmount={nativeAmount}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aETHc}
        tradeLink={tradeLink}
        unstakeTooltip={t('stake-ethereum.unstake-tooltip')}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
        onTradeClick={onTradeClick}
      />

      <HistoryDialog
        history={{
          token: Token.aETHc,
          staked: stakedAETHC,
          unstaked: [],
        }}
        isHistoryLoading={isHistoryLoading}
        open={isOpenedHistory}
        onClose={onCloseHistory}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description="dashboard.token-info.aETHc"
        moreHref={getStakingOverviewUrl(Token.ETH)}
        open={isOpenedInfo}
        ratio={ratio}
        tokenAddress={contractConfig.aethContract}
        tokenName={Token.aETHc}
        onClose={onCloseInfo}
      />
    </>
  );
};
