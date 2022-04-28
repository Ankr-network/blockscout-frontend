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

import { useStakedABNBCData } from '../StakedTokens/hooks/BNB/useStakedABNBCData';
import { useStakedBNBTxHistory } from '../StakedTokens/hooks/BNB/useStakedBNBTxHistory';

import { useStakedABNBCAnalytics } from './useStakedABNBCAnalytics';

export const StakedABNBC = (): JSX.Element => {
  const { isOpened, onClose, onOpen } = useDialog();
  const {
    amount,
    isLoading,
    isStakeLoading,
    network,
    chainId,
    stakeLink,
    token,
    tokenAddress,
    unstakeLink,
    isUnstakeLoading,
    pendingValue,
    onAddTokenToWallet,
  } = useStakedABNBCData();

  const { onAddStakingClick } = useStakedABNBCAnalytics();

  const {
    isHistoryDataLoading,
    pendingUnstakeHistory,
    transactionHistory,
    handleLoadTxHistory,
  } = useStakedBNBTxHistory();

  const handleOpenHistoryDialog = useCallback(() => {
    onOpen();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpen]);

  const preventHistoryLoading =
    !!pendingUnstakeHistory.length || isHistoryDataLoading;

  const renderedPendingSlot =
    !pendingValue.isZero() &&
    (featuresConfig.bnbHistory ? (
      <Pending
        isLoading={isHistoryDataLoading}
        token={Token.aBNBb}
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
        unstakeLink={unstakeLink}
        onAddStakingClick={onAddStakingClick}
        onAddTokenToWallet={onAddTokenToWallet}
        onHistoryBtnClick={
          featuresConfig.bnbHistory ? handleOpenHistoryDialog : undefined
        }
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
