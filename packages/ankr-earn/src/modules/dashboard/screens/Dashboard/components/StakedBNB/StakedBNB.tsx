import { useCallback } from 'react';

import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { fetchTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedBNBData } from '../StakedTokens/hooks/useStakedBNBData';
import { useStakedBNBTxHistory } from '../StakedTokens/hooks/useStakedBNBTxHistory';

export const StakedBNB = (): JSX.Element => {
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
  } = useStakedBNBData();
  const { isOpened, onClose, onOpen } = useDialog();
  const dispatch = useAppDispatch();

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
        onHistoryBtnClick={handleOpenHistoryDialog}
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
