import { useCallback } from 'react';

import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
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
    isPendingUnstakeLoading,
    nativeAmount,
    onAddTokenToWallet,
  } = useStakedABNBCData();

  const { onAddStakingClick } = useStakedABNBCAnalytics();

  const {
    isHistoryDataLoading,
    pendingUnstakeHistoryABNBC,
    transactionHistoryABNBC,
    handleLoadTxHistory,
  } = useStakedBNBTxHistory();

  const handleOpenHistoryDialog = useCallback(() => {
    onOpen();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpen]);

  const preventHistoryLoading =
    !!pendingUnstakeHistoryABNBC.length || isHistoryDataLoading;

  const renderedPendingSlot = (!pendingValue.isZero() ||
    isPendingUnstakeLoading) && (
    <Pending
      isLoading={isHistoryDataLoading}
      isUnstakeValueLoading={isPendingUnstakeLoading}
      token={Token.aBNBc}
      tooltip={<PendingTable data={pendingUnstakeHistoryABNBC} />}
      value={pendingValue}
      onLoadHistory={preventHistoryLoading ? undefined : handleLoadTxHistory}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        chainId={chainId}
        isLoading={isLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        nativeAmount={nativeAmount}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={token}
        tokenAddress={tokenAddress}
        unstakeLink={unstakeLink}
        onAddStakingClick={onAddStakingClick}
        onAddTokenToWallet={onAddTokenToWallet}
        onHistoryBtnClick={handleOpenHistoryDialog}
      />

      <HistoryDialog
        history={transactionHistoryABNBC}
        isHistoryLoading={isHistoryDataLoading}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
