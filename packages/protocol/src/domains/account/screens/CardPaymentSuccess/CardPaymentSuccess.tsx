import { Button } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { InfoCard } from 'domains/userSettings/components/InfoCard';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCardPaymentSuccessStyles } from './useCardPaymentSuccessStyles';
import { useClickHandler } from '../CardPaymentFailure/hooks/useClickHandler';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useTrackSuccessfulTopUp } from './hooks/useTrackSuccessfulTopUp';

export const CardPaymentSuccess = () => {
  useTrackSuccessfulTopUp();

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.cardPaymentSuccess.breadcrumbs),
    },
  ]);

  const { hasPremium } = useAuth();

  const onClick = useClickHandler();

  const { classes } = useCardPaymentSuccessStyles();

  const section = hasPremium ? 'billing' : 'pricing';

  return (
    <CenterContainer>
      <InfoCard
        title={tHTML(`account.card-payment-success.${section}.title`)}
        titleClassName={classes.title}
        description={tHTML(
          `account.card-payment-success.${section}.description`,
        )}
        descriptionClassName={classes.description}
        align="center"
        actionSlot={
          <Button onClick={onClick} size="large">
            {t(`account.card-payment-success.${section}.button`)}
          </Button>
        }
      />
    </CenterContainer>
  );
};
