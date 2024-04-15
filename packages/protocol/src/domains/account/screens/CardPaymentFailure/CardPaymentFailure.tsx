import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { InfoCard } from 'domains/userSettings/components/InfoCard';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

import { useCardPaymentFailureStyles } from './useCardPaymentFailureStyles';
import { useClickHandler } from './hooks/useClickHandler';
import { useTrackFailureTopUp } from './hooks/useTrackFailureTopUp';

export const CardPaymentFailure = () => {
  useTrackFailureTopUp();

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.cardPaymentFailure.breadcrumbs),
    },
  ]);

  const onClick = useClickHandler();

  const { classes } = useCardPaymentFailureStyles();

  return (
    <CenterContainer>
      <InfoCard
        align="center"
        description={t('account.card-payment-failure.description')}
        descriptionClassName={classes.description}
        title={t('account.card-payment-failure.title')}
        titleClassName={classes.title}
      >
        <Button onClick={onClick} variant="outlined" size="large">
          {t('account.card-payment-failure.button')}
        </Button>
      </InfoCard>
    </CenterContainer>
  );
};
