import { t, tHTML } from '@ankr.com/common';
import { useCallback } from 'react';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
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

import { useStakedTxHistoryETH } from '../../hooks/liquid-tokens/ETH/useStakedTxHistoryETH';

import { useStakedAETHCData } from './useStakedAETHCData';

const token = Token.aETHc;
const nativeToken = Token.ETH;

export const StakedAETHC = (): JSX.Element => {
  const { contractConfig } = configFromEnv();

  const unstakePendingData = useUnstakePendingTimestamp({ token: nativeToken });
  const {
    isOpened: isOpenedHistory,
    onOpen: onOpenHistory,
    onClose: onCloseHistory,
  } = useDialog();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    nativeAmount,
    network,
    ratio,
    stakeLink,
    tradeLink,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  } = useStakedAETHCData();

  const {
    pendingUnstakeHistory,
    pendingValue,
    isHistoryLoading,
    handleLoadTxHistory,
  } = useStakedTxHistoryETH();

  const tokenName = t('unit.aethc');

  const handleOpenHistoryDialog = useCallback(() => {
    onOpenHistory();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpenHistory]);

  const onTradeClick = () => {
    trackClickTrade({
      walletType: walletName,
      walletPublicAddress: address,
      stakeToken: token,
      stakedBalance: amount?.toFixed(),
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: token,
    });
  };

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      isLoading={isHistoryLoading}
      token={tokenName}
      tooltip={
        <PendingTable
          data={pendingUnstakeHistory}
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
        isLoading={isBalancesLoading}
        isStakeLoading={isStakeLoading}
        nativeAmount={nativeAmount}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={token}
        tradeLink={tradeLink}
        unstakeTooltip={t('stake-ethereum.unstake-tooltip')}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
        onTradeClick={onTradeClick}
      />

      <NewHistoryDialog
        network={ETH_NETWORK_BY_ENV}
        open={isOpenedHistory}
        token={token}
        onClose={onCloseHistory}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description={tHTML('dashboard.token-info.aETHc', {
          ratio: (ratio && !ratio.isZero() ? ONE.div(ratio) : ZERO).toFormat(),
        })}
        moreHref={getStakingOverviewUrl(nativeToken)}
        open={isOpenedInfo}
        tokenAddress={contractConfig.aethContract}
        tokenName={tokenName}
        onClose={onCloseInfo}
      />
    </>
  );
};
