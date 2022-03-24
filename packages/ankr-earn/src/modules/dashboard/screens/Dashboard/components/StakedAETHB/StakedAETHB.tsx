import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';

import { useStakedAETHBData } from '../StakedTokens/hooks/useStakedAETHBData';

export const StakedAETHB = (): JSX.Element => {
  const { contractConfig } = configFromEnv();

  const { isOpened, onClose } = useDialog();
  const {
    amount,
    network,
    tradeLink,
    isBalancesLoading,
    walletName,
    address,
    handleAddTokenToWallet,
  } = useStakedAETHBData();

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

  return (
    <>
      <StakingAsset
        amount={amount}
        isLoading={isBalancesLoading}
        network={network}
        token={Token.aETHb}
        tokenAddress={contractConfig.fethContract}
        tradeLink={tradeLink}
        onAddStakingClick={onAddStakingClick}
        onAddTokenToWallet={handleAddTokenToWallet}
        onTradeClick={onTradeClick}
      />

      <HistoryDialog
        history={{ token: Token.aETHb, staked: [], unstaked: [] }}
        isHistoryLoading={false}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
