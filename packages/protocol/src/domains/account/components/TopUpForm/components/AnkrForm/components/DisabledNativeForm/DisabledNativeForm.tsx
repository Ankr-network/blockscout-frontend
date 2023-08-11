import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ANKR_MAX_DIGITS } from 'domains/account/actions/topUp/const';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { NavLink } from 'uiKit/NavLink';
import { useIsSMDown } from 'uiKit/Theme/useTheme';

import { AnkrAmountField } from '../../../AnkrAmountField';
import { FormField } from '../../constants';
import { useDisabledNativeFormStyles } from './DisabledNativeFormStyles';

const topUpPath = AccountRoutesConfig.topUp.generatePath();

export interface DisabledNativeFormProps {
  amount: string;
}

export const DisabledNativeForm = ({ amount }: DisabledNativeFormProps) => {
  const isMobile = useIsSMDown();

  const buttonKey = isMobile
    ? 'account.account-details.top-up.continue-mobile'
    : 'account.account-details.top-up.continue-desktop';

  const { classes } = useDisabledNativeFormStyles();

  return (
    <form className={classes.root} autoComplete="off">
      <div>
        <Typography
          className={classes.amountLabel}
          component="div"
          variant="subtitle2"
        >
          {t('account.account-details.top-up.ankr-amount-label')}
        </Typography>
        <AnkrAmountField
          amount={amount}
          isDisabled
          maxLength={ANKR_MAX_DIGITS}
          name={FormField.Amount}
        />
      </div>
      <NavLink
        className={classes.button}
        color="primary"
        fullWidth
        href={topUpPath}
        variant="contained"
      >
        {t(buttonKey)}
      </NavLink>
    </form>
  );
};
