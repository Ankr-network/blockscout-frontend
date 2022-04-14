import { useCallback } from 'react';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import {
  IPendingTableRow,
  PendingTable,
} from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';

import { WND_PROPS } from '../StakedTokens/const';
import { useStakedPolkadotData } from '../StakedTokens/hooks/Polkadot/useStakedPolkadotData';

/**
 *  TODO Add logic for this beta version (Polkadot staking)
 */
export const StakedAWNDB = (): JSX.Element => {
  const { polkadotConfig } = configFromEnv();

  const { isOpened, onClose } = useDialog();

  const handleLoadTxHistory = useCallback(() => {}, []);
  const isHistoryDataLoading = false;
  const pendingUnstakeHistory: IPendingTableRow[] = [];
  const transactionHistory = {};

  const {
    address,
    amount,
    handleAddTokenToWallet,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingValue,
    stakeLink,
    tradeLink,
    unstakeLink,
    walletName,
  } = useStakedPolkadotData(WND_PROPS);

  const onTradeClick = () => {
    trackClickTrade({
      stakeToken: Token.aWNDb,
      stakedBalance: amount?.toFixed(),
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      accessPoint: 'add_stake',
      tokenName: Token.aWNDb,
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      isLoading={isHistoryDataLoading}
      token={Token.aWNDb}
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
        token={Token.aWNDb}
        tokenAddress={polkadotConfig.aWNDbToken ?? ''}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        onAddStakingClick={onAddStakingClick}
        onAddTokenToWallet={handleAddTokenToWallet}
        onHistoryBtnClick={undefined}
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
