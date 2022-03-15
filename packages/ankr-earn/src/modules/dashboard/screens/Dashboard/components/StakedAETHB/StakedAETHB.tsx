import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';

import { useStakedAETHBData } from '../StakedTokens/hooks/useStakedAETHBData';

export const StakedAETHB = (): JSX.Element => {
  const { contractConfig } = configFromEnv();

  const { isOpened, onClose } = useDialog();
  const { amount, network, tradeLink, isBalancesLoading } =
    useStakedAETHBData();

  return (
    <>
      <StakingAsset
        amount={amount}
        isLoading={isBalancesLoading}
        network={network}
        token={Token.aETHb}
        tokenAddress={contractConfig.fethContract}
        tradeLink={tradeLink}
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
