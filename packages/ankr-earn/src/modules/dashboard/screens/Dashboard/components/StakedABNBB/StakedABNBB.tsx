import { useCallback } from 'react';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { fetchTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedABNBBData } from '../StakedTokens/hooks/useStakedABNBBData';
import { useStakedBNBTxHistory } from '../StakedTokens/hooks/useStakedBNBTxHistory';

export const StakedABNBB = (): JSX.Element => {
  const { binanceConfig } = configFromEnv();

  const txHistory = useStakedBNBTxHistory();
  const {
    amount,
    pendingValue,
    network,
    stakeLink,
    unstakeLink,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    tradeLink,
    walletName,
    address,
    handleAddTokenToWallet,
  } = useStakedABNBBData();
  const { isOpened, onClose, onOpen } = useDialog();
  const dispatch = useAppDispatch();

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

  const handleLoadTxHistory = useCallback(() => {
    dispatch(fetchTxHistory());
  }, [dispatch]);

  const handleOpenHistoryDialog = useCallback(() => {
    onOpen();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpen]);

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      isLoading={txHistory.isHistoryDataLoading}
      token={Token.aBNBb}
      tooltip={<PendingTable data={txHistory.pendingUnstakeHistory} />}
      value={pendingValue}
      onLoadHistory={handleLoadTxHistory}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        isHistoryLoading={txHistory.isHistoryDataLoading}
        isLoading={isBalancesLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aBNBb}
        tokenAddress={binanceConfig.aBNBbToken}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        onAddStakingClick={onAddStakingClick}
        onAddTokenToWallet={handleAddTokenToWallet}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTradeClick={onTradeClick}
      />

      <HistoryDialog
        history={txHistory.transactionHistory}
        isHistoryLoading={txHistory.isHistoryDataLoading}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
