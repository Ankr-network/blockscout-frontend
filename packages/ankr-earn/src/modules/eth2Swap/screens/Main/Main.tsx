import { useCallback, useMemo } from 'react';
import { Box, Paper, Typography, Chip } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormApi } from 'final-form';
import { Form, FormRenderProps } from 'react-final-form';
import cn from 'classnames';
import noop from 'lodash/noop';

import { t } from 'modules/i18n/utils/intl';
import {
  DECIMAL_PLACES,
  ETH_SCALE_FACTOR,
  ONE_ETH,
} from 'modules/common/const';
import { AmountInput } from 'modules/common/components/AmountField';
import { TransactionInfo } from 'modules/common/components/TransactionInfo';
import { Container } from 'uiKit/Container';
import { Tooltip } from 'uiKit/Tooltip';
import { Button } from 'uiKit/Button';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { ISwapFormPayload } from '../../types';
import { useEth2SwapData, useEth2SwapForm } from './hooks';
import { SwapOptions, Stepper } from './components';
import { useMainEth2SwapStyles } from './useMainEth2SwapStyles';

const FEE_BASIS_POINTS = 30;

export const Main = (): JSX.Element => {
  const classes = useMainEth2SwapStyles();

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
  } = useEth2SwapData();

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
  } = useEth2SwapForm({ max: balance, swapOption, ratio });

  const max = useMemo(
    () => balance.dividedBy(ETH_SCALE_FACTOR).decimalPlaces(DECIMAL_PLACES),
    [balance],
  );
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
        <Typography variant="h2" className={classes.title}>
          {t('eth2Swap.title')}
        </Typography>

        <Typography className={classes.info}>{t('eth2Swap.info')}</Typography>

        <Box className={classes.chips}>
          <Chip
            className={classes.chip}
            label="1 aETHb = 1 ETH"
            variant="outlined"
            clickable={false}
            deleteIcon={
              <Tooltip title={t('eth2Swap.tooltips.aETHb')}>
                <QuestionIcon className={classes.infoIcon} />
              </Tooltip>
            }
            onDelete={noop}
          />

          <Chip
            className={classes.chip}
            label={`1 aETHc = ${ONE_ETH.dividedBy(ratio)
              .decimalPlaces(DECIMAL_PLACES)
              .toNumber()} ETH`}
            variant="outlined"
            clickable={false}
            deleteIcon={
              <Tooltip title={t('eth2Swap.tooltips.aETHc')}>
                <QuestionIcon className={classes.infoIcon} />
              </Tooltip>
            }
            onDelete={noop}
          />
        </Box>

        <AmountInput
          inputClassName={classes.amountInput}
          balance={max}
          label={t('eth2Swap.amountInputTitle')}
          name="amount"
          isBalanceLoading={false}
          tokenName={swapOption}
          onMaxClick={setMaxAmount(form, max.toString())}
        />

        <SwapOptions
          swapOption={swapOption}
          onChooseAEthB={handleChooseAEthB}
          onChooseAEthC={handleChooseAEthC}
        />

        <Box className={classes.row}>
          <Typography className={classes.fee}>
            {t('eth2Swap.fee', { fee: FEE_BASIS_POINTS / 100 })}
          </Typography>

          <Typography className={classes.fee}>
            {fee.decimalPlaces(DECIMAL_PLACES).toNumber()} {swapOption}
          </Typography>
        </Box>

        <div className={classes.hr} />

        <Box className={classes.row}>
          <Typography className={classes.result}>
            {t('eth2Swap.willGet')}
          </Typography>

          <Typography className={cn(classes.result, classes.sum)}>
            {calculateValueWithRatio(total).toNumber()}{' '}
            {swapOption === 'aETHb' ? 'aETHc' : 'aETHb'}
          </Typography>
        </Box>

        <Box className={classes.buttons}>
          {canShowApproveStep && (
            <Button
              className={classes.button}
              disabled={isApproveLoading || !canApprove}
              isLoading={isApproveLoading}
              onClick={handleSubmit}
            >
              {t('eth2Swap.buttons.approve')}
            </Button>
          )}

          <Button
            className={classes.button}
            disabled={isSwapLoading || canApprove}
            isLoading={isSwapLoading}
            onClick={handleSubmit}
          >
            {t('eth2Swap.buttons.swap')}
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
          type={txError ? 'failed' : 'success'}
          chainId={chainId}
          txHash={txHash}
          txError={txError}
          onClose={handleClearTx}
        />

        {canShowSpinner && <QueryLoadingCentered />}

        {!canShowSpinner && (
          <Form
            initialValues={{ amount: '' }}
            validate={validate}
            render={renderForm}
            onSubmit={onSubmit}
          />
        )}
      </Container>
    </Box>
  );
};
