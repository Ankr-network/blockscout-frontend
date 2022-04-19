import { useCallback } from 'react';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { featuresConfig } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';

import { useStakedABNBBData } from '../StakedTokens/hooks/BNB/useStakedABNBBData';
import { useStakedBNBTxHistory } from '../StakedTokens/hooks/BNB/useStakedBNBTxHistory';

export const StakedABNBB = (): JSX.Element => {
  const { binanceConfig } = configFromEnv();

  const { isOpened, onClose, onOpen } = useDialog();

  const {
    amount,
    pendingValue,
    network,
    chainId,
    stakeLink,
    unstakeLink,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    tradeLink,
    walletName,
    address,
    handleAddTokenToWallet,
  } = useStakedABNBBData();

  const {
    isHistoryDataLoading,
    pendingUnstakeHistoryABNBB,
    transactionHistoryABNBB,
    handleLoadTxHistory,
  } = useStakedBNBTxHistory();

  const onTradeClick = () => {
    trackClickTrade({
      walletType: walletName,
      walletPublicAddress: address,
      stakeToken: Token.aBNBb,
      stakedBalance: amount?.toFixed(),
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: Token.aBNBb,
    });
  };

  const handleOpenHistoryDialog = useCallback(() => {
    onOpen();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpen]);

  const preventHistoryLoading =
    !!pendingUnstakeHistoryABNBB.length || isHistoryDataLoading;

  const renderedPendingSlot = !pendingValue.isZero() &&
    featuresConfig.bnbHistory && (
      <Pending
        isLoading={isHistoryDataLoading}
        token={Token.aBNBb}
        tooltip={<PendingTable data={pendingUnstakeHistoryABNBB} />}
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
        isLoading={isBalancesLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aBNBb}
        tokenAddress={binanceConfig.aBNBbToken}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        onAddStakingClick={onAddStakingClick}
        onAddTokenToWallet={handleAddTokenToWallet}
        onHistoryBtnClick={
          featuresConfig.bnbHistory ? handleOpenHistoryDialog : undefined
        }
        onTradeClick={onTradeClick}
      />

      <HistoryDialog
        history={transactionHistoryABNBB}
        isHistoryLoading={isHistoryDataLoading}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
