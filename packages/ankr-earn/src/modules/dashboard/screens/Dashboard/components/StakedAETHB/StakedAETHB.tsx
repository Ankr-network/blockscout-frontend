import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { useStakedAETHBData } from './useStakedAETHBData';

export const StakedAETHB = (): JSX.Element | null => {
  const { contractConfig } = configFromEnv();

  const { amount, network, tradeLink, isBalancesLoading, isShowed } =
    useStakedAETHBData();
  const { isOpened, onClose, onOpen } = useDialog();

  if (!isShowed) {
    return null;
  }

  return (
    <>
      <StakingAsset
        network={network}
        token={Token.aETHb}
        tokenAddress={contractConfig.fethContract}
        amount={amount}
        tradeLink={tradeLink}
        isLoading={isBalancesLoading}
        onHistoryBtnClick={onOpen}
      />

      <HistoryDialog
        open={isOpened}
        history={{ token: Token.aETHb, staked: [], unstaked: [] }}
        onClose={onClose}
      />
    </>
  );
};
