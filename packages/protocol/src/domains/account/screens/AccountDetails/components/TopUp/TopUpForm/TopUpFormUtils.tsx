import { Button } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { useCallback } from 'react';
import { FormRenderProps } from 'react-final-form';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'ui';
import { AmountField } from './AmountField';
import { TopUpFormFields, TopUpFormValues } from './TopUpFormTypes';

export const useRenderDisabledForm = (classes: ClassNameMap) => {
  return useCallback(() => {
    return (
      <form autoComplete="off" className={classes.form}>
        <AmountField name={TopUpFormFields.amount} isDisabled />
        <NavLink
          color="primary"
          variant="contained"
          fullWidth
          className={classes.button}
          href={AccountRoutesConfig.topUp.generatePath()}
        >
          {t('account.account-details.top-up.continue-button')}
        </NavLink>
      </form>
    );
  }, [classes.button, classes.form]);
};

export const useRenderForm = (classes: ClassNameMap) => {
  return useCallback(
    ({ handleSubmit, validating }: FormRenderProps<TopUpFormValues>) => {
      return (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <AmountField name={TopUpFormFields.amount} />
          <Button
            color="primary"
            fullWidth
            type="submit"
            disabled={validating}
            className={classes.button}
          >
            {t('account.account-details.top-up.button')}
          </Button>
        </form>
      );
    },
    [classes.button, classes.form],
  );
};
