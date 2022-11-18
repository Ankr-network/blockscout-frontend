import { tHTML } from '@ankr.com/common';
import { useCallback } from 'react';

import { NewHistoryDialog } from 'modules/common/components/HistoryDialog/NewHistoryDialog';
import { ETH_NETWORK_BY_ENV, ONE, ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useStakedMATICTxHistory } from '../../hooks/liquid-tokens/MATIC/useStakedMaticTxHistory';

import { useStakedAMATICCAnalytics } from './useStakedAMATICCAnalytics';
import { useStakedAMATICCData } from './useStakedAMATICCData';

export const StakedAMATICC = (): JSX.Element => {
  const unstakePendingData = useUnstakePendingTimestamp({ token: Token.MATIC });
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
    chainId,
    isLoading,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    pendingValue,
    ratio,
    stakeLink,
    token,
    tokenAddress,
    unstakeLink,
    usdAmount,
    onAddTokenToWallet,
  } = useStakedAMATICCData();

  const { onAddStakingClick } = useStakedAMATICCAnalytics();

  const {
    isHistoryDataLoading,
    pendingUnstakeHistoryAMATICC,
    handleLoadTxHistory,
  } = useStakedMATICTxHistory();

  const handleOpenHistoryDialog = useCallback(() => {
    onOpenHistory();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpenHistory]);

  const preventHistoryLoading =
    !!pendingUnstakeHistoryAMATICC?.length || isHistoryDataLoading;

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      isLoading={isHistoryDataLoading}
      token={Token.aMATICc}
      tooltip={
        <PendingTable
          data={pendingUnstakeHistoryAMATICC}
          unstakeLabel={unstakePendingData.label}
        />
      }
      value={pendingValue}
      onLoadHistory={preventHistoryLoading ? undefined : handleLoadTxHistory}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        chainId={chainId}
        isHistoryLoading={isHistoryDataLoading}
        isLoading={isLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        nativeAmount={nativeAmount}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={token}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
      />

      <NewHistoryDialog
        network={ETH_NETWORK_BY_ENV}
        open={isOpenedHistory}
        token={Token.aMATICc}
        onClose={onCloseHistory}
      />

      <TokenInfoDialog
        addTokenToWallet={onAddTokenToWallet}
        description={tHTML('dashboard.token-info.aMATICc', {
          ratio: (ratio && !ratio.isZero() ? ONE.div(ratio) : ZERO).toFormat(),
        })}
        moreHref={getStakingOverviewUrl(Token.MATIC)}
        open={isOpenedInfo}
        tokenAddress={tokenAddress}
        tokenName={Token.aMATICc}
        onClose={onCloseInfo}
      />
    </>
  );
};
