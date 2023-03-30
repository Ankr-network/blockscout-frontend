import { t, tHTML } from '@ankr.com/common';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
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

import { useStakedFTMTxHistory } from '../../hooks/liquid-tokens/FTM/useStakedFTMTxHistory';

import { useStakedAFTMCData } from './useStakedAFTMCData';

const nativeToken = Token.FTM;
const token = Token.aFTMc;

export const StakedAFTMC = (): JSX.Element | null => {
  const { fantomConfig } = configFromEnv();
  const unstakePendingData = useUnstakePendingTimestamp({ token: nativeToken });

  const { handleOpen: handleOpenHistoryDialog } = useKnownDialog(
    EKnownDialogs.history,
    token,
  );

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const { pendingCertUnstakeHistory, isHistoryDataLoading } =
    useStakedFTMTxHistory();

  const {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    pendingUnstakes,
    ratio,
    stakeLink,
    tradeLink,
    unstakeLink,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  } = useStakedAFTMCData();

  const tokenName = t('unit.aftmc');

  const onTradeClick = () => {
    trackClickTrade({
      walletType: walletName,
      walletPublicAddress: address,
      stakeToken: token,
      stakedBalance: amount?.toFixed(),
    });
  };

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: token,
    });
  };

  const renderedPendingSlot = !pendingUnstakes.isZero() && (
    <Pending
      isLoading={isHistoryDataLoading}
      token={tokenName}
      tooltip={
        <PendingTable
          data={pendingCertUnstakeHistory}
          unstakeLabel={unstakePendingData.label}
        />
      }
      value={pendingUnstakes}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        chainId={chainId}
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
        onTradeClick={onTradeClick}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description={tHTML('dashboard.token-info.aFTMc', {
          ratio: ratio && !ratio.isZero() ? ONE.div(ratio) : ZERO.toFormat(),
        })}
        moreHref={getStakingOverviewUrl(nativeToken)}
        open={isOpenedInfo}
        tokenAddress={fantomConfig.aftmcToken}
        tokenName={tokenName}
        onClose={onCloseInfo}
      />
    </>
  );
};
