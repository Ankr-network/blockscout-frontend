import { t } from '@ankr.com/common';
import { Box, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';

import { Radio } from 'ui';

import { AmountField } from 'uiKit/AmountField';
import { Button } from 'uiKit/Button';
import { Dialog } from 'uiKit/Dialog';

import { ApprovalOption, IApprovalSettingsFormValues } from './types';
import { useApprovalSettingsDialogStyles } from './useApprovalSettingsDialogStyles';

const fieldNames = {
  type: 'type',
  amount: 'amount',
} as const;

interface IApprovalSettingsDialogProps {
  amount?: string;
  approvalSettingsMode?: ApprovalOption;
  isLoading?: boolean;
  isOpen: boolean;
  token: string;
  onSubmit(params: IApprovalSettingsFormValues): void;
  onClose(): void;
}

export const ApprovalSettingsDialog = ({
  amount = '0',
  approvalSettingsMode = ApprovalOption.CURRENT,
  isLoading = false,
  isOpen,
  token,
  onClose,
  onSubmit,
}: IApprovalSettingsDialogProps): JSX.Element => {
  const classes = useApprovalSettingsDialogStyles();

  const initialData = useMemo<IApprovalSettingsFormValues>(
    () => ({
      amount,
      type: approvalSettingsMode,
    }),
    [amount, approvalSettingsMode],
  );

  const renderForm = ({
    handleSubmit,
    values,
  }: FormRenderProps<IApprovalSettingsFormValues>) => (
    <>
      <Typography className={classes.header} component="h2">
        {t('stake.approval.approval-settings')}
      </Typography>

      <Typography className={classes.description} component="p">
        {t('stake.approval.description')}
      </Typography>

      {Object.keys(ApprovalOption).map(optionKey => (
        <Field name={fieldNames.type} type="radio" value={optionKey}>
          {({ input }) => {
            const key = optionKey.toLowerCase();
            const id = `approval-variants-${key}`;

            return (
              <Box key={optionKey} alignItems="center" display="flex" mb={2}>
                <Radio
                  checked={input.checked}
                  id={id}
                  name={input.name}
                  value={optionKey}
                  onChange={input.onChange}
                />

                <label
                  className={classNames(classes.optionLabel, {
                    [classes.optionLabelActive]: input.checked,
                  })}
                  htmlFor={id}
                >
                  {t(`stake.approval.option-${key}`)}
                </label>
              </Box>
            );
          }}
        </Field>
      ))}

      <div
        className={classNames(classes.input, {
          [classes.inputHidden]: values.type !== ApprovalOption.CUSTOM,
        })}
      >
        <Field
          fullWidth
          component={AmountField}
          defaultValue={initialData.amount}
          InputProps={{
            endAdornment: <span>{token}</span>,
          }}
          name={fieldNames.amount}
          placeholder="0"
          variant="outlined"
        />
      </div>

      <Button
        fullWidth
        color="primary"
        isLoading={isLoading}
        size="large"
        type="submit"
        onClick={handleSubmit}
      >
        {t('stake.approval.close-and-confirm')}
      </Button>
    </>
  );

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Form
        initialValues={initialData}
        render={renderForm}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};
