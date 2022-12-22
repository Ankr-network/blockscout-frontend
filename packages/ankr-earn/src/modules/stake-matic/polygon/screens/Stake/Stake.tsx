import { t, tHTML } from '@ankr.com/common';
import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import { Faq } from 'modules/common/components/Faq';
import {
  AUDIT_LINKS,
  DECIMAL_PLACES,
  DEFAULT_FIXED,
  featuresConfig,
  ONE,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { NetworkTitle } from 'modules/stake-matic/common/components/NetworkTitle';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeTradeInfo } from 'modules/stake/components/StakeTradeInfo';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { StakeTokenInfo } from '../../../../stake/components/StakeTokenInfo/StakeTokenInfo';
import { useBTokenNotice } from '../../../../stake/hooks/useBTokenNotice';

import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStyles } from './useStakeStyles';

export const Stake = (): JSX.Element => {
  const classes = useStakeStyles();

  const {
    acPoolLiquidityInMATIC,
    acRatio,
    amount,
    balance,
    extraValidation,
    faqItems,
    gasFee,
    getStatsError,
    isGasFeeLoading,
    isGetStatsLoading,
    isStakeLoading,
    stakeFeePct,
    tokenIn,
    tokenOut,
    totalAmount,
    onFormChange,
    onFormSubmit,
  } = useStakeForm();

  const renderStats = (): JSX.Element => (
    <>
      <div className={classes.liquidityPoolArea}>
        <div>
          {tHTML('stake-matic-polygon.liquidity-pool-label', {
            value: acPoolLiquidityInMATIC
              .decimalPlaces(DEFAULT_FIXED, BigNumber.ROUND_DOWN)
              .toFormat(),
            token: t('unit.matic'),
          })}
        </div>

        <QuestionWithTooltip className={classes.questionBtn}>
          {t('stake-matic-polygon.tooltips.stake-liquidity-pool')}
        </QuestionWithTooltip>
      </div>

      <Box my={5}>
        <StakeTokenInfo
          nativeAmount={ONE.multipliedBy(acRatio).round().toString()}
          nativeToken={Token.MATIC}
          token={t('unit.amaticc')}
        />
      </Box>

      {stakeFeePct && (
        <>
          <StakeDescriptionContainer>
            <StakeDescriptionName>
              <span>{t('stake-matic-polygon.fee')}</span>
            </StakeDescriptionName>

            <StakeDescriptionValue isBold={false}>
              {t('unit.percentage-value', {
                value: stakeFeePct.decimalPlaces(DECIMAL_PLACES).toFormat(),
              })}
            </StakeDescriptionValue>
          </StakeDescriptionContainer>

          <StakeDescriptionSeparator />
        </>
      )}

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

  const noticeText = useBTokenNotice({
    bToken: Token.aMATICb,
    cToken: Token.aMATICc,
    nativeToken: Token.MATIC,
  });

  if (isGetStatsLoading) {
    return (
      <Box mt={5}>
        <QueryLoadingCentered />
      </Box>
    );
  }

  return (
    <section className={classes.root}>
      {getStatsError !== undefined && (
        <StakeContainer>
          <QueryError error={getStatsError} />
        </StakeContainer>
      )}

      {getStatsError === undefined && !!balance && (
        <StakeContainer>
          {featuresConfig.isActiveStakeTradeInfo && <StakeTradeInfo />}

          <StakeForm
            auditSlot={
              <AuditInfo>
                <AuditInfoItem link={AUDIT_LINKS.matic} variant="beosin" />
              </AuditInfo>
            }
            balance={balance}
            extraValidation={extraValidation}
            feeSlot={
              <StakeFeeInfo
                isLoading={isGasFeeLoading}
                mt={-1.5}
                token={Token.MATIC}
                value={gasFee}
              />
            }
            isDisabled={isStakeLoading}
            loading={isStakeLoading}
            maxAmount={balance}
            networkTitleSlot={<NetworkTitle />}
            noticeSlot={noticeText}
            renderStats={renderStats}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            onChange={onFormChange}
            onSubmit={onFormSubmit}
          />

          <StakeStats
            amount={amount}
            metricsServiceName={EMetricsServiceName.MATIC}
          />

          <Faq data={faqItems} />
        </StakeContainer>
      )}
    </section>
  );
};
