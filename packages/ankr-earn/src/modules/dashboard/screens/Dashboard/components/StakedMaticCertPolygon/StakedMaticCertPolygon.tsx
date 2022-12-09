import { t } from '@ankr.com/common';

import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';

import { useStakedMaticCertPolygon } from './useStakedMaticCertPolygon';
import { useStakedMaticCertPolygonAnalytics } from './useStakedMaticCertPolygonAnalytics';
import { useTokenInfoDialog } from './useTokenInfoDialog';

export const StakedMaticCertPolygon = (): JSX.Element => {
  const {
    amount,
    chainId,
    isLoading,
    isStakeLoading,
    nativeAmount,
    network,
    stakeLink,
    token,
    unstakeLink,
    tradeLink,
    usdAmount,
  } = useStakedMaticCertPolygon();

  const {
    description,
    isOpenedInfo,
    moreHref,
    tokenAddress,
    onOpenInfo,
    onCloseInfo,
    handleAddToken,
  } = useTokenInfoDialog();

  const { onAddStakingClick } = useStakedMaticCertPolygonAnalytics();

  return (
    <>
      <StakingAsset
        amount={amount}
        chainId={chainId}
        isLoading={isLoading}
        isStakeLoading={isStakeLoading}
        nativeAmount={nativeAmount}
        network={network}
        stakeLink={stakeLink}
        token={token}
        tradeLink={tradeLink}
        unstakeLink={unstakeLink}
        usdAmount={usdAmount}
        onAddStakingClick={onAddStakingClick}
        onTokenInfoClick={onOpenInfo}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddToken}
        description={description}
        moreHref={moreHref}
        open={isOpenedInfo}
        tokenAddress={tokenAddress}
        tokenName={t('unit.amaticc')}
        onClose={onCloseInfo}
      />
    </>
  );
};
