import { Typography } from '@mui/material';
import { tHTML } from '@ankr.com/common';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { AmountForm } from './components/AmountForm';
import { CurrencySelector } from './components/CurrencySelector';
import { TopUpEmailDialog } from 'domains/account/components/TopUp/ANKRTopUpForm/TopUpEmailDialog';
import { USDPriceSelector } from './components/USDPiceSelector';
import { useTopUpForm } from './hooks/useTopUpForm';
import { useTopUpFormStyles } from './TopUpFormStyles';

export const TopUpForm = () => {
  const { amountProps, currencyProps, emailDialogProps, usdPriceProps } =
    useTopUpForm();

  const { classes } = useTopUpFormStyles();

  return (
    <GuardUserGroup
      blockName={BlockWithPermission.Disabled}
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
