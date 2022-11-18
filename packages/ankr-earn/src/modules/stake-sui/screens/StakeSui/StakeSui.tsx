import { t } from '@ankr.com/common';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq } from 'modules/common/components/Faq';
import { DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getFAQ } from 'modules/stake/actions/getFAQ';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { RewardTokenInfo } from 'modules/stake/components/RewardTokenInfo';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeTradeInfo } from 'modules/stake/components/StakeTradeInfo';

import ASUICLogo from './assets/asuic-logo.png';
import { useErrorMessage } from './hooks/useErrorMessage';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeSuiStyles } from './useStakeSuiStyles';

export const StakeSui = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const classes = useStakeSuiStyles();

  const { onErroMessageClick, hasError } = useErrorMessage();

  const {
    ratio,
    amount,
    balance,
    faqItems,
    gasFee,
    isCommonDataLoading,
    isGasFeeLoading,
    loading,
    minAmount,
    tokenIn,
    tokenOut,
    totalAmount,
    onChange,
    onSubmit,
  } = useStakeForm();

  const renderStats = useCallback(
    () => (
      <>
        <StakeDescriptionContainer>
          <StakeDescriptionName>
            {t('stake.you-will-receive')}
          </StakeDescriptionName>

          <StakeDescriptionValue>
            <StakeDescriptionAmount
              symbol={tokenOut}
              value={totalAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
            />
          </StakeDescriptionValue>
        </StakeDescriptionContainer>

        <StakeFeeInfo
          isLoading={isGasFeeLoading}
          token={Token.SUI}
          value={gasFee}
        />

        <RewardTokenInfo
          amount={ZERO.multipliedBy(ratio)}
          iconSlot={<img alt="" src={ASUICLogo} />}
          synthAmount={ZERO}
          synthToken={Token.aSUIc}
          token={Token.SUI}
        />
      </>
    ),
    [tokenOut, totalAmount, isGasFeeLoading, gasFee, ratio],
  );

  useProviderEffect(() => {
    dispatchRequest(getFAQ(Token.SUI));
    dispatchRequest(getMetrics());

    return () => {
      dispatch(resetRequests([getFAQ.toString()]));
    };
  }, [dispatch, dispatchRequest]);

  return (
    <section className={classes.root}>
      <StakeContainer>
        {hasError && (
          <ErrorMessage title={t('error.some')} onClick={onErroMessageClick} />
        )}

        <StakeTradeInfo />

        <StakeForm
          isMaxBtnShowed
          balance={balance}
          isBalanceLoading={hasError || isCommonDataLoading}
          isDisabled={loading}
          loading={hasError || loading}
          minAmount={minAmount ? new BigNumber(minAmount) : ZERO}
          renderStats={renderStats}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          onChange={onChange}
          onSubmit={onSubmit}
        />

        <StakeStats
          amount={amount}
          metricsServiceName={EMetricsServiceName.SUI}
        />

        <Faq data={faqItems} />
      </StakeContainer>
    </section>
  );
};
