import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';

import { useStakedAETHCData } from '../StakedTokens/hooks/useStakedAETHCData';

export const StakedAETHC = (): JSX.Element => {
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
  } = useStakedAETHCData();

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

  return (
    <>
      <StakingAsset
        amount={amount}
        isLoading={isBalancesLoading}
        network={network}
        token={Token.aETHc}
        tokenAddress={contractConfig.aethContract}
        tradeLink={tradeLink}
        onAddStakingClick={onAddStakingClick}
        onAddTokenToWallet={handleAddTokenToWallet}
        onTradeClick={onTradeClick}
      />

      <HistoryDialog
        history={{ token: Token.aETHc, staked: [], unstaked: [] }}
        isHistoryLoading={false}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
