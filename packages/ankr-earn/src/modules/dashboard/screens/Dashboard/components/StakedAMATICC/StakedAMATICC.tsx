import { useCallback } from 'react';

import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { featuresConfig } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import {
  Pending,
  PendingTemporary,
} from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';

import { useStakedAMATICCData } from '../StakedTokens/hooks/MATIC/useStakedAMATICCData';
import { useStakedMaticTxHistory } from '../StakedTokens/hooks/MATIC/useStakedMaticTxHistory';

import { useStakedAMATICCAnalytics } from './useStakedAMATICCAnalytics';

export const StakedAMATICC = (): JSX.Element => {
  const { isOpened, onClose, onOpen } = useDialog();
  const {
    amount,
    pendingValue,
    isLoading,
    isStakeLoading,
    network,
    chainId,
    stakeLink,
    token,
    tokenAddress,
    unstakeLink,
    isUnstakeLoading,
    onAddTokenToWallet,
  } = useStakedAMATICCData();

  const { onAddStakingClick } = useStakedAMATICCAnalytics();

  const {
    isHistoryDataLoading,
    pendingUnstakeHistory,
    transactionHistory,
    handleLoadTxHistory,
  } = useStakedMaticTxHistory();

  const handleOpenHistoryDialog = useCallback(() => {
    onOpen();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpen]);

  const preventHistoryLoading =
    !!pendingUnstakeHistory.length || isHistoryDataLoading;

  const renderedPendingSlot =
    !pendingValue.isZero() &&
    (featuresConfig.isSplitedMATICHistory ? (
      <Pending
        isLoading={isHistoryDataLoading}
        token={Token.aMATICc}
        tooltip={<PendingTable data={pendingUnstakeHistory} />}
        value={pendingValue}
        onLoadHistory={preventHistoryLoading ? undefined : handleLoadTxHistory}
      />
    ) : (
      <PendingTemporary />
    ));

  return (
    <>
      <StakingAsset
        amount={amount}
        chainId={chainId}
        isLoading={isLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={token}
        tokenAddress={tokenAddress}
        unstakeLink={
          featuresConfig.aMATICcUnstakeEnabled ? unstakeLink : undefined
        }
        onAddStakingClick={onAddStakingClick}
        onAddTokenToWallet={onAddTokenToWallet}
        onHistoryBtnClick={handleOpenHistoryDialog}
      />

      <HistoryDialog
        history={transactionHistory}
        isHistoryLoading={isHistoryDataLoading}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
