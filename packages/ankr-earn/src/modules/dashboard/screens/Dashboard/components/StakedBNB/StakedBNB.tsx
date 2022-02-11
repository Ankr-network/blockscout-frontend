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
    tradeLink,
    stakeLink,
    unstakeLink,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
  } = useStakedBNBData();
  const { isOpened, onClose, onOpen } = useDialog();

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      value={pendingValue}
      token={Token.aBNBb}
      tooltip={<PendingTable data={txHistory.pendingUnstakeHistory} />}
    />
  );

  return (
    <>
      <StakingAsset
        network={network}
        token={Token.aBNBb}
        tokenAddress={binanceConfig.aBNBbToken}
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
