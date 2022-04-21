import { useCallback } from 'react';

import { t } from 'common';

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

import { useStakedAETHCData } from '../StakedTokens/hooks/ETH/useStakedAETHCData';
import { useStakedTxHistoryETH } from '../StakedTokens/hooks/ETH/useStakedTxHistoryETH';

export const StakedAETHC = (): JSX.Element => {
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
  } = useStakedAETHCData();

  const {
    stakedAETHC,
    pendingUnstakeHistory,
    pendingValue,
    isHistoryLoading,
    handleLoadTxHistory,
  } = useStakedTxHistoryETH();

  const handleOpenHistoryDialog = useCallback(() => {
    onOpen();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpen]);

  const onTradeClick = () => {
    trackClickTrade({
      walletType: walletName,
      walletPublicAddress: address,
      stakeToken: Token.aETHc,
      stakedBalance: amount?.toFixed(),
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: Token.aETHc,
    });
  };

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      isLoading={isHistoryLoading}
      token={Token.aETHc}
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
        token={Token.aETHc}
        tokenAddress={contractConfig.aethContract}
        tradeLink={tradeLink}
        unstakeTooltip={t('stake-ethereum.unstake-tooltip')}
        onAddStakingClick={onAddStakingClick}
        onAddTokenToWallet={handleAddTokenToWallet}
        onHistoryBtnClick={
          featuresConfig.stakeETH ? handleOpenHistoryDialog : undefined
        }
        onTradeClick={onTradeClick}
      />

      <HistoryDialog
        history={{
          token: Token.aETHc,
          staked: stakedAETHC,
          unstaked: [],
        }}
        isHistoryLoading={isHistoryLoading}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
