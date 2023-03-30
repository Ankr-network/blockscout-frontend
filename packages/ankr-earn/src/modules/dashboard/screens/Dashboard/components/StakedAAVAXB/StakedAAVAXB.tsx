import { tHTML } from '@ankr.com/common';

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

import { useStakedAVAXTxHistory } from '../../hooks/liquid-tokens/AVAX/useStakedAVAXTxHistory';

import { useStakedAAVAXBData } from './useStakedAAVAXBData';

const token = Token.aAVAXb;
const nativeToken = Token.AVAX;

export const StakedAAVAXB = (): JSX.Element => {
  const { avalancheConfig } = configFromEnv();

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

  const { pendingBondUnstakeHistory, isHistoryDataLoading, pendingBondAmount } =
    useStakedAVAXTxHistory();

  const {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    network,
    stakeLink,
    switchLink,
    unstakeLink,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  } = useStakedAAVAXBData();

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

  const renderedPendingSlot = (!pendingBondAmount.isZero() ||
    isHistoryDataLoading) && (
    <Pending
      isLoading={isHistoryDataLoading}
      isUnstakeValueLoading={isHistoryDataLoading}
      token={token}
      tooltip={
        <PendingTable
          data={pendingBondUnstakeHistory}
          unstakeLabel={unstakePendingData.label}
        />
      }
      value={pendingBondAmount}
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
        network={network}
        pendingSlot={renderedPendingSlot}
        stakeLink={stakeLink}
        switchLink={switchLink}
        token={token}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onHistoryBtnClick={handleOpenHistoryDialog}
        onTokenInfoClick={onOpenInfo}
        onTradeClick={onTradeClick}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description={tHTML('dashboard.token-info.aAVAXb', {
          ratio: ONE.toFormat(),
        })}
        moreHref={getStakingOverviewUrl(nativeToken)}
        open={isOpenedInfo}
        tokenAddress={avalancheConfig.aAVAXb}
        tokenName={token}
        onClose={onCloseInfo}
      />
    </>
  );
};
