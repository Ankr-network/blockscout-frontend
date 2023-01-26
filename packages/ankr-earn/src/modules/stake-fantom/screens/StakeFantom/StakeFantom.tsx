import { t } from '@ankr.com/common';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq } from 'modules/common/components/Faq';
import {
  AUDIT_LINKS,
  DECIMAL_PLACES,
  featuresConfig,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { getTokenSymbol } from 'modules/common/utils/getTokenSymbol';
import { getFAQ } from 'modules/stake/actions/getFAQ';
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
import { EOpenOceanNetworks, EOpenOceanTokens } from 'modules/stake/types';

import { StakeTokenInfo } from '../../../stake/components/StakeTokenInfo/StakeTokenInfo';
import { useBTokenNotice } from '../../../stake/hooks/useBTokenNotice';

import { useErrorMessage } from './hooks/useErrorMessage';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeFantomStyles } from './useStakeFantomStyles';

export const StakeFantom = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const classes = useStakeFantomStyles();

  const { onErroMessageClick, hasError } = useErrorMessage();

  const {
    syntheticTokenPrice,
    amount,
    balance,
    certificateRatio,
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

  const renderStats = useCallback(() => {
    return (
      <>
        <StakeTokenInfo
          nativeAmount={syntheticTokenPrice}
          nativeToken={Token.FTM}
          token={t('unit.aftmc')}
        />

        <StakeDescriptionContainer>
          <StakeDescriptionName>
            {t('stake.you-will-receive')}
          </StakeDescriptionName>

          <StakeDescriptionValue>
            <StakeDescriptionAmount
              symbol={getTokenName(tokenOut)}
              value={totalAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
            />
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      </>
    );
  }, [totalAmount, tokenOut, syntheticTokenPrice]);

  useProviderEffect(() => {
    dispatchRequest(getFAQ(Token.FTM));
    dispatchRequest(getMetrics());

    return () => {
      dispatch(resetRequests([getFAQ.toString()]));
    };
  }, [dispatch, dispatchRequest]);

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
        network: EOpenOceanNetworks.FANTOM,
      }),
    );
  }, [certificateRatio, dispatchRequest]);

  const noticeText = useBTokenNotice({
    bToken: Token.aFTMb,
    cToken: getTokenSymbol(Token.aFTMc),
    nativeToken: Token.FTM,
  });

  return (
    <section className={classes.root}>
      <StakeContainer>
        {hasError && (
          <ErrorMessage title={t('error.some')} onClick={onErroMessageClick} />
        )}

        {featuresConfig.isActiveStakeTradeInfo && <StakeTradeInfo />}

        <StakeForm
          isMaxBtnShowed
          auditSlot={
            <AuditInfo>
              <AuditInfoItem link={AUDIT_LINKS.ftm} variant="beosin" />
            </AuditInfo>
          }
          balance={balance}
          feeSlot={
            <StakeFeeInfo
              isLoading={isGasFeeLoading}
              token={Token.FTM}
              value={gasFee}
            />
          }
          isBalanceLoading={hasError || isCommonDataLoading}
          isDisabled={loading}
          loading={hasError || loading}
          minAmount={minAmount ? new BigNumber(minAmount) : ZERO}
          noticeSlot={noticeText}
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
