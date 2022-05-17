import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { t, tHTML } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq } from 'modules/common/components/Faq';
import {
  DECIMAL_PLACES,
  DEFAULT_FIXED,
  featuresConfig,
  FTM_AUDIT_LINK,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getAPY } from 'modules/stake-fantom/actions/getAPY';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { TokenVariant } from 'modules/stake/components/TokenVariant';
import { TokenVariantList } from 'modules/stake/components/TokenVariantList';
import { AFTMBIcon } from 'uiKit/Icons/AFTMBIcon';
import { AFTMCIcon } from 'uiKit/Icons/AFTMCIcon';

import { useErrorMessage } from './hooks/useErrorMessage';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeFantomStyles } from './useStakeFantomStyles';

export const StakeFantom = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();
  const classes = useStakeFantomStyles();

  const { onErroMessageClick, hasError } = useErrorMessage();
  const { data: apy } = useQuery({ type: getAPY });

  const {
    isCommonDataLoading,
    amount,
    aFTMcRatio,
    balance,
    minAmount,
    loading,
    isStakeLoading,
    tokenIn,
    tokenOut,
    totalAmount,
    onChange,
    onSubmit,
    onTokenSelect,
  } = useStakeForm();

  const faqItems = useFaq();

  useProviderEffect(() => {
    dispatchRequest(getCommonData());
    dispatchRequest(getAPY());
    dispatchRequest(getMetrics());
  }, [dispatchRequest]);

  const renderStats = useCallback(() => {
    return (
      <>
        {featuresConfig.stakeAFTMC && (
          <TokenVariantList my={5}>
            <TokenVariant
              description={tHTML('stake-fantom.aftmb-descr')}
              iconSlot={<AFTMBIcon />}
              isActive={tokenOut === Token.aFTMb}
              isDisabled={isStakeLoading}
              title={t('unit.aftmb')}
              onClick={onTokenSelect(Token.aFTMb)}
            />

            <TokenVariant
              description={tHTML('stake-fantom.aftmc-descr', {
                rate: isCommonDataLoading
                  ? '...'
                  : aFTMcRatio.decimalPlaces(DEFAULT_FIXED).toFormat(),
              })}
              iconSlot={<AFTMCIcon />}
              isActive={tokenOut === Token.aFTMc}
              isDisabled={isStakeLoading}
              title={t('unit.aftmc')}
              onClick={onTokenSelect(Token.aFTMc)}
            />
          </TokenVariantList>
        )}

        <StakeDescriptionContainer>
          <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

          <StakeDescriptionValue>
            <StakeDescriptionAmount
              symbol={tokenOut}
              value={totalAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
            />
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      </>
    );
  }, [
    totalAmount,
    tokenOut,
    isStakeLoading,
    onTokenSelect,
    aFTMcRatio,
    isCommonDataLoading,
  ]);

  return (
    <section className={classes.root}>
      <StakeContainer>
        {hasError && (
          <ErrorMessage title={t('error.some')} onClick={onErroMessageClick} />
        )}

        <StakeForm
          auditLink={FTM_AUDIT_LINK}
          balance={balance}
          isBalanceLoading={hasError || isCommonDataLoading}
          isMaxBtnShowed={false}
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
          apy={apy ?? undefined}
          metricsServiceName={EMetricsServiceName.FTM}
        />

        <Faq data={faqItems} />
      </StakeContainer>
    </section>
  );
};
