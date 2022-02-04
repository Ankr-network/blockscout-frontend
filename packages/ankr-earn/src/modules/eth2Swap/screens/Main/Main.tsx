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
import { AmountField } from 'modules/common/components/AmountField';
import { Container } from 'uiKit/Container';
import { Tooltip } from 'uiKit/Tooltip';
import { Button } from 'uiKit/Button';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { ISwapFormPayload } from '../../types';
import { useEth2SwapHook } from './hook';
import { SwapOptions } from './components';
import { useMainEth2SwapStyles } from './styles';

const FEE_BASIS_POINTS = 30;

export const Main = (): JSX.Element => {
  const classes = useMainEth2SwapStyles();

  const {
    allowance,
    swapOption,
    ratio,
    balance,
    isDataLoading,
    aethBalance,
    fethBalance,
    isApproveLoading,
    isSwapLoading,
    validate,
    calculateValueWithRatio,
    calculateFeeAndTotal,
    handleChooseAEthB,
    handleChooseAEthC,
    handleApprove,
    handleSwap,
  } = useEth2SwapHook();

  const max = useMemo(
    () => balance.dividedBy(ETH_SCALE_FACTOR).decimalPlaces(DECIMAL_PLACES),
    [balance],
  );
  const canShowApprove = allowance.isZero() && swapOption === 'aETHc';
  const canShowSpinner = isDataLoading && !fethBalance && !aethBalance;

  const onSubmit = useCallback(
    ({ amount }: ISwapFormPayload) => {
      if (canShowApprove) {
        handleApprove();
      } else {
        handleSwap(amount as string);
      }
    },
    [canShowApprove, handleApprove, handleSwap],
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
          <Tooltip title={t('eth2Swap.tooltips.aETHb')}>
            <Chip
              className={classes.chip}
              label="1 aETHb = 1 ETH"
              variant="outlined"
              deleteIcon={<QuestionIcon className={classes.infoIcon} />}
              onDelete={noop}
            />
          </Tooltip>

          <Tooltip title={t('eth2Swap.tooltips.aETHc')}>
            <Chip
              className={classes.chip}
              label={`1 aETHc = ${ONE_ETH.dividedBy(ratio)
                .decimalPlaces(DECIMAL_PLACES)
                .toNumber()} ETH`}
              variant="outlined"
              deleteIcon={<QuestionIcon className={classes.infoIcon} />}
              onDelete={noop}
            />
          </Tooltip>
        </Box>

        <AmountField
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
          {swapOption === 'aETHc' && (
            <Button
              className={classes.button}
              disabled={isApproveLoading || !canShowApprove}
              isLoading={isApproveLoading}
              onClick={handleSubmit}
            >
              Approve
            </Button>
          )}

          <Button
            className={classes.button}
            disabled={isSwapLoading || canShowApprove}
            isLoading={isSwapLoading}
            onClick={handleSubmit}
          >
            Swap
          </Button>
        </Box>
      </Paper>
    );
  };

  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
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
