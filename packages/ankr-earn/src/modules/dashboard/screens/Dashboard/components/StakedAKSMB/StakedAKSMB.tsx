import { useCallback } from 'react';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import {
  IPendingTableRow,
  PendingTable,
} from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { KSM_PROPS } from '../StakedTokens/const';
import { useStakedPolkadotData } from '../StakedTokens/hooks/Polkadot/useStakedPolkadotData';

/**
 *  TODO Add logic for this beta version (Polkadot staking)
 */
export const StakedAKSMB = (): JSX.Element => {
  const { polkadotConfig } = configFromEnv();

  const unstakePendingData = useUnstakePendingTimestamp({ token: Token.KSM });
  const { isOpened: isOpenedHistory, onClose: onCloseHistory } = useDialog();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const handleLoadTxHistory = useCallback(() => {}, []);
  const isHistoryDataLoading = false;
  const pendingUnstakeHistory: IPendingTableRow[] = [];
  const transactionHistory = {};

  const {
    address,
    amount,
    handleAddTokenToWallet,
    isBalancesLoading,
    isShowedTradeLink,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingValue,
    stakeLink,
    tradeLink,
    unstakeLink,
    walletName,
  } = useStakedPolkadotData(KSM_PROPS);

  const onTradeClick = () => {
    trackClickTrade({
      stakeToken: Token.aKSMb,
      stakedBalance: amount?.toFixed(),
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      accessPoint: 'add_stake',
      tokenName: Token.aKSMb,
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      isLoading={isHistoryDataLoading}
      token={Token.aKSMb}
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
        token={Token.aKSMb}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={undefined}
        onTokenInfoClick={onOpenInfo}
        onTradeClick={onTradeClick}
      />

      <HistoryDialog
        history={transactionHistory}
        isHistoryLoading={isHistoryDataLoading}
        open={isOpenedHistory}
        onClose={onCloseHistory}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description="dashboard.token-info.aKSMb"
        moreHref={getStakingOverviewUrl(Token.KSM)}
        open={isOpenedInfo}
        tokenAddress={polkadotConfig.aKSMbToken ?? ''}
        tokenName={Token.aKSMb}
        onClose={onCloseInfo}
      />
    </>
  );
};
