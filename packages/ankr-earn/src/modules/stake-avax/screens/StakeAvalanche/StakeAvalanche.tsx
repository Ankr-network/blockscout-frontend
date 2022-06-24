import { Box } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatch } from 'react-redux';

import { t, tHTML } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Faq } from 'modules/common/components/Faq';
import { DECIMAL_PLACES, DEFAULT_FIXED, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchPendingValues } from 'modules/stake-avax/actions/fetchPendingValues';
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
import { TokenVariant } from 'modules/stake/components/TokenVariant';
import { TokenVariantList } from 'modules/stake/components/TokenVariantList';
import { AAvaxBIcon } from 'uiKit/Icons/AAvaxBIcon';
import { AAvaxCIcon } from 'uiKit/Icons/AAvaxCIcon';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { fetchStats } from '../../actions/fetchStats';

import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeAvalancheStyles } from './useStakeAvalancheStyles';

const AVAX_STAKING_AMOUNT_STEP = 1;

export const StakeAvalanche = (): JSX.Element => {
  const classes = useStakeAvalancheStyles();
  const dispatch = useDispatch();

  const faqItems = useFaq();

  const {
    amount,
    fetchStatsData,
    fetchStatsError,
    isFetchStatsLoading,
    isStakeGasLoading,
    isStakeLoading,
    stakeGasFee,
    totalAmount,
    tokenOut,
    onTokenSelect,
    aAVAXcRatio,
    handleFormChange,
    handleSubmit,
  } = useStakeForm();

  const onRenderStats = (): JSX.Element => (
    <>
      <TokenVariantList my={5}>
        <TokenVariant
          description={tHTML('stake-avax.aavaxb-descr')}
          iconSlot={<AAvaxBIcon />}
          isActive={tokenOut === Token.aAVAXb}
          isDisabled={isStakeLoading}
          title={t('unit.aavaxb')}
          onClick={onTokenSelect(Token.aAVAXb)}
        />

        <TokenVariant
          description={tHTML('stake-avax.aavaxc-descr', {
            rate: isFetchStatsLoading
              ? '...'
              : aAVAXcRatio?.decimalPlaces(DEFAULT_FIXED).toFormat(),
          })}
          iconSlot={<AAvaxCIcon />}
          isActive={tokenOut === Token.aAVAXc}
          isDisabled={isStakeLoading}
          title={t('unit.aavaxc')}
          onClick={onTokenSelect(Token.aAVAXc)}
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

  useProviderEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchPendingValues());
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

      {fetchStatsError === null && fetchStatsData !== null && (
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
            tokenOut={tokenOut}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
          />

          <StakeStats
            amount={amount}
            metricsServiceName={EMetricsServiceName.AVAX}
          />

          <Faq data={faqItems} />
        </StakeContainer>
      )}
    </section>
  );
};
