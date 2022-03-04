import { ButtonBase, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormApi } from 'final-form';
import { ReactText, useCallback } from 'react';
import {
  Field,
  Form,
  FormRenderProps,
  FieldRenderProps,
} from 'react-final-form';
import { useDebouncedCallback } from 'use-debounce';

import { Milliseconds } from 'modules/common/types';
import { t } from 'modules/i18n/utils/intl';
import { InputField } from 'uiKit/InputField';
import { OnChange } from 'uiKit/OnChange';

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
}: ITokenForm): JSX.Element => {
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
        error = t('validation.number-only');
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
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid
          container
          alignItems="flex-start"
          className={classes.root}
          spacing={1}
        >
          <Grid item md="auto" xs={12}>
            <div className={classes.tokenFrom}>
              <Field
                className={classes.amount}
                component={InputField}
                defaultValue={defaultAmount}
                disabled={disabled}
                InputProps={{
                  classes: {
                    root: classes.amountInputBase,
                    input: classes.amountInput,
                  },
                }}
                name={FieldsNames.amount}
                parse={normalizeAmount}
                placeholder="0"
                type="number"
                validate={validateAmount}
                variant="outlined"
              />

              <Field
                defaultValue={defaultFromToken}
                name={FieldsNames.fromToken}
              >
                {(props: FieldRenderProps<ITokenFormValues>) => (
                  <TokenSelect
                    className={classes.tokenFromSelect}
                    disabled={disabled}
                    name={props.input.name}
                    options={filteredFromTokenOptions}
                    value={props.input.value}
                    variant="filled"
                    onChange={props.input.onChange}
                  />
                )}
              </Field>
            </div>
          </Grid>

          <Grid item className={classes.swap} md="auto" xs={12}>
            <ButtonBase
              className={classes.swapBtn}
              disabled={disabled}
              onClick={handleTokenSwap(form, values)}
            >
              <SwapIcon className={classes.swapIcon} />
            </ButtonBase>
          </Grid>

          <Grid item md="auto" xs={12}>
            <Field defaultValue={defaultToToken} name={FieldsNames.toToken}>
              {props => (
                <TokenSelect
                  disabled={disabled}
                  name={props.input.name}
                  options={filteredToTokenOptions}
                  value={props.input.value}
                  variant="filled"
                  onChange={props.input.onChange}
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
              const pairedOptionValue = getPairedOption(
                value as string,
                values.toToken,
              );
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
                value as string,
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
    <Form render={renderForm} onSubmit={values => debouncedOnSubmit(values)} />
  );
};
