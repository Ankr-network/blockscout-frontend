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
      token={Token.aMATICb}
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
        token={Token.aMATICb}
        tokenAddress={contractConfig.aMaticbToken}
        tradeLink={tradeLink}
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
