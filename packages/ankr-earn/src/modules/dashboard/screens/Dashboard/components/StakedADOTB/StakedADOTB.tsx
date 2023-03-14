import { tHTML } from '@ankr.com/common';
import { useCallback } from 'react';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { ONE } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { EKnownDialogs, useDialog as useKnownDialog } from 'modules/dialogs';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { DOT_PROPS } from '../../const';
import { useStakedPolkadotCard } from '../../hooks/liquid-tokens/Polkadot/useStakedPolkadotCard';
import { useStakedPolkadotTxHistory } from '../../hooks/liquid-tokens/Polkadot/useStakedPolkadotTxHistory';

const nativeToken = Token.DOT;

export const StakedADOTB = (): JSX.Element => {
  const { polkadotConfig } = configFromEnv();

  const unstakePendingData = useUnstakePendingTimestamp({ token: nativeToken });

  const { handleOpen: onOpenHistory } = useKnownDialog(
    EKnownDialogs.polkadotHistory,
    nativeToken,
  );

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const { isHistoryDataLoading, pendingUnstakeHistory, handleLoadTxHistory } =
    useStakedPolkadotTxHistory(EPolkadotNetworks.DOT);

  const {
    address,
    amount,
    isBalancesLoading,
    isShowedTradeLink,
    isStakeLoading,
    isUnstakeLoading,
    isPendingUnstakeLoading,
    network,
    pendingValue,
    stakeLink,
    tradeLink,
    unstakeLink,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  } = useStakedPolkadotCard(DOT_PROPS);

  const onTradeClick = (): void => {
    trackClickTrade({
      stakeToken: Token.aDOTb,
      stakedBalance: amount?.toFixed(),
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  const onAddStakingClick = (): void => {
    trackEnterStakingFlow({
      accessPoint: 'add_stake',
      tokenName: Token.aDOTb,
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  const handleOpenHistoryDialog = useCallback((): void => {
    onOpenHistory();

    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpenHistory]);

  const isPendingShowed = isPendingUnstakeLoading || !pendingValue.isZero();

  const renderedPendingSlot = isPendingShowed && (
    <Pending
      isLoading={isHistoryDataLoading}
      isUnstakeValueLoading={isPendingUnstakeLoading}
      token={Token.aDOTb}
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
        isHistoryLoading={isHistoryDataLoading}
        isLoading={isBalancesLoading}
        isShowedTradeLink={isShowedTradeLink}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aDOTb}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
        onTradeClick={onTradeClick}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description={tHTML('dashboard.token-info.aDOTb', {
          ratio: ONE.toFormat(),
        })}
        moreHref={getStakingOverviewUrl(nativeToken)}
        open={isOpenedInfo}
        tokenAddress={polkadotConfig.aDOTbToken ?? ''}
        tokenName={Token.aDOTb}
        onClose={onCloseInfo}
      />
    </>
  );
};
