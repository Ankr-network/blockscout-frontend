import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useStakedAAVAXCData } from '../StakedTokens/hooks/AVAX/useStakedAAVAXCData';
import { useStakedAVAXTxHistory } from '../StakedTokens/hooks/AVAX/useStakedAVAXTxHistory';

export const StakedAAVAXC = (): JSX.Element => {
  const { avalancheConfig } = configFromEnv();

  const unstakePendingData = useUnstakePendingTimestamp({ token: Token.AVAX });
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
    transactionHistoryAAVAXC,
    pendingUnstakeHistoryAAVAXC,
    isHistoryDataLoading,
    handleLoadTxHistory,
  } = useStakedAVAXTxHistory();

  const {
    amount,
    pendingValue,
    network,
    chainId,
    tradeLink,
    stakeLink,
    unstakeLink,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    walletName,
    ratio,
    address,
    isPendingUnstakeLoading,
    handleAddTokenToWallet,
  } = useStakedAAVAXCData();

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: Token.aAVAXc,
    });
  };

  const handleOpenHistoryDialog = useCallback(() => {
    onOpenHistory();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpenHistory]);

  const renderedPendingSlot = (!pendingValue.isZero() ||
    isPendingUnstakeLoading) && (
    <Pending
      isLoading={isHistoryDataLoading}
      isUnstakeValueLoading={isPendingUnstakeLoading}
      token={Token.aAVAXc}
      tooltip={
        <PendingTable
          data={pendingUnstakeHistoryAAVAXC}
          unstakeLabel={unstakePendingData.label}
        />
      }
      value={pendingValue}
      onLoadHistory={handleLoadTxHistory}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        chainId={chainId}
        isHistoryLoading={isHistoryDataLoading}
        isLoading={isBalancesLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aAVAXc}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
      />

      <HistoryDialog
        history={transactionHistoryAAVAXC}
        isHistoryLoading={isHistoryDataLoading}
        open={isOpenedHistory}
        onClose={onCloseHistory}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description="dashboard.token-info.aAVAXc"
        moreHref={getStakingOverviewUrl(Token.AVAX)}
        open={isOpenedInfo}
        ratio={ratio ? new BigNumber(1).div(ratio) : ZERO}
        tokenAddress={avalancheConfig.aAVAXc}
        tokenName={Token.aAVAXc}
        onClose={onCloseInfo}
      />
    </>
  );
};
