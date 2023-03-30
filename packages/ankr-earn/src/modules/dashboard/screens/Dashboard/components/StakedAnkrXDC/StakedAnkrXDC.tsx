import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { EKnownDialogs, useDialog as useKnownDialog } from 'modules/dialogs';

import { useStakedXDCTxHistory } from '../../hooks/liquid-tokens/XDC/useStakedXDCTxHistory';

import { useStakedAnkrXDC } from './useStakedAnkrXDC';
import { useTokenInfoDialog } from './useTokenInfoDialog';

const TOKEN = Token.ankrXDC;

export const StakedAnkrXDC = (): JSX.Element => {
  const { isHistoryDataLoading, pendingAmount, pendingUnstakeHistory } =
    useStakedXDCTxHistory();

  const {
    amount,
    isLoading,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    stakeLink,
    token,
    unstakeLink,
    usdAmount,
    onAddStakingClick,
  } = useStakedAnkrXDC();

  const { handleOpen: onOpenHistoryDialog } = useKnownDialog(
    EKnownDialogs.history,
    token,
  );

  const {
    description,
    isOpenedInfo,
    moreHref,
    periodLabel,
    tokenAddress,
    onAddToken,
    onCloseInfo,
    onOpenInfo,
  } = useTokenInfoDialog();

  const renderedPendingSlot = (!pendingAmount.isZero() ||
    isHistoryDataLoading) && (
    <Pending
      isLoading={isHistoryDataLoading}
      isUnstakeValueLoading={isHistoryDataLoading}
      token={TOKEN}
      tooltip={
        <PendingTable data={pendingUnstakeHistory} unstakeLabel={periodLabel} />
      }
      value={pendingAmount}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        isHistoryLoading={isHistoryDataLoading}
        isLoading={isLoading}
        isShowedTradeLink={false}
        isStakeBtnShowed={featuresConfig.xdcStaking}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        nativeAmount={nativeAmount}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={token}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={onOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
      />

      <TokenInfoDialog
        addTokenToWallet={onAddToken}
        description={description}
        moreHref={moreHref}
        open={isOpenedInfo}
        tokenAddress={tokenAddress}
        tokenName={TOKEN}
        onClose={onCloseInfo}
      />
    </>
  );
};
