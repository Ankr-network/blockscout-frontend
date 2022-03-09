import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';

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
  } = useStakedBNBData();
  const { isOpened, onClose, onOpen } = useDialog();

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      token={Token.aBNBb}
      tooltip={<PendingTable data={txHistory.pendingUnstakeHistory} />}
      value={pendingValue}
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
        tradeLink={
          undefined /* TODO Please to add fix for it (BNB; trading-cockpit; tradeLink) */
        }
        unstakeLink={unstakeLink}
        onHistoryBtnClick={onOpen}
      />

      <HistoryDialog
        history={txHistory.transactionHistory}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
