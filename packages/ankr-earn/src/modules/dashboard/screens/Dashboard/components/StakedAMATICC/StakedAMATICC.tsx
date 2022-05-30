import { useCallback } from 'react';

import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { featuresConfig } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import {
  Pending,
  PendingTemporary,
} from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';

import { useStakedAMATICCData } from '../StakedTokens/hooks/MATIC/useStakedAMATICCData';
import { useStakedMATICTxHistory } from '../StakedTokens/hooks/MATIC/useStakedMaticTxHistory';

import { useStakedAMATICCAnalytics } from './useStakedAMATICCAnalytics';

export const StakedAMATICC = (): JSX.Element => {
  const {
    isOpened: isOpenedHistory,
    onClose: onCloseHistory,
    onOpen: onOpenHistory,
  } = useDialog();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

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
    ratio,
    onAddTokenToWallet,
  } = useStakedAMATICCData();

  const { onAddStakingClick } = useStakedAMATICCAnalytics();

  const {
    isHistoryDataLoading,
    pendingUnstakeHistoryAMATICC,
    transactionHistoryAMATICC,
    handleLoadTxHistory,
  } = useStakedMATICTxHistory();

  const handleOpenHistoryDialog = useCallback(() => {
    onOpenHistory();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpenHistory]);

  const preventHistoryLoading =
    !!pendingUnstakeHistoryAMATICC?.length || isHistoryDataLoading;

  const renderedPendingSlot =
    !pendingValue.isZero() &&
    (featuresConfig.isSplitedMATICHistory ? (
      <Pending
        isLoading={isHistoryDataLoading}
        token={Token.aMATICc}
        tooltip={<PendingTable data={pendingUnstakeHistoryAMATICC} />}
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
        isHistoryLoading={isHistoryDataLoading}
        isLoading={isLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={token}
        unstakeLink={unstakeLink}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={
          featuresConfig.maticHistory ? handleOpenHistoryDialog : undefined
        }
        onTokenInfoClick={onOpenInfo}
      />

      <HistoryDialog
        history={transactionHistoryAMATICC}
        isHistoryLoading={isHistoryDataLoading}
        open={isOpenedHistory}
        onClose={onCloseHistory}
      />

      <TokenInfoDialog
        addTokenToWallet={onAddTokenToWallet}
        description="dashboard.token-info.aMATICc"
        moreHref={getStakingOverviewUrl(Token.MATIC)}
        open={isOpenedInfo}
        ratio={ratio}
        tokenAddress={tokenAddress}
        tokenName={Token.aMATICc}
        onClose={onCloseInfo}
      />
    </>
  );
};
