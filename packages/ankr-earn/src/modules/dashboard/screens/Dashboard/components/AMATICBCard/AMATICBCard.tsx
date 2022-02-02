import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { useAMATICBCard } from './useAMATICBCard';
import { useMaticTxHistory } from './useMaticTxHistory';

export const AMATICBCard = (): JSX.Element | null => {
  const MATICTxHistory = useMaticTxHistory();
  const aMATICbData = useAMATICBCard(MATICTxHistory.hasHistory);
  const { isOpened, onClose, onOpen } = useDialog();

  if (!aMATICbData.isShowed) {
    return null;
  }

  const renderedPendingSlot = !aMATICbData.pendingValue.isZero() && (
    <Pending
      value={aMATICbData.pendingValue}
      token={aMATICbData.token}
      tooltip={<PendingTable data={MATICTxHistory.pendingUnstakeHistory} />}
    />
  );

  return (
    <>
      <StakingAsset
        onHistoryBtnClick={onOpen}
        network={aMATICbData.network}
        token={aMATICbData.token}
        amount={aMATICbData.amount}
        tradeLink={aMATICbData.tradeLink}
        unstakeLink={aMATICbData.unstakeLink}
        stakeLink={aMATICbData.stakeLink}
        isStakeLoading={aMATICbData.isStakeLoading}
        isUnstakeLoading={aMATICbData.isUnstakeLoading}
        isHistoryLoading={MATICTxHistory.loading}
        pendingSlot={renderedPendingSlot}
        isLoading={aMATICbData.isLoading}
      />

      <HistoryDialog
        open={isOpened}
        onClose={onClose}
        history={MATICTxHistory.transactionHistory}
      />
    </>
  );
};
