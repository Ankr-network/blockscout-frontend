import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { featuresConfig } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { useABNBBCard } from './useABNBBCard';
import { useBNBTxHistory } from './useBNBTxHistory';

export const ABNBBCard = (): JSX.Element | null => {
  const BNBTxHistory = useBNBTxHistory();
  const aBNBbData = useABNBBCard(BNBTxHistory.hasHistory);
  const { isOpened, onClose, onOpen } = useDialog();

  if (!aBNBbData.isShowed) {
    return null;
  }

  const renderedPendingSlot = !aBNBbData.pendingValue.isZero() && (
    <Pending
      value={aBNBbData.pendingValue}
      token={aBNBbData.token}
      tooltip={<PendingTable data={BNBTxHistory.pendingUnstakeHistory} />}
    />
  );

  return (
    <>
      <StakingAsset
        onHistoryBtnClick={onOpen}
        network={aBNBbData.network}
        token={aBNBbData.token}
        tokenAddress={aBNBbData.tokenAddress}
        amount={aBNBbData.amount}
        tradeLink={
          undefined /* TODO Please to add fix for it (BNB; trading-cockpit; aBNBbData.tradeLink) */
        }
        unstakeLink={
          featuresConfig.isActiveBNBUnstaking
            ? aBNBbData.unstakeLink
            : undefined
        }
        stakeLink={aBNBbData.stakeLink}
        isStakeLoading={aBNBbData.isStakeLoading}
        isUnstakeLoading={aBNBbData.isUnstakeLoading}
        isHistoryLoading={BNBTxHistory.loading}
        pendingSlot={renderedPendingSlot}
        isLoading={aBNBbData.isBalancesLoading}
      />

      <HistoryDialog
        open={isOpened}
        onClose={onClose}
        history={BNBTxHistory.transactionHistory}
      />
    </>
  );
};
