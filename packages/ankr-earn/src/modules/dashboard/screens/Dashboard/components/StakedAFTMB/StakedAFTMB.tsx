import { useCallback } from 'react';

import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { getHistory } from 'modules/stake-fantom/actions/getHistory';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedAFTMBData } from '../StakedTokens/hooks/useStakedAFTMBData';
import { useStakedFTMTxHistory } from '../StakedTokens/hooks/useStakedFTMTxHistory';

export const StakedAFTMB = (): JSX.Element | null => {
  const { fantomConfig } = configFromEnv();
  const { isOpened, onClose, onOpen } = useDialog();
  const dispatch = useAppDispatch();

  const history = useStakedFTMTxHistory();

  const {
    amount,
    pendingUnstakes,
    network,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    unstakeLink,
    stakeLink,
    tradeLink,
  } = useStakedAFTMBData();

  const handleLoadTxHistory = useCallback(() => {
    dispatch(getHistory());
  }, [dispatch]);

  const handleOpenHistoryDialog = useCallback(() => {
    onOpen();
    dispatch(getHistory());
  }, [dispatch, onOpen]);

  const renderedPendingSlot = !pendingUnstakes.isZero() && (
    <Pending
      isLoading={history.isHistoryLoading}
      token={Token.aFTMb}
      tooltip={<PendingTable data={history.pendingUnstakeHistory} />}
      value={pendingUnstakes}
      onLoadHistory={handleLoadTxHistory}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        isHistoryLoading={history.isHistoryLoading}
        isLoading={isBalancesLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aFTMb}
        tokenAddress={fantomConfig.aftmbToken}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        onHistoryBtnClick={handleOpenHistoryDialog}
      />

      <HistoryDialog
        history={{
          token: Token.aFTMb,
          staked: history.staked,
          unstaked: history.unstaked,
        }}
        isHistoryLoading={history.isHistoryLoading}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
