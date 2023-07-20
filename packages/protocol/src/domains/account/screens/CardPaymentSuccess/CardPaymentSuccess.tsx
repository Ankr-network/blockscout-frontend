import { Button } from '@mui/material';
import { t } from '@ankr.com/common';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { InfoCard } from 'domains/userSettings/components/InfoCard';
import { getInfoCardParams } from './utils/getInfoCardParams';
import { getOriginRoute } from './utils/getOriginRoute';
import { selectTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCardPaymentSuccessStyles } from './useCardPaymentSuccessStyles';
import { useClickHandler } from './hooks/useClickHandler';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useTrackSuccessfulTopUp } from './hooks/useTrackSuccessfulTopUp';
import { useEnableWhitelistedProject } from 'domains/projects/hooks/useEnableWhitelistedProject';
import { useIsWhitelistReason } from './hooks/useIsWhitelistReason';

export const CardPaymentSuccess = () => {
  const isWhitelistReason = useIsWhitelistReason();
  useEnableWhitelistedProject(isWhitelistReason);

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
    () => getInfoCardParams(hasPremium),
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
      >
        <Button onClick={onClick} size="large">
          {button}
        </Button>
      </InfoCard>
    </CenterContainer>
  );
};
