import { Box, ButtonBase, TextField, Typography } from '@material-ui/core';
import { FormApi } from 'final-form';
import { ReactText, useCallback } from 'react';
import {
  Field,
  FieldRenderProps,
  Form,
  FormRenderProps,
} from 'react-final-form';

import { useIsMDUp } from 'ui';

import { BridgeBlockchainPanel } from 'modules/bridge/components/BridgeBlockchainPanel';
import { Quote } from 'modules/bridge/components/Quote';
import { useTokenSelectOptions } from 'modules/bridge/hooks/useTokenSelectOptions';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import { featuresConfig } from 'modules/common/const';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { TokenSelect } from 'modules/trading-cockpit/components/TokenSelect';
import { AmountField } from 'uiKit/AmountField';
import { Button } from 'uiKit/Button';
import { Checkbox } from 'uiKit/Checkbox';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { SwapIcon } from 'uiKit/Icons/SwapIcon';
import { OnChange } from 'uiKit/OnChange';
import { NumericStepper } from 'uiKit/Stepper';
import { Tooltip } from 'uiKit/Tooltip';

import { useBridgeMainView } from './useBridgeMainView';
import { useBridgeMainViewStyles } from './useBridgeMainViewStyles';

enum EFieldName {
  amount = 'amount',
  token = 'token',
}

interface IFormValues {
  [EFieldName.amount]: ReactText;
  [EFieldName.token]: string;
}

export const BridgeMainView = (): JSX.Element => {
  const classes = useBridgeMainViewStyles();
  const options = useTokenSelectOptions();
  const isViewportMDUp = useIsMDUp();

  const {
    isConnected,
    isActualNetwork,
    isMetaMask,
    tokenValue,
    isSendAnother,
    isApproved,
    swapNetworkItem,
    balance,
    isSendButtonLoading,
    isApproveButtonLoading,
    networksOptions,
    onChangeToken,
    validateAmount,
    onSubmit,
    onSwitchNetworkClick,
    onAddrCheckboxClick,
    onChangeInputValue,
    onSwapClick,
    dispatchConnect,
  } = useBridgeMainView();

  const setMaxAmount = useCallback(
    (form: FormApi<IFormValues>, maxValue: string) => () =>
      form.change(EFieldName.amount, maxValue),
    [],
  );

  const isDisabledForm = isApproved || isApproveButtonLoading;
  const isSwitchNetworkShowed = isConnected && !isActualNetwork && isMetaMask;
  const isBalanceShowed = isConnected && isActualNetwork;

  const renderedSelect = (
    <Field defaultValue={AvailableBridgeTokens.aMATICb} name={EFieldName.token}>
      {(props: FieldRenderProps<IFormValues>) => (
        <TokenSelect
          className={classes.tokenSelect}
          disabled={isDisabledForm}
          fullWidth={!isViewportMDUp}
          name={props.input.name}
          options={options}
          rootClassName={classes.tokenSelectRoot}
          value={props.input.value}
          variant="filled"
          onChange={props.input.onChange}
        />
      )}
    </Field>
  );

  const renderForm = ({
    form,
    handleSubmit,
    values,
  }: FormRenderProps<IFormValues>) => {
    return (
      <form className={classes.root} onSubmit={handleSubmit}>
        <Typography classes={{ root: classes.title }} variant="h3">
          {t('bridge.main.title')}
        </Typography>

        {!isViewportMDUp && (
          <Box display={{ md: 'none' }} mb={3}>
            {renderedSelect}
          </Box>
        )}

        <Field
          fullWidth
          className={classes.tokenInputControl}
          component={AmountField}
          disabled={isDisabledForm}
          InputProps={{
            classes: {
              root: classes.tokenInputRoot,
              input: classes.tokenInput,
              adornedStart: classes.tokenInputStart,
            },
            startAdornment: isViewportMDUp ? renderedSelect : undefined,
            endAdornment: isBalanceShowed && balance && (
              <Button
                className={classes.maxBtn}
                disabled={isDisabledForm}
                size="small"
                variant="outlined"
                onClick={setMaxAmount(form, `${balance.toString()}`)}
              >
                {t('bridge.main.btn-max')}
              </Button>
            ),
          }}
          name={EFieldName.amount}
          placeholder="0"
          validate={validateAmount}
        />

        {isBalanceShowed && (
          <Box className={classes.balance}>
            {t('bridge.main.your-balance')}

            <span>
              {t('unit.token-value', {
                token: tokenValue,
                value: balance ? balance.toFormat() : 0,
              })}
            </span>
          </Box>
        )}

        <Box className={classes.swapFields}>
          <BridgeBlockchainPanel
            direction="from"
            items={networksOptions}
            value={swapNetworkItem.from}
          />

          <ButtonBase
            className={classes.swapBtn}
            disabled={isDisabledForm}
            onClick={onSwapClick}
          >
            <SwapIcon className={classes.swapIcon} />
          </ButtonBase>

          <BridgeBlockchainPanel
            direction="to"
            items={networksOptions}
            value={swapNetworkItem.to}
          />
        </Box>

        {isConnected && isActualNetwork && (
          <>
            {featuresConfig.bridgeAnotherAddr && (
              <Box className={classes.anotherCheckbox}>
                <Checkbox
                  checked={isSendAnother}
                  label={t('bridge.main.send-to-another')}
                  onChange={onAddrCheckboxClick}
                />

                {isSendAnother ? (
                  <TextField className={classes.anotherAddress} />
                ) : null}
              </Box>
            )}

            <Box className={classes.willReceive}>
              <span>{t('bridge.main.you-will-receive')}</span>

              <span>{`${values.amount ?? 0} ${tokenValue}`}</span>
            </Box>

            <Quote mt={4}>{t('bridge.main.fee-banner')}</Quote>

            <Box className={classes.footer}>
              <Box className={classes.footerBtn}>
                <Button
                  color="primary"
                  disabled={isApproved || isApproveButtonLoading}
                  endIcon={
                    <Tooltip arrow title={tHTML('bridge.main.approve-tooltip')}>
                      <Box component="span" display="flex">
                        <QuestionIcon htmlColor="inherit" size="xs" />
                      </Box>
                    </Tooltip>
                  }
                  isLoading={isApproveButtonLoading}
                  size="large"
                  type="submit"
                >
                  {t('bridge.main.approve')}
                </Button>

                <Button
                  color="primary"
                  disabled={!isApproved || isSendButtonLoading}
                  isLoading={isSendButtonLoading}
                  size="large"
                  type="submit"
                >
                  {t('bridge.main.send')}
                </Button>
              </Box>

              <Box className={classes.footerStepper}>
                <NumericStepper
                  activeStep={isApproved ? 1 : 0}
                  stepsCount={2}
                />
              </Box>
            </Box>
          </>
        )}

        {isSwitchNetworkShowed && (
          <Button
            className={classes.submitBtn}
            color="primary"
            size="large"
            onClick={onSwitchNetworkClick}
          >
            {t('Switch network')}
          </Button>
        )}

        {!isConnected && (
          <Button
            className={classes.submitBtn}
            color="primary"
            size="large"
            onClick={dispatchConnect}
          >
            {t('bridge.main.connectBtn')}
          </Button>
        )}

        <OnChange name={EFieldName.token}>
          {value => {
            onChangeToken(value as string);
          }}
        </OnChange>

        <OnChange name={EFieldName.amount}>
          {value => {
            onChangeInputValue(value as ReactText);
          }}
        </OnChange>
      </form>
    );
  };

  return <Form render={renderForm} onSubmit={onSubmit} />;
};
