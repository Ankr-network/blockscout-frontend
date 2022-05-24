import { Box, ButtonBase } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useDispatch } from 'react-redux';

import { t, tHTML } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Faq } from 'modules/common/components/Faq';
import { DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getStakeGasFee } from 'modules/stake-avax/actions/getStakeGasFee';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeSuccessDialog } from 'modules/stake/components/StakeSuccessDialog';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { Tooltip } from 'uiKit/Tooltip';

import { fetchAPY } from '../../actions/fetchAPY';
import { fetchStats } from '../../actions/fetchStats';

import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useSuccessDialog } from './hooks/useSuccessDialog';
import { useStakeAvalancheStyles } from './useStakeAvalancheStyles';

const AVAX_STAKING_AMOUNT_STEP = 1;

export const StakeAvalanche = (): JSX.Element => {
  const classes = useStakeAvalancheStyles();
  const dispatch = useDispatch();

  const faqItems = useFaq();

  const { data: apy } = useQuery({
    type: fetchAPY,
  });

  const {
    isSuccessOpened,
    onAddTokenClick,
    onSuccessClose,
    onSuccessOpen,
    token,
  } = useSuccessDialog();

  const {
    amount,
    fetchStatsData,
    fetchStatsError,
    isFetchStatsLoading,
    isStakeGasLoading,
    isStakeLoading,
    stakeGasFee,
    totalAmount,
    handleFormChange,
    handleSubmit,
  } = useStakeForm({ openSuccessModal: onSuccessOpen });

  const onRenderStats = (): JSX.Element => (
    <StakeDescriptionContainer>
      <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

      <StakeDescriptionValue>
        <StakeDescriptionAmount
          symbol={Token.aAVAXb}
          value={totalAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
        />

        <Tooltip title={tHTML('stake-avax.tooltips.you-will-get')}>
          <ButtonBase className={classes.questionBtn}>
            <QuestionIcon size="xs" />
          </ButtonBase>
        </Tooltip>
      </StakeDescriptionValue>
    </StakeDescriptionContainer>
  );

  useProviderEffect(() => {
    dispatch(fetchAPY());
    dispatch(fetchStats());
    dispatch(getMetrics());

    return () => {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    };
  }, [dispatch]);

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
              tokenName={token}
              onAddTokenClick={onAddTokenClick}
              onClose={onSuccessClose}
            />
          </Container>
        ) : (
          <StakeContainer>
            <StakeForm
              isIntegerOnly
              balance={fetchStatsData.avaxBalance}
              feeSlot={
                <StakeFeeInfo
                  isLoading={isStakeGasLoading}
                  token={t('unit.avax')}
                  value={stakeGasFee}
                />
              }
              loading={isStakeLoading}
              maxAmount={fetchStatsData.avaxBalance}
              minAmount={ZERO}
              renderStats={onRenderStats}
              stakingAmountStep={AVAX_STAKING_AMOUNT_STEP}
              tokenIn={t('unit.avax')}
              tokenOut={t('unit.aavaxb')}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
            />

            <StakeStats
              amount={amount}
              apy={apy ?? undefined}
              metricsServiceName={EMetricsServiceName.AVAX}
            />

            <Faq data={faqItems} />
          </StakeContainer>
        ))}
    </section>
  );
};
