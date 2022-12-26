import { t, tHTML } from '@ankr.com/common';
import { Box, Chip, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { FormApi } from 'final-form';
import noop from 'lodash/noop';
import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { AmountInput } from 'modules/common/components/AmountField';
import { TransactionInfo } from 'modules/common/components/TransactionInfo';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import {
  CHAIN_ID_BY_TOKEN,
  TOKEN_TOOLTIPS_FROM,
  TOKEN_TOOLTIPS_TO,
} from 'modules/switcher/const';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { Tooltip } from 'uiKit/Tooltip';

import { ISwapFormPayload } from '../../types';

import { Stepper, SwapOptions } from './components';
import {
  useSendAnalytics,
  useSwitcherData,
  useSwitcherForm,
  useSwitcherUrlParams,
} from './hooks';
import { useMainSwitcherStyles } from './useMainSwitcherStyles';
import { getFromLabel, getToLabel } from './utils/labels';

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
    isConnected,
    checkAllowance,
  } = useSwitcherData({ from });

  const canSwitchNetwork = chainId !== CHAIN_ID_BY_TOKEN[from];

  const { sendAnalytics } = useSendAnalytics({
    from,
    to,
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
    handleApprove,
    handleSwap,
    handleClearTx,
    handleSwitchNetwork,
  } = useSwitcherForm({
    max: balance,
    from,
    to,
    ratio,
    chainId,
    onSuccessSwap: sendAnalytics,
  });

  const { handleOpen: handleConnectOpen } = useDialog(EKnownDialogs.connect);

  const canShowSpinner = isDataLoading && !abBalance && !acBalance;
  const fromTokenName = getTokenName(from);

  const onSubmit = useCallback(
    ({ amount }: ISwapFormPayload) => {
      const canApprove = checkAllowance(new BigNumber(amount as string));

      if (canApprove) {
        handleApprove();
      } else {
        handleSwap(amount as string);
      }
    },
    [checkAllowance, handleApprove, handleSwap],
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
    const total = new BigNumber(values.amount || 0);

    const canApprove = checkAllowance(new BigNumber(values.amount || 0));
    const canShowApproveStep = canApprove && !canSwitchNetwork;
    const canDisableApprove = isApproveLoading || isDataLoading || !canApprove;
    const canDisableSwitch = isSwapLoading || isDataLoading || canApprove;

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
              <Tooltip title={TOKEN_TOOLTIPS_FROM[from]}>
                <QuestionIcon className={classes.infoIcon} />
              </Tooltip>
            }
            label={
              !isDataLoading ? (
                getFromLabel({ token: from })
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
              <Tooltip title={TOKEN_TOOLTIPS_TO[to]}>
                <QuestionIcon className={classes.infoIcon} />
              </Tooltip>
            }
            label={
              !isDataLoading ? (
                getToLabel({ token: to, ratio })
              ) : (
                <Skeleton width={115} />
              )
            }
            variant="outlined"
            onDelete={noop}
          />
        </Box>

        <AmountInput
          balance={isConnected ? balance : undefined}
          inputClassName={classes.amountInput}
          isBalanceLoading={isConnected ? isDataLoading : undefined}
          label={t('switcher.amountInputTitle')}
          name="amount"
          tokenName={fromTokenName}
          onMaxClick={setMaxAmount(
            form,
            balance.decimalPlaces(18, BigNumber.ROUND_DOWN).toString(10),
          )}
        />

        <SwapOptions
          from={from}
          to={to}
          onChooseFrom={onChangeFrom}
          onChooseTo={onChangeTo}
        />

        <div className={classes.hr} />

        <Box className={classes.row}>
          <Typography className={classes.result}>
            {t('switcher.willGet')}
          </Typography>

          <Typography className={classNames(classes.result, classes.sum)}>
            {!isDataLoading ? (
              t('unit.token-value', {
                value: calculateValueWithRatio(total).toFixed(),
                token: getTokenName(to),
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
              disabled={canDisableApprove}
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

          {isConnected && canSwitchNetwork && (
            <Button className={classes.button} onClick={handleSwitchNetwork}>
              {t('switcher.buttons.switchNetwork')}
            </Button>
          )}

          {isConnected && !canSwitchNetwork && (
            <Button
              className={classes.button}
              disabled={canDisableSwitch}
              isLoading={isSwapLoading}
              onClick={handleSubmit}
            >
              {t('switcher.buttons.switch')}
            </Button>
          )}

          {!isConnected && (
            <Button className={classes.button} onClick={handleConnectOpen}>
              {t('switcher.buttons.connectBtn')}
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
