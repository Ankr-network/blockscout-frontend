import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { t } from '@ankr.com/common';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { useCardPaymentSuccessStyles } from './useCardPaymentSuccessStyles';
import { InfoCard } from 'domains/userSettings/components/InfoCard';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PricingRoutesConfig } from 'domains/pricing/Routes';

export const CardPaymentSuccess = () => {
  const classes = useCardPaymentSuccessStyles();
  const history = useHistory();
  const { credentials } = useAuth();
  const hasCredentials = Boolean(credentials);

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.cardPaymentSuccess.breadcrumbs),
    },
  ]);

  const handleClick = useCallback(() => {
    history.push(
      hasCredentials
        ? AccountRoutesConfig.accountDetails.generatePath()
        : PricingRoutesConfig.pricing.generatePath(),
    );
  }, [history, hasCredentials]);

  return (
    <CenterContainer>
      <InfoCard
        title={t('account.card-payment-success.title')}
        titleClassName={classes.title}
        description={t('account.card-payment-success.description')}
        descriptionClassName={classes.description}
        align="center"
        actionSlot={
          <Button onClick={handleClick} size="large">
            {t(
              `account.card-payment-success.button-${
                credentials ? 'billing' : 'pricing'
              }`,
            )}
          </Button>
        }
      />
    </CenterContainer>
  );
};
