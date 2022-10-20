import { Box } from '@material-ui/core';

import { t } from 'common';

import { Faq } from 'modules/common/components/Faq';
import { DECIMAL_PLACES } from 'modules/common/const';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { NetworkTitle } from '../../components/NetworkTitle';
import { SSV_MAX_DECIMALS_LEN } from '../../const';

import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStyles } from './useStakeStyles';

export const Stake = (): JSX.Element => {
  const classes = useStakeStyles();

  const {
    amount,
    ethBalance,
    extraValidation,
    faqItems,
    gasFee,
    getStakeDataError,
    isGasFeeLoading,
    isStakeDataLoading,
    isStakeLoading,
    minAmount,
    tokenIn,
    tokenOut,
    totalAmount,
    onFormChange,
    onFormSubmit,
  } = useStakeForm();

  const renderStats = (): JSX.Element => (
    <StakeDescriptionContainer>
      <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

      <StakeDescriptionValue>
        <StakeDescriptionAmount
          symbol={tokenOut}
          value={totalAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
        />
      </StakeDescriptionValue>
    </StakeDescriptionContainer>
  );

  if (isStakeDataLoading) {
    return (
      <Box mt={5}>
        <QueryLoadingCentered />
      </Box>
    );
  }

  return (
    <section className={classes.root}>
      {getStakeDataError !== null && (
        <StakeContainer>
          <QueryError error={getStakeDataError} />
        </StakeContainer>
      )}

      {getStakeDataError === null && (
        <StakeContainer>
          <StakeForm
            balance={ethBalance}
            extraValidation={extraValidation}
            feeSlot={
              <StakeFeeInfo
                isLoading={isGasFeeLoading}
                mt={-1.5}
                token={tokenIn}
                value={gasFee}
              />
            }
            isDisabled={isStakeLoading}
            loading={isStakeLoading}
            maxAmount={ethBalance}
            maxAmountDecimals={SSV_MAX_DECIMALS_LEN}
            minAmount={minAmount}
            networkTitleSlot={<NetworkTitle />}
            renderStats={renderStats}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            onChange={onFormChange}
            onSubmit={onFormSubmit}
          />

          <StakeStats
            amount={amount}
            metricsServiceName={EMetricsServiceName.ETH_SSV}
          />

          <Faq data={faqItems} />
        </StakeContainer>
      )}
    </section>
  );
};
