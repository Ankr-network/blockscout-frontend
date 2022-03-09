import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';

import { useStakedAETHCData } from '../StakedTokens/hooks/useStakedAETHCData';

export const StakedAETHC = (): JSX.Element => {
  const { contractConfig } = configFromEnv();

  const { isOpened, onClose } = useDialog();
  const { amount, network, tradeLink, isBalancesLoading } =
    useStakedAETHCData();

  return (
    <>
      <StakingAsset
        amount={amount}
        isLoading={isBalancesLoading}
        network={network}
        token={Token.aETHc}
        tokenAddress={contractConfig.aethContract}
        tradeLink={tradeLink}
      />

      <HistoryDialog
        history={{ token: Token.aETHc, staked: [], unstaked: [] }}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
