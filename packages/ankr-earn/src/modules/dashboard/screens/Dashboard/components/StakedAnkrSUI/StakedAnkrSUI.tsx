import { NewHistoryDialog } from 'modules/common/components/HistoryDialog/NewHistoryDialog';
import { SUI_NETWORK_BY_ENV } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';

import { useStakedAnkrSUIData } from './useStakedAnkrSUIData';

export const StakedAnkrSUI = (): JSX.Element => {
  const {
    isOpened: isOpenedHistory,
    onClose: onCloseHistory,
    onOpen: onOpenHistory,
  } = useDialog();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const {
    amount,
    chainId,
    isLoading,
    isPendingUnstakeLoading,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    pendingValue,
    stakeLink,
    token,
    tokenAddress,
    unstakeLink,
    usdAmount,
    onAddTokenToWallet,
  } = useStakedAnkrSUIData();

  const renderedPendingSlot = (!pendingValue.isZero() ||
    isPendingUnstakeLoading) && (
    <Pending
      isLoading={false}
      isUnstakeValueLoading={isPendingUnstakeLoading}
      token={Token.aBNBc}
      tooltip={<PendingTable data={[]} unstakeLabel=" " />}
      value={pendingValue}
      onLoadHistory={undefined}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        chainId={chainId}
        isLoading={isLoading}
        isStakeLoading={isStakeLoading}
        isUnstakeLoading={isUnstakeLoading}
        nativeAmount={nativeAmount}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        token={token}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onHistoryBtnClick={onOpenHistory}
        onTokenInfoClick={onOpenInfo}
      />

      <NewHistoryDialog
        network={SUI_NETWORK_BY_ENV}
        open={isOpenedHistory}
        token={Token.SUI}
        onClose={onCloseHistory}
      />

      <TokenInfoDialog
        addTokenToWallet={onAddTokenToWallet}
        description=" "
        moreHref={' '}
        open={isOpenedInfo}
        tokenAddress={tokenAddress}
        tokenName={Token.ankrSUI}
        onClose={onCloseInfo}
      />
    </>
  );
};
