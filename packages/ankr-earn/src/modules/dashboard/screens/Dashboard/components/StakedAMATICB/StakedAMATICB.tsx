import { useCallback } from 'react';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
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
import { fetchTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedAMATICBData } from '../StakedTokens/hooks/MATIC/useStakedAMATICBData';
import { useStakedMATICTxHistory } from '../StakedTokens/hooks/MATIC/useStakedMaticTxHistory';

export const StakedAMATICB = (): JSX.Element | null => {
  const { contractConfig } = configFromEnv();

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

  const {
    isHistoryDataLoading,
    pendingUnstakeHistoryAMATICB,
    transactionHistoryAMATICB,
  } = useStakedMATICTxHistory();

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
    address,
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
    dispatch(fetchTxHistory());
  }, [dispatch]);

  const handleOpenHistoryDialog = useCallback(() => {
    onOpenHistory();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpenHistory]);

  const renderedPendingSlot =
    !pendingValue.isZero() &&
    (featuresConfig.isSplitedMATICHistory ? (
      <Pending
        isLoading={isHistoryDataLoading}
        token={Token.aMATICb}
        tooltip={<PendingTable data={pendingUnstakeHistoryAMATICB} />}
        value={pendingValue}
        onLoadHistory={handleLoadTxHistory}
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
        isLoading={isBalancesLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aMATICb}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={
          featuresConfig.maticHistory ? handleOpenHistoryDialog : undefined
        }
        onTokenInfoClick={onOpenInfo}
        onTradeClick={onTradeClick}
      />

      <HistoryDialog
        history={transactionHistoryAMATICB}
        isHistoryLoading={isHistoryDataLoading}
        open={isOpenedHistory}
        onClose={onCloseHistory}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description="dashboard.token-info.aMATICb"
        moreHref={getStakingOverviewUrl(Token.MATIC)}
        open={isOpenedInfo}
        tokenAddress={contractConfig.aMaticbToken}
        tokenName={Token.aMATICb}
        onClose={onCloseInfo}
      />
    </>
  );
};
