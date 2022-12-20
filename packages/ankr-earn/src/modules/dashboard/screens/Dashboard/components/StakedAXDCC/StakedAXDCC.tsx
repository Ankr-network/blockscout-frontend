import { NewHistoryDialog } from 'modules/common/components/HistoryDialog/NewHistoryDialog';
import { XDC_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';

import { useHistoryDialog } from './useHistoryDialog';
import { useStakedAXDCC } from './useStakedAXDCC';
import { useTokenInfoDialog } from './useTokenInfoDialog';

const TOKEN = Token.aXDCc;

export const StakedAXDCC = (): JSX.Element => {
  const {
    isHistoryDataLoading,
    isOpenedHistory,
    isPendingUnstakeLoading,
    pendingUnstakeHistory,
    pendingValue,
    onCloseHistoryDialog,
    onLoadTxHistory,
    onOpenHistoryDialog,
  } = useHistoryDialog();

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
  } = useStakedAXDCC();

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

  const renderedPendingSlot = (!pendingValue.isZero() ||
    isPendingUnstakeLoading) && (
    <Pending
      isLoading={isHistoryDataLoading}
      isUnstakeValueLoading={isPendingUnstakeLoading}
      token={TOKEN}
      tooltip={
        <PendingTable data={pendingUnstakeHistory} unstakeLabel={periodLabel} />
      }
      value={pendingValue}
      onLoadHistory={onLoadTxHistory}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        isHistoryLoading={isHistoryDataLoading}
        isLoading={isLoading}
        isShowedTradeLink={false}
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

      <NewHistoryDialog
        network={XDC_NETWORK_BY_ENV}
        open={isOpenedHistory}
        token={token}
        onClose={onCloseHistoryDialog}
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
