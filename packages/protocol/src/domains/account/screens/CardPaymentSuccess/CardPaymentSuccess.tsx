import { t } from '@ankr.com/common';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { InfoCard } from 'domains/userSettings/components/InfoCard';
import { selectTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { LoadingButton } from 'uiKit/LoadingButton';

import { getInfoCardParams } from './utils/getInfoCardParams';
import { getOriginRoute } from './utils/getOriginRoute';
import { useCardPaymentSuccessStyles } from './useCardPaymentSuccessStyles';
import { useClickHandler } from './hooks/useClickHandler';
import { useTrackSuccessfulTopUp } from './hooks/useTrackSuccessfulTopUp';
import success from './assets/success.png';

export const CardPaymentSuccess = () => {
  useTrackSuccessfulTopUp();

  const topUpOrigin = useSelector(selectTopUpOrigin);

  const route = getOriginRoute(topUpOrigin);

  useSetBreadcrumbs([
    {
      title: t((route || AccountRoutesConfig.cardPaymentSuccess).breadcrumbs!),
    },
  ]);

  const { hasPremium } = useAuth();

  const onClick = useClickHandler();

  const { classes } = useCardPaymentSuccessStyles();

  const { button, description, title } = useMemo(
    () => getInfoCardParams({ hasPremium }),
    [hasPremium],
  );

  return (
    <CenterContainer>
      <InfoCard
        align="center"
        description={description}
        descriptionClassName={classes.description}
        title={title}
        titleClassName={classes.title}
        imgUrl={success}
      >
        <LoadingButton fullWidth onClick={onClick} size="large">
          {button}
        </LoadingButton>
      </InfoCard>
    </CenterContainer>
  );
};
