import { useCallback } from 'react';

import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { fetchTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedMaticData } from '../StakedTokens/hooks/useStakedMaticData';
import { useStakedMaticTxHistory } from '../StakedTokens/hooks/useStakedMaticTxHistory';

export const StakedMatic = (): JSX.Element | null => {
  const { contractConfig } = configFromEnv();

  const txHistory = useStakedMaticTxHistory();
  const {
    amount,
    pendingValue,
    network,
    tradeLink,
    stakeLink,
    unstakeLink,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    handleAddTokenToWallet,
  } = useStakedMaticData();
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
      token={Token.aMATICb}
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
        token={Token.aMATICb}
        tokenAddress={contractConfig.aMaticbToken}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        onAddTokenToWallet={handleAddTokenToWallet}
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
