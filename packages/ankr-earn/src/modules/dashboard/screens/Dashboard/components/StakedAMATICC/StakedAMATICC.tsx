import { t, tHTML } from '@ankr.com/common';

import { ONE, ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { EKnownDialogs, useDialog as useKnownDialog } from 'modules/dialogs';
import { UNSTAKE_PERIOD } from 'modules/stake-matic/common/const';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useStakedMaticTxHistory } from '../../hooks/liquid-tokens/MATIC/useStakedMaticTxHistory';

import { useStakedAMATICCAnalytics } from './useStakedAMATICCAnalytics';
import { useStakedAMATICCData } from './useStakedAMATICCData';

const nativeToken = Token.MATIC;

export const StakedAMATICC = (): JSX.Element => {
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
  } = useStakedAMATICCData();

  const { handleOpen: handleOpenHistoryDialog } = useKnownDialog(
    EKnownDialogs.history,
    token,
  );

  const { onAddStakingClick } = useStakedAMATICCAnalytics();

  const { isHistoryDataLoading, pendingCertAmount, pendingCertUnstakeHistory } =
    useStakedMaticTxHistory();

  const tokenName = t('unit.amaticc');

  const renderedPendingSlot = !pendingCertAmount.isZero() && (
    <Pending
      isLoading={isHistoryDataLoading}
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
        isHistoryLoading={isHistoryDataLoading}
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
        description={tHTML('dashboard.token-info.aMATICc', {
          ratio: (ratio && !ratio.isZero() ? ONE.div(ratio) : ZERO).toFormat(),
          period: UNSTAKE_PERIOD,
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
