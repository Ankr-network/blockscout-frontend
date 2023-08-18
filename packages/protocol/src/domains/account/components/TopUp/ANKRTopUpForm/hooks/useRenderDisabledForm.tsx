import { Typography } from '@mui/material';
import { ClassNameMap } from '@mui/material/styles';
import { FormRenderProps } from 'react-final-form';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import {
  ANKR_CURRENCY,
  ANKR_MAX_DIGITS,
} from 'domains/account/actions/topUp/const';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { NavLink } from 'uiKit/NavLink';
import { useIsSMDown } from 'uiKit/Theme/useTheme';

import { AmountInputField, TopUpFormValues } from '../ANKRTopUpFormTypes';
import { AmountField } from '../AmountField';

export const useRenderDisabledForm = (classes: ClassNameMap) => {
  const isMobile = useIsSMDown();

  return useCallback(
    ({ values }: FormRenderProps<TopUpFormValues>) => {
      return (
        <form autoComplete="off" className={classes.form}>
          <div>
            <Typography
              className={classes.amountLabel}
              component="div"
              variant="subtitle2"
            >
              {t('account.account-details.top-up.ankr-amount-label')}
            </Typography>
            <AmountField
              amount={values.amount}
              name={AmountInputField.amount}
              isDisabled
              currency={ANKR_CURRENCY}
              maxLength={ANKR_MAX_DIGITS}
            />
          </div>
          <NavLink
            color="primary"
            variant="contained"
            fullWidth
            className={classes.button}
            href={AccountRoutesConfig.topUp.generatePath()}
          >
            {t(
              `account.account-details.top-up.${
                isMobile ? 'continue-mobile' : 'continue-desktop'
              }`,
            )}
          </NavLink>
        </form>
      );
    },
    [classes, isMobile],
  );
};
