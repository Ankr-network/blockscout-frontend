import { Typography } from '@mui/material';
import { tHTML } from '@ankr.com/common';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { TopUpEmailDialog } from 'domains/account/components/TopUp/ANKRTopUpForm/TopUpEmailDialog';

import { AmountForm } from './components/AmountForm';
import { CurrencySelector } from './components/CurrencySelector';
import { TopUpCurrency } from './types';
import { USDPriceSelector } from './components/USDPiceSelector';
import { useTopUpForm } from './hooks/useTopUpForm';
import { useTopUpFormStyles } from './TopUpFormStyles';

export interface TopUpFormProps {
  currency?: TopUpCurrency;
}

export const TopUpForm = ({ currency }: TopUpFormProps) => {
  const { amountProps, currencyProps, emailDialogProps, usdPriceProps } =
    useTopUpForm(currency);

  const { classes } = useTopUpFormStyles();

  return (
    <GuardUserGroup
      blockName={BlockWithPermission.Billing}
      placeholder={
        <Typography>{tHTML('error.group-role-restricted')}</Typography>
      }
    >
      <div className={classes.root}>
        <CurrencySelector {...currencyProps} />
        {usdPriceProps && <USDPriceSelector {...usdPriceProps} />}
        <AmountForm {...amountProps} />
        <TopUpEmailDialog {...emailDialogProps} />
      </div>
    </GuardUserGroup>
  );
};
