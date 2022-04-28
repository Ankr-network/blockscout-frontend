import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';

import { useStakedAFTMCData } from '../StakedTokens/hooks/FTM/useStakedAFTMCData';
import { useStakedFTMTxHistory } from '../StakedTokens/hooks/FTM/useStakedFTMTxHistory';

export const StakedAFTMC = (): JSX.Element | null => {
  const { fantomConfig } = configFromEnv();
  const { isOpened, onClose } = useDialog();

  const {
    pendingUnstakeHistory,
    staked,
    unstaked,
    isHistoryLoading,
    handleLoadTxHistory,
  } = useStakedFTMTxHistory();

  const {
    amount,
    pendingUnstakes,
    network,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    unstakeLink,
    stakeLink,
    walletName,
    address,
    handleAddTokenToWallet,
  } = useStakedAFTMCData();

  const onTradeClick = () => {
    trackClickTrade({
      walletType: walletName,
      walletPublicAddress: address,
      stakeToken: Token.aFTMc,
      stakedBalance: amount?.toFixed(),
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: Token.aFTMb,
    });
  };

  const renderedPendingSlot = !pendingUnstakes.isZero() && (
    <Pending
      isLoading={isHistoryLoading}
      token={Token.aFTMc}
      tooltip={<PendingTable data={pendingUnstakeHistory} />}
      value={pendingUnstakes}
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
        isUnstakeLoading={isUnstakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={Token.aFTMc}
        tokenAddress={fantomConfig.aftmbToken}
        unstakeLink={unstakeLink}
        onAddStakingClick={onAddStakingClick}
        onAddTokenToWallet={handleAddTokenToWallet}
        onTradeClick={onTradeClick}
      />

      <HistoryDialog
        history={{
          token: Token.aFTMc,
          staked,
          unstaked,
        }}
        isHistoryLoading={isHistoryLoading}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
