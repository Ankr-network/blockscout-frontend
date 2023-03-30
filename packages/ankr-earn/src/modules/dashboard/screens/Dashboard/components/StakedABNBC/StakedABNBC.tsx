import { tHTML } from '@ankr.com/common';

import { ONE, ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { EKnownDialogs, useDialog as useKnownDialog } from 'modules/dialogs';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useStakedBNBTxHistory } from '../../hooks/liquid-tokens/BNB/useStakedBNBTxHistory';

import { useStakedABNBCAnalytics } from './useStakedABNBCAnalytics';
import { useStakedABNBCData } from './useStakedABNBCData';

const nativeToken = Token.BNB;

export const StakedABNBC = (): JSX.Element => {
  const unstakePendingData = useUnstakePendingTimestamp({ token: nativeToken });

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const {
    amount,
    chainId,
    isLoading,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    ratio,
    stakeLink,
    token,
    tokenAddress,
    tradeLink,
    unstakeLink,
    usdAmount,
    onAddTokenToWallet,
  } = useStakedABNBCData();

  const { handleOpen: handleOpenHistoryDialog } = useKnownDialog(
    EKnownDialogs.history,
    token,
  );

  const { onAddStakingClick } = useStakedABNBCAnalytics();

  const { isHistoryDataLoading, pendingCertAmount, pendingCertUnstakeHistory } =
    useStakedBNBTxHistory();

  const tokenName = getTokenName(token);

  const renderedPendingSlot = (!pendingCertAmount.isZero() ||
    isHistoryDataLoading) && (
    <Pending
      isLoading={isHistoryDataLoading}
      isUnstakeValueLoading={isHistoryDataLoading}
      token={tokenName}
      tooltip={
        <PendingTable
          data={pendingCertUnstakeHistory}
          unstakeLabel={unstakePendingData.label}
        />
      }
      value={pendingCertAmount}
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
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
      />

      <TokenInfoDialog
        addTokenToWallet={onAddTokenToWallet}
        description={tHTML('dashboard.token-info.aBNBc', {
          ratio: (ratio && !ratio.isZero() ? ONE.div(ratio) : ZERO).toFormat(),
        })}
        moreHref={getStakingOverviewUrl(nativeToken)}
        open={isOpenedInfo}
        tokenAddress={tokenAddress}
        tokenName={tokenName}
        onClose={onCloseInfo}
      />
    </>
  );
};
