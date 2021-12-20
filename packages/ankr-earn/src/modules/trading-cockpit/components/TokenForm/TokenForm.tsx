import { ButtonBase, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormApi } from 'final-form';
import { Milliseconds } from 'modules/common/types';
import { t } from 'modules/i18n/utils/intl';
import React, { ReactText, useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { InputField } from 'uiKit/InputField';
import { OnChange } from 'uiKit/OnChange';
import { useDebouncedCallback } from 'use-debounce/lib';
import { ITokenSelectOption, TokenSelect } from '../TokenSelect';
import { ReactComponent as SwapIcon } from './assets/swap.svg';
import { useTokenFormStyles } from './useTokenFormStyles';

enum FieldsNames {
  amount = 'amount',
  toToken = 'toToken',
  fromToken = 'fromToken',
}

const MIN_AMOUNT = 0;
const DEBOUNCE_TIME: Milliseconds = 1_000;

export interface ITokenFormValues {
  amount: string;
  fromToken: string;
  toToken: string;
}

interface ITokenForm {
  options: ITokenSelectOption[];
  disabled?: boolean;
  defaultFromToken?: string;
  defaultToToken?: string;
  defaultAmount?: string;
  getPairedOption?: (fromToken: string, toToken?: string) => string | undefined;
  onSubmit: (values: ITokenFormValues) => void;
}

export const TokenForm = ({
  options,
  disabled = false,
  onSubmit,
  getPairedOption,
  defaultFromToken = options[0].value,
  defaultToToken = options[1].value,
  defaultAmount,
}: ITokenForm) => {
  const classes = useTokenFormStyles();

  const handleTokenSwap = useCallback(
    (
        form: FormApi<ITokenFormValues, Partial<ITokenFormValues>>,
        values: ITokenFormValues,
      ) =>
      () => {
        form.change(FieldsNames.toToken, values.fromToken);
        form.change(FieldsNames.fromToken, values.toToken);
      },
    [],
  );

  const debouncedOnSubmit = useDebouncedCallback(onSubmit, DEBOUNCE_TIME);

  const validateAmount = useCallback((value?: ReactText) => {
    let error: string | undefined;

    if (!value) {
      error = t('validation.required');
    } else {
      const currentAmount = new BigNumber(value);
      if (currentAmount.isNaN()) {
        error = t('validation.numberOnly');
      } else if (currentAmount.isLessThanOrEqualTo(MIN_AMOUNT)) {
        error = t('validation.min', {
          value: MIN_AMOUNT,
        });
      }
    }

    return error;
  }, []);

  const normalizeAmount = (value: string): string => {
    // only numbers and dot
    return value.replace(',', '.').replace(/[^0-9.]/g, '');
  };

  const renderForm = ({
    handleSubmit,
    values,
    form,
  }: FormRenderProps<ITokenFormValues>) => {
    const filteredFromTokenOptions = options.map(option => {
      return {
        ...option,
        disabled: option.value === values.toToken,
      };
    });

    const filteredToTokenOptions = options.map(option => {
      return {
        ...option,
        disabled: option.value === values.fromToken,
      };
    });

    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid
          container
          spacing={1}
          className={classes.root}
          alignItems="flex-start"
        >
          <Grid item xs={12} md="auto">
            <div className={classes.tokenFrom}>
              <Field
                name={FieldsNames.amount}
                component={InputField}
                className={classes.amount}
                type="number"
                variant="outlined"
                placeholder="0"
                defaultValue={defaultAmount}
                disabled={disabled}
                validate={validateAmount}
                parse={normalizeAmount}
                InputProps={{
                  classes: {
                    root: classes.amountInputBase,
                    input: classes.amountInput,
                  },
                }}
              />

              <Field
                name={FieldsNames.fromToken}
                defaultValue={defaultFromToken}
              >
                {props => (
                  <TokenSelect
                    name={props.input.name}
                    onChange={props.input.onChange}
                    value={props.input.value}
                    className={classes.tokenFromSelect}
                    options={filteredFromTokenOptions}
                    disabled={disabled}
                    variant="filled"
                  />
                )}
              </Field>
            </div>
          </Grid>

          <Grid item xs={12} md="auto" className={classes.swap}>
            <ButtonBase
              className={classes.swapBtn}
              onClick={handleTokenSwap(form, values)}
              disabled={disabled}
            >
              <SwapIcon className={classes.swapIcon} />
            </ButtonBase>
          </Grid>

          <Grid item xs={12} md="auto">
            <Field name={FieldsNames.toToken} defaultValue={defaultToToken}>
              {props => (
                <TokenSelect
                  name={props.input.name}
                  onChange={props.input.onChange}
                  value={props.input.value}
                  options={filteredToTokenOptions}
                  disabled={disabled}
                  variant="filled"
                />
              )}
            </Field>
          </Grid>
        </Grid>

        <OnChange name={FieldsNames.amount}>
          {() => {
            // todo: cancel submit if validation fails
            // debouncedOnSubmit.cancel();
            form.submit();
          }}
        </OnChange>

        <OnChange name={FieldsNames.fromToken}>
          {value => {
            if (typeof getPairedOption === 'function') {
              const pairedOptionValue = getPairedOption(value, values.toToken);
              if (pairedOptionValue) {
                form.change(FieldsNames.toToken, pairedOptionValue);
              }
            }
            form.submit();
          }}
        </OnChange>

        <OnChange name={FieldsNames.toToken}>
          {value => {
            if (typeof getPairedOption === 'function') {
              const pairedOptionValue = getPairedOption(
                value,
                values.fromToken,
              );
              if (pairedOptionValue) {
                form.change(FieldsNames.fromToken, pairedOptionValue);
              }
            }
            form.submit();
          }}
        </OnChange>
      </form>
    );
  };

  return (
    <Form onSubmit={values => debouncedOnSubmit(values)} render={renderForm} />
  );
};
