import { configFromEnv } from 'modules/api/config';
import { HistoryDialog } from 'modules/common/components/HistoryDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { useStakedAETHCData } from './useStakedAETHCData';

export const StakedAETHC = (): JSX.Element | null => {
  const { contractConfig } = configFromEnv();

  const { amount, network, tradeLink, isShowed, isBalancesLoading } =
    useStakedAETHCData();
  const { isOpened, onClose, onOpen } = useDialog();

  if (!isShowed) {
    return null;
  }

  return (
    <>
      <StakingAsset
        network={network}
        token={Token.aETHc}
        tokenAddress={contractConfig.aethContract}
        tradeLink={tradeLink}
        amount={amount}
        isLoading={isBalancesLoading}
        onHistoryBtnClick={onOpen}
      />

      <HistoryDialog
        open={isOpened}
        history={{ token: Token.aETHc, staked: [], unstaked: [] }}
        onClose={onClose}
      />
    </>
  );
};
