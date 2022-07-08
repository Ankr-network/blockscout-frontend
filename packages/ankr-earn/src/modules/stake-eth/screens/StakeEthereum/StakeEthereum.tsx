import { resetRequests } from '@redux-requests/core';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq } from 'modules/common/components/Faq';
import { featuresConfig } from 'modules/common/const';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getStakeGasFee } from 'modules/stake-eth/actions/getStakeGasFee';
import { ETH_STAKING_AMOUNT_STEP } from 'modules/stake-eth/const';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { getStakeTradeInfoData } from 'modules/stake/actions/getStakeTradeInfoData';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeTradeInfo } from 'modules/stake/components/StakeTradeInfo';
import { EOpenOceanTokens } from 'modules/stake/types';

import { TokenVariants } from './components/TokenVariants';
import { TotalAmount } from './components/TotalAmount';
import { Unclaimed } from './components/Unclaimed';
import { useErrorMessage } from './hooks/useErrorMessage';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeEthereumStyles } from './useStakeEthereumStyles';

export const StakeEthereum = (): JSX.Element => {
  const dispatch = useDispatch();
  const classes = useStakeEthereumStyles();

  const { onErroMessageClick, hasError } = useErrorMessage();

  const {
    amount,
    balance,
    certificateRatio,
    fee,
    isCommonDataLoading,
    isFeeLoading,
    loading,
    minAmount,
    tokenIn,
    tokenOut,
    onInputChange,
    onSubmit,
  } = useStakeForm();

  const faqItems = useFaq();

  useProviderEffect(() => {
    dispatch(getCommonData());
    dispatch(getMetrics());

    return () => {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    };
  }, [dispatch]);

  useProviderEffect(() => {
    if (!featuresConfig.isActiveStakeTradeInfo) {
      return;
    }

    dispatch(
      getStakeTradeInfoData({
        baseToken: EOpenOceanTokens.ETH,
        bondToken: EOpenOceanTokens.aETHb,
        certificateRatio,
        certificateToken: EOpenOceanTokens.aETHc,
      }),
    );
  }, [certificateRatio, dispatch]);

  const renderStats = useCallback(
    () => (
      <>
        <TokenVariants />

        <Unclaimed />

        <TotalAmount amount={amount} />
      </>
    ),
    [amount],
  );

  return (
    <section className={classes.root}>
      <StakeContainer>
        {hasError && (
          <ErrorMessage title={t('error.some')} onClick={onErroMessageClick} />
        )}

        {featuresConfig.isActiveStakeTradeInfo && <StakeTradeInfo />}

        <StakeForm
          balance={balance}
          feeSlot={
            <StakeFeeInfo
              isLoading={isFeeLoading}
              mt={-1.5}
              token={t('unit.eth')}
              value={fee}
            />
          }
          isBalanceLoading={hasError || isCommonDataLoading}
          isDisabled={loading}
          labelTooltip={t('stake-ethereum.amount-tooltip', {
            step: ETH_STAKING_AMOUNT_STEP,
          })}
          loading={hasError || loading}
          minAmount={minAmount}
          renderStats={renderStats}
          stakingAmountStep={ETH_STAKING_AMOUNT_STEP}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          onChange={onInputChange}
          onSubmit={onSubmit}
        />

        <StakeStats
          amount={amount ?? 0}
          metricsServiceName={EMetricsServiceName.ETH}
        />

        <Faq data={faqItems} />
      </StakeContainer>
    </section>
  );
};
