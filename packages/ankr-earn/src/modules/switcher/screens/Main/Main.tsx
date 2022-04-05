import { Box, Paper, Typography, Chip } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { FormApi } from 'final-form';
import noop from 'lodash/noop';
import { useCallback, useMemo } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { AmountInput } from 'modules/common/components/AmountField';
import { TransactionInfo } from 'modules/common/components/TransactionInfo';
import {
  DECIMAL_PLACES,
  ETH_SCALE_FACTOR,
  ONE_ETH,
} from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { Tooltip } from 'uiKit/Tooltip';

import { ISwapFormPayload } from '../../types';

import { SwapOptions, Stepper } from './components';
import { useSwitcherData, useSwitcherForm, useSendAnalytics } from './hooks';
import { useMainSwitcherStyles } from './useMainSwitcherStyles';

const FEE_BASIS_POINTS = 30;

export const Main = (): JSX.Element => {
  const classes = useMainSwitcherStyles();

  const {
    allowance,
    swapOption,
    ratio,
    chainId,
    balance,
    isDataLoading,
    aethBalance,
    fethBalance,
    hasApprove,
    handleChooseAEthB,
    handleChooseAEthC,
  } = useSwitcherData();

  const { sendAnalytics } = useSendAnalytics({
    swapOption,
    feeBasisPoints: FEE_BASIS_POINTS,
    ratio,
    aethBalance,
    fethBalance,
  });

  const {
    txHash,
    txError,
    isApproveLoading,
    isSwapLoading,
    validate,
    calculateValueWithRatio,
    calculateFeeAndTotal,
    handleApprove,
    handleSwap,
    handleClearTx,
  } = useSwitcherForm({
    max: balance,
    swapOption,
    ratio,
    onSuccessSwap: sendAnalytics,
  });

  const max = useMemo(() => balance.dividedBy(ETH_SCALE_FACTOR), [balance]);
  const canApprove = allowance.isZero() && swapOption === 'aETHc';
  const canShowApproveStep = swapOption === 'aETHc' && hasApprove;
  const canShowSpinner = isDataLoading && !fethBalance && !aethBalance;

  const onSubmit = useCallback(
    ({ amount }: ISwapFormPayload) => {
      if (canApprove) {
        handleApprove();
      } else {
        handleSwap(amount as string);
      }
    },
    [canApprove, handleApprove, handleSwap],
  );

  const setMaxAmount = useCallback(
    (form: FormApi<ISwapFormPayload>, maxAmount: string) => () =>
      form.change('amount', maxAmount),
    [],
  );

  const renderForm = ({
    form,
    values,
    handleSubmit,
  }: FormRenderProps): JSX.Element => {
    const { fee, total } = calculateFeeAndTotal({
      amount: new BigNumber(values.amount || 0),
      feeBP: new BigNumber(FEE_BASIS_POINTS),
    });

    return (
      <Paper
        className={classes.root}
        component="form"
        variant="elevation"
        onSubmit={handleSubmit}
      >
        <Typography className={classes.title} variant="h2">
          {t('switcher.title')}
        </Typography>

        <Typography className={classes.info}>{t('switcher.info')}</Typography>

        <Box className={classes.chips}>
          <Chip
            className={classes.chip}
            clickable={false}
            deleteIcon={
              <Tooltip title={t('switcher.tooltips.aETHb')}>
                <QuestionIcon className={classes.infoIcon} />
              </Tooltip>
            }
            label="1 aETHb = 1 ETH"
            variant="outlined"
            onDelete={noop}
          />

          <Chip
            className={classes.chip}
            clickable={false}
            deleteIcon={
              <Tooltip title={t('switcher.tooltips.aETHc')}>
                <QuestionIcon className={classes.infoIcon} />
              </Tooltip>
            }
            label={`1 aETHc = ${ONE_ETH.dividedBy(ratio)
              .decimalPlaces(DECIMAL_PLACES)
              .toFixed()} ETH`}
            variant="outlined"
            onDelete={noop}
          />
        </Box>

        <AmountInput
          balance={max}
          inputClassName={classes.amountInput}
          isBalanceLoading={false}
          label={t('switcher.amountInputTitle')}
          name="amount"
          tokenName={swapOption}
          onMaxClick={setMaxAmount(
            form,
            max.decimalPlaces(18, BigNumber.ROUND_HALF_DOWN).toString(10),
          )}
        />

        <SwapOptions
          swapOption={swapOption}
          onChooseAEthB={handleChooseAEthB}
          onChooseAEthC={handleChooseAEthC}
        />

        <Box className={classes.row}>
          <Typography className={classes.fee}>
            {t('switcher.fee', { fee: FEE_BASIS_POINTS / 100 })}
          </Typography>

          <Typography className={classes.fee}>
            {t('unit.token-value', {
              value: fee.decimalPlaces(DECIMAL_PLACES).toFixed(),
              token: swapOption,
            })}
          </Typography>
        </Box>

        <div className={classes.hr} />

        <Box className={classes.row}>
          <Typography className={classes.result}>
            {t('switcher.willGet')}
          </Typography>

          <Typography className={cn(classes.result, classes.sum)}>
            {t('unit.token-value', {
              value: calculateValueWithRatio(total).toFixed(),
              token: swapOption === 'aETHb' ? 'aETHc' : 'aETHb',
            })}
          </Typography>
        </Box>

        <Box className={classes.buttons}>
          {canShowApproveStep && (
            <Button
              className={classes.button}
              disabled={isApproveLoading || !canApprove}
              endIcon={
                <Tooltip arrow title={t('switcher.tooltips.approve')}>
                  <Box component="span" display="flex">
                    <QuestionIcon htmlColor="inherit" size="xs" />
                  </Box>
                </Tooltip>
              }
              isLoading={isApproveLoading}
              onClick={handleSubmit}
            >
              {t('switcher.buttons.approve')}
            </Button>
          )}

          <Button
            className={classes.button}
            disabled={isSwapLoading || canApprove}
            isLoading={isSwapLoading}
            onClick={handleSubmit}
          >
            {t('switcher.buttons.switch')}
          </Button>
        </Box>

        {canShowApproveStep && <Stepper allowance={allowance} />}
      </Paper>
    );
  };

  return (
    <Box component="section" py={{ xs: 5, md: 8 }}>
      <Container>
        <TransactionInfo
          chainId={chainId}
          txError={txError}
          txHash={txHash}
          type={txError ? 'failed' : 'success'}
          onClose={handleClearTx}
        />

        {canShowSpinner && <QueryLoadingCentered />}

        {!canShowSpinner && (
          <Form
            initialValues={{ amount: '' }}
            render={renderForm}
            validate={validate}
            onSubmit={onSubmit}
          />
        )}
      </Container>
    </Box>
  );
};
