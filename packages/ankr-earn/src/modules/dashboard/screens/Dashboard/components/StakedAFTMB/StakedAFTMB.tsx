import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { useStakedAFTMBData } from '../StakedTokens/hooks/useStakedAFTMBData';
import { useStakedFTMTxHistory } from '../StakedTokens/hooks/useStakedFTMTxHistory';

export const StakedAFTMB = (): JSX.Element | null => {
  const { fantomConfig } = configFromEnv();
  const { isOpened, onClose, onOpen } = useDialog();

  const history = useStakedFTMTxHistory();

  const {
    amount,
    network,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    stakeLink,
    unstakeLink,
  } = useStakedAFTMBData();

  const renderedPendingSlot = !history.pendingValue.isZero() && (
    <Pending
      value={history.pendingValue}
      token={Token.aFTMb}
      tooltip={<PendingTable data={history.pendingUnstakeHistory} />}
    />
  );

  return (
    <>
      <StakingAsset
        network={network}
        token={Token.aFTMb}
        tokenAddress={fantomConfig.aftmbToken}
        amount={amount}
        pendingSlot={renderedPendingSlot}
        isLoading={isBalancesLoading}
        stakeLink={stakeLink}
        unstakeLink={unstakeLink}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        onHistoryBtnClick={onOpen}
        isHistoryLoading={history.isHistoryLoading}
      />

      <HistoryDialog
        open={isOpened}
        history={{
          token: Token.aFTMb,
          staked: history.staked,
          unstaked: history.unstaked,
        }}
        onClose={onClose}
      />
    </>
  );
};
