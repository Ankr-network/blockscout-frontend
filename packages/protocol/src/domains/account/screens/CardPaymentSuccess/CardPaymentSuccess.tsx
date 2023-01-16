import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { t, tHTML } from '@ankr.com/common';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { useCardPaymentSuccessStyles } from './useCardPaymentSuccessStyles';
import { InfoCard } from 'domains/userSettings/components/InfoCard';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PricingRoutesConfig } from 'domains/pricing/Routes';

export const CardPaymentSuccess = () => {
  const classes = useCardPaymentSuccessStyles();
  const history = useHistory();
  const { hasPremium } = useAuth();

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.cardPaymentSuccess.breadcrumbs),
    },
  ]);

  const handleClick = useCallback(() => {
    history.push(
      hasPremium
        ? AccountRoutesConfig.accountDetails.generatePath()
        : PricingRoutesConfig.pricing.generatePath(),
    );
  }, [history, hasPremium]);

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
          <Button onClick={handleClick} size="large">
            {t(`account.card-payment-success.${section}.button`)}
          </Button>
        }
      />
    </CenterContainer>
  );
};
