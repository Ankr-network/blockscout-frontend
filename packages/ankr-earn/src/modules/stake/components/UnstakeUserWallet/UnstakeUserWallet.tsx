import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { Field, Form } from 'react-final-form';

import { t } from 'common';
import { Notice } from 'ui';

import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { InputField } from 'uiKit/InputField';

import { useUnstakeUserWalletStyles } from './useUnstakeUserWalletStyles';

const UNSTAKE_USER_WALLET_FORM_ID = 'unstake-user-wallet-form';

enum EFieldNames {
  userWallet = 'userWallet',
}

export interface IUnstakeUserWalletFormValues {
  userWallet?: string;
}

export interface IUnstakeUserWalletProps {
  endText?: string;
  extraValidation?: (
    data: Partial<IUnstakeUserWalletFormValues>,
    errors: FormErrors<IUnstakeUserWalletFormValues>,
  ) => FormErrors<IUnstakeUserWalletFormValues>;
  isLoading?: boolean;
  network: string;
  submitDisabled?: boolean;
  token: Token;
  tokenAmountTxt?: string;
  onClose?: () => void;
  onSubmit: (values: IUnstakeUserWalletFormValues) => void;
}

export const UnstakeUserWallet = ({
  endText,
  extraValidation,
  isLoading,
  network,
  submitDisabled,
  token,
  tokenAmountTxt,
  onClose,
  onSubmit,
}: IUnstakeUserWalletProps): JSX.Element => {
  const classes = useUnstakeUserWalletStyles();

  const validate = useCallback(
    (data: IUnstakeUserWalletFormValues) => {
      const errors: FormErrors<IUnstakeUserWalletFormValues> = {};

      if (typeof data.userWallet !== 'string') {
        errors.userWallet = t('validation.required');
      }

      return extraValidation ? extraValidation(data, errors) : errors;
    },
    [extraValidation],
  );

  return (
    <Paper className={classes.root}>
      <Container className={classes.container}>
        <Typography className={classes.title} variant="h3">
          {t('unstake-dialog.user-wallet.title', {
            network,
            token,
          })}
        </Typography>

        <Form
          render={({ handleSubmit }): JSX.Element => (
            <form
              autoComplete="off"
              id={UNSTAKE_USER_WALLET_FORM_ID}
              onSubmit={handleSubmit}
            >
              <Box className={classes.fieldLabel}>
                <Typography variant="h5">
                  {t('unstake-dialog.user-wallet.field-label')}
                </Typography>

                {tokenAmountTxt && (
                  <Typography variant="subtitle1">{tokenAmountTxt}</Typography>
                )}
              </Box>

              <Field
                fullWidth
                component={InputField}
                name={EFieldNames.userWallet}
                type="string"
              />
            </form>
          )}
          validate={validate}
          onSubmit={onSubmit}
        />
      </Container>

      <div className={classes.footer}>
        <Container className={classes.container}>
          <Grid container direction="column" spacing={4}>
            <Grid item xs>
              {endText && <Notice>{endText}</Notice>}
            </Grid>

            <Grid item xs>
              <Button
                fullWidth
                color="primary"
                disabled={submitDisabled}
                form={UNSTAKE_USER_WALLET_FORM_ID}
                isLoading={isLoading}
                size="large"
                type="submit"
              >
                {t('unstake-dialog.user-wallet.continue-btn')}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>

      <CloseButton onClose={onClose} />
    </Paper>
  );
};
