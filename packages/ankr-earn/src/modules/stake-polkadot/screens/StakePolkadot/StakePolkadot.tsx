import { Box, ButtonBase } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import { t, tHTML } from 'common';

import { Faq } from 'modules/common/components/Faq';
import { DECIMAL_PLACES } from 'modules/common/const';
import { getMetrics } from 'modules/stake/actions/getMetrics';
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

import { fetchPolkadotAccountMaxSafeBalance } from '../../actions/fetchPolkadotAccountMaxSafeBalance';
import { fetchStakeStats } from '../../actions/fetchStakeStats';
import { useETHPolkadotProvidersEffect } from '../../hooks/useETHPolkadotProvidersEffect';
import { IPolkadotRouteLoadableComponentProps } from '../../types';
import { getRedeemPeriod } from '../../utils/getRedeemPeriod';

import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useSuccessDialog } from './hooks/useSuccessDialog';
import { useStakePolkadotStyles } from './useStakePolkadotStyles';

export const StakePolkadot = ({
  network,
}: IPolkadotRouteLoadableComponentProps): JSX.Element => {
  const classes = useStakePolkadotStyles();
  const dispatchRequest = useDispatchRequest();

  const { isSuccessOpened, onAddTokenClick, onSuccessClose, onSuccessOpen } =
    useSuccessDialog(network);

  const {
    amount,
    ethToken,
    fetchStatsData,
    fetchStatsError,
    isFetchStatsLoading,
    isStakeLoading,
    metricsServiceName,
    polkadotBalance,
    polkadotToken,
    onFormChange,
    onFormSubmit,
  } = useStakeForm({
    network,
    openSuccessModal: onSuccessOpen,
  });

  const faqItems = useFaq({
    ethToken,
    network,
    polkadotToken,
  });

  const onRenderStats = (rawAmount: BigNumber): JSX.Element => (
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

  useETHPolkadotProvidersEffect(() => {
    dispatchRequest(fetchPolkadotAccountMaxSafeBalance(network));
    dispatchRequest(fetchStakeStats());
    dispatchRequest(getMetrics());
  }, [
    dispatchRequest,
    fetchPolkadotAccountMaxSafeBalance,
    fetchStakeStats,
    getMetrics,
    network,
  ]);

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
              tokenName={ethToken}
              onAddTokenClick={onAddTokenClick}
              onClose={onSuccessClose}
            />
          </Container>
        ) : (
          <StakeContainer>
            <StakeForm
              balance={polkadotBalance}
              loading={isStakeLoading}
              maxAmount={polkadotBalance}
              maxAmountDecimals={fetchStatsData.maxDecimalsStake.toNumber()}
              minAmount={fetchStatsData.minStake}
              renderStats={onRenderStats}
              tokenIn={polkadotToken}
              tokenOut={ethToken}
              onChange={onFormChange}
              onSubmit={onFormSubmit}
            />

            <StakeStats
              amount={amount}
              metricsServiceName={metricsServiceName}
            />

            <Faq data={faqItems} />
          </StakeContainer>
        ))}
    </section>
  );
};
