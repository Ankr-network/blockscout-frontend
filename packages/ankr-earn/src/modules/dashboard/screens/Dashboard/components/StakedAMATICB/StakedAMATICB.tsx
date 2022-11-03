import { useCallback } from 'react';

import { tHTML } from 'common';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { NewHistoryDialog } from 'modules/common/components/HistoryDialog/NewHistoryDialog';
import { ETH_NETWORK_BY_ENV, ONE } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { fetchTotalHistory } from 'modules/stake-matic/eth/actions/fetchTotalHistory';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedMATICTxHistory } from '../../hooks/liquid-tokens/MATIC/useStakedMaticTxHistory';

import { useStakedAMATICBData } from './useStakedAMATICBData';

export const StakedAMATICB = (): JSX.Element | null => {
  const { contractConfig } = configFromEnv();

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

  const dispatch = useAppDispatch();

  const { isHistoryDataLoading, pendingUnstakeHistoryAMATICB } =
    useStakedMATICTxHistory();

  const {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingValue,
    stakeLink,
    tradeLink,
    unstakeLink,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  } = useStakedAMATICBData();

  const onTradeClick = () => {
    trackClickTrade({
      walletType: walletName,
      walletPublicAddress: address,
      stakeToken: Token.aMATICb,
      stakedBalance: amount?.toFixed(),
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: Token.aMATICb,
    });
  };

  const handleLoadTxHistory = useCallback(() => {
    dispatch(fetchTotalHistory());
  }, [dispatch]);

  const handleOpenHistoryDialog = useCallback(() => {
    onOpenHistory();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpenHistory]);

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      isLoading={isHistoryDataLoading}
      token={Token.aMATICb}
      tooltip={
        <PendingTable
          data={pendingUnstakeHistoryAMATICB}
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
        token={Token.aMATICb}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
        onTradeClick={onTradeClick}
      />

      <NewHistoryDialog
        network={ETH_NETWORK_BY_ENV}
        open={isOpenedHistory}
        token={Token.aMATICb}
        onClose={onCloseHistory}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description={tHTML('dashboard.token-info.aMATICb', {
          ratio: ONE.toFormat(),
        })}
        moreHref={getStakingOverviewUrl(Token.MATIC)}
        open={isOpenedInfo}
        tokenAddress={contractConfig.aMaticbToken}
        tokenName={Token.aMATICb}
        onClose={onCloseInfo}
      />
    </>
  );
};
