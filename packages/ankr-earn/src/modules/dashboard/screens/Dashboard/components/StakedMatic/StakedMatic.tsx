import { useCallback } from 'react';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { fetchTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedMaticData } from '../StakedTokens/hooks/MATIC/useStakedMaticData';
import { useStakedMaticTxHistory } from '../StakedTokens/hooks/MATIC/useStakedMaticTxHistory';

export const StakedMatic = (): JSX.Element | null => {
  const { contractConfig } = configFromEnv();

  const { isOpened, onClose, onOpen } = useDialog();
  const dispatch = useAppDispatch();

  const { isHistoryDataLoading, pendingUnstakeHistory, transactionHistory } =
    useStakedMaticTxHistory();

  const {
    amount,
    pendingValue,
    network,
    tradeLink,
    stakeLink,
    unstakeLink,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    walletName,
    address,
    handleAddTokenToWallet,
  } = useStakedMaticData();

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
    onOpen();
    handleLoadTxHistory();
  }, [handleLoadTxHistory, onOpen]);

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      isLoading={isHistoryDataLoading}
      token={Token.aMATICb}
      tooltip={<PendingTable data={pendingUnstakeHistory} />}
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
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aMATICb}
        tokenAddress={contractConfig.aMaticbToken}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        onAddStakingClick={onAddStakingClick}
        onAddTokenToWallet={handleAddTokenToWallet}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTradeClick={onTradeClick}
      />

      <HistoryDialog
        history={transactionHistory}
        isHistoryLoading={isHistoryDataLoading}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
