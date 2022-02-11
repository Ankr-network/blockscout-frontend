import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
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
  } = useStakedMaticData();
  const { isOpened, onClose, onOpen } = useDialog();

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      value={pendingValue}
      token={Token.aMATICb}
      tooltip={<PendingTable data={txHistory.pendingUnstakeHistory} />}
    />
  );

  return (
    <>
      <StakingAsset
        network={network}
        token={Token.aMATICb}
        tokenAddress={contractConfig.aMaticbToken}
        amount={amount}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        stakeLink={stakeLink}
        isHistoryLoading={txHistory.isHistoryDataLoading}
        pendingSlot={renderedPendingSlot}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        isLoading={isBalancesLoading}
        onHistoryBtnClick={onOpen}
      />

      <HistoryDialog
        open={isOpened}
        history={txHistory.transactionHistory}
        onClose={onClose}
      />
    </>
  );
};
