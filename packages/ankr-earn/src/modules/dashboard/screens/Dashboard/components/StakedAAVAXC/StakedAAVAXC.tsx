import { t, tHTML } from '@ankr.com/common';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { ONE, ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { EKnownDialogs, useDialog as useKnownDialog } from 'modules/dialogs';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useStakedAVAXTxHistory } from '../../hooks/liquid-tokens/AVAX/useStakedAVAXTxHistory';

import { useStakedAAVAXCData } from './useStakedAAVAXCData';

const token = Token.aAVAXc;

export const StakedAAVAXC = (): JSX.Element => {
  const { avalancheConfig } = configFromEnv();

  const { handleOpen: handleOpenHistoryDialog } = useKnownDialog(
    EKnownDialogs.history,
    token,
  );

  const unstakePendingData = useUnstakePendingTimestamp({ token: Token.AVAX });

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const { pendingCertUnstakeHistory, isHistoryDataLoading, pendingCertAmount } =
    useStakedAVAXTxHistory();

  const {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    ratio,
    stakeLink,
    tradeLink,
    unstakeLink,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  } = useStakedAAVAXCData();

  const tokenName = t('unit.aavaxc');

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: token,
    });
  };

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
        isHistoryLoading={isHistoryDataLoading}
        isLoading={isBalancesLoading}
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
        addTokenToWallet={handleAddTokenToWallet}
        description={tHTML('dashboard.token-info.aAVAXc', {
          ratio: (ratio && !ratio.isZero() ? ONE.div(ratio) : ZERO).toFormat(),
        })}
        moreHref={getStakingOverviewUrl(Token.AVAX)}
        open={isOpenedInfo}
        tokenAddress={avalancheConfig.aAVAXc}
        tokenName={tokenName}
        onClose={onCloseInfo}
      />
    </>
  );
};
