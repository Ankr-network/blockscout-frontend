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
    network,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    unstakeLink,
    stakeLink,
  } = useStakedAFTMBData();

  const handleLoadTxHistory = useCallback(() => {
    dispatch(getHistory());
  }, [dispatch]);

  const handleOpenHistoryDialog = useCallback(() => {
    onOpen();
    dispatch(getHistory());
  }, [dispatch, onOpen]);

  const renderedPendingSlot = !history.pendingValue.isZero() && (
    <Pending
      isLoading={history.isHistoryLoading}
      token={Token.aFTMb}
      tooltip={<PendingTable data={history.pendingUnstakeHistory} />}
      value={history.pendingValue}
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
