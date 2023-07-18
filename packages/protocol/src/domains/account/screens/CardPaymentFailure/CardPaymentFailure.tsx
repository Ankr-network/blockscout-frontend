import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { InfoCard } from 'domains/userSettings/components/InfoCard';
import { useCardPaymentFailureStyles } from './useCardPaymentFailureStyles';
import { useClickHandler } from './hooks/useClickHandler';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useTrackFailureTopUp } from './hooks/useTrackFailureTopUp';
import { useIsWhitelistReason } from '../CardPaymentSuccess/hooks/useIsWhitelistReason';

export const CardPaymentFailure = () => {
  useTrackFailureTopUp();
  const isWhitelistReason = useIsWhitelistReason();

  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.cardPaymentFailure.breadcrumbs),
    },
  ]);

  const onClick = useClickHandler(isWhitelistReason);

  const { classes } = useCardPaymentFailureStyles();

  return (
    <CenterContainer>
      <InfoCard
        title={t('account.card-payment-failure.title')}
        titleClassName={classes.title}
        description={t('account.card-payment-failure.description')}
        descriptionClassName={classes.description}
        align="center"
      >
        <Button onClick={onClick} variant="outlined" size="large">
          {t('account.card-payment-failure.button')}
        </Button>
      </InfoCard>
    </CenterContainer>
  );
};
