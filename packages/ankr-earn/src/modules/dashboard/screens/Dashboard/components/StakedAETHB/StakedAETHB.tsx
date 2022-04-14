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

import { useStakedAETHBData } from '../StakedTokens/hooks/ETH/useStakedAETHBData';
import { useStakedTxHistoryETH } from '../StakedTokens/hooks/ETH/useStakedTxHistoryETH';

export const StakedAETHB = (): JSX.Element => {
  const { contractConfig } = configFromEnv();

  const { isOpened, onOpen, onClose } = useDialog();
  const {
    amount,
    network,
    chainId,
    tradeLink,
    stakeLink,
    isStakeLoading,
    isBalancesLoading,
    walletName,
    address,
    handleAddTokenToWallet,
  } = useStakedAETHBData();

  const {
    stakedAETHB,
    pendingUnstakeHistory,
    pendingValue,
    isHistoryLoading,
    handleLoadTxHistory,
  } = useStakedTxHistoryETH();

  const handleOpenHistoryDialog = useCallback(() => {
    onOpen();
    handleLoadTxHistory();
  }, [onOpen, handleLoadTxHistory]);

  const onTradeClick = () => {
    trackClickTrade({
      walletType: walletName,
      walletPublicAddress: address,
      stakeToken: Token.aETHb,
      stakedBalance: amount?.toFixed(),
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: Token.aETHb,
    });
  };

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      isLoading={isHistoryLoading}
      token={Token.aETHb}
      tooltip={<PendingTable data={pendingUnstakeHistory} />}
      value={pendingValue}
      onLoadHistory={handleLoadTxHistory}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        chainId={chainId}
        isLoading={isBalancesLoading}
        isStakeLoading={isStakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aETHb}
        tokenAddress={contractConfig.fethContract}
        tradeLink={tradeLink}
        onAddStakingClick={onAddStakingClick}
        onAddTokenToWallet={handleAddTokenToWallet}
        onHistoryBtnClick={
          featuresConfig.stakeETH ? handleOpenHistoryDialog : undefined
        }
        onTradeClick={onTradeClick}
      />

      <HistoryDialog
        history={{
          token: Token.aETHb,
          staked: stakedAETHB,
          unstaked: [],
        }}
        isHistoryLoading={isHistoryLoading}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
