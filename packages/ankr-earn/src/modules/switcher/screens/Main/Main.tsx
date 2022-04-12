import { Box, Paper, Typography, Chip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { FormApi } from 'final-form';
import noop from 'lodash/noop';
import { useCallback, useMemo } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { AmountInput } from 'modules/common/components/AmountField';
import { TransactionInfo } from 'modules/common/components/TransactionInfo';
import { DECIMAL_PLACES } from 'modules/common/const';
import { t, tHTML } from 'modules/i18n/utils/intl';
import {
  BASIS_POINTS_FEE_BY_TOKEN,
  CHAIN_ID_BY_TOKEN,
  NATIVE_TOKEN_BY_SWITCH_OPTION,
  TOKEN_TOOLTIPS,
  SWITCHER_TO_TOKENS,
} from 'modules/switcher/const';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { Tooltip } from 'uiKit/Tooltip';

import { ISwapFormPayload } from '../../types';

import { SwapOptions, Stepper } from './components';
import {
  useSwitcherData,
  useSwitcherForm,
  useSendAnalytics,
  useSwitcherUrlParams,
} from './hooks';
import { useMainSwitcherStyles } from './useMainSwitcherStyles';

export const Main = (): JSX.Element => {
  const classes = useMainSwitcherStyles();

  const { from, to, onChangeFrom, onChangeTo } = useSwitcherUrlParams();

  const {
    allowance,
    ratio,
    chainId,
    balance,
    isDataLoading,
    acBalance,
    abBalance,
    hasApprove,
  } = useSwitcherData({ from });

  const nativeToken = NATIVE_TOKEN_BY_SWITCH_OPTION[from];
  const canSwitchNetwork = chainId !== CHAIN_ID_BY_TOKEN[from];
  const feeBasisPoints = BASIS_POINTS_FEE_BY_TOKEN[from];

  const { sendAnalytics } = useSendAnalytics({
    from,
    to,
    feeBasisPoints,
    ratio,
    acBalance,
    abBalance,
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
    handleSwitchNetwork,
  } = useSwitcherForm({
    max: balance,
    from,
    to,
    ratio,
    onSuccessSwap: sendAnalytics,
  });

  const isToToken = useMemo(() => SWITCHER_TO_TOKENS.includes(from), [from]);
  const canShowApproveStep = isToToken && hasApprove && !canSwitchNetwork;
  const canApprove = allowance.isZero() && isToToken;
  const canShowSpinner = isDataLoading && !abBalance && !acBalance;

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
      feeBP: new BigNumber(feeBasisPoints),
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
              <Tooltip title={TOKEN_TOOLTIPS[from]}>
                <QuestionIcon className={classes.infoIcon} />
              </Tooltip>
            }
            label={
              !isDataLoading ? (
                `1 ${from} = 1 ${nativeToken}`
              ) : (
                <Skeleton width={115} />
              )
            }
            variant="outlined"
            onDelete={noop}
          />

          <Chip
            className={classes.chip}
            clickable={false}
            deleteIcon={
              <Tooltip title={TOKEN_TOOLTIPS[to]}>
                <QuestionIcon className={classes.infoIcon} />
              </Tooltip>
            }
            label={
              !isDataLoading ? (
                `1 ${to} = ${new BigNumber(1)
                  .dividedBy(ratio)
                  .decimalPlaces(DECIMAL_PLACES)
                  .toFixed()} ${nativeToken}`
              ) : (
                <Skeleton width={115} />
              )
            }
            variant="outlined"
            onDelete={noop}
          />
        </Box>

        <AmountInput
          balance={balance}
          inputClassName={classes.amountInput}
          isBalanceLoading={isDataLoading}
          label={t('switcher.amountInputTitle')}
          name="amount"
          tokenName={from}
          onMaxClick={setMaxAmount(
            form,
            balance.decimalPlaces(18, BigNumber.ROUND_HALF_DOWN).toString(10),
          )}
        />

        <SwapOptions
          from={from}
          to={to}
          onChooseFrom={onChangeFrom}
          onChooseTo={onChangeTo}
        />

        <Box className={classes.row}>
          <Typography className={classes.fee}>
            {t('switcher.fee', { fee: feeBasisPoints / 100 })}
          </Typography>

          <Typography className={classes.fee}>
            {!isDataLoading ? (
              t('unit.token-value', {
                value: fee.decimalPlaces(DECIMAL_PLACES).toFixed(),
                token: from,
              })
            ) : (
              <Skeleton width={80} />
            )}
          </Typography>
        </Box>

        <div className={classes.hr} />

        <Box className={classes.row}>
          <Typography className={classes.result}>
            {t('switcher.willGet')}
          </Typography>

          <Typography className={cn(classes.result, classes.sum)}>
            {!isDataLoading ? (
              t('unit.token-value', {
                value: calculateValueWithRatio(total).toFixed(),
                token: to,
              })
            ) : (
              <Skeleton width={80} />
            )}
          </Typography>
        </Box>

        <Box className={classes.buttons}>
          {canShowApproveStep && (
            <Button
              className={classes.button}
              disabled={isApproveLoading || !canApprove}
              endIcon={
                <Tooltip arrow title={tHTML('common.tooltips.allowance')}>
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

          {canSwitchNetwork && (
            <Button className={classes.button} onClick={handleSwitchNetwork}>
              {t('switcher.buttons.switchNetwork')}
            </Button>
          )}

          {!canSwitchNetwork && (
            <Button
              className={classes.button}
              disabled={isSwapLoading || canApprove}
              isLoading={isSwapLoading}
              onClick={handleSubmit}
            >
              {t('switcher.buttons.switch')}
            </Button>
          )}
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
