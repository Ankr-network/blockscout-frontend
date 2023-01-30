import { t, tHTML } from '@ankr.com/common';
import { useCallback } from 'react';

import { NewHistoryDialog } from 'modules/common/components/HistoryDialog/NewHistoryDialog';
import { ONE, ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useStakedBNBTxHistory } from '../../hooks/liquid-tokens/BNB/useStakedBNBTxHistory';

import { useStakedABNBCAnalytics } from './useStakedABNBCAnalytics';
import { useStakedABNBCData } from './useStakedABNBCData';

export const StakedABNBC = (): JSX.Element => {
  const unstakePendingData = useUnstakePendingTimestamp({ token: Token.BNB });
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
    isPendingUnstakeLoading,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    pendingValue,
    ratio,
    stakeLink,
    token,
    tokenAddress,
    tradeLink,
    unstakeLink,
    usdAmount,
    onAddTokenToWallet,
  } = useStakedABNBCData();

  const { onAddStakingClick } = useStakedABNBCAnalytics();

  const {
    isHistoryDataLoading,
    pendingUnstakeHistoryABNBC,
    handleLoadTxHistory,
  } = useStakedBNBTxHistory();

  const tokenName = t('unit.abnbc');

  const handleOpenHistoryDialog = useCallback(() => {
    onOpenHistory();
  }, [onOpenHistory]);

  const preventHistoryLoading =
    !!pendingUnstakeHistoryABNBC.length || isHistoryDataLoading;

  const renderedPendingSlot = (!pendingValue.isZero() ||
    isPendingUnstakeLoading) && (
    <Pending
      isLoading={isHistoryDataLoading}
      isUnstakeValueLoading={isPendingUnstakeLoading}
      token={tokenName}
      tooltip={
        <PendingTable
          data={pendingUnstakeHistoryABNBC}
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
        isLoading={isLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        nativeAmount={nativeAmount}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={token}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
      />

      <NewHistoryDialog
        open={isOpenedHistory}
        token={token}
        onClose={onCloseHistory}
      />

      <TokenInfoDialog
        addTokenToWallet={onAddTokenToWallet}
        description={tHTML('dashboard.token-info.aBNBc', {
          ratio: (ratio && !ratio.isZero() ? ONE.div(ratio) : ZERO).toFormat(),
        })}
        moreHref={getStakingOverviewUrl(Token.BNB)}
        open={isOpenedInfo}
        tokenAddress={tokenAddress}
        tokenName={tokenName}
        onClose={onCloseInfo}
      />
    </>
  );
};
