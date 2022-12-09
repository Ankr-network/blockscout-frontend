import { t, tHTML } from '@ankr.com/common';
import { Box } from '@material-ui/core';

import { Faq } from 'modules/common/components/Faq';
import { DECIMAL_PLACES } from 'modules/common/const';
import TokenInfoLogo from 'modules/stake-xdc/assets/token-info-logo.png';
import { XDC_STAKING_AMOUNT_STEP } from 'modules/stake-xdc/const';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { Button } from 'uiKit/Button';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStyles } from './useStakeStyles';

export const Stake = (): JSX.Element => {
  const classes = useStakeStyles();

  const {
    aXDCcPrice,
    amount,
    faqItems,
    gasFee,
    getStakeDataError,
    isGasFeeLoading,
    isStakeDataError,
    isStakeDataLoading,
    isStakeLoading,
    minAmount,
    tokenIn,
    tokenOut,
    totalAmount,
    xdcBalance,
    onFormChange,
    onFormSubmit,
  } = useStakeForm();

  const renderFooter = (): JSX.Element => (
    <>
      <div className={classes.tokenInfoArea}>
        <img
          alt={t('stake-xdc.stake.token-logo-alt')}
          className={classes.tokenInfoLogo}
          src={TokenInfoLogo}
        />

        <div>
          {tHTML('stake-xdc.stake.info', {
            value: aXDCcPrice.decimalPlaces(DECIMAL_PLACES).toFormat(),
          })}
        </div>
      </div>

      <Button
        fullWidth
        color="primary"
        disabled={isStakeLoading}
        isLoading={isStakeLoading}
        size="large"
        type="submit"
      >
        {t('stake.stake', {
          token: tokenOut,
        })}
      </Button>
    </>
  );

  const renderStats = (): JSX.Element => (
    <StakeDescriptionContainer>
      <StakeDescriptionName>{t('stake.you-will-receive')}</StakeDescriptionName>

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
      {isStakeDataError && (
        <StakeContainer>
          <QueryError error={getStakeDataError} />
        </StakeContainer>
      )}

      {!isStakeDataError && (
        <StakeContainer>
          <StakeForm
            isIntegerOnly
            balance={xdcBalance}
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
            maxAmount={xdcBalance}
            minAmount={minAmount}
            renderFooter={renderFooter}
            renderStats={renderStats}
            stakingAmountStep={XDC_STAKING_AMOUNT_STEP}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            onChange={onFormChange}
            onSubmit={onFormSubmit}
          />

          <StakeStats
            amount={amount}
            metricsServiceName={EMetricsServiceName.XDC}
          />

          <Faq data={faqItems} />
        </StakeContainer>
      )}
    </section>
  );
};
