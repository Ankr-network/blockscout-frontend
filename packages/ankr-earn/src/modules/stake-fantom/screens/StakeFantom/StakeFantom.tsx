import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

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
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { getStakeGasFee } from 'modules/stake-fantom/actions/getStakeGasFee';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { getStakeTradeInfoData } from 'modules/stake/actions/getStakeTradeInfoData';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeTradeInfo } from 'modules/stake/components/StakeTradeInfo';
import { TokenVariant } from 'modules/stake/components/TokenVariant';
import { TokenVariantList } from 'modules/stake/components/TokenVariantList';
import { EOpenOceanTokens } from 'modules/stake/types';
import { AFTMBIcon } from 'uiKit/Icons/AFTMBIcon';
import { AFTMCIcon } from 'uiKit/Icons/AFTMCIcon';

import { useErrorMessage } from './hooks/useErrorMessage';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeFantomStyles } from './useStakeFantomStyles';

export const StakeFantom = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const classes = useStakeFantomStyles();

  const { onErroMessageClick, hasError } = useErrorMessage();

  const {
    aFTMcRatio,
    amount,
    balance,
    certificateRatio,
    gasFee,
    isCommonDataLoading,
    isGasFeeLoading,
    isStakeLoading,
    loading,
    minAmount,
    tokenIn,
    tokenOut,
    totalAmount,
    onChange,
    onSubmit,
    onTokenSelect,
  } = useStakeForm();

  const faqItems = useFaq();

  const renderStats = useCallback(() => {
    return (
      <>
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

  useProviderEffect(() => {
    dispatchRequest(getCommonData());
    dispatchRequest(getMetrics());

    return () => {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    };
  }, [dispatchRequest]);

  useProviderEffect(() => {
    if (!featuresConfig.isActiveStakeTradeInfo) {
      return;
    }

    dispatchRequest(
      getStakeTradeInfoData({
        baseToken: EOpenOceanTokens.FTM,
        bondToken: EOpenOceanTokens.aFTMb,
        certificateRatio,
        certificateToken: EOpenOceanTokens.aFTMc,
      }),
    );
  }, [certificateRatio, dispatchRequest]);

  return (
    <section className={classes.root}>
      <StakeContainer>
        {hasError && (
          <ErrorMessage title={t('error.some')} onClick={onErroMessageClick} />
        )}

        {featuresConfig.isActiveStakeTradeInfo && <StakeTradeInfo />}

        <StakeForm
          isMaxBtnShowed
          auditLink={FTM_AUDIT_LINK}
          balance={balance}
          feeSlot={
            <StakeFeeInfo
              isLoading={isGasFeeLoading}
              token={Token.FTM}
              value={gasFee}
            />
          }
          isBalanceLoading={hasError || isCommonDataLoading}
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
          metricsServiceName={EMetricsServiceName.FTM}
        />

        <Faq data={faqItems} />
      </StakeContainer>
    </section>
  );
};
