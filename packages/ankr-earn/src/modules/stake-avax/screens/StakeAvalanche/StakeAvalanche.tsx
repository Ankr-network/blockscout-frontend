import { t } from '@ankr.com/common';
import { resetRequests } from '@redux-requests/core';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import { Faq } from 'modules/common/components/Faq';
import {
  AUDIT_LINKS,
  DECIMAL_PLACES,
  DUNE_ANALYTICS_LINK,
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
import { StakeTokenInfo } from 'modules/stake/components/StakeTokenInfo/StakeTokenInfo';
import { StakeTradeInfo } from 'modules/stake/components/StakeTradeInfo';
import { EOpenOceanNetworks, EOpenOceanTokens } from 'modules/stake/types';
import { QueryError } from 'uiKit/QueryError';

import { useBTokenNotice } from '../../../stake/hooks/useBTokenNotice';

import { useStakeForm } from './hooks/useStakeForm';
import { useStakeAvalancheStyles } from './useStakeAvalancheStyles';

const AVAX_STAKING_AMOUNT_STEP = 1;

export const StakeAvalanche = (): JSX.Element => {
  const classes = useStakeAvalancheStyles();
  const dispatch = useDispatch();

  const {
    syntheticTokenPrice,
    amount,
    certificateRatio,
    faqItems,
    fetchStatsData,
    fetchStatsError,
    isGetCommonDataLoading,
    isStakeGasLoading,
    isStakeLoading,
    stakeGasFee,
    tokenOut,
    totalAmount,
    handleFormChange,
    handleSubmit,
  } = useStakeForm();

  const onRenderStats = (): JSX.Element => (
    <>
      <StakeTokenInfo
        nativeAmount={syntheticTokenPrice}
        nativeToken={Token.AVAX}
        token={t('unit.aavaxc')}
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

  useProviderEffect(() => {
    dispatch(getFAQ(Token.AVAX));
    dispatch(getMetrics());

    return () => {
      dispatch(resetRequests([getFAQ.toString()]));
    };
  }, [dispatch]);

  useProviderEffect(() => {
    dispatch(
      getStakeTradeInfoData({
        baseToken: EOpenOceanTokens.AVAX,
        bondToken: EOpenOceanTokens.aAVAXb,
        certificateRatio,
        certificateToken: EOpenOceanTokens.aAVAXc,
        network: EOpenOceanNetworks.AVAX,
      }),
    );
  }, [certificateRatio, dispatch]);

  const noticeText = useBTokenNotice({
    bToken: Token.aAVAXb,
    cToken: getTokenSymbol(Token.aAVAXc),
    nativeToken: Token.AVAX,
  });

  return (
    <section className={classes.root}>
      {fetchStatsError !== undefined && (
        <StakeContainer>
          <QueryError error={fetchStatsError} />
        </StakeContainer>
      )}

      {fetchStatsError === undefined && fetchStatsData !== null && (
        <StakeContainer>
          <StakeTradeInfo />

          <StakeForm
            isIntegerOnly
            auditSlot={
              <AuditInfo>
                <AuditInfoItem link={AUDIT_LINKS.avax} variant="beosin" />
              </AuditInfo>
            }
            balance={fetchStatsData?.avaxBalance}
            feeSlot={
              <StakeFeeInfo
                isLoading={isStakeGasLoading}
                token={t('unit.avax')}
                value={stakeGasFee}
              />
            }
            isBalanceLoading={isGetCommonDataLoading}
            isDisabled={isStakeLoading}
            loading={isStakeLoading || isGetCommonDataLoading}
            maxAmount={fetchStatsData?.avaxBalance}
            minAmount={ZERO}
            noticeSlot={noticeText}
            renderStats={onRenderStats}
            stakingAmountStep={AVAX_STAKING_AMOUNT_STEP}
            tokenIn={t('unit.avax')}
            tokenOut={tokenOut}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
          />

          <StakeStats
            amount={amount}
            analyticsLink={DUNE_ANALYTICS_LINK.avax}
            metricsServiceName={EMetricsServiceName.AVAX}
          />

          <Faq data={faqItems} />
        </StakeContainer>
      )}
    </section>
  );
};
