import { Button } from '@material-ui/core';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import { t } from '@ankr.com/common';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { InfoCard } from 'domains/userSettings/components/InfoCard';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useCardPaymentFailureStyles } from './useCardPaymentFailureStyles';

export const CardPaymentFailure = () => {
  const classes = useCardPaymentFailureStyles();

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.cardPaymentFailure.breadcrumbs),
    },
  ]);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(push(AccountRoutesConfig.accountDetails.generatePath()));
  };

  return (
    <CenterContainer>
      <InfoCard
        title={t('account.card-payment-failure.title')}
        titleClassName={classes.title}
        description={t('account.card-payment-failure.description')}
        descriptionClassName={classes.description}
        align="center"
        actionSlot={
          <Button onClick={handleClick} variant="outlined" size="large">
            {t('account.card-payment-failure.button')}
          </Button>
        }
      />
    </CenterContainer>
  );
};
