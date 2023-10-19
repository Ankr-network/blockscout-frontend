import { t } from '@ankr.com/common';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { InfoCard } from 'domains/userSettings/components/InfoCard';
import { selectTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useEnableWhitelistedProject } from 'domains/projects/hooks/useEnableWhitelistedProject';
import { LoadingButton } from 'uiKit/LoadingButton';

import { getInfoCardParams } from './utils/getInfoCardParams';
import { getOriginRoute } from './utils/getOriginRoute';
import { useCardPaymentSuccessStyles } from './useCardPaymentSuccessStyles';
import { useClickHandler } from './hooks/useClickHandler';
import { useTrackSuccessfulTopUp } from './hooks/useTrackSuccessfulTopUp';
import { useIsWhitelistReason } from './hooks/useIsWhitelistReason';
import success from './assets/success.png';
import { WhitelistInfoCard } from './components/WhitelistInfoCard';

export const CardPaymentSuccess = () => {
  const isWhitelistReason = useIsWhitelistReason();

  const { isLoading } = useEnableWhitelistedProject(isWhitelistReason);

  useTrackSuccessfulTopUp();

  const topUpOrigin = useSelector(selectTopUpOrigin);

  const route = getOriginRoute(topUpOrigin);

  useSetBreadcrumbs([
    {
      title: t((route || AccountRoutesConfig.cardPaymentSuccess).breadcrumbs!),
    },
  ]);

  const { hasPremium } = useAuth();

  const onClick = useClickHandler(isWhitelistReason);

  const { classes } = useCardPaymentSuccessStyles();

  const { button, description, title } = useMemo(
    () => getInfoCardParams({ hasPremium }),
    [hasPremium],
  );

  return (
    <CenterContainer>
      {isWhitelistReason ? (
        <WhitelistInfoCard isLoading={isLoading} />
      ) : (
        <InfoCard
          align="center"
          description={description}
          descriptionClassName={classes.description}
          title={title}
          titleClassName={classes.title}
          imgUrl={success}
        >
          <LoadingButton
            onClick={onClick}
            size="large"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? '' : button}
          </LoadingButton>
        </InfoCard>
      )}
    </CenterContainer>
  );
};
