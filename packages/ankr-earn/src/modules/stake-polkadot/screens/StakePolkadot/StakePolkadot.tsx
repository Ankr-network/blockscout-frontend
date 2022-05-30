import { Box, ButtonBase } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React from 'react';

import { t, tHTML } from 'common';

import { Faq } from 'modules/common/components/Faq';
import { DECIMAL_PLACES } from 'modules/common/const';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeSuccessDialog } from 'modules/stake/components/StakeSuccessDialog';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { Tooltip } from 'uiKit/Tooltip';

import { IPolkadotRouteLoadableComponentProps } from '../../types';
import { getRedeemPeriod } from '../../utils/getRedeemPeriod';

import { StakeClaimDialog } from './components/StakeClaimDialog';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakePolkadotStyles } from './useStakePolkadotStyles';

export const StakePolkadot = ({
  network,
}: IPolkadotRouteLoadableComponentProps): JSX.Element => {
  const classes = useStakePolkadotStyles();

  const {
    amount,
    ethToken,
    faqItems,
    fetchStatsData,
    fetchStatsError,
    isActiveStakeClaimForm,
    isActiveStakeForm,
    isActiveSuccessForm,
    isFetchStatsLoading,
    isStakeLoading,
    metricsServiceName,
    polkadotBalance,
    polkadotToken,
    onAddTokenClick,
    onStakeChange,
    onStakeClaimSubmit,
    onStakeSubmit,
    onSuccessClose,
  } = useStakeForm(network);

  const onStakeFormRenderStats = (rawAmount: BigNumber): JSX.Element => (
    <StakeDescriptionContainer>
      <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

      <StakeDescriptionValue>
        <StakeDescriptionAmount
          symbol={ethToken}
          value={rawAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
        />

        <Tooltip
          title={tHTML('stake-polkadot.tooltips.you-will-get', {
            token: polkadotToken,
            period: getRedeemPeriod(network),
          })}
        >
          <ButtonBase className={classes.questionBtn}>
            <QuestionIcon size="xs" />
          </ButtonBase>
        </Tooltip>
      </StakeDescriptionValue>
    </StakeDescriptionContainer>
  );

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
        <>
          {isActiveStakeForm && (
            <StakeContainer>
              <StakeForm
                balance={polkadotBalance}
                loading={isStakeLoading}
                maxAmount={polkadotBalance}
                maxAmountDecimals={fetchStatsData.maxPolkadotNetworkDecimals.toNumber()}
                minAmount={fetchStatsData.minStake}
                renderStats={onStakeFormRenderStats}
                tokenIn={polkadotToken}
                tokenOut={ethToken}
                onChange={onStakeChange}
                onSubmit={onStakeSubmit}
              />

              <StakeStats
                amount={amount}
                metricsServiceName={metricsServiceName}
              />

              <Faq data={faqItems} />
            </StakeContainer>
          )}

          {isActiveStakeClaimForm && (
            <Container>
              <StakeClaimDialog
                ethAmount={amount}
                ethToken={ethToken}
                network={network}
                polkadotToken={polkadotToken}
                onSubmit={onStakeClaimSubmit}
              />
            </Container>
          )}

          {isActiveSuccessForm && (
            <Container>
              <StakeSuccessDialog
                tokenName={ethToken}
                onAddTokenClick={onAddTokenClick}
                onClose={onSuccessClose}
              />
            </Container>
          )}
        </>
      )}
    </section>
  );
};
