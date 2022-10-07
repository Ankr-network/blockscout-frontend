import { Box, Divider, TextField, Typography } from '@material-ui/core';
import { FormApi } from 'final-form';
import { ReactText, useCallback } from 'react';
import {
  Field,
  FieldRenderProps,
  Form,
  FormRenderProps,
} from 'react-final-form';

import { t, tHTML } from 'common';
import { useIsMDUp } from 'ui';

import { useTokenSelectOptions } from 'modules/bridge/hooks/useTokenSelectOptions';
import { RoutesConfig } from 'modules/bridge/RoutesConfig';
import {
  AvailableBridgeTokens,
  IBridgeBlockchainPanelItem,
} from 'modules/bridge/types';
import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import {
  AUDIT_LINKS,
  DEFAULT_FIXED,
  featuresConfig,
} from 'modules/common/const';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import { AmountField } from 'uiKit/AmountField';
import { Button } from 'uiKit/Button';
import { Checkbox } from 'uiKit/Checkbox';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { NavLink } from 'uiKit/NavLink';
import { OnChange } from 'uiKit/OnChange';
import { Quote } from 'uiKit/Quote';
import { NumericStepper } from 'uiKit/Stepper';
import { SwitchSelect } from 'uiKit/SwitchSelect';
import { Tooltip } from 'uiKit/Tooltip';

import { TokenSelect } from '../../../../components/TokenSelect';

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
    isBalanceLoading,
    isSendButtonLoading,
    isApproveButtonLoading,
    networksOptionsFrom,
    networksOptionsTo,
    onChangeNetwork,
    onChangeToken,
    validateAmount,
    onSubmit,
    onSwitchNetworkClick,
    onAddrCheckboxClick,
    onChangeInputValue,
    onSwapClick,
  } = useBridgeMainView();

  const { handleOpen: handleConnectOpen } = useDialog(EKnownDialogs.connect);

  const setMaxAmount = useCallback(
    (form: FormApi<IFormValues>, maxValue: string) => () =>
      form.change(EFieldName.amount, maxValue),
    [],
  );

  const isDisabledForm =
    isBalanceLoading || isApproved || isApproveButtonLoading;
  const isSwitchNetworkShowed = isConnected && !isActualNetwork;
  const isBalanceShowed = isConnected && isActualNetwork;

  const handleChangeFrom = useCallback(
    value => onChangeNetwork({ value } as IBridgeBlockchainPanelItem, 'from'),
    [onChangeNetwork],
  );

  const handleChangeTo = useCallback(
    value => onChangeNetwork({ value } as IBridgeBlockchainPanelItem, 'to'),
    [onChangeNetwork],
  );

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

          <NavLink
            className={classes.finishBridge}
            color="primary"
            href={RoutesConfig.restore.generatePath()}
            variant="outlined"
          >
            {t('bridge.main.finish-bridge')}
          </NavLink>
        </Typography>

        {!isViewportMDUp && (
          <Box display={{ md: 'none' }} mb={3}>
            {renderedSelect}
          </Box>
        )}

        {isBalanceShowed && (
          <Typography className={classes.balance}>
            {t('bridge.main.your-balance')}

            <span>
              {t('unit.token-value', {
                token: tokenValue,
                value: balance
                  ? balance.decimalPlaces(DEFAULT_FIXED).toFormat()
                  : 0,
              })}
            </span>
          </Typography>
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

        <Box className={classes.switcher} mb={3}>
          <SwitchSelect
            from={networksOptionsFrom}
            isDisabled={isDisabledForm}
            to={networksOptionsTo}
            values={{
              from: swapNetworkItem.from.toString(),
              to: swapNetworkItem.to.toString(),
            }}
            onChangeFrom={handleChangeFrom}
            onChangeSwitch={onSwapClick}
            onChangeTo={handleChangeTo}
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

            <Divider />

            <Box className={classes.willReceive}>
              <span>{t('bridge.main.you-will-receive')}</span>

              <span>{`${values.amount ?? 0} ${tokenValue}`}</span>
            </Box>

            <Quote mt={4}>{t('bridge.main.fee-banner')}</Quote>

            <Box className={classes.footer}>
              <Box className={classes.footerBtn}>
                <Button
                  color="primary"
                  disabled={isDisabledForm}
                  endIcon={
                    <Tooltip arrow title={tHTML('common.tooltips.allowance')}>
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

        {isSwitchNetworkShowed && isMetaMask && (
          <Button
            className={classes.submitBtn}
            color="primary"
            size="large"
            onClick={onSwitchNetworkClick}
          >
            {t('connect.switch-network')}
          </Button>
        )}

        {isSwitchNetworkShowed && !isMetaMask && (
          <Quote mt={4} variant="warning">
            {t('bridge.main.switch-note', {
              chain: t(`chain.${swapNetworkItem.from}`),
            })}
          </Quote>
        )}

        {!isConnected && (
          <Button
            className={classes.submitBtn}
            color="primary"
            size="large"
            onClick={handleConnectOpen}
          >
            {t('bridge.main.connectBtn')}
          </Button>
        )}

        <AuditInfo>
          <AuditInfoItem link={AUDIT_LINKS.bridge} variant="beosin" />
        </AuditInfo>

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

  return (
    <>
      <Form render={renderForm} onSubmit={onSubmit} />
    </>
  );
};
