import { Box, ButtonBase } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { Faq, IFaqItem } from 'modules/common/components/Faq';
import { DECIMAL_PLACES } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeForm } from 'modules/stake/components/StakeForm';
import {
  IStakeStatsItem,
  StakeStats,
} from 'modules/stake/components/StakeStats';
import { StakeSuccessDialog } from 'modules/stake/components/StakeSuccessDialog';
import React from 'react';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { Tooltip } from 'uiKit/Tooltip';
import { fetchAPY } from '../../actions/fetchAPY';
import { fetchStats } from '../../actions/fetchStats';
import { BNB_STAKING_AMOUNT_STEP } from '../../const';
import { useRedeemData } from '../../hooks/useRedeemData';
import { getAmountData } from '../../utils/getAmountData';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStats } from './hooks/useStakeStats';
import { useSuccessDialog } from './hooks/useSuccessDialog';
import { useStakeBinanceStyles } from './useStakeBinanceStyles';

export const StakeBinance = () => {
  const classes = useStakeBinanceStyles();
  const dispatchRequest = useDispatchRequest();

  const faqItems: IFaqItem[] = useFaq();

  const { redeemPeriod, redeemValue } = useRedeemData();

  const {
    isSuccessOpened,
    onAddTokenClick,
    onSuccessClose,
    onSuccessOpen,
    token,
  } = useSuccessDialog();

  const {
    amount,
    fetchAPYData,
    fetchStatsData,
    fetchStatsError,
    handleFormChange,
    handleSubmit,
    isFetchStatsLoading,
    isStakeLoading,
  } = useStakeForm({ openSuccessModal: onSuccessOpen });

  const stakeStats: IStakeStatsItem[] = useStakeStats(amount, fetchAPYData);

  const onRenderStats =
    (relayerFee: BigNumber) =>
    (rawAmount: BigNumber): JSX.Element => {
      const { amount: resultAmount, isLessThanOrEqualToZero } = getAmountData(
        rawAmount,
        relayerFee,
      );

      return (
        <>
          <StakeDescriptionContainer>
            <StakeDescriptionName>
              <span>{t('stake-bnb.relayer-fee')}</span>

              <Tooltip title={t('stake-bnb.tooltips.relayer-fee')}>
                <ButtonBase className={classes.questionBtn}>
                  <QuestionIcon size="xs" />
                </ButtonBase>
              </Tooltip>
            </StakeDescriptionName>

            <StakeDescriptionValue isBold={false}>
              {t('unit.bnb-value', {
                value: relayerFee,
              })}
            </StakeDescriptionValue>
          </StakeDescriptionContainer>

          <StakeDescriptionSeparator />

          <StakeDescriptionContainer>
            <StakeDescriptionName>
              {t('stake.you-will-get')}
            </StakeDescriptionName>

            <StakeDescriptionValue>
              <StakeDescriptionAmount symbol={Token.aBNBb}>
                {!isLessThanOrEqualToZero
                  ? `~${resultAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}`
                  : '0'}
              </StakeDescriptionAmount>

              <Tooltip
                title={tHTML('stake-bnb.tooltips.you-will-get', {
                  value: redeemValue,
                  period: redeemPeriod,
                })}
              >
                <ButtonBase className={classes.questionBtn}>
                  <QuestionIcon size="xs" />
                </ButtonBase>
              </Tooltip>
            </StakeDescriptionValue>
          </StakeDescriptionContainer>
        </>
      );
    };

  useProviderEffect((): void => {
    dispatchRequest(fetchAPY());
    dispatchRequest(fetchStats());
  }, [dispatchRequest]);

  if (isFetchStatsLoading) {
    return (
      <Box mt={5}>
        <QueryLoadingCentered />
      </Box>
    );
  }

  return (
    <section className={classes.root}>
      {fetchStatsError !== null && (
        <StakeContainer>
          <QueryError error={fetchStatsError} />
        </StakeContainer>
      )}

      {fetchStatsError === null &&
        fetchStatsData !== null &&
        (isSuccessOpened ? (
          <Container>
            <StakeSuccessDialog
              onAddTokenClick={onAddTokenClick}
              onClose={onSuccessClose}
              tokenName={token}
            />
          </Container>
        ) : (
          <StakeContainer>
            <StakeForm
              balance={fetchStatsData.bnbBalance}
              loading={isStakeLoading}
              maxAmount={fetchStatsData.bnbBalance}
              minAmount={fetchStatsData.minimumStake}
              renderStats={onRenderStats(fetchStatsData.relayerFee)}
              stakingAmountStep={BNB_STAKING_AMOUNT_STEP}
              tokenIn={t('unit.bnb')}
              tokenOut={t('unit.abnbb')}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
            />

            <StakeStats stats={stakeStats} />

            <Faq data={faqItems} />
          </StakeContainer>
        ))}
    </section>
  );
};
