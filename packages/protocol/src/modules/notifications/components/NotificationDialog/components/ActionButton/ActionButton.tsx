import { Button } from '@mui/material';
import { ENotificationCategory } from 'multirpc-sdk';
import { Link } from 'react-router-dom';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { actionButtonTranslation } from './translation';

export interface IActionButtonProps {
  category: ENotificationCategory;
}

export const ActionButton = ({ category }: IActionButtonProps) => {
  const isBillingCategory = category === ENotificationCategory.BILLING;
  const isSystemCategory = category === ENotificationCategory.SYSTEM;

  const { keys, t } = useTranslation(actionButtonTranslation);

  if (isBillingCategory || isSystemCategory) {
    return (
      <Button
        component={Link}
        fullWidth
        size="large"
        to={AccountRoutesConfig.accountDetails.generatePath()}
        variant="contained"
      >
        {t(keys.billingButton)}
      </Button>
    );
  }

  return null;
};
