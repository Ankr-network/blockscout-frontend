import { t, tHTML } from '@ankr.com/common';

import { trackClickTrade } from 'modules/analytics/tracking-actions/trackClickTrade';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { configFromEnv } from 'modules/api/config';
import { ONE } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { EKnownDialogs, useDialog as useKnownDialog } from 'modules/dialogs';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useStakedTxHistoryETH } from '../../hooks/liquid-tokens/ETH/useStakedTxHistoryETH';

import { useStakedAETHBData } from './useStakedAETHBData';

const token = Token.aETHb;
const nativeToken = Token.ETH;

export const StakedAETHB = (): JSX.Element => {
  const { contractConfig } = configFromEnv();

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

  const {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    network,
    stakeLink,
    switchLink,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  } = useStakedAETHBData();

  const {
    pendingUnstakeHistory,
    pendingValue,
    isHistoryLoading,
    handleLoadTxHistory,
  } = useStakedTxHistoryETH();

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

  const renderedPendingSlot = !pendingValue.isZero() && (
    <Pending
      isLoading={isHistoryLoading}
      token={token}
      tooltip={
        <PendingTable
          data={pendingUnstakeHistory}
          unstakeLabel={unstakePendingData.label}
        />
      }
      value={pendingValue}
      onLoadHistory={handleLoadTxHistory}
    />
  );

  return (
    <>
      <StakingAsset
        amount={amount}
        chainId={chainId}
        isLoading={isBalancesLoading}
        isStakeLoading={isStakeLoading}
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        switchLink={switchLink}
        token={token}
        unstakeTooltip={t('stake-ethereum.unstake-tooltip')}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
        onTradeClick={onTradeClick}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description={tHTML('dashboard.token-info.aETHb', {
          ratio: ONE.toFormat(),
        })}
        moreHref={getStakingOverviewUrl(nativeToken)}
        open={isOpenedInfo}
        tokenAddress={contractConfig.fethContract}
        tokenName={token}
        onClose={onCloseInfo}
      />
    </>
  );
};
