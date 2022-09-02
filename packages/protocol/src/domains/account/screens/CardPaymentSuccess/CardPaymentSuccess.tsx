import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { t } from 'common';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { useCardPaymentSuccessStyles } from './useCardPaymentSuccessStyles';
import { InfoCard } from 'domains/userSettings/components/InfoCard';

export const CardPaymentSuccess = () => {
  const classes = useCardPaymentSuccessStyles();
  const history = useHistory();

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.cardPaymentSuccess.breadcrumbs),
    },
  ]);

  const handleClick = () => {
    history.push(AccountRoutesConfig.accountDetails.generatePath());
  };

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
            {t('account.card-payment-success.button')}
          </Button>
        }
      />
    </CenterContainer>
  );
};
